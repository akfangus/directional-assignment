"use client";

/**
 * 좌측 고정 사이드바가 포함된 앱 레이아웃 컴포넌트
 */

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MENU_ITEMS, getMenuKeysFromPath } from "./menu-config";
import {
  StyledLayout,
  StyledSider,
  LogoContainer,
  LogoTitle,
  StyledMenu,
  ContentWrapper,
  StyledContent,
} from "./app-layout.styled";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({
  children,
  title = "Dashboard",
}: AppLayoutProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 경로 변경 시 메뉴 상태 업데이트
  useEffect(() => {
    const { openKeys: newOpenKeys } = getMenuKeysFromPath(pathname);
    setOpenKeys((prev) => {
      // 기존 열린 키 유지하면서 새 키 추가
      const combined = [...new Set([...prev, ...newOpenKeys])];
      return combined;
    });
  }, [pathname]);

  const handleMenuClick = useCallback(
    ({ key }: { key: string }): void => {
      // 서브메뉴 키가 아닌 경우에만 라우팅
      if (key.startsWith("/")) {
        router.push(key);
      }
    },
    [router]
  );

  const handleOpenChange = useCallback((keys: string[]): void => {
    setOpenKeys(keys);
  }, []);

  const { selectedKeys } = getMenuKeysFromPath(pathname);

  return (
    <StyledLayout>
      <StyledSider width={200} theme="dark">
        <LogoContainer>
          <LogoTitle>{title}</LogoTitle>
        </LogoContainer>
        <StyledMenu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          items={MENU_ITEMS}
        />
      </StyledSider>
      <ContentWrapper>
        <StyledContent>{children}</StyledContent>
      </ContentWrapper>
    </StyledLayout>
  );
}
