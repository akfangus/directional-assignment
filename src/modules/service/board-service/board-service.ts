/**
 * 게시판 API 서비스
 * API 호출만 담당하는 순수한 서비스 클래스
 */

import { apiClient } from "@/shared/apis";
import type {
  BoardPost,
  BoardPostsResponse,
  BoardPostsParams,
  CreateBoardPostParams,
  UpdateBoardPostParams,
} from "@/modules/service/board-service/board-service.types";

export class BoardService {
  /**
   * 게시글 목록 조회
   */
  static async fetchPosts(
    params: BoardPostsParams = {}
  ): Promise<BoardPostsResponse> {
    const response = await apiClient.get<BoardPostsResponse>("/posts", {
      params,
    });
    return response.data;
  }

  /**
   * 게시글 상세 조회
   */
  static async fetchPost(id: number): Promise<BoardPost> {
    const response = await apiClient.get<BoardPost>(`/posts/${id}`);
    return response.data;
  }

  /**
   * 게시글 생성
   */
  static async createPost(params: CreateBoardPostParams): Promise<BoardPost> {
    const response = await apiClient.post<BoardPost>("/posts", params);
    return response.data;
  }

  /**
   * 게시글 수정
   */
  static async updatePost({
    id,
    ...params
  }: UpdateBoardPostParams): Promise<BoardPost> {
    const response = await apiClient.put<BoardPost>(`/posts/${id}`, params);
    return response.data;
  }

  /**
   * 게시글 삭제
   */
  static async deletePost(id: number): Promise<void> {
    await apiClient.delete(`/posts/${id}`);
  }
}
