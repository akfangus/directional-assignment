"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MENU_ITEMS, getMenuKeysFromPath } from "./menu-config";
import { StyledMenu } from "./sidebar-menu.styled";

export function SidebarMenu(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const { openKeys: newOpenKeys } = getMenuKeysFromPath(pathname);
    setOpenKeys((prev) => {
      const combined = [...new Set([...prev, ...newOpenKeys])];
      return combined;
    });
  }, [pathname]);

  const handleMenuClick = useCallback(
    ({ key }: { key: string }): void => {
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
    <StyledMenu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      onClick={handleMenuClick}
      items={MENU_ITEMS}
    />
  );
}
