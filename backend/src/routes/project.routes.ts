import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as projectController from '../controllers/project.controller';

const router = Router();

router.get('/', projectController.getAllProjects);
router.get('/:slug', projectController.getProjectBySlug);
router.post('/', authenticateToken, authorizeRole('admin'), projectController.createProject);
router.put('/:id', authenticateToken, authorizeRole('admin'), projectController.updateProject);
router.delete('/:id', authenticateToken, authorizeRole('admin'), projectController.deleteProject);

export default router;
