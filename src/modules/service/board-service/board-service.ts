/**
 * 게시판 API 서비스
 * API 호출만 담당하는 순수한 서비스 클래스
 */

import { apiClient } from "@/shared/apis";

export class BoardService {
  /**
   * 게시글 목록 조회
   */
  static async fetchPosts(
    params: Board.PostsParams = {}
  ): Promise<Board.PostsResponse> {
    const response = await apiClient.get<Board.PostsResponse>("/posts", {
      params,
    });
    return response.data;
  }

  /**
   * 게시글 상세 조회
   */
  static async fetchPost(id: string): Promise<Board.Post> {
    const response = await apiClient.get<Board.Post>(`/posts/${id}`);
    return response.data;
  }

  /**
   * 게시글 생성
   */
  static async createPost(params: Board.CreatePostParams): Promise<Board.Post> {
    const response = await apiClient.post<Board.Post>("/posts", params);
    return response.data;
  }

  /**
   * 게시글 수정
   */
  static async updatePost(
    id: string,
    params: Board.UpdatePostParams
  ): Promise<Board.Post> {
    const response = await apiClient.patch<Board.Post>(`/posts/${id}`, params);
    return response.data;
  }

  /**
   * 게시글 삭제
   */
  static async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/posts/${id}`);
  }
}
