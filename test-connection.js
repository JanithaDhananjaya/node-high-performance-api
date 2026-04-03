import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import {Pool} from "pg";

// 1. Create the database connection pool using your connection string
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// 2. Instantiate the adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the PrismaClient constructor
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Successfully connected to the database!');
    console.log('Users:', users);
  } catch (e) {
    console.error('Connection failed:');
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
