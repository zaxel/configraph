import { updateConfiguratorDraft } from "@/db/configurator.repo";
import { updateConfiguratorDraftAction } from "@/features/account/actions/createConfigurator.action";
export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const body = await req.json();
    const { id } = await params;
    const updated = await updateConfiguratorDraftAction(id, body);

    return Response.json(updated);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("PUT Error:", errorMessage); 
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}