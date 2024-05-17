import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const dataRequest = await prisma.requestEquipment.groupBy({
            by: ['status'],
            _count: true
        });

        prisma.$disconnect();

        // สร้างออบเจ็กต์ใหม่เพื่อเก็บข้อมูลจำนวนของแต่ละสถานะ
        const filteredData = {};
        dataRequest.forEach(({ status, _count }) => {
            // กำหนดจำนวนของแต่ละสถานะลงในออบเจ็กต์ที่กรองแล้ว
            filteredData[status] = _count;
        });

        // ส่งข้อมูลที่กรองแล้วกลับไป
        return Response.json(filteredData);
    }
};
