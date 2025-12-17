# Antd 좌측 고정 메뉴 레이아웃 가이드

## 생성된 파일

### 레이아웃 컴포넌트

| 파일                                         | 설명                                     |
| -------------------------------------------- | ---------------------------------------- |
| `src/components/layout/app-layout.tsx`       | 메인 레이아웃 컴포넌트 (Sider + Content) |
| `src/components/layout/app-layout.styled.ts` | styled-components 스타일 정의            |
| `src/components/layout/menu-config.ts`       | 메뉴 아이템 설정 및 유틸리티             |
| `src/components/layout/index.ts`             | export 파일                              |

### 페이지 라우팅

| 경로                       | 파일                                                      |
| -------------------------- | --------------------------------------------------------- |
| `/board`                   | `src/app/(with-sidebar)/board/page.tsx`                   |
| `/visualization/bar-donut` | `src/app/(with-sidebar)/visualization/bar-donut/page.tsx` |
| `/visualization/stacked`   | `src/app/(with-sidebar)/visualization/stacked/page.tsx`   |
| `/visualization/multiline` | `src/app/(with-sidebar)/visualization/multiline/page.tsx` |

---

## 사용법

```bash
npm run dev
```

실행 후 `http://localhost:3000/board` 접속하여 확인.

---

## 메뉴 구조

```
📁 Dashboard
├── 📄 게시판 (/board)
└── 📂 데이터 시각화
    ├── 📄 바,도넛차트 (/visualization/bar-donut)
    ├── 📄 스택형 바/면적 차트 (/visualization/stacked)
    └── 📄 멀티라인 차트 (/visualization/multiline)
```

---

## 새 페이지 추가하기

1. `src/app/(with-sidebar)/` 하위에 폴더 및 `page.tsx` 생성
2. `src/components/layout/menu-config.ts`에서 `MENU_ITEMS` 배열에 메뉴 아이템 추가

```typescript
getItem("새 메뉴", "/new-path", React.createElement(SomeIcon));
```

---

## 제목 변경하기

`src/app/(with-sidebar)/layout.tsx`에서 `title` prop 수정:

```tsx
<AppLayout title="새로운 제목">{children}</AppLayout>
```
