import express from 'express';
import { getAllMessages } from '../controllers/messageControllers';

const router = express.Router();

router.get('/', getAllMessages);

export default router;