import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        if (session.user.role == "admin") {
            const company = await prisma.company.findMany();
            const department = await prisma.department.findMany();
            const position = await prisma.position.findMany();
            const role = await prisma.role.findMany();
            const user_status = await prisma.user_Status.findMany();

            const data = {
                company: company,
                department: department,
                position: position,
                role: role,
                user_status: user_status
            }
            await prisma.$disconnect();
            return Response.json(data);
        } else {
            return Response.json({ status: "fail", message: "You are not admin!!!" });
        }
    }
};