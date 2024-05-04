
import { Inter } from "next/font/google";
import "./globals.css";
// import 'bootstrap/dist/css/bootstrap.css'
import { UIProviders } from "./UIproviders";
import ReduxProvider from "@/lib/reduxProvider";
import UserNavbar from "@/components/navbar/UserNavbar";
import AnonymousNavbar from "@/components/navbar/AnonymousNavbar";
import SessionProvider from "./SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <UIProviders>
            <div className="min-h-full">
              <SessionProvider session={session}>
                {session ? <UserNavbar /> : <AnonymousNavbar />}
                {children}
              </SessionProvider>
            </div>
          </UIProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
