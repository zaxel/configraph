import { NodeIO } from "@gltf-transform/core";
import {
    KHRDracoMeshCompression,
    KHRMaterialsPBRSpecularGlossiness,
    KHRMaterialsUnlit,
    KHRMaterialsTransmission,
    KHRMaterialsVolume,
    KHRMaterialsIOR,
    KHRMaterialsSpecular,
    KHRMaterialsClearcoat,
    KHRMaterialsSheen,
    KHRTextureTransform,
    KHRTextureBasisu,
    KHRMeshQuantization,
    EXTMeshoptCompression,
} from "@gltf-transform/extensions";
import { dedup, draco, prune, textureCompress } from "@gltf-transform/functions";
import { DecoderModule, EncoderModule } from "draco3d";
import draco3d from 'draco3d';
import sharp from "sharp";

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
        .registerExtensions([
            KHRDracoMeshCompression,
            KHRMaterialsPBRSpecularGlossiness,
            KHRMaterialsUnlit,
            KHRMaterialsTransmission,
            KHRMaterialsVolume,
            KHRMaterialsIOR,
            KHRMaterialsSpecular,
            KHRMaterialsClearcoat,
            KHRMaterialsSheen,
            KHRTextureTransform,
            KHRTextureBasisu,
            KHRMeshQuantization,
            EXTMeshoptCompression,
        ])
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