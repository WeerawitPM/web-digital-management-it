import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const data = await prisma.asset_Type.findMany(
            {
                include: {
                    Asset: true
                }
            }
        );
        prisma.$disconnect();
        return Response.json(data);
    }
};
