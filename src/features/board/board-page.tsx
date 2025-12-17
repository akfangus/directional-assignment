"use client";

import { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { BoardQueries } from "@/modules/queries/board-queries";
import { BoardToolbar } from "./components/board-toolbar";
import { BoardTable } from "./components/board-table";
import { PostFormModal } from "./components/post-form-modal";
import { DeleteConfirmModal } from "./components/delete-confirm-modal";
import { useBoard } from "./hooks/use-board";
import { Spinner } from "@/components/ui/spinner";

export function BoardPage(): React.ReactElement {
  // 필터 상태
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"title" | "createdAt">("createdAt");
  const [order, setOrder] = useState<Board.OrderType>("desc");
  const [category, setCategory] = useState<Board.Category | undefined>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      BoardQueries.queryInfinitePosts({
        search: search || undefined,
        sort,
        order,
        category,
      })
    );

  // 게시판 로직 (모달, mutation, 핸들러)
  const {
    createModalOpen,
    editModalOpen,
    deleteModalOpen,
    selectedPost,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteConfirm,
    handleModalCancel,
  } = useBoard();

  // 전체 게시글 목록
  const posts = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <BoardToolbar
        searchValue={search}
        sortValue={sort}
        orderValue={order}
        categoryValue={category}
        onSearchChange={setSearch}
        onSortChange={(value) => setSort(value as "title" | "createdAt")}
        onOrderChange={setOrder}
        onCategoryChange={setCategory}
        onCreateClick={handleCreateClick}
      />

      <BoardTable
        posts={posts}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />

      <PostFormModal
        open={createModalOpen}
        mode="create"
        onCancel={handleModalCancel}
        onSubmit={handleCreateSubmit}
        loading={isCreating}
      />

      <PostFormModal
        open={editModalOpen}
        mode="edit"
        initialData={selectedPost || undefined}
        onCancel={handleModalCancel}
        onSubmit={handleEditSubmit}
        loading={isUpdating}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        post={selectedPost}
        onConfirm={handleDeleteConfirm}
        onCancel={handleModalCancel}
        loading={isDeleting}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;
