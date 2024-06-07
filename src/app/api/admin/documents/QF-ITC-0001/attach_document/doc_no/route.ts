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
            const data = await req.formData();
            const document_head_id = data.get("document_head_id") as string;
            let step = parseInt(data.get("step") as string);
            const status = parseInt(data.get("status") as string);
            const remark = data.get("remark") as string;

            const findTrack = await prisma.track_Doc.findFirst({
                where: {
                    document_head_id: document_head_id,
                    step: step
                }
            });

            if (findTrack) {
                if (status === 1) {
                    step = step + 1;
                }
            }

            if (status === 1) {
                try {
                    const result = await prisma.$transaction([
                        prisma.track_Doc.update({
                            where: {
                                id: findTrack?.id
                            },
                            data: {
                                status: status,
                                remark: remark,
                                user: { connect: { id: parseInt(session.user.id) } },
                                end_date: new Date(Date.now())
                            }
                        }),
                        prisma.document_Head.update({
                            where: {
                                ref_no: document_head_id
                            },
                            data: {
                                step: step
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
                        error: error, // Include error message for debugging
                    });
                }
            } else {
                try {
                    const result = await prisma.$transaction([
                        prisma.track_Doc.update({
                            where: {
                                id: findTrack?.id
                            },
                            data: {
                                status: status,
                                remark: remark,
                                user: { connect: { id: parseInt(session.user.id) } },
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
                        error: error, // Include error message for debugging
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            await prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to update document",
                error: error, // Include error message for debugging
            });
        }
    }
}