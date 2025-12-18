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
   * 게시글 수정 Mutation (낙관적 업데이트)
   */
  static mutationUpdatePost(): UseMutationOptions<
    Board.Post,
    Error,
    { id: string; params: Board.UpdatePostParams },
    { previousData: unknown }
  > {
    return {
      mutationFn: ({ id, params }) => BoardService.updatePost(id, params),
      onMutate: async ({ id, params }) => {
        const queryClient = getQueryClient();

        // 1. 진행 중인 refetch 취소
        await queryClient.cancelQueries({ queryKey: this.keys.posts() });

        // 2. 현재 캐시 스냅샷 저장 (롤백용)
        const previousData = queryClient.getQueriesData({
          queryKey: this.keys.posts(),
        });

        // 3. 모든 무한 스크롤 쿼리를 낙관적으로 업데이트
        queryClient.setQueriesData<{
          pages: Board.PostsResponse[];
          pageParams: unknown[];
        }>({ queryKey: this.keys.posts() }, (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((post) =>
                post.id === id ? { ...post, ...params } : post
              ),
            })),
          };
        });

        return { previousData };
      },
      onError: (_err, _variables, context) => {
        // 실패 시 롤백
        if (context?.previousData && Array.isArray(context.previousData)) {
          const queryClient = getQueryClient();
          context.previousData.forEach(([queryKey, data]: [any, any]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }
      },
      onSuccess: (_data, variables) => {
        // 상세 캐시 제거 (다음 조회 시 새로 불러오도록)
        const queryClient = getQueryClient();
        queryClient.removeQueries({
          queryKey: this.keys.post(variables.id),
        });
      },
    };
  }

  /**
   * 게시글 삭제 Mutation (낙관적 업데이트)
   */
  static mutationDeletePost(): UseMutationOptions<
    void,
    Error,
    string,
    { previousData: unknown }
  > {
    return {
      mutationFn: (id) => BoardService.deletePost(id),
      onMutate: async (id) => {
        const queryClient = getQueryClient();

        // 1. 진행 중인 refetch 취소
        await queryClient.cancelQueries({ queryKey: this.keys.posts() });

        // 2. 현재 캐시 스냅샷 저장 (롤백용)
        const previousData = queryClient.getQueriesData({
          queryKey: this.keys.posts(),
        });

        // 3. 모든 무한 스크롤 쿼리에서 낙관적으로 삭제
        queryClient.setQueriesData<{
          pages: Board.PostsResponse[];
          pageParams: unknown[];
        }>({ queryKey: this.keys.posts() }, (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.filter((post) => post.id !== id),
            })),
          };
        });

        return { previousData };
      },
      onError: (_err, _id, context) => {
        // 실패 시 롤백
        if (context?.previousData && Array.isArray(context.previousData)) {
          const queryClient = getQueryClient();
          context.previousData.forEach(([queryKey, data]: [any, any]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }
      },
      onSuccess: (_data, id) => {
        // 상세 캐시 제거
        const queryClient = getQueryClient();
        queryClient.removeQueries({
          queryKey: this.keys.post(id),
        });
      },
    };
  }

  /**
   * 내글 모두 삭제 Mutation
   */
  static mutationDeleteAllPosts(): UseMutationOptions<void, Error, void> {
    return {
      mutationFn: () => BoardService.deleteAllPosts(),
      onSuccess: () => {
        const queryClient = getQueryClient();
        // 모든 게시글 데이터 새로고침
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
