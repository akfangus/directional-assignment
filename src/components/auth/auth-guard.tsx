"use client";

/**
 * AuthGuard - 인증 체크 컴포넌트
 * 로그인되지 않은 사용자를 로그인 페이지로 리다이렉트
 * Zustand persist hydration을 기다린 후 체크
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({
  children,
}: AuthGuardProps): React.ReactElement | null {
  const router = useRouter();
  const { isAuthenticated, checkTokenExpiry } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Zustand persist hydration 완료 대기
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // hydration 완료 후 인증 체크
  useEffect(() => {
    if (!isHydrated) return;

    const isExpired = checkTokenExpiry();

    if (!isAuthenticated || isExpired) {
      router.replace("/login");
    }
  }, [isHydrated, isAuthenticated, checkTokenExpiry, router]);

  // hydration 전이거나 인증되지 않은 경우 렌더링하지 않음
  if (!isHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
