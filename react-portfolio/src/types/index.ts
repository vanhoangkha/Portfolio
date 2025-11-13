export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  icon: string;
  achievements: string[];
  tags: string[];
  links?: Array<{ label: string; url: string }>;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface SkillCategory {
  id: string;
  icon: string;
  title: string;
  skills: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
