import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CommentForm } from './CommentForm';
import type { Comment } from '@/types';
import styles from './CommentItem.module.css';

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  onReply: (parentId: string, data: import('@/types').CommentFormData) => Promise<void>;
  onEdit?: (commentId: string, content: string) => Promise<void>;
  onDelete?: (commentId: string) => Promise<void>;
  maxDepth?: number;
}

/**
 * Comment Item Component
 * Displays a single comment with nested replies
 */
export const CommentItem = ({
  comment,
  depth = 0,
  onReply,
  onEdit,
  onDelete,
  maxDepth = 3,
}: CommentItemProps) => {
  const { t } = useTranslation('blog');
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const canReply = depth < maxDepth;
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReply = async (data: import('@/types').CommentFormData) => {
    await onReply(comment.id, data);
    setIsReplying(false);
  };

  const getAvatarUrl = (author: Comment['author']) => {
    if (author.avatar) return author.avatar;
    // Generate avatar from name
    const name = author.name || 'Anonymous';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${encodeURIComponent('var(--primary-color)')}&color=fff&size=64`;
  };

  return (
    <motion.div
      className={styles.comment}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.commentContent}>
        <div className={styles.header}>
          <img
            src={getAvatarUrl(comment.author)}
            alt={comment.author.name}
            className={styles.avatar}
          />
          <div className={styles.meta}>
            <div className={styles.authorInfo}>
              {comment.author.website ? (
                <a
                  href={comment.author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.authorName}
                >
                  {comment.author.name}
                </a>
              ) : (
                <span className={styles.authorName}>{comment.author.name}</span>
              )}
              {comment.status === 'pending' && (
                <span className={styles.statusBadge} title={t('comments.pending', 'Pending moderation')}>
                  <i className="fas fa-clock" />
                  {t('comments.pending', 'Pending')}
                </span>
              )}
            </div>
            <time className={styles.timestamp}>
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </time>
          </div>
        </div>

        {isEditing && onEdit ? (
          <div className={styles.editForm}>
            <textarea
              className={styles.editTextarea}
              defaultValue={comment.content}
              rows={4}
            />
            <div className={styles.editActions}>
              <button
                className={styles.saveButton}
                onClick={async () => {
                  const textarea = document.querySelector(`.${styles.editTextarea}`) as HTMLTextAreaElement;
                  if (textarea) {
                    await onEdit(comment.id, textarea.value);
                    setIsEditing(false);
                  }
                }}
              >
                {t('comments.save', 'Save')}
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                {t('comments.cancel', 'Cancel')}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.content}>{comment.content}</div>
        )}

        <div className={styles.actions}>
          {canReply && (
            <button
              className={styles.actionButton}
              onClick={() => setIsReplying(!isReplying)}
            >
              <i className="fas fa-reply" />
              {t('comments.reply', 'Reply')}
            </button>
          )}
          {onEdit && (
            <button
              className={styles.actionButton}
              onClick={() => setIsEditing(!isEditing)}
            >
              <i className="fas fa-edit" />
              {t('comments.edit', 'Edit')}
            </button>
          )}
          {onDelete && (
            <button
              className={styles.actionButton}
              onClick={() => {
                if (window.confirm(t('comments.confirmDelete', 'Are you sure you want to delete this comment?'))) {
                  onDelete(comment.id);
                }
              }}
            >
              <i className="fas fa-trash" />
              {t('comments.delete', 'Delete')}
            </button>
          )}
          {comment.likes !== undefined && comment.likes > 0 && (
            <span className={styles.likes}>
              <i className="fas fa-heart" />
              {comment.likes}
            </span>
          )}
        </div>

        {isReplying && (
          <div className={styles.replyForm}>
            <CommentForm
              onSubmit={handleReply}
              onCancel={() => setIsReplying(false)}
              parentId={comment.id}
              placeholder={t('comments.writeReply', 'Write a reply...')}
            />
          </div>
        )}
      </div>

      {hasReplies && (
        <div className={styles.replies}>
          <button
            className={styles.toggleReplies}
            onClick={() => setShowReplies(!showReplies)}
          >
            <i className={`fas fa-chevron-${showReplies ? 'down' : 'right'}`} />
            {showReplies
              ? t('comments.hideReplies', 'Hide {{count}} replies', { count: comment.replies?.length })
              : t('comments.showReplies', 'Show {{count}} replies', { count: comment.replies?.length })}
          </button>

          {showReplies && (
            <div className={styles.repliesList}>
              {comment.replies?.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  maxDepth={maxDepth}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

