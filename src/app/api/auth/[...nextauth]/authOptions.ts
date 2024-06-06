import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = ({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
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
                await prisma.$disconnect();
                if (user && user.password === credentials.password) {
                    return {
                        id: user.id.toString(),
                        name: user.username,
                        email: user.email,
                        image: user.image,
                        role: user.role?.name,
                        status: user.user_status?.name
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
        jwt: async ({ token, user }: { token: any, user: any }) => {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.status = user.status
            }
            return token
        },
        session: async ({ session, token }: { session: any, token: any }) => {
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