import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export async function GET() {
    const company = await prisma.company.findMany();
    const department = await prisma.department.findMany();
    const position = await prisma.position.findMany();

    const data = {
        company: company,
        department: department,
        position: position,
    }
    await prisma.$disconnect();
    return Response.json(data);
};

export async function POST(req: Request) {
    try {
        const data = await req.formData();

        const [
            email, username, password, firstname, lastname, tel,
            role_id, emp_id, company_id, department_id, position_id, user_status_id
        ] = [
            'email', 'username', 'password', 'firstname', 'lastname', 'tel',
            'role_id', 'emp_id', 'company_id', 'department_id', 'position_id', 'user_status_id'
        ].map(field => data.get(field) as string);

        // Check if user name already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            },
        });

        if (existingUser) {
            await prisma.$disconnect();
            return Response.json({
                status: "fail",
                message: "User already exists",
            });
        } else {
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const addUser = await prisma.user.create({
                data: {
                    email: email,
                    username: username,
                    password: hashedPassword,
                    firstname: firstname,
                    lastname: lastname,
                    tel: tel,
                    role: { connect: { id: parseInt(role_id) } },
                    emp_id: parseInt(emp_id),
                    company: { connect: { id: parseInt(company_id) } },
                    department: { connect: { id: parseInt(department_id) } },
                    position: { connect: { id: parseInt(position_id) } },
                    user_status: { connect: { id: parseInt(user_status_id) } },
                }
            });

            await prisma.$disconnect();
            return Response.json({ status: "success", message: "Create user success!!!" });
        }
    } catch (error) {
        console.error('Error:', error);
        await prisma.$disconnect();
        return Response.json({
            status: "fail",
            message: "Failed to create user",
            error: error, // Include error message for debugging
        });
    }
}