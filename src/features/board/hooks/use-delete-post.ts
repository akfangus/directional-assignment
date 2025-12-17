/**
 * 게시글 삭제 mutation 훅
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { PostQueries } from "@/modules/queries/post-queries";

export function useDeletePost(id: string) {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    ...PostQueries.delete(id),
    onSuccess: () => {
      // 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["posts", "list"] });
      message.success("게시글이 삭제되었습니다");
    },
    onError: () => {
      message.error("게시글 삭제에 실패했습니다");
    },
  });
}
