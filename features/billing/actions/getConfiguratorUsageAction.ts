"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { createConfiguratorsRepo } from "../repositories/configurators.repo";

export async function getConfiguratorUsageAction(){
    const { userId } = await auth();
    
        if (!userId)
            throw new Error("Unauthorized");
    
        const supabase = await createServerSupabaseClient();
        const repo = createConfiguratorsRepo(supabase);

        return await repo.getConfiguratorCount(userId);
}