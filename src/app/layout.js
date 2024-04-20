import { Inter } from "next/font/google";
import "./globals.css";
// import 'bootstrap/dist/css/bootstrap.css'
import { Providers } from "./providers";
import Layout from "./layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-full">
            <Layout />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
