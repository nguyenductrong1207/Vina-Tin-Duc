# Architecture

## Overview

The project is a pnpm workspace monorepo with two independently deployable applications:

```
┌─────────────┐     REST API      ┌─────────────┐
│   Frontend  │ ◄────────────────► │   Strapi    │
│  React/Vite │                    │   CMS       │
└─────────────┘                    └──────┬──────┘
                                          │
                                   ┌──────▼──────┐
                                   │ PostgreSQL  │
                                   └─────────────┘
```

## Design Principles

- **Separation of concerns** — CMS and frontend are fully decoupled
- **Clean architecture** — Domain types independent of infrastructure
- **Feature-based organization** — Frontend grouped by business capability
- **Adapter pattern** — Mappers transform API DTOs to domain models
- **Least privilege** — Public API is read-only

## Frontend Architecture

```
Components → Feature Hooks → API Service → API Client → Strapi REST
```

### Layers

1. **Pages** — Route-level components, handle loading/error states
2. **Feature Hooks** — TanStack Query hooks per content type
3. **API Service** — Endpoint definitions with populate params
4. **Mappers** — DTO → Domain model transformation
5. **API Client** — Centralized fetch with error handling
6. **Domain Types** — Pure TypeScript interfaces

### Why this approach

- **Testable** — Mappers can be unit tested without UI
- **Replaceable** — CMS can be swapped without touching components
- **Type-safe** — Strong contracts at every boundary
- **Cacheable** — TanStack Query handles server state lifecycle

## CMS Architecture

Strapi 5 with its standard plugin-based architecture:

- **Content Types** — Define data schema (JSON)
- **Components** — Reusable field groups (SEO, CTA, etc.)
- **Services** — Business logic (using Strapi factories)
- **Controllers** — Request handling
- **Routes** — API endpoint definitions

## Data Flow

1. Content editor creates/updates content in Strapi Admin
2. Strapi stores in PostgreSQL, handles media upload
3. Frontend fetches published content via REST API
4. TanStack Query caches responses (5min stale, 30min GC)
5. Mappers transform API response to domain models
6. React components render domain data

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| REST over GraphQL | Simpler, Strapi native, sufficient for this use case |
| CSS Modules over Tailwind | Predictable CSS, no build-time utility generation, less vendor lock-in |
| React Router library mode | SPA routing without framework overhead |
| No Redux | TanStack Query handles server state; no complex client state needed |
| PostgreSQL over SQLite | Production-ready, supports concurrent access |
| pnpm workspace | Simple monorepo without framework complexity |
