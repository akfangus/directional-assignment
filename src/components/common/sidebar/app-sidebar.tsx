"use client";

import { Menu } from "@/components/ui/menu";
import { MENU_ITEMS } from "./menu-config";
import { useSidebarMenu } from "./use-sidebar-menu";

/**
 * 실제 사이드바 메뉴 구현 컴포넌트
 * UI 컴포넌트(Menu)와 비즈니스 로직(useSidebarMenu)을 조합
 */
export function AppSidebar(): React.ReactElement {
  const { selectedKeys, openKeys, handleOpenChange, handleClick } =
    useSidebarMenu();

  return (
    <Menu
      items={MENU_ITEMS}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      onClick={handleClick}
      theme="dark"
      mode="inline"
    />
  );
}
