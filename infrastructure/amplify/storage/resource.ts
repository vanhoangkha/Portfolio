import { defineStorage } from '@aws-amplify/backend';

/**
 * Define and configure Amazon S3 storage
 *
 * Storage buckets for:
 * - Blog post images
 * - Project screenshots
 * - Portfolio assets (resume, certificates, etc.)
 */
export const storage = defineStorage({
  name: 'portfolioAssets',
  access: (allow) => ({
    // Public assets - anyone can read
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    // Blog images - anyone can read, authenticated can write
    'blog-images/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    // Project images - anyone can read, authenticated can write
    'project-images/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    // Private files - only authenticated users
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
  }),
});
