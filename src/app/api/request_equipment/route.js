import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const dataRequest = await prisma.requestEquipment.findMany({
            where: {
                requestById: session.user.id
            },
            include: {
                requestBy: true,
                ApproveEquipment: {
                    include: {
                        approveBy: true
                    }
                }
            }
        });
        prisma.$disconnect();
        return Response.json(dataRequest);
    }
};
