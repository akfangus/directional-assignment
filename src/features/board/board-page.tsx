"use client";

/**
 * BoardPage - 게시판 메인 페이지
 */

import { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { BoardToolbar } from "./components/board-toolbar";
import { BoardTable } from "./components/board-table";
import { PostFormModal } from "./components/post-form-modal";
import { DeleteConfirmModal } from "./components/delete-confirm-modal";
import { usePostsInfinite } from "./hooks/use-posts-infinite";
import { useCreatePost } from "./hooks/use-create-post";
import { useUpdatePost } from "./hooks/use-update-post";
import { useDeletePost } from "./hooks/use-delete-post";

export function BoardPage(): React.ReactElement {
  // 필터 상태
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"title" | "createdAt">("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [category, setCategory] = useState<"NOTICE" | "FREE" | undefined>();

  // 모달 상태
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post.Post | null>(null);

  // 데이터 조회
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePostsInfinite({
      limit: 20,
      search: search || undefined,
      sort,
      order,
      category,
    });

  // Mutations
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost(selectedPost?.id || "");
  const deleteMutation = useDeletePost(selectedPost?.id || "");

  // 전체 게시글 목록
  const posts = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  // 핸들러
  const handleCreateClick = useCallback(() => {
    setCreateModalOpen(true);
  }, []);

  const handleEditClick = useCallback((post: Post.Post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((post: Post.Post) => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  }, []);

  const handleCreateSubmit = useCallback(
    (data: Post.CreateParams) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          setCreateModalOpen(false);
        },
      });
    },
    [createMutation.mutate]
  );

  const handleEditSubmit = useCallback(
    (data: Post.UpdateParams) => {
      updateMutation.mutate(data, {
        onSuccess: () => {
          setEditModalOpen(false);
          setSelectedPost(null);
        },
      });
    },
    [updateMutation.mutate]
  );

  const handleDeleteConfirm = useCallback(() => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setSelectedPost(null);
      },
    });
  }, [deleteMutation.mutate]);

  const handleModalCancel = useCallback(() => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedPost(null);
  }, []);

  if (isLoading) {
    return (
      <Container>
        <div style={{ textAlign: "center", padding: "40px" }}>로딩 중...</div>
      </Container>
    );
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
        loading={createMutation.isPending}
      />

      <PostFormModal
        open={editModalOpen}
        mode="edit"
        initialData={selectedPost || undefined}
        onCancel={handleModalCancel}
        onSubmit={handleEditSubmit}
        loading={updateMutation.isPending}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        post={selectedPost}
        onConfirm={handleDeleteConfirm}
        onCancel={handleModalCancel}
        loading={deleteMutation.isPending}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;
