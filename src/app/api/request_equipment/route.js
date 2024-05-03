import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        // const dataRequest = await prisma.requestEquipment.findMany({
        //     where: {
        //         requestById: session.user.id
        //     },
        //     include: {
        //         requestBy: true,
        //         ApproveEquipment: {
        //             include: {
        //                 approveBy: true
        //             }
        //         }
        //     }
        // });
        const dataRequest = await prisma.requestEquipment.findMany({
            where: {
                requestById: session.user.id
            },
            select: {
                id: true,
                purpose: true,
                requestDate: true,
                requestById: true,
                completeDate: true,
                step: true,
                status: true,
                remark: true,
                requestBy: {
                    select: {
                        id: true,
                        username: true
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
                                username: true
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
