import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const data = await req.formData();
            const oldPassword = data.get('oldPassword') as string;
            const newPassword = data.get('newPassword') as string;

            const user = await prisma.user.findFirst({
                where: {
                    id: parseInt(session.user.id)
                },
                select: {
                    password: true
                }
            });

            if (user && await bcrypt.compare(oldPassword, user.password)) {
                const saltRounds = 10;
                const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

                await prisma.user.update({
                    where: {
                        id: parseInt(session.user.id)
                    },
                    data: {
                        password: hashedNewPassword
                    }
                });

                await prisma.$disconnect();
                return Response.json({ status: "success", message: "Update password success!!!" });
            } else {
                await prisma.$disconnect();
                return Response.json({ status: "fail", message: "Old password is incorrect" });
            }
        } catch (error) {
            console.error('Error:', error);
            await prisma.$disconnect();
            return Response.json({ status: "fail", message: "Failed to reset password", error: error });
        }
    }
}
