"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { createConfiguratorRepo } from "../repositories/configurator.repo";

export async function getUserConfiguratorsAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = await createServerSupabaseClient();

  const repo = createConfiguratorRepo(supabase);

  return await repo.getAllUserConfiturators(userId);

}
// export async function deleteConfiguratorAction(
//   id: string
// ) {
//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   const supabase =
//     await createServerSupabaseClient();

//   const repo = createConfiguratorRepo(supabase);

//   await repo.delete(id, userId);

//   revalidatePath("/dashboard");
// }