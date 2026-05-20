import { updateConfiguratorMetaAction } from "@/features/configurators/actions/editor.actions";

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const name = await req.json();
    const { id } = await params;
    const updated = await updateConfiguratorMetaAction(id, name);

    return Response.json(updated); 
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("PUT Error:", errorMessage); 
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}