import { SupabaseClient } from "@supabase/supabase-js";

export const storageRepo = (supabase: SupabaseClient) => ({
    async deleteThumbnailByUrl(url: string) {
        const cleanUrl = url.split('?')[0];

        const parts = cleanUrl.split('/object/public/');
        if (!parts[1]) throw new Error(`Unexpected URL format: ${url}`);

        const bucket = parts[1].split('/')[0];
        const path = parts[1].split('/').slice(1).join('/');

        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) throw error;
    },

    async deleteThumbnailByPath(bucket: string, path: string) {
        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) throw error;
    },
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
            url: `${data.publicUrl}?bust=${Date.now()}`,
        };
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
        if (error) throw error;

        return data;
    },
    async duplicateFiles(path: string, newPath: string) {
        const { error } = await supabase.storage
            .from('configurator-models')
            .copy(path, newPath);

        if (error) throw error;

        const { data } = supabase.storage
            .from('configurator-models')
            .getPublicUrl(newPath);

        return {
            path: newPath,
            url: data.publicUrl,
        };
    }
});