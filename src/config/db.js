import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 1. Create the database connection pool using your connection string
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// 2. Instantiate the adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the PrismaClient constructor
const prisma = new PrismaClient({ adapter });

export default prisma;