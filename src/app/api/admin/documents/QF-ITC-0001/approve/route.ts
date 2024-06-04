import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const step = 3;
        const data = await prisma.document_Head.findMany({
            where: {
                step: step,
                Track_Doc: {
                    some: {
                        step: step,
                        status: 0
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
                        step: step
                    },
                }
            }
        });
        prisma.$disconnect();
        return Response.json(data);
    }
};