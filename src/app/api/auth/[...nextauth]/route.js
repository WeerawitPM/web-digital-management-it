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
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                    include: {
                        user_status: true,
                        role: true
                    }
                })
                prisma.$disconnect();
                if (user && user.password === credentials.password) {
                    return {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        image: user.image,
                        role: user.role.name,
                        status: user.user_status.name
                    }
                } else {
                    return null
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        // strategy: "database",
        // maxAge: 30 * 24 * 60 * 60,
        // updateAge: 24 * 60 * 60,
        // generateSessionToken: () => {
        //     return randomUUID?.() ?? randomBytes(32).toString("hex")
        // }
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.status = user.status
            }
            return token
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id
                session.user.role = token.role
                session.user.status = token.status
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
    },
})
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
