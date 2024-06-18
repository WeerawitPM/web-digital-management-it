import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        try {
            const request_by_id = session?.user?.id;
            const data = await req.formData() as any;
            const [
                computer_type, computer_purpose, monitor_type, monitor_purpose, printer_type, printer_purpose,
                ups_type, ups_purpose, etc, etc_purpose
            ] = [
                'computer_type', 'computer_purpose', 'monitor_type', 'monitor_purpose', 'printer_type', 'printer_purpose',
                'ups_type', 'ups_purpose', 'etc', 'etc_purpose'
            ].map(field => data.get(field) as string);

            const start_date = new Date(data.get("start_date") as string); // Ensure start_date is a Date object
            const end_date = new Date(data.get("end_date") as string); // Ensure start_date is a Date object

            // Generate requestID
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2); // ใช้แค่สองตัวท้ายของปี
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const docId = "QF-ITC-0009";
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

            await prisma.$transaction(async (prisma) => {
                const findDoc = await prisma.document.findFirst({
                    where: {
                        name: docId
                    }
                });
                // Create documentHead
                const documentHead = await prisma.document_Head.create({
                    data: {
                        ref_no: requestId,
                        step: 1,
                        document_id: findDoc?.id,
                        end_date: null
                    },
                });

                const tableITC0009 = await prisma.table_ITC_0009.create({
                    data: {
                        computer_type: computer_type,
                        computer_purpose: computer_purpose,
                        monitor_type: monitor_type,
                        monitor_purpose: monitor_purpose,
                        printer_type: printer_type,
                        printer_purpose: printer_purpose,
                        ups_type: ups_type,
                        ups_purpose: ups_purpose,
                        etc: etc,
                        etc_purpose: etc_purpose,
                        start_date: start_date,
                        end_date: end_date,
                        request_by_id: parseInt(request_by_id),
                        document_head_id: requestId
                    },
                });

                const tableRouting = await prisma.routing.findMany({
                    where: {
                        document: {
                            name: docId
                        }
                    }
                });

                // Create and link to requestEquipment
                const createTrackDoc = [];
                for (const item of tableRouting) {
                    const newStep = await prisma.track_Doc.create({
                        data: {
                            step: item.step,
                            name: item.name,
                            document_head_id: requestId
                        }
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
                            status: 1,
                            user_id: parseInt(session.user.id)
                        }
                    });
                }
            });

            return Response.json({
                status: "success",
                message: "Request created successfully",
                requestId: requestId, // Include the generated ID in the response
            })
        } catch (error) {
            console.error('Error:', error);
            return Response.json({
                status: "fail",
                message: "Failed to create request",
                error: error, // Include error message for debugging
            });
        } finally {
            await prisma.$disconnect();
        }
    }
}