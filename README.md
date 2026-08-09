# VINA TIN DUC - Corporate Website

Corporate website for **VINA TIN DUC COMPANY LIMITED** (CÔNG TY TNHH VINA TÍN ĐỨC).

A production-grade monorepo with a headless CMS and a modern React frontend.

## Architecture

| Layer | Technology | Directory |
|-------|-----------|-----------|
| CMS | Strapi 5, TypeScript, PostgreSQL | `/cms` |
| Frontend | React 19, Vite, TypeScript | `/web` |
| Database | PostgreSQL 17 (Docker) | `docker-compose.yml` |

## Prerequisites

- **Node.js** >= 22.x (LTS)
- **pnpm** >= 10.x
- **Docker** & Docker Compose (for PostgreSQL)
- **Git**

## Quick Start

```bash
# 1. Clone the repository
git clone <repo-url>
cd Vina-Tin-Duc

# 2. Copy environment files
cp .env.example .env
cp cms/.env.example cms/.env
cp web/.env.example web/.env

# 3. Start PostgreSQL
docker compose up -d

# 4. Install dependencies
pnpm install

# 5. Start the CMS (first run will prompt admin creation)
pnpm cms:dev

# 6. In a new terminal, start the frontend
pnpm web:dev
```

The CMS admin panel is available at `http://localhost:1337/admin`.
The frontend is available at `http://localhost:5173`.

## Scripts

### Root (workspace)

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm cms:dev` | Start Strapi in development mode |
| `pnpm cms:build` | Build Strapi for production |
| `pnpm cms:start` | Start Strapi in production mode |
| `pnpm web:dev` | Start frontend dev server |
| `pnpm web:build` | Build frontend for production |
| `pnpm web:lint` | Lint frontend code |
| `pnpm web:typecheck` | TypeScript type checking |
| `pnpm web:test` | Run frontend tests |
| `pnpm docker:up` | Start Docker services |
| `pnpm docker:down` | Stop Docker services |

### CMS (`/cms`)

| Command | Description |
|---------|-------------|
| `pnpm develop` | Start with auto-reload |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |

### Frontend (`/web`)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server (port 5173) |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Run Vitest |

## Environment Variables

See:
- `.env.example` — Docker/database config
- `cms/.env.example` — Strapi secrets and database connection
- `web/.env.example` — Frontend API URL

**Never commit `.env` files.**

## Database Setup

PostgreSQL runs via Docker Compose. Default credentials (for local dev only):

- User: `strapi`
- Password: `strapi_password`
- Database: `vina_tin_duc`
- Port: `5432`

## Deployment

See [docs/deployment.md](docs/deployment.md) for production deployment guidelines.

## Project Structure

```
/
├── cms/                  # Strapi 5 CMS
│   ├── config/           # Server, database, middleware config
│   └── src/
│       ├── api/          # Content types (routes, controllers, services)
│       └── components/   # Reusable Strapi components
├── web/                  # React frontend
│   └── src/
│       ├── app/          # App setup, providers, router
│       ├── components/   # UI & layout components
│       ├── features/     # Feature modules (home, products, etc.)
│       ├── layouts/      # Page layouts
│       ├── pages/        # Route pages
│       ├── services/     # API client & mappers
│       ├── styles/       # Design tokens & global styles
│       └── types/        # TypeScript types
├── docs/                 # Documentation
├── docker-compose.yml    # PostgreSQL for local dev
└── package.json          # Workspace root
```

## Technology Stack

- **Strapi 5** — Headless CMS with REST API
- **React 19** — UI library
- **Vite 6** — Build tool
- **TypeScript 5.7** — Strict typing
- **TanStack Query 5** — Server state management
- **React Router 7** — Client-side routing
- **PostgreSQL 17** — Database
- **CSS Modules + CSS Variables** — Styling
- **ESLint 9 + Prettier** — Code quality
- **Vitest** — Testing
- **Docker Compose** — Local infrastructure

## Documentation

- [Architecture](docs/architecture.md)
- [CMS Guide](docs/cms.md)
- [Frontend Guide](docs/frontend.md)
- [Security](docs/security.md)
- [Deployment](docs/deployment.md)
- [Content Model](docs/content-model.md)

## License

Proprietary — VINA TIN DUC COMPANY LIMITED
