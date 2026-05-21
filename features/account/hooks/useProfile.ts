"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

import { createProfileAction, getProfileByClerkIdAction } from "../actions/profileAction";

export function useProfile() {
  const { user } = useUser();

  return useQuery({
    queryKey: ["profile", user?.id],

    enabled: !!user?.id,

    queryFn: async () => {
      if (!user) return null;

      const profile = await getProfileByClerkIdAction();

      if (!profile && user.emailAddresses[0]) {
        await createProfileAction({
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