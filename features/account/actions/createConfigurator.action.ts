"use server";

import { auth } from "@clerk/nextjs/server";

import { createServerSupabaseClient }
  from "@/lib/supabase/server";

import { createConfiguratorRepo }
  from "../repositories/configurator.repo";

export async function createConfiguratorAction(
  configurator, size, type, path
) {
  const { userId, getToken } = await auth();

  const token = await getToken({
  template: "supabase",
});

console.log(token);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase =
    await createServerSupabaseClient();

  const repo =
    createConfiguratorRepo(supabase);

    return repo.create(configurator, userId, size, type, path);
} 