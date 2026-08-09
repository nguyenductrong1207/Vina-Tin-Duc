# CMS Guide

## Overview

The CMS is built with **Strapi 5** using TypeScript and PostgreSQL.

- Admin URL: `http://localhost:1337/admin`
- API URL: `http://localhost:1337/api`

## First-Time Setup

1. Start PostgreSQL: `docker compose up -d`
2. Start Strapi: `pnpm cms:dev`
3. Create your first admin account at the registration screen
4. Configure API permissions (see below)

## API Permissions

After first login, configure public API access:

1. Go to **Settings → Users & Permissions → Roles → Public**
2. Enable `find` and `findOne` for:
   - Global
   - Homepage
   - About
   - Contact
   - Product
   - Product Category
   - Service
   - Manufacturing Process
   - Article
   - Article Category
   - Certificate
3. **Do NOT enable** create, update, delete, or publish for Public role

## Content Types

### Single Types (one instance)
- **Global Settings** — Company info, logo, SEO defaults
- **Homepage** — Hero, introduction, capabilities, statistics sections
- **About** — Company info, mission, vision, milestones
- **Contact** — Contact info, address, working hours

### Collection Types (multiple entries)
- **Product** — Products with category, images, specifications
- **Product Category** — Product classification
- **Service** — Company services/capabilities
- **Manufacturing Process** — Ordered manufacturing steps
- **Article** — News/blog posts
- **Article Category** — News classification
- **Certificate** — Company certificates/documents

## Reusable Components

- `shared.seo` — SEO metadata (metaTitle, description, OG, etc.)
- `shared.cta` — Call to action buttons
- `shared.social-link` — Social media links
- `shared.section-heading` — Section title + subtitle
- `shared.statistic-item` — Number + label
- `shared.contact-info` — Phone, email, address, coordinates
- `sections.hero` — Homepage hero/banner
- `sections.introduction` — Company intro section
- `sections.capabilities` — Capabilities grid
- `sections.statistics` — Stats section
- `sections.cta-section` — CTA section
- `about.milestone` — Company timeline entry

## Environment Variables

See `cms/.env.example` for all required variables.

Key secrets to change in production:
- `APP_KEYS` — Server encryption keys
- `ADMIN_JWT_SECRET` — Admin JWT secret
- `JWT_SECRET` — API JWT secret
- `API_TOKEN_SALT` — API token salt
- `TRANSFER_TOKEN_SALT` — Data transfer token salt
- `ENCRYPTION_KEY` — General encryption key

Generate with: `openssl rand -base64 16`

## Database

PostgreSQL 17 via Docker Compose for local development.

For production, use a managed PostgreSQL service with:
- SSL enabled
- Connection pooling
- Regular backups
- Proper credentials (not defaults)
