/**
 * 게시판 TanStack Query 옵션
 * queryKey와 queryFn을 정의하는 클래스
 */

import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { BoardService } from "@/modules/service/board-service";
import { getQueryClient } from "@/shared/libs/query-client";

export class BoardQueries {
  static readonly POSTS_LIMIT_PER_PAGE = 10;

  static readonly keys = {
    root: ["board"] as const,
    posts: () => [...this.keys.root, "posts"] as const,
    postsList: (params: Board.PostsParams) =>
      [...this.keys.posts(), params] as const,
    postsInfinite: (
      params: Omit<Board.PostsParams, "nextCursor" | "prevCursor">
    ) => [...this.keys.posts(), "infinite", params] as const,
    post: (id: string) => [...this.keys.root, "post", id] as const,
  };

  /**
   * 게시글 목록 조회 (일반 페이지네이션)
   */
  static queryPosts(
    params: Board.PostsParams = {}
  ): UseQueryOptions<Board.PostsResponse> {
    return {
      queryKey: this.keys.postsList(params),
      queryFn: () =>
        BoardService.fetchPosts({
          ...params,
          limit: params.limit ?? this.POSTS_LIMIT_PER_PAGE,
        }),
    };
  }

  /**
   * 게시글 목록 조회 (양방향 무한 스크롤)
   */
  static queryInfinitePosts(
    params: Omit<Board.PostsParams, "nextCursor" | "prevCursor"> = {}
  ) {
    return {
      queryKey: this.keys.postsInfinite(params),
      queryFn: async ({
        pageParam,
        direction,
      }: {
        pageParam?: string;
        direction: "forward" | "backward";
      }) => {
        // direction에 따라 nextCursor 또는 prevCursor 사용
        const cursorParams =
          direction === "backward"
            ? { prevCursor: pageParam }
            : { nextCursor: pageParam };

        return BoardService.fetchPosts({
          ...params,
          limit: this.POSTS_LIMIT_PER_PAGE,
          ...cursorParams,
        });
      },
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage: Board.PostsResponse) =>
        lastPage.nextCursor ?? undefined,
      getPrevPageParam: (firstPage: Board.PostsResponse) =>
        firstPage.prevCursor ?? undefined,
    };
  }

  /**
   * 게시글 상세 조회
   */
  static queryPost(id: string): UseQueryOptions<Board.Post> {
    return {
      queryKey: this.keys.post(id),
      queryFn: () => BoardService.fetchPost(id),
      enabled: !!id,
    };
  }

  /**
   * 게시글 생성 Mutation
   */
  static mutationCreatePost(): UseMutationOptions<
    Board.Post,
    Error,
    Board.CreatePostParams
  > {
    return {
      mutationFn: (params) => BoardService.createPost(params),
      onSuccess: () => {
        // 생성 성공 시 게시글 목록 즉시 다시 불러오기
        const queryClient = getQueryClient();
        queryClient.refetchQueries({
          queryKey: this.keys.posts(),
        });
      },
    };
  }

  /**
   * 게시글 수정 Mutation
   */
  static mutationUpdatePost(): UseMutationOptions<
    Board.Post,
    Error,
    { id: string; params: Board.UpdatePostParams }
  > {
    return {
      mutationFn: ({ id, params }) => BoardService.updatePost(id, params),
      onSuccess: (data, variables) => {
        const queryClient = getQueryClient();

        // 수정된 게시글 상세 쿼리 캐시에서 제거 (다음 조회 시 새로 불러오도록)
        queryClient.removeQueries({
          queryKey: this.keys.post(variables.id),
        });

        // 게시글 목록 즉시 다시 불러오기
        queryClient.refetchQueries({
          queryKey: this.keys.posts(),
        });
      },
    };
  }

  /**
   * 게시글 삭제 Mutation
   */
  static mutationDeletePost(): UseMutationOptions<void, Error, string> {
    return {
      mutationFn: (id) => BoardService.deletePost(id),
      onSuccess: (data, id) => {
        const queryClient = getQueryClient();

        // 삭제된 게시글 상세 쿼리 캐시에서 완전히 제거
        queryClient.removeQueries({
          queryKey: this.keys.post(id),
        });

        // 게시글 목록 즉시 다시 불러오기
        queryClient.refetchQueries({
          queryKey: this.keys.posts(),
        });
      },
    };
  }

  /**
   * 쿼리 무효화 헬퍼 메서드
   * QueryClient를 전달받지 않고 싱글톤 인스턴스를 사용
   */
  static invalidate = {
    /**
     * 게시글 목록 무효화 (모든 params)
     * 무한 스크롤 쿼리도 포함하여 모든 페이지를 다시 불러옵니다
     */
    posts: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.posts(),
        refetchType: "all", // 모든 페이지 다시 불러오기
      });
    },

    /**
     * 특정 게시글 상세 무효화
     */
    post: (id: string) => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.post(id),
      });
    },

    /**
     * 모든 게시판 관련 쿼리 무효화
     */
    all: () => {
      const queryClient = getQueryClient();
      return queryClient.invalidateQueries({
        queryKey: this.keys.root,
        refetchType: "all",
      });
    },
  };
}
