import type { Testimonial } from '@/types';

/**
 * Mock Testimonials Data
 * Replace with actual data from CMS or API
 */
export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechCorp Solutions',
    photo: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff&size=200',
    rating: 5,
    text: 'Working with Kha was an absolute pleasure. His expertise in cloud architecture helped us migrate our entire infrastructure to AWS, resulting in 40% cost savings and improved performance. Highly recommended!',
    date: '2024-10-15',
    featured: true,
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Engineering Manager',
    company: 'DataFlow Inc',
    photo: 'https://ui-avatars.com/api/?name=Michael+Chen&background=6366F1&color=fff&size=200',
    rating: 5,
    text: 'Kha\'s deep understanding of AI/ML solutions transformed our data pipeline. He designed a scalable architecture that processes millions of records daily. His technical leadership was invaluable.',
    date: '2024-09-22',
    featured: true,
    linkedinUrl: 'https://linkedin.com/in/michaelchen',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Product Director',
    company: 'CloudNative Systems',
    photo: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=EC4899&color=fff&size=200',
    rating: 5,
    text: 'Exceptional cloud architect! Kha helped us design a multi-region, highly available system on GCP. His attention to security and best practices gave us confidence in our infrastructure.',
    date: '2024-08-10',
    featured: true,
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'VP of Engineering',
    company: 'StartupHub',
    photo: 'https://ui-avatars.com/api/?name=David+Kim&background=10B981&color=fff&size=200',
    rating: 5,
    text: 'Kha is not just technically brilliant but also an excellent communicator. He explained complex cloud concepts to our non-technical stakeholders clearly. A true professional.',
    date: '2024-07-18',
    featured: false,
    linkedinUrl: 'https://linkedin.com/in/davidkim',
  },
  {
    id: '5',
    name: 'Lisa Wang',
    role: 'DevOps Lead',
    company: 'Enterprise Solutions Ltd',
    photo: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=F59E0B&color=fff&size=200',
    rating: 5,
    text: 'Outstanding work on our CI/CD pipeline! Kha implemented a robust DevOps workflow that reduced our deployment time from hours to minutes. His expertise in automation is top-notch.',
    date: '2024-06-25',
    featured: false,
  },
  {
    id: '6',
    name: 'James Anderson',
    role: 'Solutions Architect',
    company: 'Global Tech Partners',
    photo: 'https://ui-avatars.com/api/?name=James+Anderson&background=8B5CF6&color=fff&size=200',
    rating: 5,
    text: 'Kha\'s contribution to our cloud migration project was phenomenal. He designed a cost-effective, scalable solution that exceeded our expectations. Would definitely work with him again!',
    date: '2024-05-30',
    featured: false,
    linkedinUrl: 'https://linkedin.com/in/jamesanderson',
  },
  {
    id: '7',
    name: 'Maria Garcia',
    role: 'Technical Lead',
    company: 'Innovation Labs',
    photo: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=EF4444&color=fff&size=200',
    rating: 4,
    text: 'Great experience working with Kha on our serverless architecture. His knowledge of AWS Lambda and API Gateway helped us build a highly scalable application. Very professional and responsive.',
    date: '2024-04-12',
    featured: false,
  },
  {
    id: '8',
    name: 'Robert Taylor',
    role: 'CEO',
    company: 'FinTech Innovations',
    photo: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=06B6D4&color=fff&size=200',
    rating: 5,
    text: 'Kha designed our entire cloud infrastructure with security as a top priority. His expertise in compliance and best practices was crucial for our financial services platform. Excellent work!',
    date: '2024-03-08',
    featured: false,
    linkedinUrl: 'https://linkedin.com/in/roberttaylor',
  },
];

/**
 * Get all testimonials
 */
export const getTestimonials = (): Testimonial[] => {
  return testimonialsData;
};

/**
 * Get featured testimonials
 */
export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonialsData.filter((testimonial) => testimonial.featured);
};

/**
 * Get testimonial by ID
 */
export const getTestimonialById = (id: string): Testimonial | undefined => {
  return testimonialsData.find((testimonial) => testimonial.id === id);
};

/**
 * Get testimonials by rating
 */
export const getTestimonialsByRating = (minRating: number): Testimonial[] => {
  return testimonialsData.filter((testimonial) => testimonial.rating >= minRating);
};

/**
 * Get testimonials count
 */
export const getTestimonialsCount = (): number => {
  return testimonialsData.length;
};

/**
 * Get average rating
 */
export const getAverageRating = (): number => {
  if (testimonialsData.length === 0) return 0;
  
  const totalRating = testimonialsData.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return Math.round((totalRating / testimonialsData.length) * 10) / 10;
};
