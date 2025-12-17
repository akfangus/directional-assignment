/**
 * QueryClient 싱글톤 인스턴스
 * 서버/클라이언트 환경 모두에서 안전하게 사용 가능
 */

import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | null = null;

/**
 * QueryClient 싱글톤 인스턴스를 가져옵니다.
 * 없으면 새로 생성하고, 있으면 기존 인스턴스를 반환합니다.
 */
export function getQueryClient(): QueryClient {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1분
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return queryClient;
}
