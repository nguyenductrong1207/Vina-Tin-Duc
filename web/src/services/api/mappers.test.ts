import { describe, it, expect } from 'vitest';
import { mapMedia, mapSeo, mapProduct, mapService, mapArticle, mapHomepage } from './mappers';
import type { StrapiMedia, StrapiSeoDTO, StrapiProductDTO, StrapiServiceDTO, StrapiArticleDTO, StrapiHomepageDTO } from '@/types/strapi';

describe('mappers', () => {
  describe('mapMedia', () => {
    it('returns undefined for null/undefined input', () => {
      expect(mapMedia(null)).toBeUndefined();
      expect(mapMedia(undefined)).toBeUndefined();
    });

    it('resolves relative URL to absolute', () => {
      const media: StrapiMedia = {
        id: 1,
        documentId: 'abc',
        url: '/uploads/image.jpg',
        alternativeText: 'test',
        width: 800,
        height: 600,
        formats: null,
      };

      const result = mapMedia(media);
      expect(result).toBeDefined();
      expect(result?.url).toContain('http');
      expect(result?.url).toContain('/uploads/image.jpg');
      expect(result?.alternativeText).toBe('test');
      expect(result?.width).toBe(800);
    });

    it('keeps absolute URLs unchanged', () => {
      const media: StrapiMedia = {
        id: 1,
        documentId: 'abc',
        url: 'https://cdn.example.com/image.jpg',
        alternativeText: null,
        width: 100,
        height: 100,
        formats: null,
      };

      const result = mapMedia(media);
      expect(result?.url).toBe('https://cdn.example.com/image.jpg');
      expect(result?.alternativeText).toBeUndefined();
    });
  });

  describe('mapSeo', () => {
    it('returns undefined for null/undefined input', () => {
      expect(mapSeo(null)).toBeUndefined();
      expect(mapSeo(undefined)).toBeUndefined();
    });

    it('maps all SEO fields correctly', () => {
      const seo: StrapiSeoDTO = {
        metaTitle: 'Test Title',
        metaDescription: 'Test description',
        keywords: 'test, seo',
        canonicalURL: 'https://example.com',
        ogTitle: 'OG Title',
        ogDescription: 'OG desc',
        ogImage: null,
        noIndex: true,
        noFollow: false,
      };

      const result = mapSeo(seo);
      expect(result?.metaTitle).toBe('Test Title');
      expect(result?.metaDescription).toBe('Test description');
      expect(result?.noIndex).toBe(true);
      expect(result?.noFollow).toBe(false);
      expect(result?.ogImage).toBeUndefined();
    });
  });

  describe('mapProduct', () => {
    it('maps a product DTO to domain model', () => {
      const dto: StrapiProductDTO = {
        id: 1,
        documentId: 'prod-1',
        name: 'PET Bottle',
        slug: 'pet-bottle',
        shortDescription: 'High quality PET bottle',
        description: '<p>Description</p>',
        category: {
          id: 1,
          documentId: 'cat-1',
          name: 'Bottles',
          slug: 'bottles',
          description: null,
          image: null,
          order: 0,
        },
        featured: true,
        images: [],
        specifications: null,
        applications: 'Beverage, Water',
        materials: 'PET',
        seo: null,
      };

      const result = mapProduct(dto);
      expect(result.id).toBe(1);
      expect(result.name).toBe('PET Bottle');
      expect(result.slug).toBe('pet-bottle');
      expect(result.featured).toBe(true);
      expect(result.category?.name).toBe('Bottles');
      expect(result.applications).toBe('Beverage, Water');
      expect(result.specifications).toBeUndefined();
    });
  });

  describe('mapService', () => {
    it('maps a service DTO to domain model', () => {
      const dto: StrapiServiceDTO = {
        id: 2,
        documentId: 'svc-1',
        title: 'Plastic Manufacturing',
        slug: 'plastic-manufacturing',
        description: 'Full service plastic manufacturing',
        content: '<p>Content</p>',
        image: null,
        icon: null,
        featured: true,
        order: 1,
        seo: null,
      };

      const result = mapService(dto);
      expect(result.id).toBe(2);
      expect(result.title).toBe('Plastic Manufacturing');
      expect(result.slug).toBe('plastic-manufacturing');
      expect(result.featured).toBe(true);
      expect(result.order).toBe(1);
    });
  });

  describe('mapArticle', () => {
    it('maps an article DTO to domain model', () => {
      const dto: StrapiArticleDTO = {
        id: 3,
        documentId: 'art-1',
        title: 'Company News',
        slug: 'company-news',
        excerpt: 'Latest news',
        content: '<p>Full article</p>',
        coverImage: null,
        category: { id: 1, documentId: 'acat-1', name: 'News', slug: 'news' },
        author: 'Admin',
        featured: false,
        publishedAt: '2024-01-15T10:00:00.000Z',
        seo: null,
      };

      const result = mapArticle(dto);
      expect(result.id).toBe(3);
      expect(result.title).toBe('Company News');
      expect(result.category?.name).toBe('News');
      expect(result.publishedAt).toBe('2024-01-15T10:00:00.000Z');
    });
  });

  describe('mapHomepage', () => {
    it('handles homepage with all sections null', () => {
      const dto: StrapiHomepageDTO = {
        id: 1,
        documentId: 'hp-1',
        hero: null,
        introduction: null,
        capabilities: null,
        statistics: null,
        ctaSection: null,
        seo: null,
      };

      const result = mapHomepage(dto);
      expect(result.hero).toBeUndefined();
      expect(result.introduction).toBeUndefined();
      expect(result.capabilities).toBeUndefined();
      expect(result.statistics).toBeUndefined();
      expect(result.ctaSection).toBeUndefined();
      expect(result.seo).toBeUndefined();
    });

    it('maps hero section correctly', () => {
      const dto: StrapiHomepageDTO = {
        id: 1,
        documentId: 'hp-1',
        hero: {
          title: 'Welcome',
          subtitle: 'To our company',
          backgroundImage: null,
          cta: { label: 'Contact', url: '/contact', variant: 'primary', isExternal: false },
        },
        introduction: null,
        capabilities: null,
        statistics: null,
        ctaSection: null,
        seo: null,
      };

      const result = mapHomepage(dto);
      expect(result.hero?.title).toBe('Welcome');
      expect(result.hero?.cta?.label).toBe('Contact');
      expect(result.hero?.cta?.variant).toBe('primary');
    });
  });
});
