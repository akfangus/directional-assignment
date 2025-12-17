/**
 * LoginCard - 로그인 카드 래퍼 컴포넌트
 * 타이틀과 children을 포함하는 카드
 */

import { LoginCard as StyledLoginCard, StyledTitle } from "../login-styled";

interface LoginCardProps {
  children: React.ReactNode;
}

export function LoginCard({ children }: LoginCardProps): React.ReactElement {
  return (
    <StyledLoginCard>
      <StyledTitle level={2}>로그인</StyledTitle>
      {children}
    </StyledLoginCard>
  );
}
