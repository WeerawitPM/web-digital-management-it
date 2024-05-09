import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const data = await prisma.user.findMany({
            // include: {
            //     company: true,
            //     department: true,
            //     position: true
            // }
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
                firstname: true,
                lastname: true,
                empId: true,
                tel: true,
                image: true,
                license: true,
                roleId: true,
                role: true,
                companyId: true,
                departmentId: true,
                positionId: true,
                company: true,
                department: true,
                position: true,
                status: true
            }
        });
        prisma.$disconnect();
        return Response.json(data);
    }
};

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const {
                email,
                username,
                password,
                firstname,
                lastname,
                tel,
                // image: "",
                // license: "",
                roleId,
                empId,
                companyId,
                departmentId,
                positionId,
                status,
            } = await req.json();

            // Check if user name already exists
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: email },
                        { username: username }
                    ]
                },
            });

            if (existingUser) {
                prisma.$disconnect();
                return Response.json({
                    status: "fail",
                    message: "User already exists",
                });
            } else {
                const adduserName = await prisma.user.create({
                    data: {
                        email: email,
                        username: username,
                        password: password,
                        firstname: firstname,
                        lastname: lastname,
                        tel: tel,
                        image: "",
                        license: "",
                        role: { connect: { id: roleId } },
                        empId: empId,
                        company: { connect: { id: companyId } },
                        department: { connect: { id: departmentId } },
                        position: { connect: { id: positionId } },
                        status: { connect: { id: status } },
                    }
                });
    
                prisma.$disconnect();
                return Response.json({ status: "success", message: adduserName });
            }
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to save user",
                error: error.message, // Include error message for debugging
            });
        }
    }
}

export async function PATCH(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const { id, name } = await req.json();

            const updateuserName = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: name
                }
            });
            prisma.$disconnect();
            return Response.json({ status: "success", message: updateuserName });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to update user",
                error: error.message, // Include error message for debugging
            });
        }
    }
}

export async function DELETE(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const { id } = await req.json();
            const deleteuser = await prisma.user.delete({
                where: {
                    id: id
                }
            });
            prisma.$disconnect();
            return Response.json({ status: "success", message: deleteuser });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to delete user",
                error: error.message, // Include error message for debugging
            });
        }
    }
}