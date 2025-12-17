/**
 * 사이드바 메뉴 설정
 */

import type { MenuProps } from "antd";
import {
  TableOutlined,
  BarChartOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const MENU_ITEMS: MenuItem[] = [
  getItem("게시판", "/board", React.createElement(TableOutlined)),
  getItem(
    "데이터 시각화",
    "visualization",
    React.createElement(BarChartOutlined),
    [
      getItem(
        "바,도넛차트",
        "/visualization/bar-donut",
        React.createElement(PieChartOutlined)
      ),
      getItem(
        "스택형 바/면적 차트",
        "/visualization/stacked",
        React.createElement(AreaChartOutlined)
      ),
      getItem(
        "멀티라인 차트",
        "/visualization/multiline",
        React.createElement(LineChartOutlined)
      ),
    ]
  ),
];

/**
 * 현재 경로에서 선택된 메뉴 키와 열린 서브메뉴 키를 반환
 */
export function getMenuKeysFromPath(pathname: string): {
  selectedKeys: string[];
  openKeys: string[];
} {
  const selectedKeys = [pathname];
  const openKeys: string[] = [];

  // visualization 하위 경로인 경우 서브메뉴 열기
  if (pathname.startsWith("/visualization")) {
    openKeys.push("visualization");
  }

  return { selectedKeys, openKeys };
}
