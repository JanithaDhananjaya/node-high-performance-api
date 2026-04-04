import prisma from '../config/db.js';
import {emailQueue} from "../queue/queue.js";

export const createPost = async (req, res) => {
    try {
        const {title, content, categoryNames} = req.body;
        const userId = req.user.id;

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId: userId,
                categories: {
                    connectOrCreate: categoryNames.map(name => ({
                        where: {name},
                        create: {name}
                    }))
                }
            },
            include: {
                categories: true,
                author: {
                    select: {name: true, email: true}
                }
            }
        });

        await emailQueue.add('send-post-notification', {
            email: req.user.email,
            postTitle: title,
        });

        res.status(201).json({success: true, data: newPost});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({error: 'Failed to create post'});
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {select: {name: true, email: true}},
                categories: true
            },
            orderBy: {createdAt: 'desc'}
        });

        res.status(200).json({success: true, data: posts});
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({error: 'Failed to fetch posts'});
    }
};