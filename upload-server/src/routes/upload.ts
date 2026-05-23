import { Router } from 'express';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { upload } from '../lib/multer';
import { optimizeGLB } from '../lib/optimizeGLB';
import { uploadModel } from '../lib/storage';
import { MAX_UNOPTIMIZED_SIZE } from '../lib/consts';



export const uploadRoute = Router();
let processing = false;

uploadRoute.post('/', upload.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send('No file');

    if (!file.originalname.toLowerCase().endsWith('.glb'))
        return res.status(400).send('Only .glb files allowed');

    if (processing)
        return res.status(429).json({ error: 'Server busy, try again in a moment' });
    processing = true;

    const tmpOpt = path.join(os.tmpdir(), `${Date.now()}-opt.glb`);

    try {
        if (file.size > MAX_UNOPTIMIZED_SIZE) {
            await optimizeGLB(file.path, tmpOpt);
        } else {
            await fs.promises.copyFile(file.path, tmpOpt);
        }

        const optimizedBuffer = await fs.promises.readFile(tmpOpt);
        const optimizedFile = new File([optimizedBuffer], file.originalname, { type: 'model/gltf-binary' });
        if (!optimizedFile) return res.status(400).send('Optimization failed');
        if (optimizedFile.size > 1024 * 1024 * 10) return res.status(400).send('Optimized file exceed allowed size');
        // upload to storage, then tell Vercel to create the configurator
        const { url, path: modelPath } = await uploadModel(optimizedFile, req.userId!);

        try {
            const configurator = await notifyVercel({ userId: req.userId!, url, modelPath, fileSize: optimizedFile.size, fileType: optimizedFile.type });
            res.json({ configuratorId: configurator.configuratorId, url });
        } catch (err) {
            console.error('Vercel callback failed (expected in local dev):', err);
            res.json({ url, modelPath }); // file uploaded fine, configurator creation pending
        }

    } catch (err) {
        console.error('Upload failed:', err);
        res.status(500).json({ error: err instanceof Error ? err.message : 'Upload failed' });
    } finally {
        await fs.promises.unlink(file.path).catch(() => { });
        await fs.promises.unlink(tmpOpt).catch(() => { });
        processing = false;
    }
});

async function notifyVercel({ userId, url, modelPath, fileSize, fileType }: {
    userId: string, url: string, modelPath: string, fileSize: number, fileType: string
}) {
    const res = await fetch(`${process.env.VERCEL_APP_URL}/api/create-configurator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-internal-secret': process.env.INTERNAL_SECRET!
        },
        body: JSON.stringify({ userId, url, modelPath, fileSize, fileType })
    });
    if (!res.ok) throw new Error('Failed to create configurator');
    return res.json();
}