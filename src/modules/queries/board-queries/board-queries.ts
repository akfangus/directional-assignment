import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { BoardService } from "@/modules/service/board-service";
import type {
  BoardPost,
  BoardPostsResponse,
  BoardPostsParams,
  CreateBoardPostParams,
  UpdateBoardPostParams,
} from "@/modules/service/board-service/board-service.types";

export class BoardQueries {
  static readonly POSTS_LIMIT_PER_PAGE = 20;

  static readonly keys = {
    root: ["board"] as const,
    posts: () => [...this.keys.root, "posts"] as const,
    postsList: (params: BoardPostsParams) =>
      [...this.keys.posts(), params] as const,
    postsInfinite: (params: Omit<BoardPostsParams, "page">) =>
      [...this.keys.posts(), "infinite", params] as const,
    post: (id: number) => [...this.keys.root, "post", id] as const,
  };

  /**
   * 게시글 목록 조회 (일반 페이지네이션)
   */
  static queryPosts(
    params: BoardPostsParams = {}
  ): UseQueryOptions<BoardPostsResponse> {
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
   * 게시글 목록 조회 (무한 스크롤)
   */
  static queryInfinitePosts(params: Omit<BoardPostsParams, "page"> = {}) {
    return {
      queryKey: this.keys.postsInfinite(params),
      queryFn: async ({ pageParam }: { pageParam: number }) =>
        BoardService.fetchPosts({
          ...params,
          limit: this.POSTS_LIMIT_PER_PAGE,
          page: pageParam,
        }),
      initialPageParam: 1,
      getNextPageParam: (
        lastPage: BoardPostsResponse,
        allPages: BoardPostsResponse[]
      ) => {
        const hasMore = lastPage.items.length >= this.POSTS_LIMIT_PER_PAGE;
        return hasMore ? allPages.length + 1 : undefined;
      },
    };
  }

  /**
   * 게시글 상세 조회
   */
  static queryPost(id: number): UseQueryOptions<BoardPost> {
    return {
      queryKey: this.keys.post(id),
      queryFn: () => BoardService.fetchPost(id),
      enabled: id > 0,
    };
  }

  /**
   * 게시글 생성 Mutation
   */
  static mutationCreatePost(): UseMutationOptions<
    BoardPost,
    Error,
    CreateBoardPostParams
  > {
    return {
      mutationFn: (params) => BoardService.createPost(params),
    };
  }

  /**
   * 게시글 수정 Mutation
   */
  static mutationUpdatePost(): UseMutationOptions<
    BoardPost,
    Error,
    UpdateBoardPostParams
  > {
    return {
      mutationFn: (params) => BoardService.updatePost(params),
    };
  }

  /**
   * 게시글 삭제 Mutation
   */
  static mutationDeletePost(): UseMutationOptions<void, Error, number> {
    return {
      mutationFn: (id) => BoardService.deletePost(id),
    };
  }
}
