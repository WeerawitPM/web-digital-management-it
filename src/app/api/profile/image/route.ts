import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const { writeFile } = require('fs').promises;
import { join } from 'path';
const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const data = await req.formData();

            const image = data.get("image") as any;
            let imagePath = "";

            if (image && image.size > 0) {
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Get the file extension
                const fileExtension = image.name.split('.').pop();

                // Create the new file name using the username and original file extension
                const fileName = `${session?.user?.name}.${fileExtension}`;

                const path = join(process.cwd(), 'public/images/userProfile/', fileName);
                imagePath = `/api/public/images/userProfile/${fileName}`;
                // Write file and create user in a try-catch block
                await writeFile(path, buffer);
            }

            const updateUser = await prisma.user.update({
                where: {
                    id: parseInt(session?.user?.id)
                },
                data: {
                    image: imagePath
                }
            });

            // Update the session with the new image path
            const updatedSession = {
                ...session,
                user: {
                    ...session.user,
                    image: imagePath
                }
            }

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