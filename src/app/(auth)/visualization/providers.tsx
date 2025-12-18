/**
 * React Query Hydration Provider
 * 클라이언트 컴포넌트로 HydrationBoundary와 Suspense 처리
 */

"use client";

import { Suspense } from "react";
import {
  HydrationBoundary,
  type HydrationBoundaryProps,
} from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export function VisualizationProvider({
  state,
  children,
}: {
  state: HydrationBoundaryProps["state"];
  children: React.ReactNode;
}) {
  return (
    <HydrationBoundary state={state}>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </HydrationBoundary>
  );
}
