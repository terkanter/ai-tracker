"use client";

import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { client } from "@workspace/api/gen/client.gen";

import { queryClient } from "@/shared/lib/react-query";

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
