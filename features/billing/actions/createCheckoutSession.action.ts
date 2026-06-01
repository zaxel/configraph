"use server";

import { createProfileRepo } from "@/features/account/repositories/profile.repo";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { createSubscriptionsRepo } from "../repositories/subscriptions.repo";
import { stripe } from "../lib/stripe";

type CreateCheckoutSessionActionProps = {
  priceId: string
}

export async function createCheckoutSession({
  priceId,
}: CreateCheckoutSessionActionProps) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = await createServerSupabaseClient();

  const profileRepo = createProfileRepo(supabase);
  const subscriptionsRepo = createSubscriptionsRepo(supabase);

  const profile = await profileRepo.getByClerkId(userId);

  if (!profile) {
    throw new Error("Profile not found");
  }

  const subscription = await subscriptionsRepo.getByProfileId(profile.id);

  if (subscription?.stripe_subscription_id) {
    const existingSub = await stripe.subscriptions.retrieve(
      subscription.stripe_subscription_id
    );

    await stripe.subscriptions.update(subscription.stripe_subscription_id, {
      items: [{
        id: existingSub.items.data[0].id,
        price: priceId,
      }],
      proration_behavior: "create_prorations",
    });

    return `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`;
  }

  let stripeCustomerId = subscription?.stripe_customer_id;

  if (!stripeCustomerId) {
    const existing = await stripe.customers.list({ email: profile.email, limit: 1 });

    if (existing.data.length > 0) {
      stripeCustomerId = existing.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: profile.email,
        metadata: { clerkUserId: userId, profileId: profile.id },
      });
      stripeCustomerId = customer.id;
    }
    // const customer = await stripe.customers.create({
    //   email: profile.email,
    //   metadata: {
    //     clerkUserId: userId,
    //     profileId: profile.id,
    //   },
    // });

    // stripeCustomerId = customer.id;

    await subscriptionsRepo.upsertCustomer({
      profileId: profile.id,
      stripeCustomerId,
      clerkUserId: userId,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    metadata: {
      clerkUserId: userId,
      profileId: profile.id,
    },
  });

  if (!session.url) {
    throw new Error("Stripe session URL missing");
  }

  return session.url;
}