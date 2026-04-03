import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

const users = [
    { id: 1, name: 'Janitha Silva', role: 'Senior Engineer' },
    { id: 2, name: 'Amila Perera', role: 'Devops Engineer' },
];

export const findAllUsers = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(users);
        }, 500);
    })
};

export const signup = async (userData) => {
    const { name, email, password, role } = userData;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new AppError('User already exists', 400);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        }
    });

    return newUser;
};

export const login = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new AppError('User not found', 404);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new AppError('Invalid password', 401);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
}