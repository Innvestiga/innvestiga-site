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
}

export interface NavFeatured {
  title: string;
  subtitle: string;
  href: string;
}

export interface NavLink {
  number: string;
  label: string;
  href: string;
  children?: NavChild[];
  /** Highlighted card on the right of the dropdown (mega menu). */
  featured?: NavFeatured;
}

export interface Office {
  city: string;
  country: string;
  /** ISO 3166-1 alpha-2, for schema.org addresses. */
  countryCode: string;
  /** Full address as shown on the page. */
  address: string;
  /** schema.org PostalAddress parts. */
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
}
