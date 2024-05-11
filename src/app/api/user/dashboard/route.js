import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const dataRequest = await prisma.requestEquipment.findMany({
            where: {
                requestById: session.user.id
            },
            select: {
                status: true,
            }
        });

        prisma.$disconnect();

        // สร้างอ็อบเจ็กต์ requestEquipment ภายในอ็อบเจ็กต์
        const requestEquipment = {
            "waitApprove": 0,
            "approved": 0,
            "rejected": 0
        };

        // วนลูปผ่านข้อมูลแต่ละรายการและเพิ่มจำนวนของแต่ละสถานะ
        dataRequest.forEach(request => {
            // เช็คสถานะและเพิ่มจำนวนของแต่ละสถานะ
            if (request.status === "Wait Approve") {
                requestEquipment["waitApprove"]++;
            } else if (request.status === "Approved") {
                requestEquipment["approved"]++;
            } else if (request.status === "Rejected") {
                requestEquipment["rejected"]++;
            }
        });

        // ส่งข้อมูลที่กรองแล้วในรูปแบบของอ็อบเจ็กต์ requestEquipment ภายในอ็อบเจ็กต์กลับไป
        return Response.json({ requestEquipment });
    }
};
