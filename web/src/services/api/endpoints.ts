/**
 * Strapi API endpoint definitions.
 * Centralizes all API paths and query parameters.
 *
 * Strapi 5 uses bracket-notation for populate:
 *   populate[0]=field1&populate[1]=field2.nested
 */

import { apiClient } from './client';
import type {
  StrapiSingleResponse,
  StrapiCollectionResponse,
  StrapiGlobalDTO,
  StrapiHomepageDTO,
  StrapiAboutDTO,
  StrapiProductDTO,
  StrapiProductCategoryDTO,
  StrapiServiceDTO,
  StrapiManufacturingProcessDTO,
  StrapiArticleDTO,
  StrapiContactDTO,
  StrapiCertificateDTO,
} from '@/types/strapi';

export const strapiApi = {
  // Single Types
  getGlobal: () =>
    apiClient.get<StrapiSingleResponse<StrapiGlobalDTO>>('/api/global', {
      params: {
        populate: ['socialLinks', 'logo', 'favicon', 'defaultSeo', 'defaultSeo.ogImage'],
      },
    }),

  getHomepage: () =>
    apiClient.get<StrapiSingleResponse<StrapiHomepageDTO>>('/api/homepage', {
      params: {
        populate: [
          'hero',
          'hero.backgroundImage',
          'hero.cta',
          'introduction',
          'introduction.heading',
          'introduction.image',
          'capabilities',
          'capabilities.heading',
          'capabilities.items',
          'capabilities.items.icon',
          'statistics',
          'statistics.heading',
          'statistics.items',
          'ctaSection',
          'ctaSection.cta',
          'ctaSection.backgroundImage',
          'seo',
          'seo.ogImage',
        ],
      },
    }),

  getAbout: () =>
    apiClient.get<StrapiSingleResponse<StrapiAboutDTO>>('/api/about', {
      params: {
        populate: ['images', 'milestones', 'seo', 'seo.ogImage'],
      },
    }),

  getContact: () =>
    apiClient.get<StrapiSingleResponse<StrapiContactDTO>>('/api/contact', {
      params: {
        populate: ['contactInfo', 'seo', 'seo.ogImage'],
      },
    }),

  // Collection Types
  getProducts: (page = 1, pageSize = 25) =>
    apiClient.get<StrapiCollectionResponse<StrapiProductDTO>>('/api/products', {
      params: {
        populate: ['images', 'category', 'seo', 'seo.ogImage'],
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'sort[0]': 'name:asc',
        status: 'published',
      },
    }),

  getProductBySlug: (slug: string) =>
    apiClient.get<StrapiCollectionResponse<StrapiProductDTO>>('/api/products', {
      params: {
        'filters[slug][$eq]': slug,
        populate: ['images', 'category', 'seo', 'seo.ogImage'],
        status: 'published',
      },
    }),

  getProductCategories: () =>
    apiClient.get<StrapiCollectionResponse<StrapiProductCategoryDTO>>('/api/product-categories', {
      params: {
        populate: ['image'],
        'sort[0]': 'order:asc',
      },
    }),

  getServices: () =>
    apiClient.get<StrapiCollectionResponse<StrapiServiceDTO>>('/api/services', {
      params: {
        populate: ['image', 'icon', 'seo', 'seo.ogImage'],
        'sort[0]': 'order:asc',
        status: 'published',
      },
    }),

  getServiceBySlug: (slug: string) =>
    apiClient.get<StrapiCollectionResponse<StrapiServiceDTO>>('/api/services', {
      params: {
        'filters[slug][$eq]': slug,
        populate: ['image', 'icon', 'seo', 'seo.ogImage'],
        status: 'published',
      },
    }),

  getManufacturingProcesses: () =>
    apiClient.get<StrapiCollectionResponse<StrapiManufacturingProcessDTO>>('/api/manufacturing-processes', {
      params: {
        populate: ['image', 'icon'],
        'sort[0]': 'order:asc',
        status: 'published',
      },
    }),

  getArticles: (page = 1, pageSize = 10) =>
    apiClient.get<StrapiCollectionResponse<StrapiArticleDTO>>('/api/articles', {
      params: {
        populate: ['coverImage', 'category', 'seo', 'seo.ogImage'],
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'sort[0]': 'publishedAt:desc',
        status: 'published',
      },
    }),

  getArticleBySlug: (slug: string) =>
    apiClient.get<StrapiCollectionResponse<StrapiArticleDTO>>('/api/articles', {
      params: {
        'filters[slug][$eq]': slug,
        populate: ['coverImage', 'category', 'seo', 'seo.ogImage'],
        status: 'published',
      },
    }),

  getCertificates: () =>
    apiClient.get<StrapiCollectionResponse<StrapiCertificateDTO>>('/api/certificates', {
      params: {
        populate: ['document'],
        'sort[0]': 'issueDate:desc',
        status: 'published',
      },
    }),
};
