import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        if (session.user.role == "admin") {
            const data = await prisma.role.findMany();
            prisma.$disconnect();
            return Response.json(data);
        } else {
            return Response.json({ status: "fail", message: "You are not admin!!!" });
        }
    }
};

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const { name } = await req.json();

            // Check if role name already exists
            const existingrole = await prisma.role.findUnique({
                where: {
                    name: name,
                },
            });

            if (existingrole) {
                prisma.$disconnect();
                return Response.json({
                    status: "fail",
                    message: "role already exists",
                });
            }

            const addroleName = await prisma.role.create({
                data: {
                    name: name
                }
            });

            prisma.$disconnect();
            return Response.json({ status: "success", message: addroleName });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to save role",
                error: error, // Include error message for debugging
            });
        }
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const { id, name } = await req.json();

            const updateroleName = await prisma.role.update({
                where: {
                    id: id
                },
                data: {
                    name: name
                }
            });
            prisma.$disconnect();
            return Response.json({ status: "success", message: updateroleName });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to update role",
                error: error, // Include error message for debugging
            });
        }
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const { id } = await req.json();
            const deleterole = await prisma.role.delete({
                where: {
                    id: id
                }
            });
            prisma.$disconnect();
            return Response.json({ status: "success", message: deleterole });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to delete role",
                error: error, // Include error message for debugging
            });
        }
    }
}