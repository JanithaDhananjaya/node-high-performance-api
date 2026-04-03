import 'dotenv/config';
import request from 'supertest';
import app from '../app.js';
import prisma from '../config/db.js';

console.log(process.env.DATABASE_URL)

describe('Auth API Integration Test', () => {

    beforeAll(async () => {
        try {
            await prisma.$connect();
            await prisma.user.deleteMany();
        } catch (error) {
            console.error('Database cleanup failed:', error);
        }
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should register a new user via /signup endpoint', async () => {
        const res = await request(app)
            .post('/api/v1/users/signup')
            .send({
                name: 'Integration User', email: 'integration@test.com', password: 'password123', role: 'user'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.email).toBe('integration@test.com');
    });

    it('should return 400 if validation fails (Zod in action)', async () => {
        const res = await request(app)
            .post('/api/v1/users/signup')
            .send({
                name: 'J', email: 'invalid-email', password: '123',
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toBe('fail');
        expect(res.body.errors).toBeDefined();
    });
})