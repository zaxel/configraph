import Stripe from "stripe";

import { stripe } from "@/features/billing/lib/stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createSubscriptionsRepo } from "@/features/billing/repositories/subscriptions.repo";
import { mapStripeSubscription } from "../mapStripeSubscription";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
) {
  const subscriptionId = session.subscription;
  const customerId = session.customer;

  if (!subscriptionId || typeof subscriptionId !== "string") {
    throw new Error("Missing subscription id");
  }

  if (!customerId || typeof customerId !== "string") {
    throw new Error("Missing customer id");
  }

  const clerkUserId = session.metadata?.clerkUserId;
  const profileId = session.metadata?.profileId;

  if (!clerkUserId || !profileId) {
    throw new Error("Missing metadata");
  }

  const stripeSubscription = await stripe.subscriptions.retrieve(
    subscriptionId,
    {
      expand: ["items.data.price"],
    }
  );

  const mapped = mapStripeSubscription(stripeSubscription);

//   const supabase = await createServerSupabaseClient();
  const supabase = await createServiceSupabaseClient();

  const subscriptionsRepo = createSubscriptionsRepo(supabase);

  await subscriptionsRepo.upsertSubscription({
    profileId,

    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    clerk_user_id: clerkUserId,
    ...mapped,
  });
}