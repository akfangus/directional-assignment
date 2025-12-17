/**
 * 게시글 폼 상태 관리 훅
 */

import { useState, useCallback } from "react";

interface UsePostFormProps {
  initialData?: Board.Post;
}

export function usePostForm(props?: UsePostFormProps) {
  const [formData, setFormData] = useState<Board.CreatePostParams>({
    title: props?.initialData?.title || "",
    body: props?.initialData?.body || "",
    category: props?.initialData?.category || "FREE",
    tags: props?.initialData?.tags || [],
  });

  const handleChange = useCallback(
    (field: keyof Board.CreatePostParams) =>
      (value: string | string[] | Board.Category) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  const reset = useCallback(() => {
    setFormData({
      title: props?.initialData?.title || "",
      body: props?.initialData?.body || "",
      category: props?.initialData?.category || "FREE",
      tags: props?.initialData?.tags || [],
    });
  }, [props?.initialData]);

  return {
    formData,
    setFormData,
    handleChange,
    reset,
  };
}
