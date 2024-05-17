import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const manager = await prisma.user.findUnique({
            where: {
                id: session.user?.id
            },
            select: {
                company_id: true,
                department_id: true
            }
        })
        const data = await prisma.document_Head.findMany({
            where: {
                Table_ITC_0001: {
                    some: {
                        request_by: {
                            company_id: manager.company_id,
                            department_id: manager.department_id
                        }
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
                Track_Doc: true
            }
        });

        prisma.$disconnect();
        return Response.json(data);
    }
};

