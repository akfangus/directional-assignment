/**
 * 차트 색상 팔레트 및 기본 설정
 */

export const CHART_COLORS = [
  "#1890ff", // primary
  "#52c41a", // success
  "#faad14", // warning
  "#ff4d4f", // error
  "#722ed1", // purple
  "#13c2c2", // cyan
  "#eb2f96", // magenta
  "#fa8c16", // orange
] as const;

export const CHART_DEFAULTS = {
  height: 400,
  margin: { top: 20, right: 30, left: 20, bottom: 5 },
} as const;
