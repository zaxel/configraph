"use client";

import { ClerkProvider } from "@clerk/nextjs";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactNode, useState } from "react";

export function Providers({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
}