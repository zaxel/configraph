import { currentUser } from "@clerk/nextjs/server";
import { profileRepo } from "../repositories/profile.repo";

export async function ensureProfile() {
  const user = await currentUser();

  if (!user) return null;

  let profile = await profileRepo.getByClerkId(user.id);

  if (profile) return profile;

  profile = await profileRepo.create({
    clerk_user_id: user.id,
    email: user.emailAddresses[0].emailAddress,
    username: user.username ?? "",
    avatar_url: user.imageUrl,
  });

  return profile;
}