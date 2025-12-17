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
import {
  getTokenFromCookie,
  removeTokenCookie,
} from "@/shared/libs/cookie/token-cookie";

/**
 * 토큰 만료 시 처리 함수
 */
function handleTokenExpired(): void {
  // 쿠키에서 토큰 제거
  removeTokenCookie();

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

/**
 * Axios 인스턴스 생성
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_HOST,
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
    const token = getTokenFromCookie();

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
