import { auth } from "@clerk/nextjs/server";
import { updateConfiguratorThumbAction } from "@/features/configurators/actions/dashboard.actions";

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
        await updateConfiguratorThumbAction(file, id);

        return Response.json({ status: "ok" });
    } catch (err) {
        throw err;
    }
}