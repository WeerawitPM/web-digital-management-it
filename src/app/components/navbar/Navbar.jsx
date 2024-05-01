"use client";
import { useSession } from "next-auth/react";
import UserNavbar from "./UserNavbar";
import AnonymousNavbar from "./AnonymousNavbar";

export default function Navbar({ children }) {
    const { data: session, status } = useSession();

    if (status === "authenticated" && session.user) {
        return <>
            <UserNavbar />
        </>;
    } else {
        return <AnonymousNavbar />;
    }
}