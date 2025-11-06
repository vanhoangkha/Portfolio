import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { strictRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', strictRateLimiter, authController.register);
router.post('/login', strictRateLimiter, authController.login);
router.post('/refresh', authController.refreshToken);

export default router;
