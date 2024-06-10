import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const url = new URL(req.url);
        const searchParam = new URLSearchParams(url.searchParams);
        const status = parseInt(searchParam.get("status") as string);
        const step = 2;

        const manager = await prisma.user.findUnique({
            where: {
                id: parseInt(session.user?.id)
            },
            select: {
                company_id: true,
                department_id: true
            }
        })

        if (status === 0) {
            const data = await prisma.document_Head.findMany({
                where: {
                    status: status,
                    step: step,
                    document: {
                        name: "QF-ITC-0001"
                    },
                    Table_ITC_0001: {
                        some: {
                            request_by: {
                                company_id: manager?.company_id,
                                department_id: manager?.department_id
                            }
                        }
                    },
                    Track_Doc: {
                        some: {
                            step: step,
                            status: status
                        }
                    },
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
            await prisma.$disconnect();
            return Response.json(data);
        }

        const data = await prisma.document_Head.findMany({
            where: {
                Table_ITC_0001: {
                    some: {
                        request_by: {
                            company_id: manager?.company_id,
                            department_id: manager?.department_id
                        }
                    }
                },
                Track_Doc: {
                    some: {
                        step: step,
                        status: status
                    }
                },
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
        await prisma.$disconnect();
        return Response.json(data);
    }
};

