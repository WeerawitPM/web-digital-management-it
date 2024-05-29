import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function PATCH(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const data = await req.formData();
            const document_head_id = data.get("document_head_id");
            let step = parseInt(data.get("step"));
            const status = parseInt(data.get("status"));
            const remark = data.get("remark");
            const ref_ro = data.get("ref_ro");

            const findTrack = await prisma.track_Doc.findFirst({
                where: {
                    document_head_id: document_head_id,
                    step: step
                }
            });

            if (findTrack) {
                if (status === 1) {
                    try {
                        step = step + 1;
                        const result = await prisma.$transaction([
                            prisma.track_Doc.update({
                                where: {
                                    id: findTrack.id
                                },
                                data: {
                                    status: status,
                                    remark: remark,
                                    user: { connect: { id: session.user.id } },
                                    end_date: new Date(Date.now())
                                }
                            }),
                            prisma.document_Head.update({
                                where: {
                                    ref_no: document_head_id
                                },
                                data: {
                                    step: step,
                                }
                            }),
                            prisma.table_ITC_0001.updateMany({
                                where: {
                                    document_head_id: document_head_id
                                },
                                data: {
                                    ref_ro: ref_ro
                                }
                            })
                        ]);
                        await prisma.$disconnect();
                        return Response.json({ status: "success", message: result });
                    } catch (error) {
                        await prisma.$disconnect();
                        return Response.json({
                            status: "fail",
                            message: "Failed to update document",
                            error: error.message, // Include error message for debugging
                        });
                    }
                } else {
                    try {
                        const result = await prisma.$transaction([
                            prisma.track_Doc.update({
                                where: {
                                    id: findTrack.id
                                },
                                data: {
                                    status: status,
                                    remark: remark,
                                    user: { connect: { id: session.user.id } },
                                    end_date: new Date(Date.now())
                                }
                            }),
                            prisma.document_Head.update({
                                where: {
                                    ref_no: document_head_id
                                },
                                data: {
                                    step: step,
                                    status: status
                                }
                            })
                        ]);
                        await prisma.$disconnect();
                        return Response.json({ status: "success", message: result });
                    } catch (error) {
                        await prisma.$disconnect();
                        return Response.json({
                            status: "fail",
                            message: "Failed to update document",
                            error: error.message, // Include error message for debugging
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            await prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to update document",
                error: error.message, // Include error message for debugging
            });
        }
    }
}