# Tech Stack Architecture

## Core Technologies

- **Framework**: Next.js 16 (App Router, Server Actions, React 19, Turbopack)
- **Deployment Platform**: Cloudflare Workers (`@opennextjs/cloudflare`)
- **Database**: Cloudflare D1 (Serverless Edge SQLite Database)
- **ORM**: Drizzle ORM (`drizzle-orm/d1`) with `drizzle-kit` for schema migrations
- **State Management**: Zustand store template with `persist` middleware for local storage caching
- **Styling & UI**: Tailwind CSS v4, Inter font, default dark/light mode setup
- **PWA**: Web App Manifest (`public/manifest.json`)
- **Deployment Workflows**: GitHub Actions (`.github/workflows/deploy.yml`) & GitLab CI/CD (`.gitlab-ci.yml`)

## Codebase Directory Structure (Feature-Driven)

```
src/
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── globals.css       # Tailwind CSS v4 entry point
│   ├── layout.tsx        # Global root layout
│   └── page.tsx          # Main entry page rendering feature dashboard
├── components/           # Shared, domain-independent UI components
│   └── layout/           # Shared layout components (Navbar, Footer, etc.)
├── db/                   # Drizzle ORM schema & D1 connection setup
│   ├── index.ts          # Drizzle ORM client factory (`getDb`)
│   ├── schema.ts         # D1 database table definitions (`users`, `items`)
│   └── seed.ts           # D1 database seed data script
├── features/             # Feature domain modules
│   └── starter/          # Clean demo starter feature (safely removable)
│       ├── components/   # UI components (`StarterDashboard.tsx`)
│       ├── store/        # Zustand store (`useStarterStore.ts`)
│       └── types/        # Feature types (`index.ts`)
└── hooks/                # Generic, domain-independent React hooks
```

## Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Device                          │
│   Next.js App Router (React 19) + Tailwind CSS v4 + PWA     │
│   Zustand Store (Reactive Client State & Local Storage)     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / API Requests
┌──────────────────────────────▼──────────────────────────────┐
│                  Cloudflare Workers Edge                    │
│        OpenNext Runtime + Drizzle ORM Client (`getDb`)      │
└──────────────────────────────┬──────────────────────────────┘
                               │ SQLite Binding (`env.DB`)
┌──────────────────────────────▼──────────────────────────────┐
│                    Cloudflare D1 Database                   │
│             (`users` and `items` SQLite tables)             │
└─────────────────────────────────────────────────────────────┘
```

## Developer CLI Commands

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start Next.js development server with Turbopack |
| `npm run build` | Build Next.js production bundle |
| `npm run lint` | Run ESLint static analysis |
| `npm run cf-typegen` | Generate TypeScript definitions for Cloudflare bindings |
| `npm run db:generate` | Generate SQL migration files from `src/db/schema.ts` |
| `npm run db:migrate:local` | Apply migrations to local D1 SQLite instance |
| `npm run db:migrate:remote` | Apply migrations to live Cloudflare D1 database |
| `npm run db:seed:local` | Seed local D1 database instance |
| `npm run db:seed:remote` | Seed live remote Cloudflare D1 database |
| `npm run preview` | Build and preview locally in Cloudflare Workers runtime (`workerd` via Wrangler) |
| `npm run deploy` | Build and deploy directly to Cloudflare Workers |
