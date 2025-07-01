import { Request, Response } from 'express';
import { pool } from '../db/pool';


/**
 * Get all posts
 */
export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            `SELECT * FROM posts
             ORDER BY created_at DESC`
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting posts:', error);
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
        const result = await pool.query(
            `INSERT INTO posts (slug, title, author, tags, content)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [slug, title, author, tags || [], content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        console.error('Error creating post:', error);
        if (error.code === '23505') {
            res.status(409).json({ message: 'Post with this slug already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
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
        const result = await pool.query(
            `DELETE FROM posts WHERE slug = $1 RETURNING *`,
            [slug]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
