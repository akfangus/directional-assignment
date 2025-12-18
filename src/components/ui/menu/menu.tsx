import type { MenuProps as AntdMenuProps } from "antd";
import { StyledMenu } from "./menu.styled";

type MenuItem = Required<AntdMenuProps>["items"][number];

interface MenuProps {
  items: MenuItem[];
  selectedKeys: string[];
  openKeys: string[];
  onOpenChange: (keys: string[]) => void;
  onClick: (key: string) => void;
  theme?: "light" | "dark";
  mode?: "inline" | "vertical";
}

/**
 * 순수 Menu UI 컴포넌트
 * 모든 상태와 로직은 props로 주입받아 사용
 */
export function Menu({
  items,
  selectedKeys,
  openKeys,
  onOpenChange,
  onClick,
  theme = "dark",
  mode = "inline",
}: MenuProps): React.ReactElement {
  const handleClick = ({ key }: { key: string }): void => {
    onClick(key);
  };

  return (
    <StyledMenu
      theme={theme}
      mode={mode}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={handleClick}
      items={items}
    />
  );
}
