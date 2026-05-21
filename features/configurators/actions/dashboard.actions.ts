"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { createConfiguratorRepo } from "../repositories/configurator.repo";
import { storageRepo } from "../repositories/storage.repo";

export async function updateConfiguratorThumbAction(file: File, id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = await createServerSupabaseClient();
  const repo = createConfiguratorRepo(supabase);
  const storRepo = storageRepo(supabase);

  const { url } = await storRepo.uploadThumbnail(file, userId, id);
  return repo.update(id, { thumbnail_url: url });
}

export async function getUserConfiguratorsAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = await createServerSupabaseClient();
  const repo = createConfiguratorRepo(supabase);

  return await repo.getAllUserConfigurators(userId);
}

export async function deleteConfiguratorAction(
  id: string
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = await createServerSupabaseClient();
  const repo = createConfiguratorRepo(supabase);
  const storageRep = storageRepo(supabase);

  const configurator = await repo.getById(id);
  if (!configurator) return new Response("Not found", { status: 404 });

  // 2. delete storage assets
  await Promise.all([
    configurator.thumbnail_url && storageRep.deleteThumbnailByUrl(configurator.thumbnail_url),
    configurator.model_path && storageRep.deleteThumbnailByPath('configurator-models', configurator.model_path),
  ]);

  const deleted = repo.delete(id);
  return deleted;
}
