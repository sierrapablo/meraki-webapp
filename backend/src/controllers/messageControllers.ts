import { Request, Response } from 'express';
import { pool } from '../db/pool';

/**
 * Get all messages
 */
export const getAllMessages = async (_req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT text FROM messages');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};