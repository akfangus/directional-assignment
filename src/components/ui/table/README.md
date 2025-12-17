# DataTable - TanStack Table 활용 가이드

## 개요

`DataTable`은 TanStack Table(React Table v8) 기반으로 구축된 리사이저블하고 커스터마이징 가능한 테이블 컴포넌트입니다.

## 주요 기능

- ✅ **컬럼 리사이즈**: 드래그로 컬럼 너비 조절
- ✅ **컬럼 가시성 토글**: 원하는 컬럼만 표시/숨김
- ✅ **Ant Design 스타일**: 일관된 디자인 적용
- ✅ **타입 안정성**: TypeScript 완벽 지원

## 기본 사용법

```tsx
import { DataTable } from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "이름",
    size: 150, // 기본 너비
    minSize: 100, // 최소 너비
  },
  {
    accessorKey: "email",
    header: "이메일",
    size: 200,
  },
];

const data: User[] = [
  { id: "1", name: "홍길동", email: "hong@email.com" },
  { id: "2", name: "김철수", email: "kim@email.com" },
];

function MyComponent() {
  return <DataTable data={data} columns={columns} />;
}
```

## 고급 활용

### 1. 컬럼 가시성 토글 숨기기

```tsx
<DataTable
  data={data}
  columns={columns}
  showColumnToggle={false} // 컬럼 설정 버튼 숨김
/>
```

### 2. 커스텀 셀 렌더링

```tsx
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ getValue }) => {
      const name = getValue() as string;
      return <strong>{name}</strong>;
    },
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "활성" : "비활성"}
        </Tag>
      );
    },
  },
];
```

### 3. 정렬 기능 추가

```tsx
import { useState } from "react";
import {
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

function SortableTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "이름",
      enableSorting: true, // 정렬 활성화
    },
  ];

  // DataTable 컴포넌트를 확장하여 sorting 기능 추가 필요
}
```

### 4. 필터링 기능

```tsx
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "이메일",
    filterFn: "includesString", // 필터링 함수
  },
];
```

### 5. 페이지네이션

TanStack Table의 `getPaginationRowModel` 사용:

```tsx
import { getPaginationRowModel } from "@tanstack/react-table";

// DataTable 확장 필요
const table = useReactTable({
  data,
  columns,
  getPaginationRowModel: getPaginationRowModel(),
  // ...
});
```

## TanStack Table 주요 기능

### Core Features

- ✅ Column Resizing (현재 구현됨)
- ✅ Column Visibility (현재 구현됨)
- ⚠️ Sorting (확장 필요)
- ⚠️ Filtering (확장 필요)
- ⚠️ Pagination (확장 필요)
- ⚠️ Row Selection (확장 필요)
- ⚠️ Grouping (확장 필요)

### 확장 가능한 기능들

#### 1. Sorting (정렬)

```tsx
import { getSortedRowModel } from "@tanstack/react-table";
```

#### 2. Filtering (필터링)

```tsx
import { getFilteredRowModel } from "@tanstack/react-table";
```

#### 3. Pagination (페이지네이션)

```tsx
import { getPaginationRowModel } from "@tanstack/react-table";
```

#### 4. Row Selection (행 선택)

```tsx
enableRowSelection: true,
```

#### 5. Virtualization (가상화)

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";
```

## 컬럼 정의 옵션

| 옵션             | 타입                 | 설명                       |
| ---------------- | -------------------- | -------------------------- |
| `accessorKey`    | `string`             | 데이터 객체의 키           |
| `header`         | `string \| function` | 헤더 텍스트 또는 렌더 함수 |
| `cell`           | `function`           | 셀 렌더 함수               |
| `size`           | `number`             | 기본 너비 (px)             |
| `minSize`        | `number`             | 최소 너비 (px)             |
| `maxSize`        | `number`             | 최대 너비 (px)             |
| `enableResizing` | `boolean`            | 리사이즈 활성화 여부       |
| `enableSorting`  | `boolean`            | 정렬 활성화 여부           |
| `enableHiding`   | `boolean`            | 숨김 활성화 여부           |

## 스타일 커스터마이징

현재 `DataTable`은 styled-components를 사용합니다:

```tsx
// data-table.tsx 내부
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  // 커스텀 스타일 추가 가능
`;
```

## 참고 자료

- [TanStack Table 공식 문서](https://tanstack.com/table/latest)
- [TanStack Table Examples](https://tanstack.com/table/latest/docs/examples/react/basic)
- [Column Resizing Guide](https://tanstack.com/table/latest/docs/guide/column-sizing)

## 다음 단계

현재 `DataTable`을 확장하여 다음 기능을 추가할 수 있습니다:

1. **정렬 기능**: 헤더 클릭으로 오름차순/내림차순 정렬
2. **필터링**: 검색 입력으로 행 필터링
3. **페이지네이션**: 많은 데이터 처리
4. **행 선택**: 체크박스로 다중 선택
5. **서버 사이드 처리**: API 연동
