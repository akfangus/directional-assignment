import "@ant-design/v5-patch-for-react-19";
import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";

// Ant Design 스타일 import
import "antd/dist/reset.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider locale={koKR}>
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default preview;
