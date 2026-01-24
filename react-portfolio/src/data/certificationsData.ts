import type { Certification, Achievement } from '@/types';

/**
 * Mock Certifications Data
 * Replace with actual data from CMS or API
 */
export const certificationsData: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    issueDate: '2023-06-15',
    expiryDate: '2026-06-15',
    credentialId: 'AWS-PSA-12345',
    credentialUrl: 'https://aws.amazon.com/verification',
    certificateImage: 'https://images.credly.com/size/680x680/images/2d84e428-9078-49b6-a804-13c15383d0de/image.png',
    category: 'technical',
    skills: ['AWS', 'Cloud Architecture', 'Solution Design', 'Cost Optimization'],
    description: 'Advanced AWS certification demonstrating expertise in designing distributed systems on AWS.',
  },
  {
    id: '2',
    name: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    issueDate: '2023-03-20',
    expiryDate: '2025-03-20',
    credentialId: 'GCP-PCA-67890',
    credentialUrl: 'https://cloud.google.com/certification/verify',
    certificateImage: 'https://templates.images.credential.net/16590187933301617801540872729153.png',
    category: 'technical',
    skills: ['GCP', 'Cloud Architecture', 'Kubernetes', 'Terraform'],
    description: 'Professional-level certification for designing and managing GCP solutions.',
  },
  {
    id: '3',
    name: 'Microsoft Azure Solutions Architect Expert',
    issuer: 'Microsoft',
    issueDate: '2022-11-10',
    expiryDate: '2024-11-10',
    credentialId: 'MS-AZ-305-11223',
    credentialUrl: 'https://learn.microsoft.com/en-us/certifications',
    certificateImage: 'https://images.credly.com/size/680x680/images/987adb7e-49be-4e24-b67e-55986bd3fe66/azure-solutions-architect-expert-600x600.png',
    category: 'technical',
    skills: ['Azure', 'Cloud Architecture', 'DevOps', 'Security'],
    description: 'Expert-level certification for Azure solution architecture and implementation.',
  },
  {
    id: '4',
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    issueDate: '2023-01-15',
    expiryDate: '2026-01-15',
    credentialId: 'CKA-2301-44556',
    credentialUrl: 'https://www.cncf.io/certification/cka/',
    certificateImage: 'https://images.credly.com/size/680x680/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png',
    category: 'technical',
    skills: ['Kubernetes', 'Container Orchestration', 'DevOps', 'Cloud Native'],
    description: 'Demonstrates ability to perform Kubernetes administrator responsibilities.',
  },
  {
    id: '5',
    name: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    issueDate: '2023-09-05',
    expiryDate: '2026-09-05',
    credentialId: 'AWS-MLS-78901',
    credentialUrl: 'https://aws.amazon.com/verification',
    certificateImage: 'https://images.credly.com/size/680x680/images/778bde6c-ad1c-4312-ac33-2fa40d50a147/image.png',
    category: 'technical',
    skills: ['Machine Learning', 'AWS SageMaker', 'AI', 'Data Science'],
    description: 'Specialty certification for building, training, and deploying ML models on AWS.',
  },
  {
    id: '6',
    name: 'Terraform Associate',
    issuer: 'HashiCorp',
    issueDate: '2022-08-20',
    credentialId: 'HC-TF-23456',
    credentialUrl: 'https://www.hashicorp.com/certification',
    certificateImage: 'https://images.credly.com/size/680x680/images/99289602-861e-4929-8277-773e63a2fa6f/image.png',
    category: 'technical',
    skills: ['Terraform', 'Infrastructure as Code', 'DevOps', 'Automation'],
    description: 'Certification for infrastructure automation using Terraform.',
  },
  {
    id: '7',
    name: 'Professional Scrum Master I (PSM I)',
    issuer: 'Scrum.org',
    issueDate: '2022-05-10',
    credentialId: 'PSM-I-34567',
    credentialUrl: 'https://www.scrum.org/certificates',
    certificateImage: 'https://static.scrum.org/web/badges/badge-psmi.svg',
    category: 'professional',
    skills: ['Scrum', 'Agile', 'Project Management', 'Team Leadership'],
    description: 'Demonstrates fundamental knowledge of Scrum framework and its application.',
  },
  {
    id: '8',
    name: 'IELTS Academic - Band 8.0',
    issuer: 'British Council',
    issueDate: '2021-12-15',
    credentialId: 'IELTS-2021-45678',
    certificateImage: 'https://www.ielts.org/-/media/images/ielts-logo.ashx',
    category: 'language',
    skills: ['English', 'Communication', 'Writing', 'Speaking'],
    description: 'High proficiency in English language for academic and professional purposes.',
  },
];

/**
 * Mock Achievements Data
 */
export const achievementsData: Achievement[] = [
  {
    id: '1',
    title: 'AWS Community Builder',
    description: 'Selected as AWS Community Builder for Cloud Architecture category',
    icon: '🏆',
    date: '2023-01-01',
    category: 'recognition',
    url: 'https://aws.amazon.com/developer/community/community-builders/',
  },
  {
    id: '2',
    title: 'Cloud Journey Founder',
    description: 'Founded Vietnam\'s premier cloud learning ecosystem serving 50,000+ professionals',
    icon: '🚀',
    date: '2020-06-01',
    category: 'achievement',
    url: 'https://cloudjourney.awsstudygroup.com',
  },
  {
    id: '3',
    title: 'Technical Speaker',
    description: 'Delivered 50+ technical talks on cloud architecture and best practices',
    icon: '🎤',
    date: '2022-01-01',
    category: 'achievement',
  },
  {
    id: '4',
    title: 'Open Source Contributor',
    description: 'Active contributor to cloud-native and DevOps open source projects',
    icon: '💻',
    date: '2021-01-01',
    category: 'achievement',
    url: 'https://github.com/vanhoangkha',
  },
];

/**
 * Get all certifications
 */
export const getCertifications = (): Certification[] => {
  return certificationsData;
};

/**
 * Get certifications by category
 */
export const getCertificationsByCategory = (
  category: Certification['category']
): Certification[] => {
  return certificationsData.filter((cert) => cert.category === category);
};

/**
 * Get certification by ID
 */
export const getCertificationById = (id: string): Certification | undefined => {
  return certificationsData.find((cert) => cert.id === id);
};

/**
 * Get certifications expiring soon (within days)
 */
export const getCertificationsExpiringSoon = (days: number = 30): Certification[] => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return certificationsData.filter((cert) => {
    if (!cert.expiryDate) return false;
    const expiryDate = new Date(cert.expiryDate);
    return expiryDate >= now && expiryDate <= futureDate;
  });
};

/**
 * Get all achievements
 */
export const getAchievements = (): Achievement[] => {
  return achievementsData;
};

/**
 * Get achievement by ID
 */
export const getAchievementById = (id: string): Achievement | undefined => {
  return achievementsData.find((achievement) => achievement.id === id);
};

/**
 * Get certifications count
 */
export const getCertificationsCount = (): number => {
  return certificationsData.length;
};

/**
 * Get certifications by category counts
 */
export const getCertificationsCategoryCounts = (): Record<string, number> => {
  return certificationsData.reduce((acc, cert) => {
    acc[cert.category] = (acc[cert.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};
