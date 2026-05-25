import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { verifyClerkToken } from './lib/auth';
import { uploadRoute } from './routes/upload';

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

app.use(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Unauthorized: Missing header');

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).send('Unauthorized: Invalid header format');
    }

    const token = parts[1];

    try {
        req.userId = await verifyClerkToken(token);
        next();
    } catch(error: any) {
        console.error("🔴 Validation error details:", error?.message || error);
        res.status(401).send('Invalid token');
    }
});

app.use('/upload-model', uploadRoute);
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: err.message ?? 'Something went wrong' });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Upload server running on http://localhost:${PORT}`));