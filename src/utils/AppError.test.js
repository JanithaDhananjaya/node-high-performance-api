import { describe, it, expect } from "vitest";
import AppError from "./AppError.js";

describe('AppError Class', () => {
    it('should create an instance with correct message and status code', () => {
       const error = new AppError('Unauthorized access', 401);

       expect(error.message).toBe('Unauthorized access');
       expect(error.statusCode).toBe(401);
       expect(error.status).toBe('fail');
       expect(error.isOperational).toBe(true);
    });

    it('should set status to "error" for 500 status codes', () => {
        const error = new AppError('Internal Server Error', 500);
        expect(error.status).toBe('error');
    });
});