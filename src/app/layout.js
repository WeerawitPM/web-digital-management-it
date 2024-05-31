import { Prompt } from "next/font/google";
import "./globals.css";
import { UIProviders } from "@/context/UIproviders";
import ReduxProvider from "@/lib/reduxProvider";
import AnonymousNavbar from "@/components/navbar/AnonymousNavbar";
import UserNavbar from "@/components/navbar/UserNavbar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import ManagerNavbar from "@/components/navbar/ManagerNavbar";
import SessionProvider from "@/context/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ThemeProvider } from "@/context/ThemeContext";

const prompt = Prompt({ subsets: ["thai"], weight: "400" });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressContentEditableWarning>
      <body className={prompt.className}>
        <ReduxProvider>
          <UIProviders>
            <ThemeProvider>
              <SessionProvider session={session}>
                {!session ? <AnonymousNavbar /> : (session?.user?.role === "user" ? <UserNavbar role={session?.user?.role} />
                  : (session?.user?.role === "manager" || session?.user?.role === "it-manager" || session?.user?.role === "super-manager" ? <ManagerNavbar role={session?.user?.role} />
                    : (session?.user?.role === "admin" ? <AdminNavbar role={session?.user?.role} />
                      : <AnonymousNavbar />
                    )))}
                {children}
              </SessionProvider>
            </ThemeProvider>
          </UIProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
