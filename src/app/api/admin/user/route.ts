import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const { writeFile, unlink } = require('fs').promises;
import { join } from 'path';
const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
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
                emp_id: true,
                tel: true,
                image: true,
                license: true,
                role: true,
                company: true,
                department: true,
                position: true,
                user_status: true
            }
        });
        await prisma.$disconnect();
        return Response.json(data);
    }
};

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const data = await req.formData();

            const [
                email, username, password, firstname, lastname, tel,
                role_id, emp_id, company_id, department_id, position_id, user_status_id
            ] = [
                'email', 'username', 'password', 'firstname', 'lastname', 'tel',
                'role_id', 'emp_id', 'company_id', 'department_id', 'position_id', 'user_status_id'
            ].map(field => data.get(field) as string);

            const file = data.get("image") as File | null;

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
                await prisma.$disconnect();
                return Response.json({
                    status: "fail",
                    message: "User already exists",
                });
            } else {
                let imagePath = "";

                if (file && file.size > 0) {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    // Get the file extension
                    const fileExtension = file.name.split('.').pop();

                    // Create the new file name using the username and original file extension
                    const fileName = `${username}.${fileExtension}`;

                    const path = join(process.cwd(), 'public/images/userProfile/', fileName);
                    imagePath = `/api/public/images/userProfile/${fileName}`;

                    // Write file and create user in a try-catch block
                    await writeFile(path, buffer);
                }

                const addUser = await prisma.user.create({
                    data: {
                        email: email,
                        username: username,
                        password: password,
                        firstname: firstname,
                        lastname: lastname,
                        tel: tel,
                        image: imagePath,
                        license: "",
                        role: { connect: { id: parseInt(role_id) } },
                        emp_id: parseInt(emp_id),
                        company: { connect: { id: parseInt(company_id) } },
                        department: { connect: { id: parseInt(department_id) } },
                        position: { connect: { id: parseInt(position_id) } },
                        user_status: { connect: { id: parseInt(user_status_id) } },
                    }
                });

                await prisma.$disconnect();
                return Response.json({ status: "success", message: "Create user success!!!" });
            }
        } catch (error) {
            console.error('Error:', error);
            await prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to save user",
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
            const data = await req.formData();

            const [id, email, username, password, firstname, lastname, tel, role_id, emp_id, company_id, department_id, position_id, user_status_id] = [
                'id', 'email', 'username', 'password', 'firstname', 'lastname', 'tel', 'role_id', 'emp_id', 'company_id', 'department_id', 'position_id', 'user_status_id'
            ].map(field => data.get(field) as string);

            const file = data.get("image") as any;

            let imagePath = "";

            if (file && file.size > 0) {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Get the file extension
                const fileExtension = file.name.split('.').pop();

                // Create the new file name using the username and original file extension
                const fileName = `${username}.${fileExtension}`;

                const path = join(process.cwd(), 'public/images/userProfile/', fileName);
                imagePath = `/api/public/images/userProfile/${fileName}`;

                // Write file and create user in a try-catch block
                await writeFile(path, buffer);
            } else {
                const userImage = await prisma.user.findUnique({
                    where: {
                        id: parseInt(id)
                    },
                    select: {
                        image: true
                    }
                })
                imagePath = userImage?.image as string;
            }

            const updateUser = await prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    email: email,
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    tel: tel,
                    image: imagePath,
                    license: "",
                    role: { connect: { id: parseInt(role_id) } },
                    emp_id: parseInt(emp_id),
                    company: { connect: { id: parseInt(company_id) } },
                    department: { connect: { id: parseInt(department_id) } },
                    position: { connect: { id: parseInt(position_id) } },
                    user_status: { connect: { id: parseInt(user_status_id) } },
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

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const { id } = await req.json();

            // Find the user by id
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                },
                select: {
                    image: true
                }
            });

            if (!user) {
                await prisma.$disconnect();
                return Response.json({ status: "fail", message: "User not found" });
            }

            if (user.image) {
                const imagePath = join(process.cwd(), user.image.replace('/api', ''));

                try {
                    // Delete the image file
                    await unlink(imagePath);
                } catch (error) {
                    console.error('Failed to delete image:', error);
                    return Response.json({ status: "fail", message: "Delete image fail" });
                }
            }

            // Delete the user
            const deleteUser = await prisma.user.delete({
                where: {
                    id: id
                }
            });

            await prisma.$disconnect();
            return Response.json({ status: "success", message: deleteUser });
        } catch (error) {
            console.error('Error:', error);
            await prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to delete user",
                error: error, // Include error message for debugging
            });
        }
    }
}