
import { Inter } from "next/font/google";
import "./globals.css";
// import 'bootstrap/dist/css/bootstrap.css'
import { UIProviders } from "./UIproviders";
import ReduxProvider from "@/lib/reduxProvider";
import AnonymousNavbar from "@/components/navbar/AnonymousNavbar";
import UserNavbar from "@/components/navbar/UserNavbar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import ManagerNavbar from "@/components/navbar/ManagerNavbar";
import SessionProvider from "./SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <UIProviders>
            <div className="min-h-full">
              <SessionProvider session={session}>
                {!session ? <AnonymousNavbar /> : (session?.user?.role === "user" ? <UserNavbar />
                  : (session?.user?.role === "manager" ? <ManagerNavbar role={session?.user?.role}/>
                    : (session?.user?.role === "admin" ? <AdminNavbar />
                      : <AnonymousNavbar />
                    )))}
                {children}
              </SessionProvider>
            </div>
          </UIProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
