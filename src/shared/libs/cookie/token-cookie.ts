/**
 * 쿠키 관련 유틸리티 함수
 */

const TOKEN_COOKIE_NAME = "accessToken";
const TOKEN_EXPIRES_COOKIE_NAME = "tokenExpiresAt";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * 쿠키 설정 (클라이언트)
 */
export function setTokenCookie(token: string): void {
  if (typeof document === "undefined") return;

  const expiresAt = new Date(Date.now() + ONE_DAY_MS);

  // 토큰 쿠키
  document.cookie = `${TOKEN_COOKIE_NAME}=${token}; path=/; expires=${expiresAt.toUTCString()}; SameSite=Lax`;

  // 만료 시간 쿠키
  document.cookie = `${TOKEN_EXPIRES_COOKIE_NAME}=${expiresAt.getTime()}; path=/; expires=${expiresAt.toUTCString()}; SameSite=Lax`;
}

/**
 * 쿠키 삭제 (클라이언트)
 */
export function removeTokenCookie(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `${TOKEN_EXPIRES_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * 쿠키에서 토큰 가져오기 (클라이언트)
 */
export function getTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === TOKEN_COOKIE_NAME) {
      return value || null;
    }
  }
  return null;
}

export { TOKEN_COOKIE_NAME, TOKEN_EXPIRES_COOKIE_NAME };
