import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ status: "fail", message: "You are not logged in" });
  } else {
    return Response.json({session});
  }
}