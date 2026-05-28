"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { createStorageRepo } from "../repositories/storage.repo";
import { createProfileRepo } from "../repositories/profile.repo";
import { CreateProfileProps, Profile } from "../types/profile.types";

export async function updateAvatar( 
    file: File, 
) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createStorageRepo(supabase); 

    return repo.uploadAvatar(file, userId);
} 

export async function updateProfile( 
    value: Partial<Profile>, 
) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createProfileRepo(supabase); 

    return repo.update(userId, value);
} 
export async function getProfileByClerkId() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createProfileRepo(supabase); 

    return repo.getByClerkId(userId);
} 
export async function createProfile(profile: CreateProfileProps) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const supabase = await createServerSupabaseClient();
    const repo = createProfileRepo(supabase); 

    return repo.create(profile);
} 