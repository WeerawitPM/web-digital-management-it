import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const step = 2;
        const data = await prisma.document_Head.findMany({
            where: {
                step: step,
                document: {
                    name: "QF-ITC-0003"
                },
                Track_Doc: {
                    some: {
                        step: step,
                        status: 0
                    }
                }
            },
            include: {
                Table_ITC_0003: {
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
        await prisma.$disconnect();
        return Response.json(data);
    }
};