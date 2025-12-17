/**
 * Ant Design 테마 설정
 * ConfigProvider의 theme prop으로 사용됩니다.
 */

import type { ThemeConfig } from "antd";
import { colors, borderRadius, fontSize, shadow } from "./tokens";

export const antdTheme: ThemeConfig = {
  token: {
    // Primary Color
    colorPrimary: colors.primary[500],
    colorPrimaryHover: colors.primary[400],
    colorPrimaryActive: colors.primary[600],

    // Success, Warning, Error
    colorSuccess: colors.success.main,
    colorWarning: colors.warning.main,
    colorError: colors.error.main,

    // Background & Text
    colorBgContainer: colors.neutral[0],
    colorBgLayout: colors.neutral[50],
    colorText: colors.neutral[800],
    colorTextSecondary: colors.neutral[600],
    colorTextTertiary: colors.neutral[500],
    colorTextQuaternary: colors.neutral[400],

    // Border
    colorBorder: colors.neutral[300],
    colorBorderSecondary: colors.neutral[200],

    // Border Radius
    borderRadius: parseInt(borderRadius.md),
    borderRadiusSM: parseInt(borderRadius.sm),
    borderRadiusLG: parseInt(borderRadius.lg),

    // Font
    fontSize: parseInt(fontSize.sm),
    fontSizeSM: parseInt(fontSize.xs),
    fontSizeLG: parseInt(fontSize.md),
  },
  components: {
    Button: {
      // 크기 설정
      controlHeight: 36,
      controlHeightSM: 28,
      controlHeightLG: 44,

      // Primary 버튼 스타일
      colorPrimary: colors.primary[500],
      colorPrimaryHover: colors.primary[400],
      colorPrimaryActive: colors.primary[600],
      primaryShadow: shadow.md,

      // Default 버튼 스타일
      defaultBorderColor: colors.neutral[300],
      defaultColor: colors.neutral[700],
      defaultHoverBorderColor: colors.primary[400],
      defaultHoverColor: colors.primary[500],

      // Danger 버튼 스타일
      colorError: colors.error.main,
      colorErrorHover: colors.error.light,
      colorErrorActive: colors.error.dark,

      // 폰트
      fontWeight: 500,

      // 패딩
      paddingInline: 16,
      paddingInlineSM: 12,
      paddingInlineLG: 20,

      // 테두리
      borderRadius: parseInt(borderRadius.md),
      borderRadiusSM: parseInt(borderRadius.sm),
      borderRadiusLG: parseInt(borderRadius.lg),
    },
    Input: {
      // 인풋 컴포넌트별 커스텀 설정
      controlHeight: 36,
      controlHeightSM: 28,
      controlHeightLG: 44,
    },
  },
};
