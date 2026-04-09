import * as postService from '../services/postService.js';

export const createPost = async (req, res) => {
    try {
        const {title, content, categoryNames} = req.body;
        const userId = req.user.id;

        const newPost = await postService.createNewPost({
            title,
            content,
            authorId: userId,
            categoryNames
        }, req.user.email);

        res.status(201).json({success: true, data: newPost});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({error: 'Failed to create post'});
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.fetchAllPosts();
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({error: 'Failed to fetch posts'});
    }
};