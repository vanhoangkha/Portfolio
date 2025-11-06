import { Response, NextFunction } from 'express';
import db from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

export const getAllProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projects = await db('projects')
      .where({ status: 'active' })
      .orderBy('display_order', 'asc')
      .select();

    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const project = await db('projects').where({ slug, status: 'active' }).first();

    if (!project) {
      return next(createError('Project not found', 404));
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const [project] = await db('projects').insert(req.body).returning('*');
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [project] = await db('projects').where({ id }).update(req.body).returning('*');

    if (!project) {
      return next(createError('Project not found', 404));
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await db('projects').where({ id }).del();

    if (!deleted) {
      return next(createError('Project not found', 404));
    }

    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
