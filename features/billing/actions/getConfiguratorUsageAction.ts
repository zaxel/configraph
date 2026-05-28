"use server";

import { createConfiguratorRepo } from "@/features/configurators/repositories/configurator.repo";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function getConfiguratorUsageAction(){
    const { userId } = await auth();
    
        if (!userId)
            throw new Error("Unauthorized");
    
        const supabase = await createServerSupabaseClient();
        const repo = createConfiguratorRepo(supabase);

        return await repo.getConfiguratorCount(userId);
}