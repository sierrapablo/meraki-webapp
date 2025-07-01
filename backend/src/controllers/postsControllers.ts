import { Request, Response } from 'express';
import * as postService from '../services/postsServices';

/**
 * Get all posts
 */
export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Create a new post
 * 
 */
export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { slug, title, author, tags, content } = req.body;

    if (!slug || !title || !author || !content) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    try {
        const post = await postService.createPost({
            slug, title, author, tags: tags || [], content
        });
        res.status(201).json(post);
    } catch (error: any) {
        console.error('Error creating post:', error);
        if (error.code === '23505') {
            res.status(409).json({ message: 'Post with this slug already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};


/**
 * Delete a post by slug
 */
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;

    if (!slug) {
        res.status(400).json({ message: 'Slug is required' });
        return;
    }

    try {
        const deleted = await postService.deletePost(slug);

        if (!deleted) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(204).send();
        }
    } catch (error: any) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
