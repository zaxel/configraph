import { SupabaseClient } from "@supabase/supabase-js";
import { SubscriptionRecord } from "../types/billing.types";


export const createSubscriptionsRepo = (supabase: SupabaseClient) => ({
    async getSubscriptionByClerkId(
        clerkId: string
    ): Promise<SubscriptionRecord | null> {
        const { data, error } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("clerk_user_id", clerkId)
            .order("updated_at", { ascending: false })
            .maybeSingle();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    },
})