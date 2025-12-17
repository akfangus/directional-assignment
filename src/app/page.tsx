/**
 * 루트 페이지 - 게시판으로 리다이렉트
 */

import { redirect } from "next/navigation";

export default function RootPage(): never {
  redirect("/board");
}
