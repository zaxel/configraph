import { MAX_FILE_SIZE, MAX_UNOPTIMIZED_SIZE } from "@/features/builder/store/slices/model.slice";
import fs from "fs";
import path from "path";

import { NodeIO } from '@gltf-transform/core';
import { textureCompress, draco, prune, dedup } from '@gltf-transform/functions';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import draco3d from 'draco3d';
import type { DecoderModule, EncoderModule } from 'draco3d';
import sharp from 'sharp';
import { loadGLB } from "@/lib/loadGLB";
import { extractMeshes, extractMeshesFromGLB } from "@/lib/extractMeshes";
import { createConfigurator } from "@/db/configurator.repo";

let encoderPromise: Promise<EncoderModule> | null = null;
let decoderPromise: Promise<DecoderModule> | null = null;

async function getDraco() {
    if (!encoderPromise) encoderPromise = draco3d.createEncoderModule();
    if (!decoderPromise) decoderPromise = draco3d.createDecoderModule();

    return {
        encoder: await encoderPromise,
        decoder: await decoderPromise,
    };
}

async function createIO() {
    const { encoder, decoder } = await getDraco();

    return new NodeIO()
        .registerExtensions([KHRDracoMeshCompression])
        .registerDependencies({
            'draco3d.encoder': encoder,
            'draco3d.decoder': decoder,
        });
}

export async function optimizeGLB(inputPath: string, outputPath: string) {
    const io = await createIO();
    const document = await io.read(inputPath);

    await document.transform(
        textureCompress({
            encoder: sharp,
            targetFormat: 'webp',
            resize: [1024, 1024],
            quality: 80,
        }),
        dedup(),
        prune(),
        draco(),
    );

    await io.write(outputPath, document);
}

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return new Response("No file", { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
        return new Response("File too large", { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith('.glb')) {
        return new Response('Only .glb files allowed', { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}.glb`;

    const rawDir = path.join(process.cwd(), "public/models/raw");
    const optDir = path.join(process.cwd(), "public/models/optimized");

    await fs.promises.mkdir(rawDir, { recursive: true });
    await fs.promises.mkdir(optDir, { recursive: true });

    const rawPath = path.join(rawDir, fileName);
    const optimizedPath = path.join(optDir, fileName);

    await fs.promises.writeFile(rawPath, buffer);

    try {
        if (file.size > MAX_UNOPTIMIZED_SIZE) {
            await optimizeGLB(rawPath, optimizedPath);
        } else {
            await fs.promises.copyFile(rawPath, optimizedPath);
        }


        const url = `/models/optimized/${fileName}`;

        // const fileBuffer = await fs.promises.readFile(optimizedPath);
        // const arrayBuffer = fileBuffer.buffer.slice(
        //     fileBuffer.byteOffset,
        //     fileBuffer.byteOffset + fileBuffer.byteLength
        // );

        // const gltf = await loadGLB(arrayBuffer);
        // const meshes = extractMeshes(gltf.scene);

        const fileBuffer = await fs.promises.readFile(optimizedPath);
        const meshes = extractMeshesFromGLB(fileBuffer.buffer);
        const configurator = await createConfigurator({ 
            product: {
                model: { url },
                modules: []
            },
            builderConfig: {
                meshes
            }
        });

        console.log(configurator);

        return Response.json({
            configuratorId: configurator.id,
            url,
        });
    } catch (err) {
        await fs.promises.unlink(optimizedPath).catch(() => { });
        throw err;
    } finally {
        await fs.promises.unlink(rawPath).catch(() => { });
    }
}