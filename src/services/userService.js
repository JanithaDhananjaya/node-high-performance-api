import * as userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

export const findAllUsers = async () => {
    return await userRepository.findAll();
};

export const signup = async (userData) => {
    const { name, email, password, role } = userData;

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) throw new AppError('User already exists', 400);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
    });

    return newUser;
};

export const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('User not found', 404);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new AppError('Invalid password', 401);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
};

export const getUserById = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('User not found', 404);
    return user;
};

export const getUsersBatch = async (batchSize, lastId) => {
    return await userRepository.findUsersBatch(batchSize, lastId);
};