import { NextFunction, Request, Response } from 'express';
import * as postService from '../services/postsServices';
import { AppError } from '../utils/AppError';

/**
 * Get all posts
 */
export const getAllPosts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

/**
 * Create a new post
 * 
 */
export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { slug, title, author, tags, content } = req.body;

    if (!slug || !title || !author || !content) {
        return next(new AppError("Missing required fields", 400));
    }

    try {
        const post = await postService.createPost({
            slug, title, author, tags: tags || [], content
        });
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a post by slug
 */
export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { slug } = req.params;

    if (!slug) {
        return next(new AppError("Slug is required", 400));
    }

    try {
        await postService.deletePost(slug);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

