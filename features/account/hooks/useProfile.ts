"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

import { profileRepo } from "../repositories/profile.repo";

export function useProfile() {
  const { user } = useUser();

  return useQuery({
    queryKey: ["profile", user?.id],

    enabled: !!user?.id,

    queryFn: async () => {
      if (!user) return null;

      let profile =
        await profileRepo.getByClerkId(user.id);

      if (!profile && user.emailAddresses[0]) {
        profile = await profileRepo.create({
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