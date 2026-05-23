"use server";

import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createSubscriptionsRepo } from "../repositories/subscriptions.repo";
import { getPlan } from "../lib/getPlan";
import { getUserEntitlements } from "../lib/entitlements";

export async function getPlanAction() {
    const { userId } = await auth();

    if (!userId)
        throw new Error("Unauthorized");

    const supabase = await createServerSupabaseClient();
    const repo = createSubscriptionsRepo(supabase);
    const subscription = await repo.getSubscriptionByClerkId(userId);

    return getPlan(subscription ?? undefined);
}

export async function refreshEntitlementsAction() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    return getUserEntitlements(userId);
}