/**
 * Domain types - clean interfaces the frontend works with.
 * These are decoupled from the Strapi API response shapes.
 */

// Shared / Reusable
export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalURL?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: MediaImage;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface MediaImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, MediaFormat>;
}

export interface MediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface CtaData {
  label: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
  isExternal: boolean;
}

export interface SectionHeading {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export interface StatisticItem {
  value: string;
  label: string;
  suffix?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  latitude?: number;
  longitude?: number;
  workingHours?: string;
}

// Global Settings
export interface GlobalSettings {
  companyName: string;
  companyNameEnglish?: string;
  shortName?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  businessHours?: string;
  socialLinks: SocialLink[];
  logo?: MediaImage;
  favicon?: MediaImage;
  defaultSeo?: SeoData;
}

// Homepage sections
export interface HeroData {
  title: string;
  subtitle?: string;
  backgroundImage?: MediaImage;
  cta?: CtaData;
}

export interface IntroductionData {
  heading?: SectionHeading;
  content?: string;
  image?: MediaImage;
}

export interface CapabilityItem {
  title: string;
  description?: string;
  icon?: MediaImage;
}

export interface CapabilitiesData {
  heading?: SectionHeading;
  items: CapabilityItem[];
}

export interface StatisticsData {
  heading?: SectionHeading;
  items: StatisticItem[];
}

export interface CtaSectionData {
  title: string;
  description?: string;
  cta?: CtaData;
  backgroundImage?: MediaImage;
}

export interface Homepage {
  hero?: HeroData;
  introduction?: IntroductionData;
  capabilities?: CapabilitiesData;
  statistics?: StatisticsData;
  ctaSection?: CtaSectionData;
  seo?: SeoData;
}

// About
export interface Milestone {
  year: string;
  title: string;
  description?: string;
}

export interface About {
  title: string;
  description?: string;
  content?: string;
  images: MediaImage[];
  mission?: string;
  vision?: string;
  values?: string;
  milestones: Milestone[];
  seo?: SeoData;
}

// Product
export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  category?: ProductCategory;
  featured: boolean;
  images: MediaImage[];
  specifications?: string;
  applications?: string;
  materials?: string;
  seo?: SeoData;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: MediaImage;
  order: number;
}

// Service
export interface Service {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: MediaImage;
  icon?: MediaImage;
  featured: boolean;
  order: number;
  seo?: SeoData;
}

// Manufacturing Process
export interface ManufacturingProcess {
  id: number;
  title: string;
  description?: string;
  content?: string;
  order: number;
  image?: MediaImage;
  icon?: MediaImage;
}

// Article (News)
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: MediaImage;
  category?: ArticleCategory;
  author?: string;
  featured: boolean;
  publishedAt?: string;
  seo?: SeoData;
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

// Contact
export interface Contact {
  title: string;
  description?: string;
  contactInfo?: ContactInfo;
  seo?: SeoData;
}

// Certificate
export interface Certificate {
  id: number;
  title: string;
  description?: string;
  document?: MediaImage;
  issueDate?: string;
  expiryDate?: string;
  documentType: string;
}
