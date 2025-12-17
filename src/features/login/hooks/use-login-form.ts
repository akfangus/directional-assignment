/**
 * 로그인 폼 상태 관리 훅
 */

import { useState, useCallback } from "react";

export function useLoginForm() {
  const [formData, setFormData] = useState<Auth.LoginParams>({
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (field: keyof Auth.LoginParams) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  return {
    formData,
    handleChange,
  };
}
