import * as userService from '../services/userService.js';
import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
// Removed @jest/globals import

vi.mock('../config/db.js', () => ({
    user: {
        findUnique: vi.fn(),
        create: vi.fn(),
    },
    default: {
        user: {
            findUnique: vi.fn(),
            create: vi.fn(),
        }
    }
}));

vi.mock('bcryptjs', () => ({
    default: {
        hash: vi.fn().mockResolvedValue('hashed_password'),
    },
    hash: vi.fn().mockResolvedValue('hashed_password'),
}));

describe('UserService - Signup', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should throw an error if user already exists', async () => {
        prisma.user.findUnique.mockResolvedValue({ email: 'test@test.com' });

        await expect(userService.signup({ email: 'test@test.com' }))
            .rejects.toThrow('User already exists');

        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@test.com' } });
    });

    it('should create a new user and hash the password', async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        prisma.user.create.mockResolvedValue({ id: 1, email: 'new@example.com' });

        const result = await userService.signup({
            email: 'new@example.com',
            password: 'password123',
            name: 'Janitha'
        });

        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
        expect(prisma.user.create).toHaveBeenCalled();
        expect(result.email).toBe('new@example.com');
    });
});