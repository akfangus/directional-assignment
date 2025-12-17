"use client";

/**
 * 인증이 필요한 페이지들의 레이아웃
 * AuthGuard로 인증 체크 + AppLayout으로 사이드바 표시
 */

import { AuthGuard } from "@/components/auth";
import { AppLayout } from "@/components/layout";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps): React.ReactElement {
  return (
    <AuthGuard>
      <AppLayout title="Dashboard">{children}</AppLayout>
    </AuthGuard>
  );
}
