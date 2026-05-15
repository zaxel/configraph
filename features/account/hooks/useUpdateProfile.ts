"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { profileRepo } from "../repositories/profile.repo";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clerkUserId,
      values,
    }: {
      clerkUserId: string;
      values: {
        username: string;
        email: string;
        avatar_url: string;
      };
    }) => {
      return profileRepo.update(
        clerkUserId,
        values
      );
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "profile",
          variables.clerkUserId,
        ],
      });
    },
  });
}