import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const { writeFile, unlink } = require('fs').promises;
import { join } from 'path';
const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const data = await req.formData();
            const id = parseInt(data.get("id") as string);
            const price = parseFloat(data.get("price") as string);
            const document = data.get("document") as any;

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
                await prisma.$disconnect();
                return Response.json({ status: "success", message: result[0] });
            }
            else {
                const bytes = await document.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Create the new file name using the username and original file extension
                const fileName = document.name;

                const path = join(process.cwd(), 'public/documents/QF-ITC-0001/', fileName);
                const filePath = `/api/public/documents/QF-ITC-0001/${fileName}`;

                // Write file and create user in a try-catch block
                await writeFile(path, buffer);

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
                            name: fileName,
                            path: filePath,
                            table_ITC_0001_id: id
                        }
                    })
                ]);
                await prisma.$disconnect();
                return Response.json({ status: "success", message: result[0] });
            }
        } catch (error) {
            console.error('Error:', error);
            await prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to upload document",
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

            const document = await prisma.table_Ref_Quotation.findUnique({
                where: {
                    id: id
                },
                select: {
                    path: true
                }
            })

            if (document?.path) {
                const filePath = join(process.cwd(), document.path.replace('/api', ''));

                try {
                    // Delete the image file
                    await unlink(filePath);
                } catch (error) {
                    console.error('Failed to delete file:', error);
                    return Response.json({ status: "fail", message: "Delete file fail" });
                }
            }

            const deleteAttachDocument = await prisma.$transaction([
                prisma.table_Ref_Quotation.delete({
                    where: {
                        id: id
                    }
                })
            ]);

            await prisma.$disconnect();
            return Response.json({ status: "success", message: deleteAttachDocument });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to delete company name",
                error: error, // Include error message for debugging
            });
        }
    }
}