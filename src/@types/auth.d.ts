/**
 * 인증 (Auth) 관련 타입 정의
 */

declare namespace Auth {
  /**
   * 사용자 정보
   */
  interface User {
    id: string;
    email: string;
  }

  /**
   * 로그인 요청 파라미터
   */
  interface LoginParams {
    email: string;
    password: string;
  }

  /**
   * 로그인 응답
   */
  interface LoginResponse {
    token: string;
    user: User;
  }

  /**
   * 토큰 저장 데이터 (만료 시간 포함)
   */
  interface TokenData {
    token: string;
    expiresAt: number; // Unix timestamp
  }
}
