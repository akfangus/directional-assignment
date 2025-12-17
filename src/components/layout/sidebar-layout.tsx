"use client";

/**
 * 좌측 고정 사이드바가 포함된 레이아웃 컴포넌트
 * 레이아웃 구조만 담당, 메뉴 로직은 SidebarMenu에서 처리
 */

import { SidebarMenu } from "@/components/menu";
import {
  StyledLayout,
  StyledSider,
  LogoContainer,
  LogoTitle,
  ContentWrapper,
  StyledContent,
} from "./sidebar-layout.styled";

interface SidebarLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function SidebarLayout({
  children,
  title = "Dashboard",
}: SidebarLayoutProps): React.ReactElement {
  return (
    <StyledLayout>
      <StyledSider width={200} theme="dark">
        <LogoContainer>
          <LogoTitle>{title}</LogoTitle>
        </LogoContainer>
        <SidebarMenu />
      </StyledSider>
      <ContentWrapper>
        <StyledContent>{children}</StyledContent>
      </ContentWrapper>
    </StyledLayout>
  );
}
