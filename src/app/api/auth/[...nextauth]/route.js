import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions = ({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                //check username and password
                const user = await prisma.user.findFirst({
                    where: {
                        name: credentials.username
                    }
                })
                prisma.$disconnect();
                if (user && user.password === credentials.password) {
                    return { user }
                } else {
                    return null
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/login",
    // },
})
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };