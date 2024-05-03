import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function POST(Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            // const { purpose } = await JSON.parse(Request.json());
            const { purpose, requestById, equipment } = await Request.json(); // Parse request body as JSON

            // Create requestEquipment
            const requestEquipment = await prisma.requestEquipment.create({
                data: {
                    purpose: purpose,
                    requestById: parseInt(requestById),
                    // requestBy: { connect: { id: parseInt(requestById) } },
                },
            });

            // Create equipment and link to requestEquipment
            const createdEquipment = [];
            for (const eq of equipment) {
                const newEquipment = await prisma.equipment.create({
                    data: {
                        assetId: parseInt(eq.assetId),
                        // asset: { connect: { id: parseInt(eq.assetId) } },
                        detail: eq.detail,
                        qty: parseInt(eq.qty),
                        requestId: parseInt(requestEquipment.id),
                        // request: { connect: { id: parseInt(requestEquipment.id) } },
                    },
                });
                createdEquipment.push(newEquipment);
            }

            prisma.$disconnect();

            // return {
            //     status: "success",
            //     requestEquipment,
            //     equipment: createdEquipment,
            // };
            return Response.json({
                status: "success",
                message: "Equipment request created successfully",
            });
        } catch (error) {
            console.error('Error:', error);
            prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to create equipment",
                error: error.message, // Include error message for debugging
            });
        }
    }
}
