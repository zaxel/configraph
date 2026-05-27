import Stripe from "stripe";
import { Plan } from "../types/billing.types";

export function mapStripeSubscription(
  subscription: Stripe.Subscription
) {
  const priceId = subscription.items.data[0]?.price.id;

  let plan: Plan = "free";

  switch (priceId) {
    case process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID:
      plan = "pro";
      break;

    case process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID:
      plan = "business";
      break;
  }

  return {
    plan,

    stripe_status: subscription.status,

    current_period_end: new Date(
      subscription.items.data[0].current_period_end * 1000
    ).toISOString(),

    cancel_at_period_end:
      subscription.cancel_at_period_end,
  };
}