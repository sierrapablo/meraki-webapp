import express from 'express';
import { getAllPosts, createPost, deletePost } from '../controllers/postsControllers';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.delete('/:slug', deletePost);

export default router;
