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

export interface NavChild {
  label: string;
  href: string;
  /** Rendered smaller, for links the spec demotes (e.g. "Otros estudios"). */
  minor?: boolean;
}

export interface NavLink {
  number: string;
  label: string;
  href: string;
  children?: NavChild[];
}

export interface Office {
  city: string;
  country: string;
  address: string;
  /** Google Business profile; empty until the client sends it. */
  googleBusinessUrl: string;
}
