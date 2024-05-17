import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const data = await prisma.document_Head.findMany();

        prisma.$disconnect();

        // สร้างอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์
        const step = {
            "waitAttach": 0,
            "waitApprove": 0,
            "rejected": 0
        };

        // วนลูปผ่านข้อมูลแต่ละรายการและเพิ่มจำนวนของแต่ละสถานะ
        data.forEach(request => {
            // เช็คสถานะและเพิ่มจำนวนของแต่ละสถานะ
            if (request.step === 1) {
                step["waitAttach"]++;
            } else if (request.step === 3) {
                step["waitApprove"]++;
            } else if (request.status === 2) {
                step["rejected"]++;
            }
        });

        // ส่งข้อมูลที่กรองแล้วในรูปแบบของอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์กลับไป
        return Response.json(step);
    }
};
