import { AuthService } from "@/modules/service/auth-service";

export class AuthQueries {
  /**
   * 로그인 Mutation
   * mutateAsync(params)로 파라미터를 전달받음
   */
  static login() {
    return {
      mutationFn: (params: Auth.LoginParams) => AuthService.login(params),
    };
  }
}
