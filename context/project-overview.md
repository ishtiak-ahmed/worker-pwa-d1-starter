# Project Overview: worker-pwa-d1-starter

## Motivation & Core Purpose

This project is a clean, modern, production-ready starter boilerplate combining **Next.js 16 (App Router)** deployed to **Cloudflare Workers** via `@opennextjs/cloudflare`, **Cloudflare D1** (SQLite at the edge), **Drizzle ORM**, **Tailwind CSS v4**, **PWA Web App Manifest**, and **Zustand** state management.

It is designed to serve as a fast, type-safe foundation for building high-performance edge web applications with a feature-driven folder layout.

## Key Highlights & Features

1. **Edge-First Architecture**:
   - Built on Next.js 16 App Router (React 19) and bundled using `@opennextjs/cloudflare`.
   - Deployed directly to Cloudflare Workers for near-zero latency worldwide.

2. **Serverless Edge Database**:
   - Cloudflare D1 integration with type-safe schema definitions via Drizzle ORM (`drizzle-orm/d1`).
   - Migration management via `drizzle-kit` (`npm run db:generate`, `npm run db:migrate:local`, `npm run db:migrate:remote`).

3. **Isolated Feature-Driven Architecture**:
   - All demo UI, components, store, and types are self-contained inside [`src/features/starter/`](src/features/starter).
   - Easily removable by deleting the single starter directory to build new domain modules.

4. **Client State & Caching**:
   - Reactive Zustand state management store template with local storage persistence capability.

5. **Modern Styling & Mobile PWA**:
   - Utility-first Tailwind CSS v4 styling with default dark/light theme support and Inter typography.
   - PWA Web App Manifest configuration in `public/manifest.json`.

6. **CI/CD Auto-Deployment**:
   - Preconfigured GitHub Actions (`.github/workflows/deploy.yml`) and GitLab CI/CD (`.gitlab-ci.yml`) deployment pipelines.

## Design & Architecture Principles

- **Clean & Modular**: Strict separation of global app shell, shared UI components, database layer, and feature domain modules.
- **Strict Edge Compatibility**: Avoid Node.js native binary dependencies to maintain 100% compatibility with Cloudflare Workers runtime (`workerd`).
- **Developer Ergonomics**: Rapid local development using Turbopack (`npm run dev`) and Wrangler edge emulation (`npm run preview`).
