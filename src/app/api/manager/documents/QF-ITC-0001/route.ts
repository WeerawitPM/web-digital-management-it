import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        const prisma = new PrismaClient();
        const manager = await prisma.user.findUnique({
            where: {
                id: parseInt(session.user?.id)
            },
            select: {
                company_id: true,
                department_id: true
            }
        })
        const data = await prisma.document_Head.findMany({
            where: {
                Table_ITC_0001: {
                    some: {
                        request_by: {
                            company_id: manager?.company_id,
                            department_id: manager?.department_id
                        }
                    }
                }
            },
            include: {
                Track_Doc: true
            }
        });

        prisma.$disconnect();

        // สร้างอ็อบเจ็กต์ status ภายในอ็อบเจ็กต์
        const status = {
            "waitApprove": 0,
            "approved": 0,
            "rejected": 0
        };

        // วนลูปผ่านข้อมูลแต่ละรายการและเพิ่มจำนวนของแต่ละสถานะ
        data.forEach(request => {
            // เช็คสถานะและเพิ่มจำนวนของแต่ละสถานะ
            if (request.step === 2) {
                request.Track_Doc.forEach(item => {
                    if (item.step === 2) {
                        if (item.status === 0) {
                            status["waitApprove"]++;
                        } else if (item.status === 2) {
                            status["rejected"]++;
                        }
                    }
                })
            }
            if (request.step === 3) {
                request.Track_Doc.forEach(item => {
                    if (item.step === 2) {
                        if (item.status === 1) {
                            status["approved"]++;
                        }
                    }
                })
            }
            if (request.step === 4) {
                request.Track_Doc.forEach(item => {
                    if (item.step === 2) {
                        if (item.status === 1) {
                            status["approved"]++;
                        }
                    }
                })
            }
            if (request.step === 5) {
                request.Track_Doc.forEach(item => {
                    if (item.step === 2) {
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
