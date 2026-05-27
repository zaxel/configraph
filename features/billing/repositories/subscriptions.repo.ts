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
    async getByCustomerId(
        customerId: string
    ): Promise<SubscriptionRecord | null> {
        const { data, error } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("stripe_customer_id", customerId)
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
        clerkUserId,
    }: {
        profileId: string;
        stripeCustomerId: string;
        clerkUserId: string;
    }): Promise<void> {
        const { error } = await supabase
            .from("subscriptions")
            .upsert(
                {
                    profile_id: profileId,
                    stripe_customer_id: stripeCustomerId,
                    clerk_user_id: clerkUserId,
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
    async upsertSubscription({
        profileId,
        stripe_customer_id,
        stripe_subscription_id,
        clerk_user_id,
        ...rest
    }: {
        profileId: string;
        stripe_customer_id: string;
        stripe_subscription_id: string;
        clerk_user_id: string;
        [key: string]: any;
    }): Promise<void> {
        const { error } = await supabase
            .from("subscriptions")
            .upsert({
                profile_id: profileId,
                clerk_user_id: clerk_user_id,
                stripe_customer_id: stripe_customer_id,
                stripe_subscription_id: stripe_subscription_id,
                ...rest
            }, {
                onConflict: 'clerk_user_id'
            });

        if (error) {
            console.error("Error upserting stripe customer:", error);
            throw error;
        }
    },
})