import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const status = 2;
        const data = await prisma.document_Head.findMany({
            where: {
                status: status,
                Track_Doc: {
                    some: {
                        user_id: session?.user?.id,
                        status: status
                    }
                }
            },
            include: {
                Table_ITC_0001: {
                    select: {
                        request_by: {
                            select: {
                                username: true
                            }
                        }
                    }
                },
                Track_Doc: {
                    where: {
                        status: status
                    }
                }
            }
        });
        prisma.$disconnect();
        return Response.json(data);
    }
};