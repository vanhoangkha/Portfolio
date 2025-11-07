import { defineFunction } from '@aws-amplify/backend';

/**
 * Lambda function to handle contact form submissions
 * - Validate form data
 * - Send email notification via SES
 * - Store submission in database
 */
export const contactHandler = defineFunction({
  name: 'contact-handler',
  entry: './handler.ts',
  environment: {
    SES_EMAIL_FROM: 'noreply@yourdomain.com',
    ADMIN_EMAIL: 'khavan.work@gmail.com',
  },
});
