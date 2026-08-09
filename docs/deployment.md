# Deployment

## Overview

The CMS and frontend are independently deployable:

- **CMS (Strapi)** — Node.js server + PostgreSQL
- **Frontend (React)** — Static files served via CDN/nginx

## CMS Deployment

### Build

```bash
cd cms
pnpm build
pnpm start
```

### Requirements
- Node.js >= 22
- PostgreSQL 17
- Environment variables configured

### Environment Variables (Production)

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Generate unique secrets for production
APP_KEYS=<generated>
ADMIN_JWT_SECRET=<generated>
JWT_SECRET=<generated>
API_TOKEN_SALT=<generated>
TRANSFER_TOKEN_SALT=<generated>
ENCRYPTION_KEY=<generated>

# Production database
DATABASE_CLIENT=postgres
DATABASE_HOST=<your-db-host>
DATABASE_PORT=5432
DATABASE_NAME=vina_tin_duc
DATABASE_USERNAME=<secure-user>
DATABASE_PASSWORD=<secure-password>
DATABASE_SSL=true

# Restrict CORS to production domain
CORS_ORIGINS=https://vinatinduc.com
```

### Hosting Options
- **VPS** (DigitalOcean, Linode) — Direct Node.js deployment
- **Container** — Docker with multi-stage build
- **PaaS** — Railway, Render, Fly.io
- **Strapi Cloud** — Managed hosting

## Frontend Deployment

### Build

```bash
cd web
pnpm build
```

Output is in `web/dist/` — static HTML/CSS/JS files.

### Environment Variables (Build-time)

```env
VITE_API_URL=https://api.vinatinduc.com
VITE_SITE_NAME=VINA TIN DUC
```

### Hosting Options
- **CDN** (Cloudflare Pages, Vercel, Netlify)
- **Object Storage** (S3 + CloudFront)
- **nginx** on VPS

### SPA Configuration

Since this is a SPA, configure your server to serve `index.html` for all routes:

**nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Vercel (`vercel.json`):**
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Docker Production Build (CMS)

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-alpine
RUN addgroup -S strapi && adduser -S strapi -G strapi
WORKDIR /app
COPY --from=builder /app .
USER strapi
EXPOSE 1337
CMD ["pnpm", "start"]
```

## CI/CD

GitHub Actions workflow is configured at `.github/workflows/ci.yml`.

It runs on every push/PR:
1. Install dependencies
2. Lint
3. Type check
4. Test
5. Build

## Post-Deployment Checklist

- [ ] CMS admin account created
- [ ] API permissions configured for Public role
- [ ] Initial content entered in CMS
- [ ] CORS origins set to production domain
- [ ] HTTPS configured
- [ ] Database backups scheduled
- [ ] Monitoring/alerts configured
- [ ] DNS configured
