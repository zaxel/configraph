import { SupabaseClient } from "@supabase/supabase-js";

export const storageRepo = (supabase: SupabaseClient) => ({
    async deleteByUrl(url: string) {
        // https://xxx.supabase.co/storage/v1/object/public/configurator-thumbnails/userId/file.webp
        const parts = url.split('/object/public/');
        if (!parts[1]) throw new Error(`Unexpected URL format: ${url}`);

        const bucket = parts[1].split('/')[0];
        const path = parts[1].split('/').slice(1).join('/');

        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) throw error;
    },

    async deleteByPath(bucket: string, path: string) {
        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) throw error;
    },
});