import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const url = new URL(req.url);
        const searchParam = new URLSearchParams(url.searchParams);
        const status = parseInt(searchParam.get("status"));
        const step = 5;

        if (status === 0) {
            const data = await prisma.document_Head.findMany({
                where: {
                    status: status,
                    Track_Doc: {
                        some: {
                            step: step,
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
                    Track_Doc: true
                }
            });
            prisma.$disconnect();
            return Response.json(data);
        }

        const data = await prisma.document_Head.findMany({
            where: {
                Track_Doc: {
                    some: {
                        step: step,
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
                Track_Doc: true
            }
        });
        prisma.$disconnect();
        return Response.json(data);
    }
};

