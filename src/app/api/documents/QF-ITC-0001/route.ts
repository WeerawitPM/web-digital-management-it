import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const doc_no = searchParam.get("doc_no") as string;

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
                        asset: {
                            include: {
                                asset_type: true
                            }
                        },
                        Table_Ref_Quotation: true
                    }
                },
                Track_Doc: {
                    include: {
                        user: {
                            select: {
                                firstname: true,
                                lastname: true,
                                emp_id: true,
                                company: true,
                                position: true,
                                department: true,
                                tel: true,
                                license: true
                            }
                        }
                    }
                }
            }
        });
        prisma.$disconnect();
        return Response.json(data);
    }
};