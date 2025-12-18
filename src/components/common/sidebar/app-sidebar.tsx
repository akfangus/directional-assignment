"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/ui/menu";
import { useAuthStore } from "@/stores/auth-store";
import { MENU_ITEMS } from "./menu-config";
import { useSidebarMenu } from "./use-sidebar-menu";
import {
  SidebarContainer,
  MenuContainer,
  LogoutButtonContainer,
  LogoutButton,
} from "./app-sidebar.styled";

/**
 * 실제 사이드바 메뉴 구현 컴포넌트
 * UI 컴포넌트(Menu)와 비즈니스 로직(useSidebarMenu)을 조합
 */
export function AppSidebar(): React.ReactElement {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { selectedKeys, openKeys, handleOpenChange, handleClick } =
    useSidebarMenu();

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  return (
    <SidebarContainer>
      <MenuContainer>
        <Menu
          items={MENU_ITEMS}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleClick}
          mode="inline"
        />
      </MenuContainer>
      <LogoutButtonContainer>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </LogoutButtonContainer>
    </SidebarContainer>
  );
}
