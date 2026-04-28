export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface WorkflowStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  image: string;
}
