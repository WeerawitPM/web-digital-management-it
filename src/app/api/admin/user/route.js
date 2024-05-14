import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

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
            const role_id = parseInt(data.get("role_id"));
            const emp_id = parseInt(data.get("emp_id"));
            const company_id = parseInt(data.get("company_id"));
            const department_id = parseInt(data.get("department_id"));
            const position_id = parseInt(data.get("position_id"));
            const user_status_id = parseInt(data.get("user_status_id"));
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
                            role: { connect: { id: role_id } },
                            emp_id: emp_id,
                            company: { connect: { id: company_id } },
                            department: { connect: { id: department_id } },
                            position: { connect: { id: position_id } },
                            user_status: { connect: { id: user_status_id } },
                        }
                    });
                    prisma.$disconnect();
                    return Response.json({ status: "success", message: addUser });
                } else {
                    //ส่ง username และ file ไปที่ api
                    const uploadData = new FormData();
                    uploadData.append('username', username); // ส่ง username ไปด้วย
                    uploadData.append('image', file);

                    // เรียกใช้งาน API upload ภาพ
                    const response = await axios.post('http://localhost:3001/upload/userProfile', uploadData);
                    const image = response.data.imageUrl;

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
                            role: { connect: { id: role_id } },
                            emp_id: emp_id,
                            company: { connect: { id: company_id } },
                            department: { connect: { id: department_id } },
                            position: { connect: { id: position_id } },
                            user_status: { connect: { id: user_status_id } },
                        }
                    });

                    prisma.$disconnect();
                    return Response.json({ status: "success", message: addUser });
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
            const role_id = parseInt(data.get("role_id"));
            const emp_id = parseInt(data.get("emp_id"));
            const company_id = parseInt(data.get("company_id"));
            const department_id = parseInt(data.get("department_id"));
            const position_id = parseInt(data.get("position_id"));
            const user_status_id = parseInt(data.get("user_status_id"));
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
                        role: { connect: { id: role_id } },
                        emp_id: emp_id,
                        company: { connect: { id: company_id } },
                        department: { connect: { id: department_id } },
                        position: { connect: { id: position_id } },
                        user_status: { connect: { id: user_status_id } },
                    }
                });
                prisma.$disconnect();
                return Response.json({ status: "success", message: updateuserName });
            } else {

                //ส่ง username และ file ไปที่ api
                const uploadData = new FormData();
                uploadData.append('username', username); // ส่ง username ไปด้วย
                uploadData.append('image', file);

                // เรียกใช้งาน API upload ภาพ
                const response = await axios.post('http://localhost:3001/upload/userProfile', uploadData);
                const image = response.data.imageUrl;

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
                        role: { connect: { id: role_id } },
                        emp_id: emp_id,
                        company: { connect: { id: company_id } },
                        department: { connect: { id: department_id } },
                        position: { connect: { id: position_id } },
                        user_status: { connect: { id: user_status_id } },
                    }
                });

                prisma.$disconnect();
                return Response.json({ status: "success", message: updateuserName });
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
                },
                select: {
                    image: true
                }
            });

            if (!user) {
                prisma.$disconnect();
                return Response.json({ status: "fail", message: "User not found" });
            }

            if (user.image) {
                const image = user.image;
                try {
                    const response = await axios.delete('http://localhost:3001/delete/userProfile', { data: { image: image } });
                    if (!response.data) throw new Error("Failed to delete image");
                } catch (error) {
                    return Response.json({ status: "fail", message: "Delete image fail" });
                }
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