import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  address: string;
}

const sampleData: User[] = [
  {
    id: "1",
    name: "홍길동",
    age: 32,
    email: "hong@email.com",
    address: "서울시 강남구",
  },
  {
    id: "2",
    name: "김철수",
    age: 28,
    email: "kim@email.com",
    address: "부산시 해운대구",
  },
  {
    id: "3",
    name: "이영희",
    age: 35,
    email: "lee@email.com",
    address: "대구시 수성구",
  },
  {
    id: "4",
    name: "박민수",
    age: 42,
    email: "park@email.com",
    address: "인천시 남동구",
  },
  {
    id: "5",
    name: "정수진",
    age: 29,
    email: "jung@email.com",
    address: "광주시 서구",
  },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "이름",
    size: 120,
    minSize: 80,
  },
  {
    accessorKey: "age",
    header: "나이",
    size: 80,
    minSize: 60,
  },
  {
    accessorKey: "email",
    header: "이메일",
    size: 180,
    minSize: 100,
  },
  {
    accessorKey: "address",
    header: "주소",
    size: 200,
    minSize: 100,
  },
];

/**
 * TanStack Table + Ant Design 스타일 테이블
 * 컬럼 리사이즈 및 가시성 토글 지원
 */
const meta: Meta<typeof DataTable<User>> = {
  title: "UI/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 테이블 - 컬럼 경계를 드래그하여 너비 조절 가능
 */
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

/**
 * 컬럼 토글 버튼 숨김
 */
export const WithoutColumnToggle: Story = {
  args: {
    data: sampleData,
    columns: columns,
    showColumnToggle: false,
  },
};

/**
 * 빈 데이터
 */
export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
  },
};

/**
 * 많은 데이터
 */
export const ManyRows: Story = {
  args: {
    data: [...sampleData, ...sampleData, ...sampleData, ...sampleData],
    columns: columns,
  },
};
