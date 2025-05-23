export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  department: string;
  expertise: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  fullDescription: string;
  deliverables: string[];
  technologies: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  quote: string;
  image: string;
}