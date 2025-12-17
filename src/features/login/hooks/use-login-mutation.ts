/**
 * 로그인 API 호출 및 성공/실패 처리 훅
 */

import { useRouter } from "next/navigation";
import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { AuthQueries } from "@/modules/queries/auth-queries";

export function useLoginMutation() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { message } = App.useApp();

  const mutation = useMutation({
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

  return mutation;
}
