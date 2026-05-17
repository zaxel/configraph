import { updateConfiguratorMeshesAction } from "@/features/account/actions/configurator.action";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meshes = await req.json();
    await updateConfiguratorMeshesAction(id, meshes);
    return Response.json({ ok: true });
}