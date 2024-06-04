import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    } else {
        if (session.user.role === "admin") {
            try {
                const data = await prisma.company.findMany();
                prisma.$disconnect();
                return Response.json(data);
            } catch (error) {
                console.error('Error:', error);
                prisma.$disconnect();
                return Response.json({ status: "fail", message: "Failed to fetch company data", error: error });
            }
        } else {
            return Response.json({ status: "fail", message: "You are not admin!!!" });
        }
    }
};

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    }

    try {
        const { name } = await req.json();

        if (!name) {
            return Response.json({ status: "fail", message: "Company name is required" });
        }

        const existingCompany = await prisma.company.findUnique({
            where: { name }
        });

        if (existingCompany) {
            return Response.json({ status: "fail", message: "Company name already exists" });
        }

        const addCompanyName = await prisma.company.create({
            data: { name }
        });

        return Response.json({ status: "success", message: addCompanyName });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ status: "fail", message: "Failed to save company name", error: error });
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    }

    try {
        const { id, name } = await req.json();

        if (!id || !name) {
            return Response.json({ status: "fail", message: "Company ID and name are required" });
        }

        const updatedCompany = await prisma.company.update({
            where: { id },
            data: { name }
        });

        return Response.json({ status: "success", message: updatedCompany });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ status: "fail", message: "Failed to update company name", error: error });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ status: "fail", message: "You are not logged in" });
    }

    try {
        const { id } = await req.json();
        const deleteCompanyName = await prisma.company.delete({
            where: {
                id: id
            }
        });
        prisma.$disconnect();
        return Response.json({ status: "success", message: deleteCompanyName });
    } catch (error) {
        console.error('Error:', error);
        prisma.$disconnect();
        return Response.json({
            status: "fail",
            message: "Failed to delete company name",
            error: error, // Include error message for debugging
        });
    }
}