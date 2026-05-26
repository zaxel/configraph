"use server"

import { createPublicSupabaseClient } from "@/lib/supabase/server";
import { createConfiguratorRepo } from "../repositories/configurator.repo";

export async function getPublishedByIdNoAuthAction(
    id: string
) {
     const supabase = await createPublicSupabaseClient();
    const repo = createConfiguratorRepo(supabase);

    const configurator = await repo.getByIdNoAuth(id);
    return configurator?.data.published;
}