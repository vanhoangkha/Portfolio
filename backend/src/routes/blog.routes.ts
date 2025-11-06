import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as blogController from '../controllers/blog.controller';

const router = Router();

// Public routes
router.get('/', blogController.getAllPosts);
router.get('/:slug', blogController.getPostBySlug);

// Protected routes (admin only)
router.post('/', authenticateToken, authorizeRole('admin'), blogController.createPost);
router.put('/:id', authenticateToken, authorizeRole('admin'), blogController.updatePost);
router.delete('/:id', authenticateToken, authorizeRole('admin'), blogController.deletePost);

export default router;
