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
                    name: "QF-ITC-0003"
                },
                Table_ITC_0003: {
                    some: {
                        request_by_id: parseInt(session?.user?.id)
                    }
                }
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
            if (request.status === 0) {
                status["waitApprove"]++;
            } else if (request.status === 1) {
                status["approved"]++;
            } else if (request.status === 2) {
                status["rejected"]++;
            }
        });

        // ส่งข้อมูลที่กรองแล้วในรูปแบบของอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์กลับไป
        return Response.json(status);
    }
};
