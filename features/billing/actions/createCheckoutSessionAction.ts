"use server";

import { createProfileRepo } from "@/features/account/repositories/profile.repo";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { createSubscriptionsRepo } from "../repositories/subscriptions.repo";
import { stripe } from "../lib/stripe";

type CreateCheckoutSessionActionProps = {
    priceId: string
}

export async function createCheckoutSessionAction({
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
  
  let stripeCustomerId = subscription?.stripe_customer_id;
  
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: profile.email,
      metadata: {
        clerkUserId: userId,
        profileId: profile.id,
      },
    });
    
    stripeCustomerId = customer.id;


    await subscriptionsRepo.upsertCustomer({
      profileId: profile.id,
      stripeCustomerId,
      clerkUserId: userId,
    });
  }
  
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    
    customer: stripeCustomerId,
    
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    
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