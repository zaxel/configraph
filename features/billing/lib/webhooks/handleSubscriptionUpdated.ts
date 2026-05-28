import { createSubscriptionsRepo } from "../../repositories/subscriptions.repo";
import Stripe from "stripe";
import { mapStripeSubscription } from "../mapStripeSubscription";
import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { syncPublishedOption } from "../syncPublishedOption";

export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const subscriptionId = subscription.id;
    const customerId = subscription.customer;

    if (!customerId || typeof customerId !== "string") {
        throw new Error("Missing customer id");
    }

    if (subscription.status === "canceled") {
        console.log("skipping canceled subscription");
        return;
    }

    const supabase = await createServiceSupabaseClient();
    const subscriptionsRepo = createSubscriptionsRepo(supabase);

    let clerkUserId = subscription.metadata?.clerkUserId;
    let profileId = subscription.metadata?.profileId;

    if (!clerkUserId || !profileId) {
        console.warn(`Missing metadata on subscription ${subscriptionId}, fetching from DB...`);

        const existingSub = await subscriptionsRepo.getByCustomerId(customerId);
        if (!existingSub) {
            throw new Error(`Could not resolve user profile for customer: ${customerId}`);
        }

        clerkUserId = existingSub.clerk_user_id;
        profileId = existingSub.profile_id;
    }

    const mapped = mapStripeSubscription(subscription);

    await subscriptionsRepo.upsertSubscription({
        profileId,
        clerk_user_id: clerkUserId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        plan: mapped.plan,
        stripe_status: subscription.status,
        current_period_end: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
    });
    syncPublishedOption(mapped.plan, clerkUserId);
}