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
                        name: "test2",
                        path: "test2",
                        table_ITC_0001_id: id
                    }
                })
            ]);

            prisma.$disconnect();
            return Response.json({ status: "success", message: result[0] });
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