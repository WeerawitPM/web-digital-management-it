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
                Table_ITC_0009: {
                    select: {
                        request_by: {
                            select: {
                                username: true
                            }
                        }
                    }
                },
                Track_Doc: true
            }
        });

        await prisma.$disconnect();

        let document: any = [];

        // วนลูปผ่านข้อมูลแต่ละรายการและเพิ่มข้อมูลใน document
        data.forEach(request => {
            // เช็คสถานะและเพิ่มข้อมูลของเอกสารที่ต้องการ
            if (request.step === 2) {
                const filteredTrackDoc = request.Track_Doc.filter(item => item.step === 2 && item.status === 1);
                if (filteredTrackDoc.length > 0) {
                    document.push({
                        ...request,
                    });
                }
            }
        });

        // ส่งข้อมูลที่กรองแล้วในรูปแบบของอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์กลับไป
        return Response.json(document);
    }
};
