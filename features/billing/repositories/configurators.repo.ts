import { SupabaseClient } from "@supabase/supabase-js";


export const createConfiguratorsRepo = (supabase: SupabaseClient) => ({
    async getStorageUsage(
        clerkId: string
    ): Promise<{ model_size_bytes: number }[] | null> {
        const { data, error } = await supabase
            .from("configurators")
            .select("model_size_bytes")
            .eq("clerk_user_id", clerkId)

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    },
    async getConfiguratorCount(
        clerkId: string
    ): Promise<number | null> {
        const { count, error } = await supabase
            .from("configurators")
            .select("*", { count: "exact", head: true })
            .eq("clerk_user_id", clerkId);

        if (error) {
            console.error(error);
            return null;
        }

        return count;
    },
    async getPublishedConfiguratorCount(
        clerkId: string
    ): Promise<number | null> {
        const { count, error } = await supabase
            .from("configurators")
            .select("*", { count: "exact", head: true })
            .eq("clerk_user_id", clerkId)
            .eq("is_public", true)

        if (error) {
            console.error(error);
            return null;
        }

        return count;
    },
})