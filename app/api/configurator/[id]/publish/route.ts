import { getUserEntitlements } from "@/features/billing/lib/entitlements";
import { publishConfiguratorAction } from "@/features/configurators/actions/editor.actions";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
      const { id } = await params;
      const { permissions } = await getUserEntitlements();
      const updated = await publishConfiguratorAction(id, permissions);
  
      return Response.json(updated);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("PUT Error:", errorMessage); 
      return Response.json({ error: errorMessage }, { status: 500 });
    }
}