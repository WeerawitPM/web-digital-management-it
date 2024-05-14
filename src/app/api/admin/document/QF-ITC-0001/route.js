import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const data = await prisma.requestEquipment.findMany({
            // where: {
            //     step: 1,
            // },
            select: {
                id: true,
                purpose: true,
                requestDate: true,
                requestById: true,
                completeDate: true,
                remark: true,
                requestBy: {
                    select: {
                        id: true,
                        username: true
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
                                username: true
                            }
                        }
                    }
                },
                Step: true
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
            const { purpose, requestById, equipment } = await req.json(); // Parse request body as JSON

            // Generate requestEquipment ID
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2); // ใช้แค่สองตัวท้ายของปี
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const doc_id = "QF-ITC-0001";
            // Retrieve the last used request number for the current year and month
            const lastRequest = await prisma.requestEquipment.findFirst({
                where: {
                    id: {
                        startsWith: `${doc_id}-${year}${month}`, // ค้นหา id ที่มีคำนำหน้าตามที่กำหนด
                    }
                },
                orderBy: [{ id: 'desc' }],
                take: 1
            });


            let requestId;
            if (lastRequest) {
                const lastNumber = parseInt(lastRequest.id.slice(-4)); // Extract the last 4 digits
                const newNumber = (lastNumber % 9999) + 1; // Increment the last number, reset to 1 if it reaches 9999
                requestId = `${doc_id}-${year}${month}${newNumber.toString().padStart(4, '0')}`;
            } else {
                // If no request exists for this year and month, start with 0001
                requestId = `${doc_id}-${year}${month}0001`;
            }

            // Create requestEquipment
            const requestEquipment = await prisma.requestEquipment.create({
                data: {
                    id: requestId,
                    purpose: purpose,
                    // requestBy: { connect: { id: parseInt(requestById) } },
                    requestById: parseInt(requestById),
                },
            });

            // Create equipment and link to requestEquipment
            const createdEquipment = [];
            for (const eq of equipment) {
                const newEquipment = await prisma.equipment.create({
                    data: {
                        assetId: parseInt(eq.assetId),
                        detail: eq.detail,
                        qty: parseInt(eq.qty),
                        requestId: requestEquipment.id,
                    },
                });
                createdEquipment.push(newEquipment);
            }


            const tableProcess = await prisma.tableProcess.findMany({
                where: {
                    docNo: doc_id
                }
            })

            // Create equipment and link to requestEquipment
            const createdStep = [];
            for (const step of tableProcess) {
                const newStep = await prisma.step.create({
                    data: {
                        requestId: requestId,
                        processId: step.id,
                    },
                });
                createdStep.push(newStep);
            }

            const updateStep = await prisma.step.update({
                where: {
                    id: 1
                },
                data: {
                    status: 1
                }
            })

            prisma.$disconnect();

            return Response.json({
                status: "success",
                message: "Equipment request created successfully",
                requestId: requestId, // Include the generated ID in the response
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
