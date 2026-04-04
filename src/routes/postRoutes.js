import express from "express";
import {createPost, getAllPosts} from "../controllers/postController.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', protect, createPost);

export default router;