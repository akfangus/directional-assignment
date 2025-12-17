/**
 * BoardTable - DataTable 기반 게시글 목록
 */

import { useRef, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DataTable } from "@/components/ui/table";
import { format } from "date-fns";

interface BoardTableProps {
  posts: Post.Post[];
  onEdit: (post: Post.Post) => void;
  onDelete: (post: Post.Post) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

const getColumns = (
  onEdit: (post: Post.Post) => void,
  onDelete: (post: Post.Post) => void
): ColumnDef<Post.Post>[] => [
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
      const category = getValue() as Post.Category;
      const colorMap = { NOTICE: "blue", QNA: "orange", FREE: "green" };
      const labelMap = { NOTICE: "공지사항", QNA: "Q&A", FREE: "자유게시판" };
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
  const containerRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !hasNextPage || isFetchingNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      // 스크롤이 하단 100px 이내에 도달하면 다음 페이지 로드
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        onLoadMore();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  const columns = getColumns(onEdit, onDelete);

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: "calc(100vh - 280px)",
        overflow: "auto",
      }}
    >
      <DataTable data={posts} columns={columns} showColumnToggle />
      {isFetchingNextPage && (
        <div style={{ textAlign: "center", padding: "16px" }}>로딩 중...</div>
      )}
    </div>
  );
}
