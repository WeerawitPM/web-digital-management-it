import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const { writeFile, unlink } = require('fs').promises;

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
            const data = await req.formData();
            const email = data.get("email");
            const username = data.get("username");
            const password = data.get("password");
            const firstname = data.get("firstname");
            const lastname = data.get("lastname");
            const tel = data.get("tel");
            const roleId = parseInt(data.get("roleId"));
            const empId = parseInt(data.get("empId"));
            const companyId = parseInt(data.get("companyId"));
            const departmentId = parseInt(data.get("departmentId"));
            const positionId = parseInt(data.get("positionId"));
            const statusId = parseInt(data.get("statusId"));
            const file = data.get("image");

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
                if (file == 'undefined' || undefined || null || "") {
                    const addUser = await prisma.user.create({
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
                            status: { connect: { id: statusId } },
                        }
                    });
                    prisma.$disconnect();
                    return Response.json({ status: "success", message: addUser });
                } else {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    // Get the file extension
                    const fileExtension = file.name.split('.').pop();

                    // Create the new file name using the username and original file extension
                    const fileName = `${username}.${fileExtension}`;

                    const path = `public/images/userProfile/${fileName}`;
                    const image = `/images/userProfile/${fileName}`;

                    // Write file and create user in a try-catch block
                    try {
                        await writeFile(path, buffer);

                        const addUser = await prisma.user.create({
                            data: {
                                email: email,
                                username: username,
                                password: password,
                                firstname: firstname,
                                lastname: lastname,
                                tel: tel,
                                image: image,
                                license: "",
                                role: { connect: { id: roleId } },
                                empId: empId,
                                company: { connect: { id: companyId } },
                                department: { connect: { id: departmentId } },
                                position: { connect: { id: positionId } },
                                status: { connect: { id: statusId } },
                            }
                        });

                        prisma.$disconnect();
                        return Response.json({ status: "success", message: addUser });
                    } catch (error) {
                        prisma.$disconnect();
                        return Response.json({
                            status: "fail",
                            message: "Failed to save user",
                            error: error.message, // Include error message for debugging
                        });
                    }
                }
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
            const data = await req.formData();
            const id = parseInt(data.get("id"));
            const email = data.get("email");
            const username = data.get("username");
            const password = data.get("password");
            const firstname = data.get("firstname");
            const lastname = data.get("lastname");
            const tel = data.get("tel");
            const roleId = parseInt(data.get("roleId"));
            const empId = parseInt(data.get("empId"));
            const companyId = parseInt(data.get("companyId"));
            const departmentId = parseInt(data.get("departmentId"));
            const positionId = parseInt(data.get("positionId"));
            const statusId = parseInt(data.get("statusId"));
            const file = data.get("image");

            if (file == 'undefined' || undefined || null || "") {
                const updateuserName = await prisma.user.update({
                    where: {
                        id: id
                    },
                    data: {
                        email: email,
                        username: username,
                        password: password,
                        firstname: firstname,
                        lastname: lastname,
                        tel: tel,
                        role: { connect: { id: roleId } },
                        empId: empId,
                        company: { connect: { id: companyId } },
                        department: { connect: { id: departmentId } },
                        position: { connect: { id: positionId } },
                        status: { connect: { id: statusId } },
                    }
                });
                prisma.$disconnect();
                return Response.json({ status: "success", message: updateuserName });
            } else {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Get the file extension
                const fileExtension = file.name.split('.').pop();

                // Create the new file name using the username and original file extension
                const fileName = `${username}.${fileExtension}`;

                const path = `public/images/userProfile/${fileName}`;
                const image = `/images/userProfile/${fileName}`;

                // Write file and create user in a try-catch block
                try {
                    await writeFile(path, buffer);

                    const updateuserName = await prisma.user.update({
                        where: {
                            id: id
                        },
                        data: {
                            email: email,
                            username: username,
                            password: password,
                            firstname: firstname,
                            lastname: lastname,
                            tel: tel,
                            image: image,
                            role: { connect: { id: roleId } },
                            empId: empId,
                            company: { connect: { id: companyId } },
                            department: { connect: { id: departmentId } },
                            position: { connect: { id: positionId } },
                            status: { connect: { id: statusId } },
                        }
                    });

                    prisma.$disconnect();
                    return Response.json({ status: "success", message: updateuserName });
                } catch (error) {
                    prisma.$disconnect();
                    return Response.json({
                        status: "fail",
                        message: "Failed to save user",
                        error: error.message, // Include error message for debugging
                    });
                }
            }
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

            // Find the user by id
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            });

            if (!user) {
                prisma.$disconnect();
                return Response.json({ status: "fail", message: "User not found" });
            }

            // Delete the user's image file if it exists
            if (user.image) {
                const imagePath = `public${user.image}`;
                await unlink(imagePath); // Remove the image file
            }

            const deleteUser = await prisma.user.delete({
                where: {
                    id: id
                }
            });
            prisma.$disconnect();
            return Response.json({ status: "success", message: deleteUser });
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