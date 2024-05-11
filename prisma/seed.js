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
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
