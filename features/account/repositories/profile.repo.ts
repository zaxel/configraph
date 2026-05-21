import { CreateProfileProps, Profile } from "../types/profile.types";
import { SupabaseClient } from "@supabase/supabase-js";

export const createProfileRepo = (
    supabase: SupabaseClient
) => ({
  async getByClerkId(
    clerkUserId: string
  ): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("clerk_user_id", clerkUserId)
      .maybeSingle();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  },

  async create(profile: CreateProfileProps) {
    const { data, error } = await supabase
      .from("profiles")
      .insert(profile)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async update(
    clerkUserId: string,
    values: Partial<Profile>
  ) {
    const { data, error } = await supabase
      .from("profiles")
      .update(values)
      .eq("clerk_user_id", clerkUserId)
      .select()
      .single();

    if (error) throw error;

    return data;
  },
});