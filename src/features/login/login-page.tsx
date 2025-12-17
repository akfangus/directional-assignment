"use client";

/**
 * LoginPage - 로그인 페이지 컨테이너
 * 로직은 커스텀 훅으로 위임
 */

import { LoginForm } from "./components/login-form";
import { LoginCard } from "./components/login-card";
import { PageContainer } from "./login-styled";
import { useLogin } from "./hooks/use-login";

export function LoginPage(): React.ReactElement {
  const { formData, isPending, handleChange, handleSubmit } = useLogin();

  return (
    <PageContainer>
      <LoginCard>
        <LoginForm
          formData={formData}
          isPending={isPending}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </LoginCard>

      <div>
        <p>email : akfanakfan@naver.com</p>
        <p>password : R3pS4tQwU5</p>
      </div>
    </PageContainer>
  );
}
