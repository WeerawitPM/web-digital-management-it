const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.user_Status.createMany({
        data: [
            { name: 'Not Active' },
            { name: 'Active' },
        ],
    });
    await prisma.role.createMany({
        data: [
            { name: 'user' },
            { name: 'manager' },
            { name: 'it-manager' },
            { name: 'super-manager' },
            { name: 'admin' },
        ],
    });
    await prisma.company.createMany({
        data: [
            { name: 'VCS' },
            { name: 'AAA' },
        ],
    });
    await prisma.department.createMany({
        data: [
            { name: 'IT' },
            { name: 'Accouting' },
        ],
    });
    await prisma.position.createMany({
        data: [
            { name: 'O1' },
            { name: 'O2' },
            { name: 'O3' },
            { name: 'O4' },
        ],
    });
    await prisma.asset_Type.createMany({
        data: [
            { name: 'Hardware' },
            { name: 'Software' },
        ],
    });
    await prisma.asset.createMany({
        data: [
            { name: 'Computer', asset_type_id: 1 },
            { name: 'Notebook', asset_type_id: 1 },
            { name: 'Microsoft Office', asset_type_id: 2 },
        ],
    });
    await prisma.document.createMany({
        data: [
            { name: "QF-ITC-0001" },
            { name: "QF-ITC-0002" },
        ],
    });
    await prisma.routing.createMany({
        data: [
            { document_id: 1, name: "User Request", step: 0 },
            { document_id: 1, name: "IT Attach document", step: 1 },
            { document_id: 1, name: "User Manager Approve", step: 2 },
            { document_id: 1, name: "IT Approve", step: 3 },
            { document_id: 1, name: "IT Manager Approve", step: 4 },
            { document_id: 1, name: "Manager Approve", step: 5 },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
