import { Request, Response, NextFunction } from 'express';
import db from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const trackEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { event_type, page_url, metadata } = req.body;

    await db('analytics_events').insert({
      event_type,
      page_url,
      referrer: req.headers.referer,
      user_agent: req.headers['user-agent'],
      ip_address: req.ip,
      session_id: req.headers['x-session-id'] as string,
      metadata,
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const trackPageView = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page_url } = req.body;

    await db('page_views').insert({
      page_url,
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
      referrer: req.headers.referer,
      session_id: req.headers['x-session-id'] as string,
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const totalViews = await db('page_views').count('* as count').first();
    const topPages = await db('page_views')
      .select('page_url')
      .count('* as views')
      .groupBy('page_url')
      .orderBy('views', 'desc')
      .limit(10);

    res.json({ success: true, data: { totalViews, topPages } });
  } catch (error) {
    next(error);
  }
};
