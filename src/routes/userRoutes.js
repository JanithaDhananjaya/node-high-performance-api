import express from 'express';
import * as authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { signUpSchema } from '../validations/userValidation.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', validate(signUpSchema), authController.signup);
router.post('/login', authController.login);
router.get('/export', authMiddleware, userController.exportUsers);
router.get('/exportUsingBatch', authMiddleware, userController.exportUsersUsingBatch);
router.get('/getUserProfile', authMiddleware, userController.getUserProfile);

router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({ success: true, data: req.user });
});

export default router;