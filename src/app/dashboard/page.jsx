import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserPage from "./User";
import ManagerPage from "./Manager";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (session.user.role == "user") {
        return (
            <UserPage />
        );
    } else if (session.user.role == "manager") {
        return (
            <ManagerPage />
        );
    }
}