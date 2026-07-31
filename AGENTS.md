# AI Agent Guidelines & Project Context — worker-pwa-d1-starter

Welcome! This file provides instructions, architectural rules, coding standards, and context references for AI agents (Antigravity, Cursor, Copilot, etc.) working on this codebase.

---

## 📚 Single Source of Truth — Context Files

Before proposing or making architectural changes, review the detailed context documentation located in the [`context/`](context/) directory:

- [Project Overview](context/project-overview.md) — Product vision, core goals, edge runtime architecture, and PWA capabilities.
- [Tech Stack Architecture](context/tech-stack.md) — Framework specifications, state management, edge database, and deployment setup.
- [Database Schema](context/database-schema.md) — Drizzle ORM schema for Cloudflare D1 (`users` and `items` tables) and D1 binding access pattern.
- [Features & Starter Modules](context/features.md) — Starter dashboard demo UI, Zustand state template, D1 integration, and demo removal guide.

---

## 🛠️ Technology Stack & Standards

| Layer | Technology / Tool | Key Guidelines |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) | Use Server Components by default; add `'use client'` only for interactive UI. |
| **Deployment** | Cloudflare Workers (`@opennextjs/cloudflare`) | Keep code strictly compatible with Workers edge runtime (no Node.js native binary dependencies). |
| **Database** | Cloudflare D1 (SQLite at the edge) | Use `drizzle-orm/d1` for type-safe database access via `getDb()`. |
| **ORM** | Drizzle ORM | Maintain schema definitions in `src/db/schema.ts` and migrations via `drizzle-kit`. |
| **State Management** | Zustand (`persist` middleware) | Reactive client store template with local storage persistence capability. |
| **Styling** | Tailwind CSS v4 | Clean, modern, utility-first styling with Inter font and dark mode support. |
| **UI Components** | Custom React Components + Lucide Icons | Reusable UI components ensuring high accessibility and touch targets. |
| **PWA** | Web App Manifest | Installable application metadata (`public/manifest.json`). |

---

## 📐 Key Architecture Rules

### 1. Isolated Feature Domains
- All feature logic, components, Zustand stores, and types MUST be organized inside [`src/features/`](src/features/).
- The starter demo is isolated in `src/features/starter/` and can be removed when introducing custom domain modules.

### 2. Edge Runtime & Cloudflare D1 Compatibility
- Do NOT import native Node.js C/C++ binary modules or Node-only APIs (`fs`, `path`, native `child_process`).
- Fetch the Cloudflare D1 binding via `getDb()` from `src/db/index.ts` to support both native Worker edge bindings and local HTTP API proxying.

### 3. Drizzle ORM Schema & Migrations
- Keep table definitions in `src/db/schema.ts`.
- Run `npm run db:generate` to generate SQL migrations in `./drizzle` whenever `schema.ts` is updated.

---

## 📁 Repository Directory Layout

```
├── drizzle/                    # Generated SQL migration files & seed scripts
│   └── seed.sql
├── public/                     # Static assets & PWA web app manifest
│   ├── manifest.json
│   ├── favicon.svg
│   └── sw.js
├── src/
│   ├── app/                    # Next.js 16 App Router (pages, layouts, API routes)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/             # Shared UI components
│   │   └── layout/
│   │       └── Navbar.tsx
│   ├── db/                     # Drizzle ORM schema & D1 connection setup
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   └── seed.ts
│   └── features/               # Feature-based domain modules
│       └── starter/            # Starter demo feature (safely removable)
│           ├── components/
│           │   └── StarterDashboard.tsx
│           ├── store/
│           │   └── useStarterStore.ts
│           └── types/
│               └── index.ts
├── drizzle.config.ts           # Drizzle Kit configuration
├── open-next.config.ts         # OpenNext Cloudflare deployment config
├── wrangler.jsonc              # Cloudflare Workers & D1 database configuration
└── package.json
```

---

## ⚡ Useful Developer Commands

- **Development Server**: `npm run dev`
- **Type Checking & Linting**: `npm run lint`
- **Next.js Production Build**: `npm run build`
- **Cloudflare Types Generation**: `npm run cf-typegen`
- **Generate Migrations**: `npm run db:generate`
- **Apply Local D1 Migrations**: `npm run db:migrate:local`
- **Apply Remote D1 Migrations**: `npm run db:migrate:remote`
- **Local Preview**: `npm run preview`
- **Cloudflare Deployment**: `npm run deploy`
- **OpenSpec Change Status**: `npx openspec status`

---

## 🤖 Instructions for AI Assistants

1. **Obey Context & Specs**: Do not introduce architectural patterns or dependencies that contradict `context/tech-stack.md` or OpenSpec `design.md`.
2. **Preserve Edge Compatibility**: Never import Node.js native modules into code executed on Cloudflare Workers edge runtime.
3. **Maintain Modular UI**: Keep UI components clean, modern, and accessible with dark mode support.
4. **Verify Implementation**: After completing code changes, run build or lint commands to ensure zero TypeScript errors or broken imports.
