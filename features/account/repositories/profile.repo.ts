import { supabase } from "@/lib/supabase/client";
import { Profile } from "../types/profile.types";

export const profileRepo = {
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

  async create(profile: {
    clerk_user_id: string;
    email: string;
    username?: string;
    avatar_url?: string;
  }) {
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
};