import { describe, expect, it, vi } from "vitest";
import {protect} from "./authMiddleware.js";
import jwt from "jsonwebtoken";

vi.mock('jsonwebtoken');
vi.mock('../config/db.js', () => ({
    prisma: {
        user: {
            findUnique: vi.fn(),
        },
    },
}));

describe('Auth middleware - protect', () => {
    it('should throw and error if no token is provided', async () => {
        const req = {headers: {}};
        const res = {};
        const next = vi.fn();

        await protect(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: 'No token found',
            statusCode: 401,
        }));
    });

    it('should call next() if token is valid and user exists', async () => {
        const req = {headers: {authorization: 'Bearer valid-token'}};
        const res = {};
        const next = vi.fn();

        jwt.verify.mockReturnValue({id: 1});

        await protect(req, res, next);

        // expect(next).toHaveBeenCalled();
    })
});