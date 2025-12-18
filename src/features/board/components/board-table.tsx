/**
 * BoardTable - Ant Design Table 기반 게시글 목록
 *
 * 기능:
 * - 컬럼 리사이즈 (react-resizable)
 * - 컬럼 숨김/보임 토글
 * - 무한 스크롤
 */

import { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { Table, Tag, Button, Space, Checkbox, Dropdown } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { MenuProps } from "antd";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { format } from "date-fns";
import styled from "styled-components";
import "react-resizable/css/styles.css";

interface BoardTableProps {
  posts: Board.Post[];
  onEdit: (post: Board.Post) => void;
  onDelete: (post: Board.Post) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
  onLoadMore: () => void;
  onLoadPrevious: () => void;
}

// Resizable 헤더 컴포넌트
const ResizableTitle = (
  props: React.HTMLAttributes<HTMLTableCellElement> & {
    onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
    width?: number;
  }
) => {
  const { onResize, width, ...restProps } = props;

  if (!width || !onResize) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const ToolbarContainer = styled.div`
  margin-bottom: 16px;
`;

const StyledTableWrapper = styled.div`
  .react-resizable {
    position: relative;
    background-clip: padding-box;
  }

  .react-resizable-handle {
    position: absolute;
    right: -5px;
    bottom: 0;
    z-index: 1;
    width: 10px;
    height: 100%;
    cursor: col-resize;
  }
`;

export function BoardTable({
  posts,
  onEdit,
  onDelete,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  onLoadMore,
  onLoadPrevious,
}: BoardTableProps): React.ReactElement {
  // 컬럼 너비 상태
  const [columns, setColumns] = useState<ColumnsType<Board.Post>>([
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      title: "카테고리",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (category: Board.Category) => {
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
      title: "태그",
      dataIndex: "tags",
      key: "tags",
      width: 200,
      render: (tags: string[]) => (
        <Space size={4} wrap>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "작성일",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date: string) => format(new Date(date), "yyyy-MM-dd HH:mm"),
    },
    {
      title: "액션",
      key: "actions",
      width: 150,
      render: (_: unknown, post: Board.Post) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(post)}
          >
            수정
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(post)}
          >
            삭제
          </Button>
        </Space>
      ),
    },
  ]);

  // 컬럼 가시성 상태
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    {
      id: true,
      title: true,
      category: true,
      tags: true,
      createdAt: true,
      actions: true,
    }
  );

  // 양방향 무한 스크롤 - 하단 감지 (다음 페이지)
  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // 양방향 무한 스크롤 - 상단 감지 (이전 페이지)
  const { ref: topRef, inView: topInView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (bottomInView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [bottomInView, hasNextPage, isFetchingNextPage, onLoadMore]);

  useEffect(() => {
    if (topInView && hasPreviousPage && !isFetchingPreviousPage) {
      onLoadPrevious();
    }
  }, [topInView, hasPreviousPage, isFetchingPreviousPage, onLoadPrevious]);

  // 리사이즈 핸들러
  const handleResize =
    (index: number) =>
    (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
      setColumns((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return nextColumns;
      });
    };

  // 리사이즈 가능한 컬럼으로 변환
  const resizableColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: ColumnType<Board.Post>) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  // 가시성 필터링된 컬럼
  const visibleResizableColumns = useMemo(
    () => resizableColumns.filter((col) => visibleColumns[col.key as string]),
    [resizableColumns, visibleColumns]
  );

  // 컬럼 토글 메뉴
  const columnMenuItems: MenuProps["items"] = columns.map((col) => ({
    key: col.key as string,
    label: (
      <Checkbox
        checked={visibleColumns[col.key as string]}
        onChange={(e) =>
          setVisibleColumns((prev) => ({
            ...prev,
            [col.key as string]: e.target.checked,
          }))
        }
      >
        {col.title as string}
      </Checkbox>
    ),
  }));

  return (
    <div>
      {/* 상단 무한 스크롤 트리거 영역 */}
      {hasPreviousPage && (
        <div
          ref={!isFetchingPreviousPage ? topRef : undefined}
          style={{
            padding: "16px",
            textAlign: "center",
          }}
        >
          {isFetchingPreviousPage ? "이전 페이지 로딩 중..." : ""}
        </div>
      )}

      <ToolbarContainer>
        <Dropdown menu={{ items: columnMenuItems }} trigger={["click"]}>
          <Button icon={<SettingOutlined />}>컬럼 설정</Button>
        </Dropdown>
      </ToolbarContainer>

      <StyledTableWrapper>
        <Table
          columns={visibleResizableColumns}
          dataSource={posts}
          rowKey="id"
          pagination={false}
          scroll={{
            x: "max-content",
          }}
          components={{
            header: {
              cell: ResizableTitle,
            },
          }}
        />
      </StyledTableWrapper>

      {/* 하단 무한 스크롤 트리거 영역 */}
      {hasNextPage && (
        <div
          ref={!isFetchingNextPage ? bottomRef : undefined}
          style={{
            padding: "16px",
            textAlign: "center",
          }}
        >
          {isFetchingNextPage ? "다음 페이지 로딩 중..." : ""}
        </div>
      )}
    </div>
  );
}
