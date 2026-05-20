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
import { createConfiguratorAction, updateConfiguratorThumbnail } from "@/features/configurators/actions/editor.actions";



export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { userId } = await auth();
    const { id } = await context.params;

    if (!userId)
        return new Response("Unauthorized", { status: 401 });
    
    if (!id)
        return new Response("No configurator id", { status: 400 });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return new Response("No file", { status: 400 });
    }

    if (file.size >  5 * 1024 * 1024) {
        return new Response("File too large", { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith('.webp')) {
        return new Response('Only .webp files allowed', { status: 400 });
    }

    try {

        const { url } = await storageRepo.uploadThumbnail(file, userId, id);
     
        await updateConfiguratorThumbnail(id, url);

        return Response.json({ status: "ok" });
    } catch (err) {
        throw err;
    }
}