import express from 'express';
import multer from 'multer';
import cors from 'cors';
import os from 'os';
import { verifyClerkToken } from './lib/auth';
import { uploadRoute } from './routes/upload';
import { MAX_UNOPTIMIZED_SIZE } from '@/features/builder/store/slices/model.slice';

const storage = multer.diskStorage({
    destination: os.tmpdir(),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: MAX_UNOPTIMIZED_SIZE }
});

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

// auth middleware — runs before every route
app.use(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');
    
    try {
        req.userId = await verifyClerkToken(token);
        next();
    } catch {
        res.status(401).send('Invalid token');
    }
});

app.use('/upload-model', uploadRoute);

app.listen(3001, () => console.log('Upload server running on :3001'));