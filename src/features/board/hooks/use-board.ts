/**
 * 게시판 페이지 통합 훅
 * 모든 상태, mutation, 핸들러를 하나로 통합
 */

import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { PostQueries } from "@/modules/queries/post-queries";
import { validatePostParams } from "../utils/forbidden-words";

export function useBoard() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  // 모달 상태
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Board.Post | null>(null);

  // Mutations
  const { mutate: createPost, isPending: isCreating } = useMutation({
    ...PostQueries.create(),
    onMutate: (params) => {
      const validation = validatePostParams(params);
      if (!validation.valid) {
        message.error(validation.message);
        throw new Error(validation.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      message.success("게시글이 작성되었습니다");
      setCreateModalOpen(false);
    },
    onError: (error: Error) => {
      if (!error.message.includes("금칙어")) {
        message.error("게시글 작성에 실패했습니다");
      }
    },
  });

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    ...PostQueries.update(selectedPost?.id || ""),
    onMutate: (params) => {
      const validation = validatePostParams(params);
      if (!validation.valid) {
        message.error(validation.message);
        throw new Error(validation.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "detail", selectedPost?.id],
      });
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      message.success("게시글이 수정되었습니다");
      setEditModalOpen(false);
      setSelectedPost(null);
    },
    onError: (error: Error) => {
      if (!error.message.includes("금칙어")) {
        message.error("게시글 수정에 실패했습니다");
      }
    },
  });

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    ...PostQueries.delete(selectedPost?.id || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      message.success("게시글이 삭제되었습니다");
      setDeleteModalOpen(false);
      setSelectedPost(null);
    },
    onError: () => {
      message.error("게시글 삭제에 실패했습니다");
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
      updatePost(data);
    },
    [updatePost]
  );

  const handleDeleteConfirm = useCallback(() => {
    deletePost(undefined);
  }, [deletePost]);

  const handleModalCancel = useCallback(() => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedPost(null);
  }, []);

  return {
    // 모달 상태
    createModalOpen,
    editModalOpen,
    deleteModalOpen,
    selectedPost,
    // mutation pending 상태
    isCreating,
    isUpdating,
    isDeleting,
    // 핸들러
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteConfirm,
    handleModalCancel,
  };
}
