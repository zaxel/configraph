import { deleteConfiguratorAction } from "@/features/configurators/actions/dashboard.actions";
import { getConfiguratorAction } from "@/features/configurators/actions/editor.actions";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params;

  const configurator = await getConfiguratorAction(id);

  if (!configurator) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(configurator); 
}
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params;

  const deleted = await deleteConfiguratorAction(id);

  if (!deleted) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(deleted); 
}