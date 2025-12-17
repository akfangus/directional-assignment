"use client";

import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { SubmitButton } from "../login-styled";

interface LoginFormProps {
  formData: Auth.LoginParams;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    field: keyof Auth.LoginParams
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LoginForm({
  formData,
  isPending,
  onSubmit,
  onChange,
}: LoginFormProps): React.ReactElement {
  return (
    <form onSubmit={onSubmit}>
      <Form.Item>
        <Input
          size="large"
          prefix={<MailOutlined />}
          placeholder="이메일"
          type="email"
          value={formData.email}
          onChange={onChange("email")}
          required
        />
      </Form.Item>

      <Form.Item>
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="비밀번호"
          value={formData.password}
          onChange={onChange("password")}
          required
        />
      </Form.Item>

      <SubmitButton type="primary" htmlType="submit" loading={isPending}>
        로그인
      </SubmitButton>
    </form>
  );
}
