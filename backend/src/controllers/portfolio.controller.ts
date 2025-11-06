import { Request, Response, NextFunction } from 'express';
import db from '../config/database';
import { createError } from '../middleware/errorHandler';

// Get all skills with optional filtering
export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, proficiency } = req.query;

    let query = db('skills').select('*').orderBy('display_order');

    if (category) {
      query = query.where({ category });
    }
    if (proficiency) {
      query = query.where({ proficiency });
    }

    const skills = await query;
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

// Get certifications
export const getCertifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    let query = db('certifications')
      .select('*')
      .orderBy('display_order');

    if (category) {
      query = query.where({ category });
    }

    const certifications = await query;
    res.json({ success: true, data: certifications });
  } catch (error) {
    next(error);
  }
};

// Get achievements
export const getAchievements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const achievements = await db('achievements')
      .select('*')
      .orderBy('date', 'desc');

    res.json({ success: true, data: achievements });
  } catch (error) {
    next(error);
  }
};

// Get community activities
export const getCommunityActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.query;

    let query = db('community_activities')
      .select('*')
      .orderBy('date', 'desc');

    if (type) {
      query = query.where({ type });
    }

    const activities = await query;
    res.json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};

// Get testimonials
export const getTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { featured } = req.query;

    let query = db('testimonials')
      .select('*')
      .orderBy('display_order');

    if (featured === 'true') {
      query = query.where({ featured: true });
    }

    const testimonials = await query;
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// Get tech stack
export const getTechStack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, primary } = req.query;

    let query = db('tech_stack')
      .select('*')
      .orderBy('display_order');

    if (category) {
      query = query.where({ category });
    }
    if (primary === 'true') {
      query = query.where({ is_primary: true });
    }

    const techStack = await query;
    res.json({ success: true, data: techStack });
  } catch (error) {
    next(error);
  }
};

// Get experience details (STAR format)
export const getExperienceDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experiences = await db('experience_details')
      .select('*')
      .orderBy('start_date', 'desc');

    res.json({ success: true, data: experiences });
  } catch (error) {
    next(error);
  }
};

// Get project metrics
export const getProjectMetrics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { project_id } = req.params;

    const metrics = await db('project_metrics')
      .where({ project_id })
      .orderBy('display_order');

    res.json({ success: true, data: metrics });
  } catch (error) {
    next(error);
  }
};

// Get project deliverables
export const getProjectDeliverables = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { project_id } = req.params;

    const deliverables = await db('project_deliverables')
      .where({ project_id })
      .orderBy('display_order');

    res.json({ success: true, data: deliverables });
  } catch (error) {
    next(error);
  }
};

// Get complete portfolio data (all sections)
export const getCompletePortfolio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      skills,
      certifications,
      achievements,
      communityActivities,
      testimonials,
      techStack,
      experiences,
      projects,
      blogPosts
    ] = await Promise.all([
      db('skills').select('*').orderBy('display_order'),
      db('certifications').select('*').orderBy('display_order'),
      db('achievements').select('*').orderBy('date', 'desc'),
      db('community_activities').select('*').orderBy('date', 'desc'),
      db('testimonials').where({ featured: true }).orderBy('display_order'),
      db('tech_stack').select('*').orderBy('display_order'),
      db('experience_details').select('*').orderBy('start_date', 'desc'),
      db('projects').where({ status: 'active' }).orderBy('display_order'),
      db('blog_posts').where({ status: 'published' }).orderBy('published_at', 'desc').limit(6)
    ]);

    res.json({
      success: true,
      data: {
        skills,
        certifications,
        achievements,
        communityActivities,
        testimonials,
        techStack,
        experiences,
        projects,
        blogPosts
      }
    });
  } catch (error) {
    next(error);
  }
};
