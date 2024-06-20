import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const data = await prisma.document_Head.findMany({
            where: {
                document: {
                    name: "QF-ITC-0009"
                },
            },
            include: {
                Track_Doc: true
            }
        });

        await prisma.$disconnect();

        // สร้างอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์
        const status = {
            "waitApprove": 0,
            "approved": 0,
            "rejected": 0
        };

        // วนลูปผ่านข้อมูลแต่ละรายการและเพิ่มจำนวนของแต่ละสถานะ
        data.forEach(request => {
            // เช็คสถานะและเพิ่มจำนวนของแต่ละสถานะ
            if (request.step === 1) {
                request.Track_Doc.forEach(item => {
                    if (item.step === 1) {
                        if (item.status === 0) {
                            status["waitApprove"]++;
                        }
                        if (item.status === 2) {
                            status["rejected"]++;
                        }
                    }
                })
            }
            if (request.step === 2) {
                request.Track_Doc.forEach(item => {
                    if (item.step === 1) {
                        if (item.status === 1) {
                            status["approved"]++;
                        }
                    }
                })
            }
        });

        // ส่งข้อมูลที่กรองแล้วในรูปแบบของอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์กลับไป
        return Response.json(status);
    }
};
