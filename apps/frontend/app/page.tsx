import { redirect } from "next/navigation";

export default function HomeRedirect() {
  redirect("/public/login");
  return null;
}
