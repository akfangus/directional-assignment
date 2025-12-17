"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "../query-client";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // 싱글톤 인스턴스 사용
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
