import { updateConfiguratorDraft } from "@/db/configurator.repo";
export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const body = await req.json();
    
    // 1. Unwrap params before accessing properties
    const { id } = await params;

    // 2. Use the unwrapped id
    const updated = await updateConfiguratorDraft(id, body);

    return Response.json(updated);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("PUT Error:", errorMessage); 
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}