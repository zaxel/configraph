import { supabase } from "@/lib/supabase/client";

export const storageRepo = {

  async uploadThumbnail(file: File, userId: string, configuratorId: string) {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/thumbnail-${configuratorId}.${fileExt}`;

    const { error } = await supabase.storage
      .from("configurator-thumbnails")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("configurator-thumbnails")
      .getPublicUrl(filePath);

    return {
      path: filePath,
      url: data.publicUrl,
    };
  },
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
  },

  async upload3DModel(file: File, userId: string) {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/model-${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("configurator-models")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("configurator-models")
      .getPublicUrl(filePath);

    return {
      path: filePath,
      url: data.publicUrl,
    };
  },
  async deleteFiles(bucket: string, filePath: string[]) {
    const { error, data } = await supabase.storage.from(bucket).remove(filePath);
    if(error) throw error;

    return data;
  }
};