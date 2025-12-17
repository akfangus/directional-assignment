/**
 * 로그인 페이지 통합 훅
 * useLoginForm + useLoginMutation 조합
 */

import { useCallback } from "react";
import { useLoginForm } from "./use-login-form";
import { useLoginMutation } from "./use-login-mutation";

export function useLogin() {
  const { formData, handleChange } = useLoginForm();
  const { mutate, isPending } = useLoginMutation();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutate(formData);
    },
    [formData, mutate]
  );

  return {
    formData,
    isPending,
    handleChange,
    handleSubmit,
  };
}
