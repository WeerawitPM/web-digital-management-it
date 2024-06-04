import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

interface Credentials {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials: Credentials | undefined) => {
                if (!credentials) return null;

                // Map username to email
                const email = credentials.email;

                // Check username and password
                const user = await prisma.user.findUnique({
                    where: {
                        email: email // Assuming 'username' is the email
                    },
                    include: {
                        user_status: true,
                        role: true
                    }
                });
                await prisma.$disconnect();

                if (user && user.password === credentials.password) {
                    return {
                        id: user.id.toString(), // Convert id to string
                        name: user.username,
                        email: user.email,
                        image: user.image,
                        role: user.role?.name,
                        status: user.user_status?.name
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.status = (user as any).status;
            }
            return token;
        },
        session: async ({ session, token }: { session: any, token: JWT }) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.status = token.status;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
    },
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
