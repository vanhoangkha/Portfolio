import { Response, NextFunction } from 'express';
import db from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

export const getAllPosts = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const posts = await db('blog_posts')
      .where({ status: 'published' })
      .orderBy('published_at', 'desc')
      .select('id', 'title', 'slug', 'excerpt', 'category', 'tags', 'published_at', 'views');

    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const post = await db('blog_posts')
      .where({ slug, status: 'published' })
      .first();

    if (!post) {
      return next(createError('Post not found', 404));
    }

    // Increment views
    await db('blog_posts').where({ id: post.id }).increment('views', 1);

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, slug, excerpt, content, category, tags, featured_image } = req.body;

    const [post] = await db('blog_posts')
      .insert({
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        featured_image,
        author_id: req.user!.id,
        status: 'draft',
      })
      .returning('*');

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [post] = await db('blog_posts')
      .where({ id })
      .update(updates)
      .returning('*');

    if (!post) {
      return next(createError('Post not found', 404));
    }

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deleted = await db('blog_posts').where({ id }).del();

    if (!deleted) {
      return next(createError('Post not found', 404));
    }

    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};
