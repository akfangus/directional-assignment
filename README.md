# Directional Assignment

2025년 12월 17일 부터 48시간 진행되는 과제전형 프로젝트입니다.

## 1. 프로젝트 실행 방법

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

1. 프로젝트 .env에 API_URL 환경 변수를 추가합니다.

```
API_URL={{endPoint}}
NEXT_PUBLIC_API_URL={{endPoint}}
```

2. 프로젝트 설치 후 개발 모드 실행

```bash
# 의존성 패키지 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000)을 통해 웹 프로젝트에 접근합니다.

4. 로그인을 필수로 요구하고있으며 login시 기능이 구현된 대시보드로 이동됩니다.

## 2. 기술 스택

이 프로젝트는 다음과 같은 주요 기술들을 사용하여 개발되었습니다.

### 코어

- **Framework**: Next.js 15
  (App Router)
- **Library**: React 19
- **Language**: TypeScript

### 전역상태 & 데이터 통신

- **Client State**: Zustand
- **Server State**: TanStack Query (React Query)
- **HTTP Client**: Axios

### UI & 스타일

- **CSS Framework**: TailwindCSS
- **CSS-in-JS**: Styled Components
- **UI Library**: Ant Design

### 유틸리티

- **Visualization**: Recharts
- **Testing**: Storybook
- **Resizing**: React Resizable
- **Intersection Observer**: React Intersection Observer

## 3. 주요 구현 기능 요약

### 게시판 ( /board )

#### 1. 고도화된 데이터 테이블 (View Layer)

- **구현 프로세스**:

  - `antd` + `react-resizable` 를 사용하여 리사이징이 가능한 테이블을 구현 했습니다.

- **최적화 포인트**:
  - **Memoization**: 리사이징 시 테이블 전체가 리렌더링되는 것을 방지하기 위해 `useMemo`를 사용하였습니다.

#### 2. 양방향 무한 스크롤 (Data Fetching)

- `useInfiniteQuery`의 `getNextPageParam`과 `getPreviousPageParam`을 모두 활용하여 데이터의 앞뒤를 자유롭게 오갈 수 있습니다.

- **Intersection Observer**: `react-intersection-observer`를 사용하여 뷰포트 교차 감지 작업을 브라우저 최적화 API에 위임했습니다. 이를 통해 스크롤 성능 저하 없이 정확한 로딩 시점을 감지합니다.

### 인증 ( /login )

- **구현 프로세스**:
  - **Next.js Middleware**: 클라이언트 사이드 리다이렉션(깜빡임 발생 가능) 대신, Next.js Middleware를 사용하여 요청 단계에서 토큰 검증 및 리다이렉션을 처리했습니다.
  - **Zustand + Persist**: 로그인 후 사용자 정보는 Zustand 스토어에 저장하며, `persist` 미들웨어를 통해 새로고침 후에도 로그인 상태가 유지되도록 구성했습니다.

### 데이터 시각화 ( /visualization/[chartName] )

- **구현 프로세스**:

  - **Recharts 도입**: Recharts를 선택하여 대시보드를 구현했습니다.

  -

## 4. 프로젝트 구조

## 4. 프로젝트 구조

```
src
├── app                  # Next.js App Router
│   ├── (auth)          # 인증이 필요한 라우트 그룹 (Layout 포함)
│   └── login           # 로그인 페이지
├── components           # 공통 UI 컴포넌트
│   ├── common          # 범용 컴포넌트 (Header, Sidebar 등)
│   ├── layout          # 레이아웃 관련 컴포넌트
│   └── ui              # 공통 디자인 시스템 컴포넌트 (Button, Input 등)
├── features             # 도메인별 기능 단위 (페이지 로직 포함)
│   ├── board           # 게시판 기능 (components, hooks, types)
│   ├── login           # 로그인 기능 (form, hooks)
│   └── visualization   # 차트/시각화 기능
├── modules              # 비즈니스 로직 및 데이터 계층
│   ├── queries         # React Query 훅 모음 (API 통신)
│   └── service         # API 호출 함수 및 매퍼
├── shared               # 공통 유틸리티 및 설정
│   ├── apis            # API 인스턴스 설정
│   └── libs            # 외부 라이브러리 설정 (Axios, QueryClient 등)
├── stores               # 전역 상태 관리 (Zustand)
└── theme                # 스타일 테마 및 설정 (Color, Font)
```

## 5. 배포 링크

현재 배포된 애플리케이션은 아래 링크에서 확인하실 수 있습니다.

[🚀 배포 사이트 바로가기 (https://directional-assignment-eight.vercel.app/)](https://directional-assignment-eight.vercel.app/)
