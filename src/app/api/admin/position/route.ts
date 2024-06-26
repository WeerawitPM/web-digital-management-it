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
            const data = await prisma.position.findMany();
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

            // Check if position name already exists
            const existingposition = await prisma.position.findUnique({
                where: {
                    name: name,
                },
            });

            if (existingposition) {
                prisma.$disconnect();
                return Response.json({
                    status: "fail",
                    message: "Position already exists",
                });
            }

            const addPositionName = await prisma.position.create({
                data: {
                    name: name
                }
            });

            prisma.$disconnect();
            return Response.json({ status: "success", message: addPositionName });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to save position",
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

            const updatePositionName = await prisma.position.update({
                where: {
                    id: id
                },
                data: {
                    name: name
                }
            });
            prisma.$disconnect();
            return Response.json({ status: "success", message: updatePositionName });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to update position",
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
            const deletePosition = await prisma.position.delete({
                where: {
                    id: id
                }
            });
            prisma.$disconnect();
            return Response.json({ status: "success", message: deletePosition });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to delete position",
                error: error, // Include error message for debugging
            });
        }
    }
}