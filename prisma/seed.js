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
    await prisma.asset.createMany({
        data: [
            { name: 'Computer', assetType: "Hardware" },
            { name: 'Notebook', assetType: "Hardware" },
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
