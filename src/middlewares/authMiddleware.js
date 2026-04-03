import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export default async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AppError('No token found', 401);
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await prisma.user.findUnique({ where: { id: decodedToken.id } });

        if (!currentUser) {
            throw new AppError('User not found', 404);
        }

        req.user = currentUser;
        next();
    } catch (error) {
        next(new AppError('Invalid token', 401));
    }
};