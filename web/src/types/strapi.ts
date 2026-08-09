/**
 * Strapi 5 REST API response types.
 * These reflect the actual shape returned by Strapi's Content API.
 * Strapi 5 uses a flattened response format (no nested data.attributes).
 */

// Base Strapi response envelope
export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Strapi media format
export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiMediaFormat> | null;
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

// Component DTOs
export interface StrapiSeoDTO {
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  canonicalURL?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: StrapiMedia | null;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface StrapiCtaDTO {
  label: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
  isExternal: boolean;
}

export interface StrapiSocialLinkDTO {
  platform: string;
  url: string;
}

export interface StrapiSectionHeadingDTO {
  title: string;
  subtitle?: string | null;
  centered?: boolean;
}

export interface StrapiStatisticItemDTO {
  value: string;
  label: string;
  suffix?: string | null;
}

export interface StrapiContactInfoDTO {
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  workingHours?: string | null;
}

export interface StrapiCapabilityItemDTO {
  title: string;
  description?: string | null;
  icon?: StrapiMedia | null;
}

export interface StrapiMilestoneDTO {
  year: string;
  title: string;
  description?: string | null;
}

// Content Type DTOs (Strapi 5 flat format)
export interface StrapiGlobalDTO {
  id: number;
  documentId: string;
  companyName: string;
  companyNameEnglish?: string | null;
  shortName?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  website?: string | null;
  businessHours?: string | null;
  socialLinks?: StrapiSocialLinkDTO[];
  logo?: StrapiMedia | null;
  favicon?: StrapiMedia | null;
  defaultSeo?: StrapiSeoDTO | null;
}

export interface StrapiHomepageDTO {
  id: number;
  documentId: string;
  hero?: {
    title: string;
    subtitle?: string | null;
    backgroundImage?: StrapiMedia | null;
    cta?: StrapiCtaDTO | null;
  } | null;
  introduction?: {
    heading?: StrapiSectionHeadingDTO | null;
    content?: string | null;
    image?: StrapiMedia | null;
  } | null;
  capabilities?: {
    heading?: StrapiSectionHeadingDTO | null;
    items?: StrapiCapabilityItemDTO[];
  } | null;
  statistics?: {
    heading?: StrapiSectionHeadingDTO | null;
    items?: StrapiStatisticItemDTO[];
  } | null;
  ctaSection?: {
    title: string;
    description?: string | null;
    cta?: StrapiCtaDTO | null;
    backgroundImage?: StrapiMedia | null;
  } | null;
  seo?: StrapiSeoDTO | null;
}

export interface StrapiAboutDTO {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  content?: string | null;
  images?: StrapiMedia[];
  mission?: string | null;
  vision?: string | null;
  values?: string | null;
  milestones?: StrapiMilestoneDTO[];
  seo?: StrapiSeoDTO | null;
}

export interface StrapiProductDTO {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  category?: StrapiProductCategoryDTO | null;
  featured: boolean;
  images?: StrapiMedia[];
  specifications?: string | null;
  applications?: string | null;
  materials?: string | null;
  seo?: StrapiSeoDTO | null;
}

export interface StrapiProductCategoryDTO {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: StrapiMedia | null;
  order: number;
}

export interface StrapiServiceDTO {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string | null;
  content?: string | null;
  image?: StrapiMedia | null;
  icon?: StrapiMedia | null;
  featured: boolean;
  order: number;
  seo?: StrapiSeoDTO | null;
}

export interface StrapiManufacturingProcessDTO {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  content?: string | null;
  order: number;
  image?: StrapiMedia | null;
  icon?: StrapiMedia | null;
}

export interface StrapiArticleDTO {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  coverImage?: StrapiMedia | null;
  category?: StrapiArticleCategoryDTO | null;
  author?: string | null;
  featured: boolean;
  publishedAt?: string | null;
  seo?: StrapiSeoDTO | null;
}

export interface StrapiArticleCategoryDTO {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiContactDTO {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  contactInfo?: StrapiContactInfoDTO | null;
  seo?: StrapiSeoDTO | null;
}

export interface StrapiCertificateDTO {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  document?: StrapiMedia | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  documentType: string;
}
