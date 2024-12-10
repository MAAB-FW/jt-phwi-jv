"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-center" reverseOrder={true} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
