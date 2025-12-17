/**
 * 무한 스크롤 게시글 목록 조회 훅
 */

import { useInfiniteQuery } from "@tanstack/react-query";
import { PostQueries } from "@/modules/queries/post-queries";

export function usePostsInfinite(params?: Omit<Post.ListParams, "cursor">) {
  return useInfiniteQuery({
    ...PostQueries.list(params),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    retry: 3, // 최대 3회 재시도
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 방지
  });
}
