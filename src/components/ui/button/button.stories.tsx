import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

/**
 * Ant Design Button을 래핑한 커스텀 Button 컴포넌트
 *
 * 다양한 타입과 상태를 지원합니다.
 */
const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "default", "dashed", "text", "link"],
      description: "버튼 타입",
    },
    size: {
      control: "select",
      options: ["large", "middle", "small"],
      description: "버튼 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    loading: {
      control: "boolean",
      description: "로딩 상태",
    },
    danger: {
      control: "boolean",
      description: "위험 상태 (빨간색)",
    },
    ghost: {
      control: "boolean",
      description: "투명 배경",
    },
    block: {
      control: "boolean",
      description: "전체 너비 사용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Primary 버튼
 */
export const Primary: Story = {
  args: {
    type: "primary",
    children: "Primary Button",
  },
};

/**
 * 기본 Default 버튼
 */
export const Default: Story = {
  args: {
    type: "default",
    children: "Default Button",
  },
};

/**
 * Dashed 스타일 버튼
 */
export const Dashed: Story = {
  args: {
    type: "dashed",
    children: "Dashed Button",
  },
};

/**
 * Text 스타일 버튼
 */
export const Text: Story = {
  args: {
    type: "text",
    children: "Text Button",
  },
};

/**
 * Link 스타일 버튼
 */
export const Link: Story = {
  args: {
    type: "link",
    children: "Link Button",
  },
};

/**
 * 다양한 크기의 버튼
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button type="primary" size="large">
        Large
      </Button>
      <Button type="primary" size="middle">
        Middle
      </Button>
      <Button type="primary" size="small">
        Small
      </Button>
    </div>
  ),
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  args: {
    type: "primary",
    children: "Disabled Button",
    disabled: true,
  },
};

/**
 * 로딩 상태
 */
export const Loading: Story = {
  args: {
    type: "primary",
    children: "Loading Button",
    loading: true,
  },
};

/**
 * 위험 상태 (삭제 등)
 */
export const Danger: Story = {
  args: {
    type: "primary",
    children: "Danger Button",
    danger: true,
  },
};

/**
 * 전체 너비 버튼
 */
export const Block: Story = {
  args: {
    type: "primary",
    children: "Block Button",
    block: true,
  },
  parameters: {
    layout: "padded",
  },
};
