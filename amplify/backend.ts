import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';

/**
 * AWS Amplify Gen 2 Backend Configuration
 * Full-stack serverless architecture for portfolio
 */
export const backend = defineBackend({
  auth,
  data,
  storage,
});
