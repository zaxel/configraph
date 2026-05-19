import { updateConfiguratorMeshesAction } from "@/features/configurators/actions/editor.actions";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meshes = await req.json();
    await updateConfiguratorMeshesAction(id, meshes);
    return Response.json({ ok: true });
}