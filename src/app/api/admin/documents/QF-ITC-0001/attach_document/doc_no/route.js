import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET(req) {
    const session = await getServerSession(authOptions);
    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const doc_no = searchParam.get("doc_no");

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const data = await prisma.document_Head.findUnique({
            where: {
                ref_no: doc_no
            },
            include: {
                Table_ITC_0001: {
                    include: {
                        request_by: {
                            select: {
                                firstname: true,
                                lastname: true,
                                emp_id: true,
                                company: true,
                                position: true,
                                department: true,
                                tel: true
                            }
                        },
                        asset: true,
                        Table_Ref_Quotation: true
                    }
                },
                Track_Doc: true
            }
        });
        prisma.$disconnect();
        return Response.json(data);
    }
};

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
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to update document",
                error: error.message, // Include error message for debugging
            });
        }
    }
}