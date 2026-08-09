/**
 * Mappers: Transform Strapi DTOs into domain models.
 * This layer decouples the frontend from Strapi's response structure.
 */

import { env } from '@/app/config/env';
import type {
  StrapiMedia,
  StrapiSeoDTO,
  StrapiCtaDTO,
  StrapiSocialLinkDTO,
  StrapiSectionHeadingDTO,
  StrapiStatisticItemDTO,
  StrapiContactInfoDTO,
  StrapiCapabilityItemDTO,
  StrapiMilestoneDTO,
  StrapiGlobalDTO,
  StrapiHomepageDTO,
  StrapiAboutDTO,
  StrapiProductDTO,
  StrapiProductCategoryDTO,
  StrapiServiceDTO,
  StrapiManufacturingProcessDTO,
  StrapiArticleDTO,
  StrapiArticleCategoryDTO,
  StrapiContactDTO,
  StrapiCertificateDTO,
} from '@/types/strapi';
import type {
  MediaImage,
  SeoData,
  CtaData,
  SocialLink,
  SectionHeading,
  StatisticItem,
  ContactInfo,
  CapabilityItem,
  Milestone,
  GlobalSettings,
  Homepage,
  About,
  Product,
  ProductCategory,
  Service,
  ManufacturingProcess,
  Article,
  ArticleCategory,
  Contact,
  Certificate,
} from '@/types/domain';

// Utility: Resolve relative media URLs to absolute
function resolveMediaUrl(url: string): string {
  if (url.startsWith('http')) return url;
  return `${env.apiUrl}${url}`;
}

// Primitive mappers
export function mapMedia(media: StrapiMedia | null | undefined): MediaImage | undefined {
  if (!media) return undefined;
  return {
    url: resolveMediaUrl(media.url),
    alternativeText: media.alternativeText ?? undefined,
    width: media.width,
    height: media.height,
    formats: media.formats
      ? Object.fromEntries(
          Object.entries(media.formats).map(([key, f]) => [
            key,
            { url: resolveMediaUrl(f.url), width: f.width, height: f.height },
          ]),
        )
      : undefined,
  };
}

export function mapSeo(seo: StrapiSeoDTO | null | undefined): SeoData | undefined {
  if (!seo) return undefined;
  return {
    metaTitle: seo.metaTitle ?? undefined,
    metaDescription: seo.metaDescription ?? undefined,
    keywords: seo.keywords ?? undefined,
    canonicalURL: seo.canonicalURL ?? undefined,
    ogTitle: seo.ogTitle ?? undefined,
    ogDescription: seo.ogDescription ?? undefined,
    ogImage: mapMedia(seo.ogImage),
    noIndex: seo.noIndex,
    noFollow: seo.noFollow,
  };
}

function mapCta(cta: StrapiCtaDTO | null | undefined): CtaData | undefined {
  if (!cta) return undefined;
  return { label: cta.label, url: cta.url, variant: cta.variant, isExternal: cta.isExternal };
}

function mapSocialLinks(links: StrapiSocialLinkDTO[] | undefined): SocialLink[] {
  return (links ?? []).map((l) => ({ platform: l.platform, url: l.url }));
}

function mapSectionHeading(heading: StrapiSectionHeadingDTO | null | undefined): SectionHeading | undefined {
  if (!heading) return undefined;
  return { title: heading.title, subtitle: heading.subtitle ?? undefined, centered: heading.centered };
}

function mapStatisticItems(items: StrapiStatisticItemDTO[] | undefined): StatisticItem[] {
  return (items ?? []).map((i) => ({ value: i.value, label: i.label, suffix: i.suffix ?? undefined }));
}

function mapContactInfo(info: StrapiContactInfoDTO | null | undefined): ContactInfo | undefined {
  if (!info) return undefined;
  return {
    phone: info.phone ?? undefined,
    email: info.email ?? undefined,
    address: info.address ?? undefined,
    mapUrl: info.mapUrl ?? undefined,
    latitude: info.latitude ?? undefined,
    longitude: info.longitude ?? undefined,
    workingHours: info.workingHours ?? undefined,
  };
}

function mapCapabilityItems(items: StrapiCapabilityItemDTO[] | undefined): CapabilityItem[] {
  return (items ?? []).map((i) => ({
    title: i.title,
    description: i.description ?? undefined,
    icon: mapMedia(i.icon),
  }));
}

function mapMilestones(milestones: StrapiMilestoneDTO[] | undefined): Milestone[] {
  return (milestones ?? []).map((m) => ({
    year: m.year,
    title: m.title,
    description: m.description ?? undefined,
  }));
}

// Content type mappers
export function mapGlobal(dto: StrapiGlobalDTO): GlobalSettings {
  return {
    companyName: dto.companyName,
    companyNameEnglish: dto.companyNameEnglish ?? undefined,
    shortName: dto.shortName ?? undefined,
    phone: dto.phone ?? undefined,
    email: dto.email ?? undefined,
    address: dto.address ?? undefined,
    website: dto.website ?? undefined,
    businessHours: dto.businessHours ?? undefined,
    socialLinks: mapSocialLinks(dto.socialLinks),
    logo: mapMedia(dto.logo),
    favicon: mapMedia(dto.favicon),
    defaultSeo: mapSeo(dto.defaultSeo),
  };
}

export function mapHomepage(dto: StrapiHomepageDTO): Homepage {
  return {
    hero: dto.hero
      ? {
          title: dto.hero.title,
          subtitle: dto.hero.subtitle ?? undefined,
          backgroundImage: mapMedia(dto.hero.backgroundImage),
          cta: mapCta(dto.hero.cta),
        }
      : undefined,
    introduction: dto.introduction
      ? {
          heading: mapSectionHeading(dto.introduction.heading),
          content: dto.introduction.content ?? undefined,
          image: mapMedia(dto.introduction.image),
        }
      : undefined,
    capabilities: dto.capabilities
      ? {
          heading: mapSectionHeading(dto.capabilities.heading),
          items: mapCapabilityItems(dto.capabilities.items),
        }
      : undefined,
    statistics: dto.statistics
      ? {
          heading: mapSectionHeading(dto.statistics.heading),
          items: mapStatisticItems(dto.statistics.items),
        }
      : undefined,
    ctaSection: dto.ctaSection
      ? {
          title: dto.ctaSection.title,
          description: dto.ctaSection.description ?? undefined,
          cta: mapCta(dto.ctaSection.cta),
          backgroundImage: mapMedia(dto.ctaSection.backgroundImage),
        }
      : undefined,
    seo: mapSeo(dto.seo),
  };
}

export function mapAbout(dto: StrapiAboutDTO): About {
  return {
    title: dto.title,
    description: dto.description ?? undefined,
    content: dto.content ?? undefined,
    images: (dto.images ?? []).map(mapMedia).filter((img): img is MediaImage => img !== undefined),
    mission: dto.mission ?? undefined,
    vision: dto.vision ?? undefined,
    values: dto.values ?? undefined,
    milestones: mapMilestones(dto.milestones),
    seo: mapSeo(dto.seo),
  };
}

export function mapProductCategory(dto: StrapiProductCategoryDTO): ProductCategory {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    description: dto.description ?? undefined,
    image: mapMedia(dto.image),
    order: dto.order,
  };
}

export function mapProduct(dto: StrapiProductDTO): Product {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    shortDescription: dto.shortDescription ?? undefined,
    description: dto.description ?? undefined,
    category: dto.category ? mapProductCategory(dto.category) : undefined,
    featured: dto.featured,
    images: (dto.images ?? []).map(mapMedia).filter((img): img is MediaImage => img !== undefined),
    specifications: dto.specifications ?? undefined,
    applications: dto.applications ?? undefined,
    materials: dto.materials ?? undefined,
    seo: mapSeo(dto.seo),
  };
}

export function mapService(dto: StrapiServiceDTO): Service {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug,
    description: dto.description ?? undefined,
    content: dto.content ?? undefined,
    image: mapMedia(dto.image),
    icon: mapMedia(dto.icon),
    featured: dto.featured,
    order: dto.order,
    seo: mapSeo(dto.seo),
  };
}

export function mapManufacturingProcess(dto: StrapiManufacturingProcessDTO): ManufacturingProcess {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description ?? undefined,
    content: dto.content ?? undefined,
    order: dto.order,
    image: mapMedia(dto.image),
    icon: mapMedia(dto.icon),
  };
}

export function mapArticleCategory(dto: StrapiArticleCategoryDTO): ArticleCategory {
  return { id: dto.id, name: dto.name, slug: dto.slug };
}

export function mapArticle(dto: StrapiArticleDTO): Article {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug,
    excerpt: dto.excerpt ?? undefined,
    content: dto.content ?? undefined,
    coverImage: mapMedia(dto.coverImage),
    category: dto.category ? mapArticleCategory(dto.category) : undefined,
    author: dto.author ?? undefined,
    featured: dto.featured,
    publishedAt: dto.publishedAt ?? undefined,
    seo: mapSeo(dto.seo),
  };
}

export function mapContact(dto: StrapiContactDTO): Contact {
  return {
    title: dto.title,
    description: dto.description ?? undefined,
    contactInfo: mapContactInfo(dto.contactInfo),
    seo: mapSeo(dto.seo),
  };
}

export function mapCertificate(dto: StrapiCertificateDTO): Certificate {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description ?? undefined,
    document: mapMedia(dto.document),
    issueDate: dto.issueDate ?? undefined,
    expiryDate: dto.expiryDate ?? undefined,
    documentType: dto.documentType,
  };
}
