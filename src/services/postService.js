import * as postRepository from '../repositories/postRepository.js';
import { emailQueue } from "../queue/queue.js";

export const createNewPost = async (postData, userEmail) => {
    const newPost = await postRepository.create(postData);

    // Add to queue
    await emailQueue.add('send-post-notification', {
        email: userEmail,
        postTitle: postData.title,
    });

    return newPost;
};

export const fetchAllPosts = async () => {
    return await postRepository.findAll();
};
