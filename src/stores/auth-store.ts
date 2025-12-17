/**
 * 인증 스토어 (Zustand + persist)
 * 로그인한 사용자 정보와 토큰 만료 체크
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

const TOKEN_KEY = "accessToken";
const TOKEN_EXPIRES_KEY = "tokenExpiresAt";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface AuthState {
  user: Auth.User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (user: Auth.User, token: string) => void;
  logout: () => void;
  checkTokenExpiry: () => boolean;
  initialize: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user: Auth.User, token: string) => {
        const expiresAt = Date.now() + ONE_DAY_MS;

        // localStorage에 토큰과 만료 시간 저장
        if (typeof window !== "undefined") {
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem(TOKEN_EXPIRES_KEY, String(expiresAt));
        }

        set({ user, isAuthenticated: true });
      },

      logout: () => {
        // localStorage에서 토큰 제거
        if (typeof window !== "undefined") {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(TOKEN_EXPIRES_KEY);
        }

        set({ user: null, isAuthenticated: false });
      },

      checkTokenExpiry: () => {
        if (typeof window === "undefined") return false;

        const expiresAt = localStorage.getItem(TOKEN_EXPIRES_KEY);
        if (!expiresAt) return false;

        const isExpired = Date.now() > Number(expiresAt);

        if (isExpired) {
          get().logout();
          return true;
        }

        return false;
      },

      initialize: () => {
        // 앱 시작 시 토큰 만료 체크
        const isExpired = get().checkTokenExpiry();
        if (isExpired) {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
