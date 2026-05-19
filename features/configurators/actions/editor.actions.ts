"use server";

import { auth } from "@clerk/nextjs/server";

import { createServerSupabaseClient }
    from "@/lib/supabase/server";


import { MeshLayout } from "@/lib/extractMeshes";
import { Product } from "@/features/configurator/model";
import { ConfiguratorData } from "../types/configurators.types";
import { createConfiguratorRepo, UpdateConfiguratorInput } from "../repositories/configurator.repo";

export async function createConfiguratorAction(
    configurator: ConfiguratorData, size: number, type: string, path: string
) {
    const { userId, getToken } = await auth();

    // const token = await getToken({
    //     template: "supabase",
    // });

    // console.log(token);

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createConfiguratorRepo(supabase);

    return repo.create(configurator, userId, size, type, path);
} 

export async function getConfiguratorAction(
    id: string
) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createConfiguratorRepo(supabase);

    return repo.getById(id);
}

export async function updateConfiguratorAction(
    id: string, 
    value: UpdateConfiguratorInput
) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createConfiguratorRepo(supabase);

    return repo.update(id, value);
} 

export async function updateConfiguratorDraftAction( 
    id: string, 
    draft: Product
) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createConfiguratorRepo(supabase); 

    return repo.updateDraft(id, draft);
} 
export async function updateConfiguratorMeshesAction( 
    id: string, 
    meshes: MeshLayout[]
) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createConfiguratorRepo(supabase);

    return repo.updateMeshes(id, meshes);
} 
export async function publishConfiguratorAction( 
    id: string, 
) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createConfiguratorRepo(supabase); 
    return repo.publish(id); 
} 