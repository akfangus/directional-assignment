# Ant Design + Styled-Components UI 시스템 가이드

## 구현된 구조

```
src/
├── components/ui/
│   ├── button/
│   │   ├── index.ts           # export
│   │   └── button.tsx         # 컴포넌트 + 스타일
│   └── index.ts               # UI 컴포넌트 진입점
├── theme/
│   ├── index.ts               # 테마 export
│   ├── tokens.ts              # 디자인 토큰
│   ├── styled-theme.ts        # styled-components 테마
│   └── antd-theme.ts          # Ant Design 테마
└── lib/
    └── ui-theme-provider.tsx  # 통합 테마 프로바이더
```

---

## 주요 파일 설명

### 테마 시스템

| 파일                    | 역할                                       |
| ----------------------- | ------------------------------------------ |
| `theme/tokens.ts`       | 색상, 간격, 폰트 등 디자인 토큰 정의       |
| `theme/styled-theme.ts` | styled-components용 테마 + TypeScript 타입 |
| `theme/antd-theme.ts`   | Ant Design ConfigProvider 테마 설정        |

### Button 컴포넌트

| 파일                              | 역할                                              |
| --------------------------------- | ------------------------------------------------- |
| `components/ui/button/button.tsx` | Ant Design Button 래핑 + styled-components 스타일 |

---

## 사용법

### Button 컴포넌트 사용

```tsx
import { Button } from "@/components/ui";

// Primary 버튼 (그라디언트 적용)
<Button type="primary">클릭</Button>

// Default 버튼
<Button>기본</Button>

// Danger 버튼
<Button type="primary" danger>삭제</Button>
```

### 테마 토큰 활용

```tsx
import styled from "styled-components";

const MyComponent = styled.div`
  color: ${({ theme }) => theme.colors.primary[500]};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
```

---

## 새 컴포넌트 추가 가이드

1. `components/ui/[컴포넌트명]/` 폴더 생성
2. 2개 파일 생성:
   - `[컴포넌트명].tsx` - 컴포넌트 로직 + styled-components 스타일
   - `index.ts` - export
3. `components/ui/index.ts`에 export 추가

**예시: Input 컴포넌트 추가**

```
components/ui/input/
├── index.ts
└── input.tsx
```

---

## 디자인 토큰 목록

### Colors

- `colors.primary[50-900]` - 주 색상 팔레트
- `colors.neutral[0-1000]` - 중립 색상 (흰색~검정)
- `colors.success` - 성공 상태 색상
- `colors.warning` - 경고 상태 색상
- `colors.error` - 오류 상태 색상

### Spacing

- `spacing.xxs` - 4px
- `spacing.xs` - 8px
- `spacing.sm` - 12px
- `spacing.md` - 16px
- `spacing.lg` - 24px
- `spacing.xl` - 32px
- `spacing.xxl` - 48px

### Border Radius

- `borderRadius.sm` - 2px
- `borderRadius.md` - 4px
- `borderRadius.lg` - 8px
- `borderRadius.xl` - 12px
- `borderRadius.full` - 9999px
