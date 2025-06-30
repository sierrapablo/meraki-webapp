import { Request, Response } from 'express';
import { pool } from '../db/pool';

/**
 * Get all posts
 */
export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM public.posts');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};