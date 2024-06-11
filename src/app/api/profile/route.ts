import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const data = await req.formData();

            const [firstname, lastname, tel] = [
                'firstname', 'lastname', 'tel'
            ].map(field => data.get(field) as string);

            const updateUser = await prisma.user.update({
                where: {
                    id: parseInt(session?.user?.id)
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    tel: tel,
                }
            });

            await prisma.$disconnect();
            return Response.json({ status: "success", message: "Update user success!!!" });
        } catch (error) {
            console.error('Error:', error);
            await prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to update user",
                error: error, // Include error message for debugging
            });
        }
    }
}