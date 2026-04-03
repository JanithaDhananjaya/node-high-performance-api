// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
    console.error('❌ Error: DATABASE_URL is missing in .env file');
    process.exit(1);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding started... 🌱');

    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = [];

    for (let i = 0; i < 1000; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
        });
    }

    // Bulk Insert
    await prisma.user.createMany({
        data: users,
        skipDuplicates: true,
    });

    console.log('Seeding finished! 1,000 users added. ✅');
}

main()
    .catch((e) => {
        console.error('Seeding Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });