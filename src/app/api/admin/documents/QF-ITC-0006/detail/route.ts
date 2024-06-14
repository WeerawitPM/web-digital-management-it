import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();

        const data = await prisma.document_Head.findMany({
            where: {
                document: {
                    name: "QF-ITC-0006"
                }
            },
            include: {
                Table_ITC_0006: {
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

