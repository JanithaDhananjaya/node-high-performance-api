import * as userService from '../services/userService.js';
import AppError from '../utils/AppError.js';

export const signup = async (req, res, next) => {
    try {
        const newUser = await userService.signup(req.body);
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        const user = await userService.login(email, password);

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}