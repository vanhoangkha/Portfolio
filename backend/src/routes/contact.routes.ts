import { Router } from 'express';
import * as contactController from '../controllers/contact.controller';
import { strictRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', strictRateLimiter, contactController.sendMessage);

export default router;
