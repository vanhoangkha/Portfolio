import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useToastStore } from '@store/toastStore';
import { getComments, submitComment } from '@/services/api/commentService';
import { queryKeys } from '@/lib/queryClient';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import { LoadingSpinner } from '@components/LoadingSpinner';
import type { Comment, CommentFormData } from '@/types';
import { logger } from '@utils/logger';
import styles from './CommentsSection.module.css';

interface CommentsSectionProps {
  postId: string;
}

/**
 * Build nested comment tree from flat list
 */
const buildCommentTree = (comments: Comment[]): Comment[] => {
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  // First pass: create map of all comments
  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: build tree structure
  comments.forEach((comment) => {
    const commentNode = commentMap.get(comment.id)!;
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        if (!parent.replies) {
          parent.replies = [];
        }
        parent.replies.push(commentNode);
      }
    } else {
      rootComments.push(commentNode);
    }
  });

  return rootComments;
};

/**
 * Comments Section Component
 * Displays comments for a blog post with nested replies
 */
export const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const { t } = useTranslation('blog');
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch comments
  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.comments.list(postId),
    queryFn: () => getComments(postId),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Build comment tree
  const commentTree = buildCommentTree(comments.filter((c) => c.status === 'approved'));

  // Submit comment mutation
  const submitMutation = useMutation({
    mutationFn: (data: CommentFormData) => submitComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.list(postId) });
      addToast(t('comments.submitted', 'Comment submitted! It will appear after moderation.'), 'success');
      setIsSubmitting(false);
    },
    onError: (error) => {
      logger.error('Failed to submit comment:', error);
      addToast(
        error instanceof Error ? error.message : t('comments.error', 'Failed to submit comment'),
        'error'
      );
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (data: CommentFormData) => {
    setIsSubmitting(true);
    await submitMutation.mutateAsync(data);
  };

  const handleReply = async (parentId: string, data: CommentFormData) => {
    await handleSubmit({ ...data, parentId });
  };

  if (error) {
    return (
      <div className={styles.error}>
        <i className="fas fa-exclamation-triangle" />
        <p>{t('comments.loadError', 'Failed to load comments. Please try again later.')}</p>
      </div>
    );
  }

  return (
    <section className={styles.commentsSection}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.title}>
          <i className="fas fa-comments" />
          {t('comments.title', 'Comments')}
          {comments.length > 0 && (
            <span className={styles.count}>
              ({comments.length})
            </span>
          )}
        </h2>
      </motion.div>

      <CommentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      {isLoading ? (
        <div className={styles.loading}>
          <LoadingSpinner />
          <p>{t('comments.loading', 'Loading comments...')}</p>
        </div>
      ) : commentTree.length === 0 ? (
        <motion.div
          className={styles.empty}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fas fa-comment-slash" />
          <p>{t('comments.noComments', 'No comments yet. Be the first to comment!')}</p>
        </motion.div>
      ) : (
        <div className={styles.commentsList}>
          {commentTree.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              maxDepth={3}
            />
          ))}
        </div>
      )}
    </section>
  );
};

