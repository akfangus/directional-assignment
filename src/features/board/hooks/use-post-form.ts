/**
 * 게시글 폼 상태 관리 훅
 */

import { useState, useCallback } from "react";

interface UsePostFormProps {
  initialData?: Post.Post;
}

export function usePostForm(props?: UsePostFormProps) {
  const [formData, setFormData] = useState<Post.CreateParams>({
    title: props?.initialData?.title || "",
    body: props?.initialData?.body || "",
    category: props?.initialData?.category || "FREE",
    tags: props?.initialData?.tags || [],
  });

  const handleChange = useCallback(
    (field: keyof Post.CreateParams) =>
      (value: string | string[] | "NOTICE" | "QNA" | "FREE") => {
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
