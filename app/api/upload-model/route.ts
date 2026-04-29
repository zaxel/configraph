import fs from "fs";
import path from "path";

async function optimizeGLB(rawPath: string, optimizedPath: string) {
    await fs.promises.copyFile(rawPath, optimizedPath);
}

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return new Response("No file", { status: 400 });
    }

    if (file.size > 20 * 1024 * 1024) {
        return new Response("File too large", { status: 400 });
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

    if (file.size > 2 * 1024 * 1024) {
        await optimizeGLB(rawPath, optimizedPath);
    } else {
        await fs.promises.copyFile(rawPath, optimizedPath);
    }

    return Response.json({
        url: `/models/optimized/${fileName}`,
    });
}