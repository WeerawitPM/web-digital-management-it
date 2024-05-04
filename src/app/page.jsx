import AnonymousPage from "./AnonymousPage";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NotActive from "@/components/NotActive";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    console.log(session)
    if (session.user.status == "Active") {
      return (
        redirect("/dashboard")
      );
    }
    else {
      return (
        <NotActive />
      );
    }
  } else {
    return (
      <AnonymousPage />
    );
  }
}
