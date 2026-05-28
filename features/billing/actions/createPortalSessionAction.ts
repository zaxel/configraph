"use server";

import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/features/billing/lib/stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createProfileRepo } from "@/features/account/repositories/profile.repo";
import { createSubscriptionsRepo } from "@/features/billing/repositories/subscriptions.repo";

export async function createPortalSessionAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase =
    await createServerSupabaseClient();

  const profileRepo =
    createProfileRepo(supabase);

  const subscriptionsRepo =
    createSubscriptionsRepo(supabase);

  const profile =
    await profileRepo.getByClerkId(userId);

  if (!profile) {
    throw new Error("Profile not found");
  }

  const subscription =
    await subscriptionsRepo.getByProfileId(
      profile.id
    );

  if (!subscription?.stripe_customer_id) {
    throw new Error(
      "No Stripe customer found"
    );
  }

  const portalSession =
    await stripe.billingPortal.sessions.create({
      customer:
        subscription.stripe_customer_id,

      return_url:
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });

  return portalSession.url;
}