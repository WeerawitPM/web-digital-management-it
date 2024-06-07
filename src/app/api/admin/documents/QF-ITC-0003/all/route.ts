import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const data = await prisma.document_Head.findMany({
            where: {
                document: {
                    name: "QF-ITC-0003"
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
                Track_Doc: true
            }
        });
        await prisma.$disconnect();

        // Add sequential numbering to each item
        const numberedData = data.map((item, index) => ({
            ...item,
            sequenceNumber: index + 1
        }));

        return Response.json(numberedData);
    }
};