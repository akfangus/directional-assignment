/**
 * 게시판 (Board) 관련 타입 정의
 * 네임스페이스를 통해 전역에서 Board.Post, Board.Category 등으로 사용 가능
 */

declare namespace Board {
  /**
   * 게시글 카테고리
   */
  type Category = "NOTICE" | "QNA" | "FREE";

  /**
   * 정렬 순서
   */
  type OrderType = "asc" | "desc";

  /**
   * 게시글 엔티티
   */
  interface Post {
    id: string;
    userId: string;
    title: string;
    body: string;
    category: Category;
    tags: string[];
    createdAt: string;
  }

  /**
   * 게시글 목록 응답
   */
  interface PostsResponse {
    items: Post[];
    count: number;
    nextCursor?: string;
    prevCursor?: string;
  }

  /**
   * 게시글 목록 조회 파라미터
   */
  interface PostsParams {
    page?: number;
    limit?: number;
    category?: Category;
    search?: string;
    sort?: string;
    order?: OrderType;
    cursor?: string;
  }

  /**
   * 게시글 생성 파라미터
   */
  interface CreatePostParams {
    title: string;
    body: string;
    category: Category;
    tags?: string[];
  }

  /**
   * 게시글 수정 파라미터
   */
  interface UpdatePostParams {
    title?: string;
    body?: string;
    category?: Category;
    tags?: string[];
  }
}
