/**
 * Next.js Middleware - 서버 사이드 인증 체크
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_COOKIE_NAME = "accessToken";
const TOKEN_EXPIRES_COOKIE_NAME = "tokenExpiresAt";

// 인증이 필요 없는 경로
const PUBLIC_PATHS = ["/login"];

// 정적 파일 및 API 경로 제외
const EXCLUDED_PATHS = ["/_next", "/api", "/favicon.ico"];

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // 제외 경로 체크
  if (EXCLUDED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 공개 경로 체크
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // 토큰 확인
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
  const expiresAt = request.cookies.get(TOKEN_EXPIRES_COOKIE_NAME)?.value;

  // 토큰 만료 체크
  const isExpired = expiresAt ? Date.now() > Number(expiresAt) : true;
  const isAuthenticated = !!token && !isExpired;

  // 인증되지 않은 사용자가 보호된 경로 접근 시 로그인으로 리다이렉트
  if (!isAuthenticated && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 인증된 사용자가 로그인 페이지 접근 시 board로 리다이렉트
  if (isAuthenticated && isPublicPath) {
    const boardUrl = new URL("/board", request.url);
    return NextResponse.redirect(boardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
