import express from 'express';
import * as authController from '../controllers/authController.js';
import {protect} from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { signUpSchema } from '../validations/userValidation.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', validate(signUpSchema), authController.signup);
router.post('/login', authController.login);
router.get('/export', protect, userController.exportUsers);
router.get('/exportUsingBatch', protect, userController.exportUsersUsingBatch);
router.get('/getUserProfile', protect, userController.getUserProfile);

router.get('/me', protect, (req, res) => {
    res.status(200).json({ success: true, data: req.user });
});

export default router;