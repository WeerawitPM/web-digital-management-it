import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const { writeFile, unlink } = require('fs').promises;
import { join } from 'path';
const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        try {
            const request_by_id = session?.user?.id;
            const data = await req.formData() as any;
            const requirement = data.get("requirement") as string;
            const purpose = data.get("purpose") as string;
            const requirement_detail = data.get("requirement_detail") as string;
            const proposal_detail = data.get("proposal_detail") as string;
            const attached_proposals = [];

            // Collect all files whose keys start with "attached_proposal_"
            for (let key of data.keys()) {
                if (key.startsWith("attached_proposal_")) {
                    attached_proposals.push(data.get(key));
                }
            }

            // Generate requestID
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2); // ใช้แค่สองตัวท้ายของปี
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const docId = "QF-ITC-0003";
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

            // Create documentHead
            const documentHead = await prisma.document_Head.create({
                data: {
                    ref_no: requestId,
                    step: 1,
                    document_id: findDoc?.id,
                    end_date: null
                },
            });

            const tableITC0003 = await prisma.table_ITC_0003.create({
                data: {
                    requirement: requirement,
                    purpose: purpose,
                    requirement_detail: requirement_detail,
                    proposal_detail: proposal_detail,
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
            })

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

            if (attached_proposals.length != 0) {
                const table_ITC_0003_id = await prisma.document_Head.findFirst({
                    where: {
                        ref_no: requestId
                    },
                    select: {
                        Table_ITC_0003: {
                            select: {
                                id: true
                            }
                        }
                    }
                })
                let id = table_ITC_0003_id?.Table_ITC_0003[0]?.id

                // Loop through the documents and process them
                for (const document of attached_proposals) {
                    const bytes = await document.arrayBuffer();
                    const buffer = Buffer.from(bytes);

                    // Create the new file name using the username and original file extension
                    const fileName = document.name;
                    const path = join(process.cwd(), 'public/documents/QF-ITC-0003/', fileName);
                    const filePath = `/api/public/documents/QF-ITC-0003/${fileName}`;

                    // Write file and create user in a try-catch block
                    await writeFile(path, buffer);

                    const result = await prisma.attached_Proposal.create({
                        data: {
                            name: document.name,
                            path: filePath,
                            table_ITC_0003_id: id
                        }
                    });
                }
            }

            await prisma.$disconnect();
            return Response.json({
                status: "success",
                message: "Request created successfully",
                requestId: requestId, // Include the generated ID in the response
            });
        } catch (error) {
            console.error('Error:', error);
            await prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "Failed to create request",
                error: error, // Include error message for debugging
            });
        }
    }
}