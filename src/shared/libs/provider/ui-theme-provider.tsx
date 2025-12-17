/**
 * UI Theme Provider
 * Ant Design과 styled-components 테마를 함께 제공합니다.
 */

"use client";

import { ConfigProvider } from "antd";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { antdTheme, styledTheme } from "@/theme";

interface UIThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Ant Design + styled-components 통합 테마 프로바이더
 *
 * @example
 * <UIThemeProvider>
 *   <App />
 * </UIThemeProvider>
 */
function UIThemeProvider({
  children,
}: UIThemeProviderProps): React.ReactElement {
  return (
    <ConfigProvider theme={antdTheme}>
      <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
    </ConfigProvider>
  );
}

export default UIThemeProvider;
