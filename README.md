# worker-pwa-d1-starter

**A clean, production-ready full-stack starter** for building high-performance edge web applications with Next.js 16, Cloudflare Workers, and a serverless SQLite database at the edge.

Clone it, configure your D1 database, and ship your first Cloudflare Workers app in minutes — with type-safe queries, reactive state management, PWA support, and automated CI/CD pipelines pre-wired out of the box.

---

## 🚀 Tech Stack Highlights

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) | Modern React 19 server components and edge rendering. |
| **Edge Runtime** | Cloudflare Workers (`@opennextjs/cloudflare`) | Ultra-fast global edge deployment. |
| **Database** | Cloudflare D1 | Serverless SQLite edge database binding. |
| **ORM** | Drizzle ORM (`drizzle-orm/d1`) | Type-safe database queries & migration tooling (`drizzle-kit`). |
| **State Management** | Zustand | Lightweight, reactive client-side store template. |
| **Styling** | Tailwind CSS v4 | Modern styling with Inter font & dark mode. |
| **PWA** | Web App Manifest | Installable application metadata (`public/manifest.json`). |

---

## 🛠️ Prerequisites

- **Node.js**: v18.17.0+ or v20+
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Cloudflare Account**: For deploying to Cloudflare Workers and Cloudflare D1 database bindings.
- **Wrangler CLI**: Included as a project dependency (`wrangler`).

---

## ⚡ Getting Started

Follow these steps in order to go from clone to a running local app.

### Step 1: Clone the repository

```bash
git clone https://github.com/ishtiak-ahmed/worker-pwa-d1-starter.git
cd worker-pwa-d1-starter
```

### Step 2: Install dependencies

> Requires Node.js v18.17.0+ or v20+

```bash
npm install
```

### Step 3: Create Cloudflare D1 database

Create your Cloudflare D1 database:

```bash
npx wrangler d1 create <db-name>
```

Update `wrangler.jsonc` with the returned `database_id`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "<db-name>",
    "database_id": "YOUR_DATABASE_ID_HERE"
  }
]
```

### Step 4: Configure environment variables

Copy the example environment files:

```bash
cp .dev.vars.example .dev.vars
cp env.local.example .env.local
```

Fill in your Cloudflare account ID, API token, and the `database_id` created in Step 3 in both files:

```ini
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_DATABASE_NAME=<db-name>
CLOUDFLARE_DATABASE_ID=your_cloudflare_database_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
```

> **Full reference:** See the [Environment Variables Reference](#-environment-variables--secrets-reference) table below for all available variables and their descriptions.

### Step 5: Generate Cloudflare Types

Generate TypeScript definitions for Cloudflare bindings (`CloudflareEnv`):

```bash
npm run cf-typegen
```

### Step 6: Set up and migrate local D1 database

Generate migration files from the Drizzle schema and apply them locally:

```bash
# 1. Generate migration files from the Drizzle schema
npm run db:generate

# 2. Apply migrations to your local D1 SQLite instance
npm run db:migrate:local
```

> **Full guide:** See the [D1 Database Setup Guide](#️-cloudflare-d1-database-setup-guide) section for detailed instructions including seeding and remote migration.

### Step 7: Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the starter dashboard.

### Step 8: (Optional) Preview Cloudflare Worker locally

Build and preview the app in the Cloudflare Workers local runtime (`workerd` via Wrangler):

```bash
npm run preview
```

---

## 📁 Repository Structure

```
├── drizzle/                    # Generated SQL migration files & seed scripts
│   └── seed.sql
├── public/                     # Static assets & PWA web app manifest
│   ├── manifest.json
│   └── favicon.svg
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
│   ├── features/               # Feature-based domain modules
│   │   └── starter/            # Clean demo starter feature (safely removable)
│   │       ├── components/
│   │       │   └── StarterDashboard.tsx
│   │       ├── store/
│   │       │   └── useStarterStore.ts
│   │       └── types/
│   │           └── index.ts
│   └── lib/                    # Helpers (Cloudflare D1 edge binding retriever)
│       └── get-db.ts
├── drizzle.config.ts           # Drizzle Kit configuration
├── open-next.config.ts         # OpenNext Cloudflare deployment config
├── wrangler.jsonc              # Cloudflare Workers & D1 database configuration
└── package.json
```

---

## ✨ How to Start Building & Remove the Starter Demo

All starter demo state, components, and types are isolated inside **[`src/features/starter/`](src/features/starter/)**.

### Step 1: Create your new feature domain

Create a new directory for your feature inside `src/features/`:

```bash
mkdir -p src/features/my-feature/components src/features/my-feature/store src/features/my-feature/types
```

### Step 2: Remove the starter feature directory

When you are ready to replace the demo UI, delete the single starter feature folder:

```bash
rm -rf src/features/starter
```

### Step 3: Connect your feature in `src/app/page.tsx`

Update `src/app/page.tsx` to render your new feature component:

```typescript
import { MyFeatureComponent } from "@/features/my-feature/components/MyFeatureComponent";

export default function HomePage() {
  return <MyFeatureComponent />;
}
```

---

## 🗄️ Cloudflare D1 Database Setup Guide

### 1. Create a D1 Database via Wrangler

Run the following command to create a new Cloudflare D1 SQLite database in your Cloudflare account:

```bash
npx wrangler d1 create <db-name>
```

Output example:

```text
✅ Created database 'starter-db'
database_name = "starter-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 2. Configure Database Binding in `wrangler.jsonc`

Configure your D1 database binding in `wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "starter-db",
    "database_id": "YOUR_DATABASE_ID_HERE",
    "migrations_dir": "./drizzle"
  }
]
```

### 3. Environment Variables Setup (`.dev.vars` / `.env.local`)

Copy `.dev.vars.example` to `.dev.vars` (for local Cloudflare Worker emulation) and `.env.local` (for Next.js local server):

```bash
cp .dev.vars.example .dev.vars
cp env.local.example .env.local
```

Fill in your Cloudflare account, database name, and database ID credentials:

```ini
NEXTJS_ENV=development
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_DATABASE_NAME=starter-db
CLOUDFLARE_DATABASE_ID=your_cloudflare_database_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
```

### 4. Generate Database Migrations

Define or edit your database tables in `src/db/schema.ts`. Then generate SQL migration files using Drizzle Kit:

```bash
npm run db:generate
```

This generates versioned SQL migration files inside the `./drizzle` directory.

### 5. Apply Migrations

#### Local Development Environment:
To apply migrations to your local D1 SQLite database instance:

```bash
npm run db:migrate:local
```

#### Remote Production Environment:
To apply migrations to your live Cloudflare D1 database on the edge:

```bash
npm run db:migrate:remote
```

### 6. Seed Initial Data (Optional)

Execute seed queries locally or remotely:

```bash
# Seed local D1 instance
npm run db:seed:local

# Seed live Cloudflare D1 database
npm run db:seed:remote
```

---

### 💡 Switching Between Local DB and Remote DB Data

The application automatically routes database queries to **Remote D1** or **Local D1** based on your environment configuration:

#### 🌐 Using Remote Database Data (Live Cloudflare D1)
1. **Local Dev (`npm run dev`)**:
   Fill in your Cloudflare API credentials in `.env.local`:
   ```ini
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   CLOUDFLARE_DATABASE_ID=your_cloudflare_database_id
   CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
   ```
   When these 3 variables are present in `.env.local`, `getD1DB()` will proxy all queries directly to your live remote Cloudflare D1 database over the Cloudflare HTTP API.
2. **Apply Remote Migrations & Seed**:
   ```bash
   npm run db:migrate:remote
   npm run db:seed:remote
   ```
3. **Deployed Application**:
   When deployed on Cloudflare Workers (`npm run deploy`), it automatically connects to your live D1 database binding set in `wrangler.jsonc`.

#### 💻 Using Local Database Data (Offline / Miniflare SQLite)
1. **Apply Local Migrations & Seed**:
   Run migrations and seed data into your local SQLite instance (`.wrangler/state/v3/d1/`):
   ```bash
   npm run db:migrate:local
   npm run db:seed:local
   ```
2. **Local Worker Emulation (`npm run preview`)**:
   Run `npm run preview` to start the OpenNext Cloudflare local preview worker. It attaches directly to your local Miniflare D1 SQLite database.
3. **Local Dev Mode (`npm run dev`)**:
   To prevent `npm run dev` from querying remote Cloudflare D1, leave `CLOUDFLARE_API_TOKEN` blank in `.env.local`.

---

## ⚡ Connecting to D1 in Code

In your Server Components, Server Actions, or API Routes, retrieve the type-safe Drizzle client instance via `getD1DB()` and `getDb()` helpers:

```typescript
import { getD1DB } from "@/lib/get-db";
import { getDb } from "@/db";
import { items } from "@/db/schema";

export async function GET() {
  // 1. Fetch Cloudflare D1 Database binding
  const d1 = await getD1DB();
  
  // 2. Initialize type-safe Drizzle ORM client
  const db = getDb(d1);

  // 3. Perform type-safe SQL query
  const allItems = await db.select().from(items);

  return Response.json(allItems);
}
```

---

## 💻 Local Development Workflow

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Cloudflare Types

Generate TypeScript definitions for Cloudflare bindings (`CloudflareEnv`):

```bash
npm run cf-typegen
```

### 3. Run Development Server

Start Next.js development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the starter dashboard.

---

## 🚢 Building & Deploying to Cloudflare Workers

### Preview Cloudflare Build Locally

Build the Next.js app and preview it in the Cloudflare Workers local runtime (`workerd` via Wrangler):

```bash
npm run preview
```

### Deploy to Live Cloudflare Workers Edge

Build and deploy directly to Cloudflare:

```bash
npm run deploy
```

---

## 🤖 CI/CD Auto-Deployment Setup

This boilerplate includes preconfigured workflows for both **GitHub Actions** and **GitLab CI/CD**.

### 📋 Environment Variables & Secrets Reference

Configure the following environment variables (in `.dev.vars` / `.env.local` for local development, and in repository Secrets/Variables for CI/CD deployments):

| Variable / Secret Name | Required Context | Description | Notes / Example |
| :--- | :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | CI/CD & Local | API token for Cloudflare Workers deployment and CLI management. | Generated in Cloudflare Dashboard → Profile → API Tokens (using **Edit Cloudflare Workers** template). |
| `CLOUDFLARE_ACCOUNT_ID` | Local & Config | Your Cloudflare Account ID. | Found in Cloudflare Dashboard URL or Worker Overview page. |
| `CLOUDFLARE_DATABASE_NAME` | Local & Config | Name of your Cloudflare D1 SQLite database. | e.g. `starter-db` |
| `CLOUDFLARE_DATABASE_ID` | Local & Config | Unique UUID identifier of your Cloudflare D1 database. | Generated via `npx wrangler d1 create <name>` |
| `NEXTJS_ENV` | Local & Config | Current application environment name. | `development`, `staging`, or `production` |

---

### 🐙 Option A: GitHub Actions Setup

The workflow file is located at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. **Obtain Cloudflare API Token**:
   - Go to Cloudflare Dashboard → Profile → **API Tokens** → Create Token using the **Edit Cloudflare Workers** template.
2. **Add Secrets to GitHub Repository**:
   - Navigate to your GitHub repository: **Settings** → **Secrets and variables** → **Actions**.
   - Click **New repository secret** (or variable) to add:
     - **`CLOUDFLARE_API_TOKEN`**: Cloudflare API Token.
     - **`CLOUDFLARE_ACCOUNT_ID`**: Cloudflare Account ID.
     - **`CLOUDFLARE_DATABASE_NAME`**: Cloudflare D1 Database Name.
     - **`CLOUDFLARE_DATABASE_ID`**: Cloudflare D1 Database ID.
3. **Trigger Deployment**:
   - Push code to the `main` branch (deploys to Production).
   - Push code to the `staging` branch (deploys to Staging environment).

---

### 🦊 Option B: GitLab CI/CD Setup

The CI/CD configuration file is located at [`.gitlab-ci.yml`](.gitlab-ci.yml).

1. **Add CI/CD Variables in GitLab**:
   - Navigate to your GitLab repository: **Settings** → **CI/CD** → Expand **Variables**.
   - Click **Add variable** for each required configuration variable:
     - **`CLOUDFLARE_API_TOKEN`** (Check **Protect variable** and **Mask variable**)
     - **`CLOUDFLARE_ACCOUNT_ID`**
     - **`CLOUDFLARE_DATABASE_NAME`**
     - **`CLOUDFLARE_DATABASE_ID`**
2. **Trigger Deployment**:
   - Push code to `main` or `staging` branch and trigger the manual pipeline step under **Build → Pipelines**.

---

## 📜 Available NPM Scripts

- `npm run dev` — Start Next.js development server
- `npm run build` — Build production Next.js application
- `npm run lint` — Run ESLint check
- `npm run cf-typegen` — Generate Cloudflare Workers TypeScript bindings
- `npm run db:generate` — Generate Drizzle SQL migration files from schema
- `npm run db:migrate:local` — Apply D1 migrations locally
- `npm run db:migrate:remote` — Apply D1 migrations to live Cloudflare D1
- `npm run db:seed:local` — Execute local seed script
- `npm run db:seed:remote` — Execute remote seed script
- `npm run preview` — Build and preview locally with OpenNext + Wrangler
- `npm run deploy` — Build and deploy to Cloudflare Workers
