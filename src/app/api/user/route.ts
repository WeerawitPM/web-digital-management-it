import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const data = await prisma.user.findUnique({
            where: {
                id: parseInt(session.user.id)
            },
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
                emp_id: true,
                company: true,
                department: true,
                position: true
            }
        });
        await prisma.$disconnect();
        return Response.json(data);
    }
};
