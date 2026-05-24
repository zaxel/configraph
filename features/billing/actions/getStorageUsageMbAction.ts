"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { createConfiguratorsRepo } from "../repositories/configurators.repo";

export async function getStorageUsageMbAction() {
    const { userId } = await auth();

    if (!userId)
        throw new Error("Unauthorized");

    const supabase = await createServerSupabaseClient();
    const repo = createConfiguratorsRepo(supabase);

    const usage = await repo.getStorageUsage(userId);

    const totalBytes = (usage ?? []).reduce(
        // 2. Fallback to 0 if a specific entry's size is missing/null
        (acc, next) => acc + (next.model_size_bytes ?? 0),
        0
    );

    const totalMb = totalBytes / 1024 / 1024;

    return Math.round(totalMb * 100) / 100;
}