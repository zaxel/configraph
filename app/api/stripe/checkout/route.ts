import { createCheckoutSessionAction } from "@/features/billing/actions/createCheckoutSessionAction";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing priceId" },
        { status: 400 }
      );
    }

    const url = await createCheckoutSessionAction({
      priceId,
    });

    return NextResponse.json({
      url,
    });
  } catch (err) {
    console.error("[STRIPE_CHECKOUT_ROUTE]", err);

    return NextResponse.json(
      {
        error: "Failed to create checkout session",
      },
      {
        status: 500,
      }
    );
  }
}