import { supabase } from "@/lib/supabase/client";

export const storageRepo = {

  async uploadAvatar(file: File, userId: string) {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar-${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("profiles")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("profiles")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};