import { headers } from "next/headers";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/features/billing/lib/stripe";
import { handleCheckoutCompleted } from "@/features/billing/lib/webhooks/handleCheckoutCompleted";
import { handleSubscriptionUpdated } from "@/features/billing/lib/webhooks/handleSubscriptionUpdated";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();

//   const signature = headersList.get("stripe-signature");
const signature = req.headers.get("stripe-signature");

  if (!signature || !body) {
    return NextResponse.json(
      {
        error: "Missing signature or payload text stream",
      },
      {
        status: 400,
      }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[STRIPE_WEBHOOK_VERIFY_ERROR]", err);

    return NextResponse.json(
      {
        error: "Invalid webhook signature",
      },
      {
        status: 400,
      }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session
        );

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );

        break;
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("[STRIPE_WEBHOOK_HANDLER_ERROR]", err);

    return NextResponse.json(
      {
        error: "Webhook handler failed",
      },
      {
        status: 500,
      }
    );
  }
}