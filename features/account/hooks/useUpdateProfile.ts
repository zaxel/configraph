"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateProfileAction } from "../actions/profileAction";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      values,
    }: {
      clerkUserId: string;
      values: {
        username: string;
        email: string;
        avatar_url: string;
      };
    }) => {
      return await updateProfileAction(values);
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