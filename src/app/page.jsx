"use client"

import React from "react";
import AnonymousPage from "./AnonymousPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session?.user) {
    return (
      redirect("/dashboard/user")
    );
  } else {
    return (
      <AnonymousPage />
    );
  }
}
