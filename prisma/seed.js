const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.role.createMany({
        data: [
            { name: 'user' },
            { name: 'manager' },
            { name: 'admin' },
        ],
    });
    await prisma.status.createMany({
        data: [
            { name: 'Not Active' },
            { name: 'Active' },
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
            { name: 'พนักงานทั่วไป' },
            { name: 'หัวหน้างาน' },
        ],
    });
    await prisma.assetType.createMany({
        data: [
            { name: 'Hardware' },
            { name: 'Software' },
        ],
    });
    await prisma.asset.createMany({
        data: [
            { name: 'Computer', assetTypeId: 1 },
            { name: 'Notebook', assetTypeId: 1 },
            { name: 'Microsoft Office', assetTypeId: 2 },
        ],
    });
    await prisma.tableProcess.createMany({
        data: [
            { docNo: 'QF-ITC-0001', name: "User Request", step: 0 },
            { docNo: 'QF-ITC-0001', name: "IT Attach document", step: 1 },
            { docNo: 'QF-ITC-0001', name: "User Manager Approve", step: 2 },
            { docNo: 'QF-ITC-0001', name: "IT Approve", step: 3 },
            { docNo: 'QF-ITC-0001', name: "IT Manager Approve", step: 4 },
            { docNo: 'QF-ITC-0001', name: "Manager Approve", step: 5 },
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
