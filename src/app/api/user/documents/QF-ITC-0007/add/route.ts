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
            const domain_company = data.get("domain_company") as string;
            const domain_username = data.get("domain_username") as string;
            const domain_company_type = data.get("domain_company_type") as string;
            const domain_end_date = new Date(data.get("domain_end_date") as string);
            const email_company = data.get("email_company") as string;
            const email_username = data.get("email_username") as string;
            const email_company_type = data.get("email_company_type") as string;
            const email_end_date = new Date(data.get("email_end_date") as string);

            // Generate requestID
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2); // ใช้แค่สองตัวท้ายของปี
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const docId = "QF-ITC-0007";
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

                const tableITC0007 = await prisma.table_ITC_0007.create({
                    data: {
                        domain_company: domain_company,
                        domain_username: domain_username,
                        domain_company_type: domain_company_type,
                        domain_end_date: domain_end_date,
                        email_company: email_company,
                        email_username: email_username,
                        email_company_type: email_company_type,
                        email_end_date: email_end_date,
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