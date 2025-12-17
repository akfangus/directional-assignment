/**
 * 게시글 API Queries
 * TanStack Query 기반
 */

import { apiClient } from "@/shared/apis/api-client";
import type { QueryOptions, MutationOptions } from "@tanstack/react-query";

const BASE_URL = "/posts";

/**
 * 게시글 목록 조회
 */
export const PostQueries = {
  /**
   * 게시글 목록 조회 (무한 스크롤용)
   */
  list: (params?: Post.ListParams) => ({
    queryKey: ["posts", "list", params],
    queryFn: async ({ pageParam }: { pageParam?: string }) => {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append("limit", String(params.limit));
      if (pageParam) queryParams.append("cursor", pageParam);
      if (params?.order) queryParams.append("order", params.order);
      if (params?.sort) queryParams.append("sort", params.sort);
      if (params?.search) queryParams.append("search", params.search);
      if (params?.category) queryParams.append("category", params.category);

      const response = await apiClient.get<Post.PostsResponse>(
        `${BASE_URL}?${queryParams.toString()}`
      );
      return response.data;
    },
  }),

  /**
   * 특정 게시글 조회
   */
  detail: (id: string) => ({
    queryKey: ["posts", "detail", id],
    queryFn: async () => {
      const response = await apiClient.get<Post.Post>(`${BASE_URL}/${id}`);
      return response.data;
    },
    enabled: !!id,
  }),

  /**
   * 게시글 작성
   */
  create: () => ({
    mutationFn: async (params: Post.CreateParams) => {
      const response = await apiClient.post<Post.Post>(BASE_URL, params);
      return response.data;
    },
  }),

  /**
   * 게시글 수정
   */
  update: (id: string) => ({
    mutationFn: async (params: Post.UpdateParams) => {
      const response = await apiClient.put<Post.Post>(
        `${BASE_URL}/${id}`,
        params
      );
      return response.data;
    },
  }),

  /**
   * 게시글 삭제
   */
  delete: (id: string) => ({
    mutationFn: async () => {
      await apiClient.delete(`${BASE_URL}/${id}`);
    },
  }),
};
