"use server";

import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createSubscriptionsRepo } from "../repositories/subscriptions.repo";

export async function getSubscriptionByClerkIdAction() {
  const { userId } = await auth();

  if (!userId)
    throw new Error("Unauthorized");

  const supabase = await createServerSupabaseClient();
  const repo = createSubscriptionsRepo(supabase);
  const subscription = await repo.getSubscriptionByClerkId(userId);

  return subscription;
}