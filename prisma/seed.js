// ./prisma/seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.department.createMany({
        data: [
            { name: 'IT' },
        ],
    });
    await prisma.position.createMany({
        data: [
            { name: 'พนักงานทั่วไป' },
            { name: 'หัวหน้างาน' },
        ],
    });
    await prisma.assettype.createMany({
        data: [
            { name: 'Hardware' },
            { name: 'Software' },
        ],
    });
    await prisma.asset.createMany({
        data: [
            { name: 'Computer', assetType: 1 },
            { name: 'Notebook', assetType: 1 },
            { name: 'etc.', assetType: 1 },
            { name: 'etc.', assetType: 2 },
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
