import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function GET(req) {
    const session = await getServerSession(authOptions);
    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const doc_no = searchParam.get("doc_no");

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const dataRequest = await prisma.requestEquipment.findUnique({
            where: {
                id: doc_no
            },
            include: {
                requestBy: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                        tel: true,
                        image: true,
                        license: true,
                        role: true,
                        empId: true,
                        companyId: true,
                        departmentId: true,
                        positionId: true,
                        company: true,
                        department: true,
                        position: true
                    }
                },
                Equipment: {
                    include: {
                        asset: true
                    }
                },
                Step: {
                    include: {
                        process: true
                    }
                },
                ApproveEquipment: {
                    select: {
                        id: true,
                        requestId: true,
                        approveById: true,
                        step: true,
                        status: true,
                        approveBy: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                                firstname: true,
                                lastname: true,
                                tel: true,
                                image: true,
                                license: true,
                                role: true,
                                empId: true,
                                companyId: true,
                                departmentId: true,
                                positionId: true
                            }
                        }
                    }
                }
            }
        });
        prisma.$disconnect();
        return Response.json(dataRequest);
    }
};

export async function PATCH(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const data = await req.formData();
            const id = data.get("id");
            const step = parseInt(data.get("step"));
            const price = parseFloat(data.get("price"));
            const file = data.get("file");
            const status = parseInt(data.get("status"));

            if (status == 1) {
                if (file == 'undefined' || undefined || null || "") {
                    const updateRequestEquipment = await prisma.requestEquipment.update({
                        where: {
                            id: id
                        },
                        data: {
                            price: price,
                            step: step + 1,
                            Step: {
                                updateMany: {
                                    where: {
                                        processId: {
                                            in: (await prisma.tableProcess.findMany({
                                                where: {
                                                    step: step
                                                },
                                                select: {
                                                    id: true
                                                }
                                            })).map(process => process.id)
                                        }
                                    },
                                    data: {
                                        status: status
                                    }
                                }
                            }
                        }
                    });

                    prisma.$disconnect();
                    return Response.json({ status: "success", message: updateRequestEquipment });
                } else {

                    // //ส่ง id และ file ไปที่ api
                    // const uploadData = new FormData();
                    // uploadData.append('id', id);
                    // uploadData.append('file', file);

                    // // เรียกใช้งาน API upload ไฟล์
                    // const response = await axios.post('http://localhost:3001/upload/userProfile', uploadData);
                    const document = "test";

                    const updateRequestEquipment = await prisma.requestEquipment.update({
                        where: {
                            id: id
                        },
                        data: {
                            document: document,
                            price: price,
                            step: step + 1,
                            Step: {
                                updateMany: {
                                    where: {
                                        processId: {
                                            in: (await prisma.tableProcess.findMany({
                                                where: {
                                                    step: step
                                                },
                                                select: {
                                                    id: true
                                                }
                                            })).map(process => process.id)
                                        }
                                    },
                                    data: {
                                        status: status
                                    }
                                }
                            }
                        }
                    });

                    prisma.$disconnect();
                    return Response.json({ status: "success", message: updateRequestEquipment });
                }
            }
            else {
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