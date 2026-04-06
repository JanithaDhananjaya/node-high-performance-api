import { PrismaClient } from '@prisma/client';
import pg from "pg";
import {PrismaPg} from "@prisma/adapter-pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Seeding 2000 posts...");

    const postsData = Array.from({ length: 2000 }).map((_, i) => ({
        title: `Post Number ${i + 1}`,
        content: `This is a long description for post ${i + 1} to make the DOM a bit heavy. `.repeat(5),
        authorId: 1015
    }));

    await prisma.post.createMany({
        data: postsData,
    });

    console.log("Done! 2000 posts added.");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());