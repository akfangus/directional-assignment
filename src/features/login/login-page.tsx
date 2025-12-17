"use client";

import { useState, useCallback } from "react";
import { Form, Input, Button, Card, Typography, App } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import { AuthQueries } from "@/modules/queries/auth-queries/quth-queries";

export function LoginPage(): React.ReactElement {
  const router = useRouter();
  const { login } = useAuthStore();
  const { message } = App.useApp();
  const [formData, setFormData] = useState<Auth.LoginParams>({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    ...AuthQueries.login(),
    onSuccess: (response) => {
      login(response.user, response.token);
      message.success("로그인 성공!");
      router.replace("/board");
    },
    onError: () => {
      message.error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    },
  });

  const handleChange = useCallback(
    (field: keyof Auth.LoginParams) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutate(formData);
    },
    [formData, mutate]
  );

  return (
    <PageContainer>
      <LoginCard>
        <StyledTitle level={2}>로그인</StyledTitle>

        <form onSubmit={handleSubmit}>
          <Form.Item>
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="이메일"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />
          </Form.Item>

          <Form.Item>
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />
          </Form.Item>

          <SubmitButton type="primary" htmlType="submit" loading={isPending}>
            로그인
          </SubmitButton>
        </form>
      </LoginCard>

      <div>
        <p>email : akfanakfan@naver.com</p>
        <p>password : R3pS4tQwU5</p>
      </div>
    </PageContainer>
  );
}

const { Title } = Typography;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 24px !important;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 44px;
  font-size: 16px;
`;
