import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const data = await prisma.document_Head.findMany({
            where: {
                document: {
                    name: "QF-ITC-0003"
                }
            },
            include: {
                Track_Doc: true
            }
        });

        await prisma.$disconnect();

        // สร้างอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์
        const step = {
            "waitAccept": 0,
            "waitDelivers": 0,
            "waitSummary": 0,
            "rejected": 0,
            "allDocuments": 0
        };

        // วนลูปผ่านข้อมูลแต่ละรายการและเพิ่มจำนวนของแต่ละสถานะ
        data.forEach(request => {
            step["allDocuments"]++
            // เช็คสถานะและเพิ่มจำนวนของแต่ละสถานะ
            if (request.step === 1) {
                request.Track_Doc.forEach(item => {
                    if (item.step === 1) {
                        if (item.status != 2) {
                            step["waitAccept"]++;
                        }
                    }
                })
            }
            if (request.step === 2) {
                if (request.status === 0) {
                    step["waitDelivers"]++;
                }
            }
            if (request.step === 4) {
                if (request.status === 0) {
                    step["waitSummary"]++;
                }
            }
            if (request.status === 2) {
                request.Track_Doc.forEach(item => {
                    if (item.user_id === parseInt(session?.user?.id)) {
                        if (item.status === 2) {
                            step["rejected"]++;
                        }
                    }
                })
            }
        });

        // ส่งข้อมูลที่กรองแล้วในรูปแบบของอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์กลับไป
        return Response.json(step);
    }
};
