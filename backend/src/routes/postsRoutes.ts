import express from 'express';
import { getAllPosts, createPost } from '../controllers/postsControllers';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);

export default router;