/**
 * BoardTable - DataTable 기반 게시글 목록
 */

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DataTable } from "@/components/ui/table";
import { format } from "date-fns";

interface BoardTableProps {
  posts: Board.Post[];
  onEdit: (post: Board.Post) => void;
  onDelete: (post: Board.Post) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

const getColumns = (
  onEdit: (post: Board.Post) => void,
  onDelete: (post: Board.Post) => void
): ColumnDef<Board.Post>[] => [
  {
    accessorKey: "id",
    header: "ID",
    size: 100,
    minSize: 80,
  },
  {
    accessorKey: "title",
    header: "제목",
    size: 300,
    minSize: 150,
  },
  {
    accessorKey: "category",
    header: "카테고리",
    size: 100,
    minSize: 80,
    cell: ({ getValue }) => {
      const category = getValue() as Board.Category;
      const colorMap: Record<Board.Category, string> = {
        NOTICE: "blue",
        QNA: "orange",
        FREE: "green",
      };
      const labelMap: Record<Board.Category, string> = {
        NOTICE: "공지사항",
        QNA: "Q&A",
        FREE: "자유게시판",
      };
      return <Tag color={colorMap[category]}>{labelMap[category]}</Tag>;
    },
  },
  {
    accessorKey: "tags",
    header: "태그",
    size: 200,
    minSize: 100,
    cell: ({ getValue }) => {
      const tags = getValue() as string[];
      return (
        <Space size={4} wrap>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "작성일",
    size: 150,
    minSize: 120,
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return format(new Date(date), "yyyy-MM-dd HH:mm");
    },
  },
  {
    id: "actions",
    header: "액션",
    size: 120,
    minSize: 100,
    cell: ({ row }) => (
      <Space>
        <Button
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEdit(row.original)}
        >
          수정
        </Button>
        <Button
          type="link"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(row.original)}
        >
          삭제
        </Button>
      </Space>
    ),
  },
];

export function BoardTable({
  posts,
  onEdit,
  onDelete,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: BoardTableProps): React.ReactElement {
  // Intersection Observer로 무한 스크롤 구현
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px", // 하단 100px 전에 트리거
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  const columns = getColumns(onEdit, onDelete);

  return (
    <div
      style={{
        maxHeight: "calc(100vh - 280px)",
        overflow: "auto",
      }}
    >
      <DataTable data={posts} columns={columns} showColumnToggle />

      {/* 무한 스크롤 트리거 영역 */}
      {hasNextPage && (
        <div
          ref={ref}
          style={{
            padding: "16px",
            textAlign: "center",
          }}
        >
          {isFetchingNextPage ? "로딩 중..." : ""}
        </div>
      )}
    </div>
  );
}
