/**
 * Axios 인스턴스 및 인터셉터 설정
 */

import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import {
  ApiError,
  HTTP_ERROR_MESSAGES,
  type ApiErrorResponse,
} from "./api-error";

/**
 * 토큰을 가져오는 함수
 * 실제 구현에서는 localStorage, cookie, 또는 상태 관리에서 가져옴
 */
function getAccessToken(): string | null {
  // 클라이언트 사이드에서만 실행
  if (typeof window === "undefined") return null;

  // TODO: 실제 토큰 저장 위치에 맞게 수정
  return localStorage.getItem("accessToken");
}

/**
 * 토큰 만료 시 처리 함수
 */
function handleTokenExpired(): void {
  // TODO: 실제 로그아웃 처리 또는 토큰 갱신 로직
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }
}

/**
 * Axios 인스턴스 생성
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 요청 인터셉터 - Authorization 헤더 추가
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터 - 에러 처리
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>): Promise<never> => {
    // 네트워크 에러 (서버에 도달하지 못함)
    if (!error.response) {
      const networkError = new ApiError(
        "네트워크 연결을 확인해주세요.",
        0,
        "NETWORK_ERROR"
      );
      return Promise.reject(networkError);
    }

    const { status, data } = error.response;

    // 401 Unauthorized - 토큰 만료 처리
    if (status === 401) {
      handleTokenExpired();
    }

    // 에러 메시지 결정
    const message =
      data?.message ||
      HTTP_ERROR_MESSAGES[status] ||
      "알 수 없는 오류가 발생했습니다.";

    const apiError = new ApiError(message, status, data?.code, data?.details);

    return Promise.reject(apiError);
  }
);

export { apiClient };
