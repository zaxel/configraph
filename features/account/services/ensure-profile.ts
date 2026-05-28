import { currentUser } from "@clerk/nextjs/server";
import { createProfile, getProfileByClerkId } from "../actions/profile.action";

export async function ensureProfile() {
  const user = await currentUser();

  if (!user) return null;

  let profile = await getProfileByClerkId();

  if (profile) return profile;

  profile = await createProfile({
    clerk_user_id: user.id,
    email: user.emailAddresses[0].emailAddress,
    username: user.username ?? "",
    avatar_url: user.imageUrl,
  });

  return profile;
}