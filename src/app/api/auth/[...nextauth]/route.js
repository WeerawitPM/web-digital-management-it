import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const prisma = new PrismaClient();
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
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/login",
    // },
})

export { handler as GET, handler as POST }