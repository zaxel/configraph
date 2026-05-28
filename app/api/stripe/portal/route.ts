import { createPortalSessionAction } from "@/features/billing/actions/createPortalSessionAction";
import { NextResponse } from "next/server";


export async function POST() {
  try {
    const url =
      await createPortalSessionAction();

    return NextResponse.json({
      url,
    });
  } catch (err) {
    console.error(
      "[STRIPE_PORTAL_ROUTE]",
      err
    );

    return NextResponse.json(
      {
        error:
          "Failed to create portal session",
      },
      {
        status: 500,
      }
    );
  }
}