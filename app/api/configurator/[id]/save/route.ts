export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = "test data"
    // const updated = await updateConfigurator(params.id, {
    //   builderConfig: body.builderConfig,
    //   product: body.product, // optional
    // });

    return Response.json(updated);
  } catch (err: any) {
    return new Response(err.message || "Save failed", { status: 500 });
  }
}