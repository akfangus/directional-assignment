import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMenuKeysFromPath } from "./menu-config";

interface UseSidebarMenuReturn {
  selectedKeys: string[];
  openKeys: string[];
  handleOpenChange: (keys: string[]) => void;
  handleClick: (key: string) => void;
}

/**
 * 사이드바 메뉴 상태 관리 및 라우팅 로직을 담당하는 커스텀 훅
 */
export function useSidebarMenu(): UseSidebarMenuReturn {
  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 경로 변경 시 열린 서브메뉴 동기화
  useEffect(() => {
    const { openKeys: newOpenKeys } = getMenuKeysFromPath(pathname);
    setOpenKeys((prev) => {
      const combined = [...new Set([...prev, ...newOpenKeys])];
      return combined;
    });
  }, [pathname]);

  // 서브메뉴 열림/닫힘 핸들러
  const handleOpenChange = useCallback((keys: string[]): void => {
    setOpenKeys(keys);
  }, []);

  // 메뉴 클릭 핸들러 (라우팅)
  const handleClick = useCallback(
    (key: string): void => {
      if (key.startsWith("/")) {
        router.push(key);
      }
    },
    [router]
  );

  const { selectedKeys } = getMenuKeysFromPath(pathname);

  return {
    selectedKeys,
    openKeys,
    handleOpenChange,
    handleClick,
  };
}
