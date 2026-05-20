import { MAX_FILE_SIZE, MAX_UNOPTIMIZED_SIZE } from "@/features/builder/store/slices/model.slice";
import fs from "fs";
import path from "path";
import os from 'os';

import { NodeIO } from '@gltf-transform/core';
import { textureCompress, draco, prune, dedup } from '@gltf-transform/functions';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import draco3d from 'draco3d';
import type { DecoderModule, EncoderModule } from 'draco3d';
import sharp from 'sharp';
import { storageRepo } from "@/features/account/repositories/storage.repo";
import { auth } from "@clerk/nextjs/server";
import { createConfiguratorAction } from "@/features/configurators/actions/editor.actions";


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
    const { userId } = await auth();
    if (!userId) 
        return new Response("Unauthorized", { status: 401 });
    
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
    const tmpRaw = path.join(os.tmpdir(), `${Date.now()}.glb`);
    const tmpOpt = path.join(os.tmpdir(), `${Date.now()}-opt.glb`);
    await fs.promises.writeFile(tmpRaw, buffer);

    try {

        if (file.size > MAX_UNOPTIMIZED_SIZE) {
            await optimizeGLB(tmpRaw, tmpOpt);
        } else {
            await fs.promises.copyFile(tmpRaw, tmpOpt);
        }
        const optimizedBuffer = await fs.promises.readFile(tmpOpt);
        const optimizedFile = new File([optimizedBuffer], file.name, { type: file.type });
        const {path: modelPath, url} = await storageRepo.upload3DModel(optimizedFile, userId);
        
        const draftConfigurator = {
            id: "moke-id",
            draft: {
                quantity: 1,
                model: { url },
                modules: []
            },
            published: null,
            builderConfig: {
                meshes: []
            }
        }

      const configurator = await createConfiguratorAction(draftConfigurator, optimizedFile.size, file.type, modelPath);

        return Response.json({
            configuratorId: configurator.id,
            url,
        });
    } catch (err) {
        throw err;
    } finally {
        await fs.promises.unlink(tmpRaw).catch(() => { });
        await fs.promises.unlink(tmpOpt).catch(() => { }); 
    }
}