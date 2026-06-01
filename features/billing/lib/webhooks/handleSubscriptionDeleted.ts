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

  await subscriptionsRepo.deleteSubscription({stripe_customer_id: customerId});
  syncPublishedOption("free", existingSub.clerk_user_id); 
}