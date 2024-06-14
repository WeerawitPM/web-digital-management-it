import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const data = await req.formData() as any;
            const document_head_id = data.get("document_head_id") as string;
            let end_date = new Date(data.get("end_date") as string);

            await prisma.$transaction(async (prisma) => {
                const document_head = await prisma.document_Head.findFirst(({
                    where: {
                        ref_no: document_head_id,
                    },
                    select: {
                        Table_ITC_0005: {
                            select: {
                                id: true,
                            }
                        }
                    }
                }))
                const table_ITC_0005 = await prisma.table_ITC_0005.update({
                    where: {
                        id: document_head?.Table_ITC_0005[0]?.id,
                    },
                    data: {
                        end_date: end_date,
                    }
                })
            })
            return Response.json({
                status: "success",
                message: "Change end date successfully",
            })
        } catch (error) {
            console.error('Error:', error);
            return Response.json({
                status: "fail",
                message: "Failed to change end date",
                error: error, // Include error message for debugging
            });
        } finally {
            await prisma.$disconnect();
        }
    }
}