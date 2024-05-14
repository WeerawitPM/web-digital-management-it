import { PrismaClient } from '@prisma/client';

export async function GET() {
    const doc_id = "QF-ITC-0001"
    const prisma = new PrismaClient();
    const data = await prisma.routing.findMany({
        include: {
            document: {
                where: {
                    name: doc_id
                }
            }
        }
    });
    prisma.$disconnect();
    return Response.json(data);
};