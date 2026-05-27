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

    async getByProfileId(
        profileId: string
    ): Promise<SubscriptionRecord | null> {
        const { data, error } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("profile_id", profileId)
            .order("updated_at", { ascending: false })
            .maybeSingle();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    },
    
    async upsertCustomer({
        profileId,
        stripeCustomerId,
    }: {
        profileId: string;
        stripeCustomerId: string;
    }): Promise<void> {
        const { error } = await supabase
            .from("subscriptions")
            .upsert(
                {
                    profile_id: profileId,
                    stripe_customer_id: stripeCustomerId,
                    updated_at: new Date().toISOString(), 
                },
                {
                    onConflict: "profile_id" 
                }
            );

        if (error) {
            console.error("Error upserting stripe customer:", error);
            throw error; 
        }
    },
})