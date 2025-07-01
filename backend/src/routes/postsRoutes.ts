import express from 'express';
import { getAllPosts, createPost, deletePost } from '../controllers/postsControllers';
import { basicAuth } from '../middlewares/basicAuth';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', basicAuth, createPost);
router.delete('/:slug', basicAuth, deletePost);

export default router;
