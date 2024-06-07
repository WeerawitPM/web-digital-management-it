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
            { name: 'M1' },
            { name: 'M2' },
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
            { name: "QF-ITC-0003" },
            { name: "QF-ITC-0004" },
            { name: "QF-ITC-0005" },
            { name: "QF-ITC-0006" },
            { name: "QF-ITC-0007" },
            { name: "QF-ITC-0008" },
            { name: "QF-ITC-0009" },
            { name: "QF-ITC-0010" },
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

            { document_id: 3, name: "User Request", step: 0 },
            { document_id: 3, name: "IT Accept", step: 1 },
            { document_id: 3, name: "IT Delivers", step: 2 },
            { document_id: 3, name: "User Accept", step: 3 },
            { document_id: 3, name: "IT Summary", step: 4 },
            { document_id: 3, name: "IT Manager Approve", step: 5 },
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
