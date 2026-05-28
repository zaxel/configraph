import { createServiceSupabaseClient } from "@/lib/supabase/service";
import Stripe from "stripe";
import { createSubscriptionsRepo } from "../../repositories/subscriptions.repo";
import { syncPublishedOption } from "../syncPublishedOption";

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  
  const customerId = subscription.customer;

  if (!customerId || typeof customerId !== "string") {
    throw new Error("Missing customer id");
  }

  const supabase = createServiceSupabaseClient();
  const subscriptionsRepo = createSubscriptionsRepo(supabase);

  const existingSub = await subscriptionsRepo.getByCustomerId(customerId);

  if (!existingSub) {
    throw new Error(`Subscription not found for customer ${customerId}`);
  }

  await subscriptionsRepo.upsertSubscription({
    profileId: existingSub.profile_id,
    clerk_user_id: existingSub.clerk_user_id,
    stripe_customer_id: customerId,
    stripe_subscription_id: null,
    plan: "free",
    stripe_status: "canceled",
    current_period_end: null,
    cancel_at_period_end: false,
  });
  syncPublishedOption("free", existingSub.clerk_user_id);
}