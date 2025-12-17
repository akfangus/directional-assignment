/**
 * 게시판 API 타입 정의
 */

export interface BoardPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export interface BoardPostsResponse {
  items: BoardPost[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CreateBoardPostParams {
  title: string;
  content: string;
}

export interface UpdateBoardPostParams extends CreateBoardPostParams {
  id: number;
}

export interface BoardPostsParams {
  page?: number;
  limit?: number;
  search?: string;
}
