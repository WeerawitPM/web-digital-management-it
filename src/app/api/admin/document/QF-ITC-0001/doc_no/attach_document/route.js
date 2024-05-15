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

            const updatePrice = await prisma.table_ITC_0001.update({
                where: {
                    id: id
                },
                data: {
                    price: price
                }
            })
            prisma.$disconnect();
            return Response.json({ status: "success", message: updatePrice });
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