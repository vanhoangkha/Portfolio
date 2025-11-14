import axios from 'axios';
import { logger } from '@utils/logger';
import type { Comment, CommentFormData } from '@/types';
import { API_CONFIG } from '@/constants/timing';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Comment Service
 * Handles comment CRUD operations
 */

/**
 * Get comments for a blog post
 */
export const getComments = async (postId: string): Promise<Comment[]> => {
  try {
    const response = await axios.get<Comment[]>(
      `${API_BASE_URL}/comments/${postId}`,
      {
        timeout: API_CONFIG.TIMEOUT,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // No comments yet, return empty array
      return [];
    }
    logger.error('Failed to fetch comments:', error);
    throw error;
  }
};

/**
 * Submit a new comment
 */
export const submitComment = async (
  postId: string,
  data: CommentFormData
): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>(
      `${API_BASE_URL}/comments/${postId}`,
      data,
      {
        timeout: API_CONFIG.TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    logger.info('Comment submitted successfully');
    return response.data;
  } catch (error) {
    logger.error('Failed to submit comment:', error);
    throw error;
  }
};

/**
 * Update a comment
 */
export const updateComment = async (
  commentId: string,
  content: string
): Promise<Comment> => {
  try {
    const response = await axios.patch<Comment>(
      `${API_BASE_URL}/comments/${commentId}`,
      { content },
      {
        timeout: API_CONFIG.TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    logger.info('Comment updated successfully');
    return response.data;
  } catch (error) {
    logger.error('Failed to update comment:', error);
    throw error;
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/comments/${commentId}`, {
      timeout: API_CONFIG.TIMEOUT,
    });
    logger.info('Comment deleted successfully');
  } catch (error) {
    logger.error('Failed to delete comment:', error);
    throw error;
  }
};

/**
 * Like a comment
 */
export const likeComment = async (commentId: string): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>(
      `${API_BASE_URL}/comments/${commentId}/like`,
      {},
      {
        timeout: API_CONFIG.TIMEOUT,
      }
    );
    return response.data;
  } catch (error) {
    logger.error('Failed to like comment:', error);
    throw error;
  }
};

