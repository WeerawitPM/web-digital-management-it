import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const { request_by_id, equipment } = await req.json(); // Parse request body as JSON

            // Generate requestEquipment ID
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2); // ใช้แค่สองตัวท้ายของปี
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const docId = "QF-ITC-0001";
            // Retrieve the last used request number for the current year and month
            const lastRequest = await prisma.document_Head.findFirst({
                where: {
                    ref_no: {
                        startsWith: `${docId}-${year}${month}`, // ค้นหา id ที่มีคำนำหน้าตามที่กำหนด
                    }
                },
                orderBy: [{ ref_no: 'desc' }],
                take: 1
            });


            let requestId;
            if (lastRequest) {
                const lastNumber = parseInt(lastRequest.ref_no.slice(-4)); // Extract the last 4 digits
                const newNumber = (lastNumber % 9999) + 1; // Increment the last number, reset to 1 if it reaches 9999
                requestId = `${docId}-${year}${month}${newNumber.toString().padStart(4, '0')}`;
            } else {
                // If no request exists for this year and month, start with 0001
                requestId = `${docId}-${year}${month}0001`;
            }

            const findDoc = await prisma.document.findFirst({
                where: {
                    name: docId
                }
            })
            // Create requestEquipment
            const requestEquipment = await prisma.document_Head.create({
                data: {
                    ref_no: requestId,
                    status: 1,
                    document: { connect: { id: findDoc.id } },
                    end_date: null
                },
            });

            // Create equipment and link to requestEquipment
            const createdEquipment = [];
            for (const eq of equipment) {
                const newEquipment = await prisma.table_ITC_0001.create({
                    data: {
                        asset_id: parseInt(eq.assetId),
                        purpose: eq.purpose,
                        spec_detail: eq.detail,
                        qty: parseInt(eq.qty),
                        request_by_id: parseInt(request_by_id),
                        document_head_id: requestId
                    },
                });
                createdEquipment.push(newEquipment);
            }


            const tableRouting = await prisma.routing.findMany({
                include: {
                    document: {
                        where: {
                            name: docId
                        }
                    }
                }
            })

            // Create equipment and link to requestEquipment
            const createTrackDoc = [];
            for (const item of tableRouting) {
                const newStep = await prisma.track_Doc.create({
                    data: {
                        step: item.step,
                        name: item.name,
                        document_head: { connect: { ref_no: requestId } }
                    },
                });
                createTrackDoc.push(newStep);
            }

            // Find track_Doc with step 0
            const findTrackDoc = await prisma.track_Doc.findFirst({
                where: {
                    step: 0,
                    document_head_id: requestId
                }
            });

            if (findTrackDoc) {
                // Update the track_Doc if step is 0
                const updatedTrackDoc = await prisma.track_Doc.update({
                    where: {
                        id: findTrackDoc.id, // Use the unique id here
                    },
                    data: {
                        step: 1
                    }
                });
            }

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