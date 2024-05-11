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
        const dataRequest = await prisma.requestEquipment.findUnique({
            where: {
                id: parseInt(doc_no)
            },
            // include: {
            //     requestBy: {
            //         include: {
            //             company: true,
            //             department: true,
            //             position: true
            //         }
            //     },
            //     Equipment: {
            //         include: {
            //             asset: true
            //         }
            //     },
            //     ApproveEquipment: {
            //         include: {
            //             approveBy: true
            //         }
            //     }
            // }
            include: {
                requestBy: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                        tel: true,
                        image: true,
                        license: true,
                        role: true,
                        empId: true,
                        companyId: true,
                        departmentId: true,
                        positionId: true,
                        company: true,
                        department: true,
                        position: true
                    }
                },
                Equipment: {
                    include: {
                        asset: true
                    }
                },
                ApproveEquipment: {
                    select: {
                        id: true,
                        requestId: true,
                        approveById: true,
                        step: true,
                        status: true,
                        approveBy: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                                firstname: true,
                                lastname: true,
                                tel: true,
                                image: true,
                                license: true,
                                role: true,
                                empId: true,
                                companyId: true,
                                departmentId: true,
                                positionId: true
                            }
                        }
                    }
                }
            }
        });
        prisma.$disconnect();
        return Response.json(dataRequest);
    }
};
