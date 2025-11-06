import { Router } from 'express';
import {
  getSkills,
  getCertifications,
  getAchievements,
  getCommunityActivities,
  getTestimonials,
  getTechStack,
  getExperienceDetails,
  getProjectMetrics,
  getProjectDeliverables,
  getCompletePortfolio
} from '../controllers/portfolio.controller';

const router = Router();

// Portfolio data routes
router.get('/skills', getSkills);
router.get('/certifications', getCertifications);
router.get('/achievements', getAchievements);
router.get('/community-activities', getCommunityActivities);
router.get('/testimonials', getTestimonials);
router.get('/tech-stack', getTechStack);
router.get('/experience-details', getExperienceDetails);
router.get('/project-metrics/:project_id', getProjectMetrics);
router.get('/project-deliverables/:project_id', getProjectDeliverables);
router.get('/complete', getCompletePortfolio);

export default router;
