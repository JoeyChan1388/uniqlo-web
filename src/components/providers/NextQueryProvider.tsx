"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ------------------------------------------------------------------

/**
 *
 * A provider component that sets up the React Query client for managing server state
 *
 * @param children - The children to be wrapped using this provider
 * @returns The QueryClientProvider wrapping the application for React Query functionality
 */
export default function NextQueryProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
