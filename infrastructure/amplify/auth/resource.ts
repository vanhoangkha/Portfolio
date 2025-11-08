import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure Amazon Cognito authentication
 *
 * Authentication for admin users to manage:
 * - Blog posts
 * - Projects
 * - Portfolio content
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Welcome to KVH Portfolio - Verify your email',
      verificationEmailBody: (createCode) =>
        `Your verification code is ${createCode()}. Please use this code to verify your email.`,
    },
  },
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
  },
  accountRecovery: 'EMAIL_ONLY',
});
