export interface Service {
  id: string;
  number: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  process: ProcessStep[];
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Country {
  id: string;
  name: string;
  departments: number;
  municipalities: number;
  flag: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  country: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string }[];
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export interface NavLink {
  number: string;
  label: string;
  href: string;
}

export interface Office {
  city: string;
  country: string;
  address: string;
  phone: string;
}
