/**
 * 게시글 작성 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { PostQueries } from "@/modules/queries/post-queries";
import { validatePostParams } from "../utils/forbidden-words";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    ...PostQueries.create(),
    onMutate: (params) => {
      // 금칙어 검증
      const validation = validatePostParams(params);
      if (!validation.valid) {
        message.error(validation.message);
        throw new Error(validation.message);
      }
    },
    onSuccess: () => {
      // 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      message.success("게시글이 작성되었습니다");
    },
    onError: (error: Error) => {
      if (!error.message.includes("금칙어")) {
        message.error("게시글 작성에 실패했습니다");
      }
    },
  });
}
