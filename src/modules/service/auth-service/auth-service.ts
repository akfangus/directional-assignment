/**
 * 인증 API 서비스
 */

import { apiClient } from "@/shared/apis";

export class AuthService {
  /**
   * 로그인
   */
  static async login(params: Auth.LoginParams): Promise<Auth.LoginResponse> {
    const response = await apiClient.post<Auth.LoginResponse>(
      "/auth/login",
      params
    );
    return response.data;
  }
}
