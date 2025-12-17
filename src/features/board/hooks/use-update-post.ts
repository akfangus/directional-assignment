/**
 * 게시글 수정 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { PostQueries } from "@/modules/queries/post-queries";
import { validatePostParams } from "../utils/forbidden-words";

export function useUpdatePost(id: string) {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    ...PostQueries.update(id),
    onMutate: (params) => {
      // 금칙어 검증
      const validation = validatePostParams(params);
      if (!validation.valid) {
        message.error(validation.message);
        throw new Error(validation.message);
      }
    },
    onSuccess: () => {
      // 상세 및 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["posts", "detail", id] });
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      message.success("게시글이 수정되었습니다");
    },
    onError: (error: Error) => {
      if (!error.message.includes("금칙어")) {
        message.error("게시글 수정에 실패했습니다");
      }
    },
  });
}
