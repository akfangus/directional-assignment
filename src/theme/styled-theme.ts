/**
 * styled-components 테마 정의
 * 이 테마 객체는 ThemeProvider를 통해 모든 styled-components에서 접근 가능합니다.
 */

import {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
  transition,
} from "./tokens";

export const styledTheme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
  transition,
} as const;

export type StyledTheme = typeof styledTheme;

// styled-components의 DefaultTheme 타입 확장을 위한 선언
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends StyledTheme {}
}
