export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
}

export const defaultSEO: SEOConfig = {
  title: 'Kha Van Hoang - Solutions Architect',
  description:
    'Solutions Architect with 5 years designing enterprise-scale cloud solutions on AWS, Azure, and GCP. AWS Community Builder serving 50,000+ professionals.',
  keywords: [
    'Solutions Architect',
    'AWS',
    'Azure',
    'GCP',
    'Cloud Architecture',
    'AI/ML',
    'DevSecOps',
    'Kubernetes',
  ],
  ogImage: 'https://vanhoangkha.github.io/Portfolio/assets/images/screenshot2.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
};

export const generateSEO = (config: Partial<SEOConfig> = {}): SEOConfig => {
  return {
    ...defaultSEO,
    ...config,
    title: config.title ? `${config.title} | Kha Van Hoang` : defaultSEO.title,
  };
};
