import { currentUser } from "@clerk/nextjs/server";
import { createProfileAction, getProfileByClerkIdAction } from "../actions/profileAction";

export async function ensureProfile() {
  const user = await currentUser();

  if (!user) return null;

  let profile = await getProfileByClerkIdAction();

  if (profile) return profile;

  profile = await createProfileAction({
    clerk_user_id: user.id,
    email: user.emailAddresses[0].emailAddress,
    username: user.username ?? "",
    avatar_url: user.imageUrl,
  });

  return profile;
}