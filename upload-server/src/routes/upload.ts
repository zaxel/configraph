import { Router } from 'express';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { upload } from '../index';
import { optimizeGLB } from '../lib/optimizeGLB';
import { uploadModel } from '../lib/storage';
import { MAX_UNOPTIMIZED_SIZE } from '@/features/builder/store/slices/model.slice';


export const uploadRoute = Router();

uploadRoute.post('/', upload.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send('No file');

    if (!file.originalname.toLowerCase().endsWith('.glb'))
        return res.status(400).send('Only .glb files allowed');

    const tmpOpt = path.join(os.tmpdir(), `${Date.now()}-opt.glb`);

    try {
        if (file.size > MAX_UNOPTIMIZED_SIZE) {
            await optimizeGLB(file.path, tmpOpt);
        } else {
            await fs.promises.copyFile(file.path, tmpOpt);
        }

        const optimizedBuffer = await fs.promises.readFile(tmpOpt);
        const optimizedFile = new File([optimizedBuffer], file.originalname, { type: 'model/gltf-binary' });

        // upload to storage, then tell Vercel to create the configurator
        const { url, path: modelPath } = await uploadModel(optimizedFile, req.userId!);

        const configurator = await notifyVercel({ userId: req.userId!, url, modelPath, fileSize: optimizedFile.size });

        res.json({ configuratorId: configurator.id, url });

    } finally {
        await fs.promises.unlink(file.path).catch(() => {});
        await fs.promises.unlink(tmpOpt).catch(() => {});
    }
});

async function notifyVercel({ userId, url, modelPath, fileSize }: {
    userId: string, url: string, modelPath: string, fileSize: number
}) {
    const res = await fetch(`${process.env.VERCEL_APP_URL}/api/create-configurator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-internal-secret': process.env.INTERNAL_SECRET!
        },
        body: JSON.stringify({ userId, url, modelPath, fileSize })
    });
    if (!res.ok) throw new Error('Failed to create configurator');
    return res.json();
}