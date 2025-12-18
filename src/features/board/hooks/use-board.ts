/**
 * 게시판 페이지 통합 훅
 * 모든 상태, mutation, 핸들러를 하나로 통합
 */

import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { BoardQueries } from "@/modules/queries/board-queries";
import { validatePostParams } from "../utils/forbidden-words";
import { getQueryClient } from "@/shared/libs/query-client";

export function useBoard() {
  const { message } = App.useApp();

  // 모달 상태
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Board.Post | null>(null);

  // Mutations
  const { mutate: createPost, isPending: isCreating } = useMutation({
    ...BoardQueries.mutationCreatePost(),
    onMutate: (params) => {
      const validation = validatePostParams(params);
      if (!validation.valid) {
        message.error(validation.message);
        throw new Error(validation.message);
      }
    },
    // BoardQueries의 onSuccess가 먼저 실행되고, 그 다음 onSettled가 실행됨
    onSettled: (data, error) => {
      if (error) {
        if (!error.message.includes("금칙어")) {
          message.error("게시글 작성에 실패했습니다");
        }
        return;
      }

      message.success("게시글이 작성되었습니다");
      setCreateModalOpen(false);
    },
  });

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    ...BoardQueries.mutationUpdatePost(),
    // BoardQueries의 onMutate, onError, onSuccess가 먼저 실행되고, 그 다음 onSettled가 실행됨
    onSettled: (data, error, variables) => {
      // 금칙어 에러는 mutation 전에 처리
      const validation = validatePostParams(variables.params);
      if (!validation.valid) {
        message.error(validation.message);
        return;
      }

      if (error) {
        message.error("게시글 수정에 실패했습니다");
        return;
      }

      message.success("게시글이 수정되었습니다");
      setEditModalOpen(false);
      setSelectedPost(null);
    },
  });

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    ...BoardQueries.mutationDeletePost(),
    // BoardQueries의 onSuccess가 먼저 실행되고, 그 다음 onSettled가 실행됨
    onSettled: (data, error) => {
      if (error) {
        message.error("게시글 삭제에 실패했습니다");
        return;
      }

      message.success("게시글이 삭제되었습니다");
      setDeleteModalOpen(false);
      setSelectedPost(null);
    },
  });

  // 핸들러
  const handleCreateClick = useCallback(() => {
    setCreateModalOpen(true);
  }, []);

  const handleEditClick = useCallback((post: Board.Post) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((post: Board.Post) => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  }, []);

  const handleCreateSubmit = useCallback(
    (data: Board.CreatePostParams) => {
      createPost(data);
    },
    [createPost]
  );

  const handleEditSubmit = useCallback(
    (data: Board.UpdatePostParams) => {
      if (!selectedPost?.id) return;
      updatePost({ id: selectedPost.id, params: data });
    },
    [updatePost, selectedPost?.id]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (!selectedPost?.id) return;
    deletePost(selectedPost.id);
  }, [deletePost, selectedPost?.id]);

  const handleModalCancel = useCallback(() => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedPost(null);
  }, []);

  return {
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
  };
}
