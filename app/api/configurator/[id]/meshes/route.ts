import fs from "fs";
import path from 'path';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meshes = await req.json();
    const filePath = path.join(process.cwd(), 'db', 'data', `${id}.json`);
    const raw = await fs.promises.readFile(filePath, 'utf-8');
    const record = JSON.parse(raw);

    record.builderConfig.meshes = meshes;

    await fs.promises.writeFile(filePath, JSON.stringify(record, null, 2));

    return Response.json({ ok: true });
}