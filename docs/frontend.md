# Frontend Guide

## Overview

The frontend is a React 19 SPA built with Vite, consuming Strapi's REST API.

## Technology Stack

- **React 19** — UI rendering
- **Vite 6** — Build tool and dev server
- **TypeScript 5.7** — Strict type checking
- **React Router 7** — Client-side routing (library mode)
- **TanStack Query 5** — Server state, caching, refetching
- **react-helmet-async** — Document head management
- **CSS Modules** — Scoped component styles
- **CSS Variables** — Design tokens

## Project Structure

```
web/src/
├── app/              # Application shell
│   ├── config/       # Environment config
│   ├── providers/    # React context providers
│   └── router/       # Route definitions
├── components/       # Shared components
│   ├── layout/       # Header, Footer
│   └── ui/           # LoadingPage, ErrorState, EmptyState, SkipLink
├── features/         # Feature modules
│   ├── about/        # About page hooks
│   ├── contact/      # Contact page hooks
│   ├── home/         # Homepage hooks + section components
│   ├── news/         # Article hooks
│   ├── process/      # Manufacturing process hooks
│   ├── products/     # Product hooks
│   └── services/     # Service hooks
├── layouts/          # Page layout wrappers
├── pages/            # Route-level page components
├── services/api/     # API client, endpoints, mappers
├── styles/           # Global styles and design tokens
├── test/             # Test setup
└── types/            # TypeScript type definitions
```

## Adding a New Page

1. Create a domain type in `src/types/domain.ts`
2. Add Strapi DTO in `src/types/strapi.ts`
3. Add endpoint in `src/services/api/endpoints.ts`
4. Add mapper in `src/services/api/mappers.ts`
5. Create feature hook in `src/features/<feature>/hooks/`
6. Create page component in `src/pages/`
7. Add route in `src/app/router/AppRouter.tsx`

## API Layer

The API layer follows a clean separation:

```
StrapiProductDTO  →  mapProduct()  →  Product  →  ProductCard
     (API shape)      (adapter)      (domain)     (UI)
```

This means:
- Components never depend on Strapi response shapes
- Strapi can be replaced without touching React components
- Mappers are independently testable

## Design System

Design tokens are defined in `src/styles/variables.css`:

- Colors (primary green, secondary blue, neutral grays)
- Typography (Inter font, responsive sizes)
- Spacing scale (4px base)
- Container widths (640-1440px)
- Border radius, shadows, transitions
- Z-index layers

## Styling Conventions

- Use CSS Modules for component-specific styles
- Use CSS Variables for design tokens
- Mobile-first responsive design
- Use `var(--space-*)` for spacing, never raw pixel values
- Use semantic color variables, not raw colors

## SEO

- Each page uses `react-helmet-async` for document head
- SEO data comes from Strapi (CMS-managed)
- Fallback meta tags in `index.html`
- Semantic HTML throughout

## Performance

- Route-level code splitting via `React.lazy()`
- TanStack Query caching (5min stale, 30min GC)
- Responsive images via Strapi breakpoints
- `loading="lazy"` on images below the fold
- Manual chunk splitting (vendor, router, query)

## Testing

- **Vitest** for unit and integration tests
- **React Testing Library** for component tests
- Test files: `*.test.ts` or `*.test.tsx`
- Run: `pnpm test` or `pnpm test:watch`
