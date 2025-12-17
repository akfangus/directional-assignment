/**
 * 게시글 관련 타입 정의
 */

declare namespace Post {
  /**
   * 게시글 객체
   */
  type Category = "NOTICE" | "QNA" | "FREE";

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
    nextCursor: string | null;
    prevCursor: string | null;
  }

  /**
   * 게시글 작성 파라미터
   */
  interface CreateParams {
    title: string;
    body: string;
    category: Category;
    tags: string[];
  }

  /**
   * 게시글 수정 파라미터
   */
  interface UpdateParams extends CreateParams {}

  /**
   * 게시글 목록 조회 파라미터
   */
  interface ListParams {
    limit?: number;
    cursor?: string;
    order?: "asc" | "desc";
    sort?: "title" | "createdAt";
    search?: string;
    category?: Category;
  }
}
