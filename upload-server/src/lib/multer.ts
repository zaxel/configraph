import { MAX_FILE_SIZE } from '@/features/builder/store/slices/model.slice';
import multer from 'multer';
import os from 'os';

const storage = multer.diskStorage({
    destination: os.tmpdir(),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE }
});