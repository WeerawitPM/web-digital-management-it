import AnonymousPage from "./AnonymousPage";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import NotActive from "@/components/NotActive";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    // console.log(session)
    if (session.user.status == "Active") {
      switch (session.user.role) {
        case "admin": redirect("/admin");
        case "manager": redirect("/manager");
        case "it-manager": redirect("/it-manager");
        case "super-manager": redirect("/super-manager");
        case "user": redirect("/user");
        default:
          break;
      }
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
