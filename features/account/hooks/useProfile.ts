"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

import { createProfile, getProfileByClerkId } from "../actions/profile.action";

export function useProfile() {
  const { user } = useUser();

  return useQuery({
    queryKey: ["profile", user?.id],

    enabled: !!user?.id,

    queryFn: async () => {
      if (!user) return null;

      const profile = await getProfileByClerkId();

      if (!profile && user.emailAddresses[0]) {
        await createProfile({
          clerk_user_id: user.id,
          email:
            user.emailAddresses[0].emailAddress,
          username: user.fullName ?? undefined,
          avatar_url: user.imageUrl ?? undefined,
        });
      }

      return profile;
    },
  });
}