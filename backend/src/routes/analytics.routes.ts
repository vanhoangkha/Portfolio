import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

router.post('/event', analyticsController.trackEvent);
router.post('/pageview', analyticsController.trackPageView);
router.get('/stats', authenticateToken, authorizeRole('admin'), analyticsController.getStats);

export default router;
