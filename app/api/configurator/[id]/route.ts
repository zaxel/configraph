import { getConfiguratorAction } from "@/features/account/actions/configurator.action";

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