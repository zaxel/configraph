import { createClient } from "@supabase/supabase-js";

// Plain service-role client — no Clerk integration needed
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // service role, not anon key
);

export async function uploadModel(file: File, userId: string) {
    const filePath = `${userId}/model-${crypto.randomUUID()}.glb`;

    const { error } = await supabase.storage
        .from("configurator-models")
        .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
        .from("configurator-models")
        .getPublicUrl(filePath);

    return { path: filePath, url: data.publicUrl };
}