/**
 * 인증이 필요한 페이지들의 레이아웃
 * Middleware에서 인증 체크 수행, SidebarLayout으로 사이드바 표시
 */

import { SidebarLayout } from "@/components/layout";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps): React.ReactElement {
  return <SidebarLayout title="Dashboard">{children}</SidebarLayout>;
}
