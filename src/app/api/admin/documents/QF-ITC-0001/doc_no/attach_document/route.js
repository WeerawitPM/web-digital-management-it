import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function PATCH(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const data = await req.formData();
            const id = parseInt(data.get("id"));
            const price = parseFloat(data.get("price"));
            const document = data.get("document");

            const findDocument = await prisma.table_Ref_Quotation.findFirst({
                where: {
                    name: document?.name
                }
            })

            if (document === null || document === "null" || document?.name === findDocument?.name) {
                const result = await prisma.$transaction([
                    prisma.table_ITC_0001.update({
                        where: {
                            id: id
                        },
                        data: {
                            price: price
                        }
                    }),
                ]);
                prisma.$disconnect();
                return Response.json({ status: "success", message: result[0] });
            }
            else {
                //ส่ง username และ file ไปที่ api
                const uploadData = new FormData();
                uploadData.append('document', document);

                const response = await axios.post('http://localhost:3001/upload/document/QF-ITC-0001', uploadData);
                const name = response.data.name;
                const path = response.data.path;

                console.log(name);
                console.log(path);

                // ใช้ Prisma transaction เพื่อรวมการอัปเดตและการสร้างข้อมูลใน transaction เดียวกัน
                const result = await prisma.$transaction([
                    prisma.table_ITC_0001.update({
                        where: {
                            id: id
                        },
                        data: {
                            price: price
                        }
                    }),
                    prisma.table_Ref_Quotation.create({
                        data: {
                            name: name,
                            path: path,
                            table_ITC_0001_id: id
                        }
                    })
                ]);
                prisma.$disconnect();
                return Response.json({ status: "success", message: result[0] });
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

            const document = await prisma.table_Ref_Quotation.findUnique({
                where: {
                    id: id
                },
                select: {
                    path: true
                }
            })

            const path = document.path;
            try {
                const response = await axios.delete('http://localhost:3001/delete/document/QF-ITC-0001', { data: { document: path } });
                if (!response.data) throw new Error("Failed to delete document");
            } catch (error) {
                return Response.json({ status: "fail", message: "Delete document fail" });
            }

            const deleteAttachDocument = await prisma.$transaction([
                prisma.table_Ref_Quotation.delete({
                    where: {
                        id: id
                    }
                })
            ]);

            prisma.$disconnect();
            return Response.json({ status: "success", message: deleteAttachDocument });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to delete company name",
                error: error.message, // Include error message for debugging
            });
        }
    }
}