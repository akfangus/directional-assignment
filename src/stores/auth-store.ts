/**
 * 인증 스토어 (Zustand + persist)
 * 로그인한 사용자 정보만 관리 (토큰은 쿠키로 관리)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setTokenCookie, removeTokenCookie } from "@/shared/libs/cookie";

interface AuthState {
  user: Auth.User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (user: Auth.User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user: Auth.User, token: string) => {
        setTokenCookie(token);
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        removeTokenCookie();
        set({ user: null, isAuthenticated: false });
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
