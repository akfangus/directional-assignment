/**
 * 금칙어 필터 유틸리티
 */

export const FORBIDDEN_WORDS = [
  "캄보디아",
  "프놈펜",
  "불법체류",
  "텔레그램",
] as const;

/**
 * 텍스트에 금칙어가 포함되어 있는지 검사
 * @param text 검사할 텍스트
 * @returns 금칙어가 포함되어 있으면 true
 */
export function hasForbiddenWords(text: string): boolean {
  return FORBIDDEN_WORDS.some((word) => text.includes(word));
}

/**
 * 텍스트에서 금칙어 찾기
 * @param text 검사할 텍스트
 * @returns 발견된 금칙어 배열
 */
export function findForbiddenWords(text: string): string[] {
  return FORBIDDEN_WORDS.filter((word) => text.includes(word));
}

type ValidationResult = {
  valid: boolean;
  message?: string;
};

/**
 * 게시글 작성/수정 시 금칙어 검증
 * @param params 게시글 파라미터
 * @returns 금칙어가 포함되어 있지 않으면 true
 */
export function validatePostParams(
  params: Board.CreatePostParams | Board.UpdatePostParams
): ValidationResult {
  const titleWords = findForbiddenWords(params.title ?? "");
  const bodyWords = findForbiddenWords(params.body ?? "");

  if (titleWords.length > 0) {
    return {
      valid: false,
      message: `제목에 금칙어가 포함되어 있습니다: ${titleWords.join(", ")}`,
    };
  }

  if (bodyWords.length > 0) {
    return {
      valid: false,
      message: `본문에 금칙어가 포함되어 있습니다: ${bodyWords.join(", ")}`,
    };
  }

  return { valid: true };
}
