# Features & Starter Modules

## 1. Starter Dashboard Feature (`src/features/starter`)

The repository includes a clean, self-contained demonstration feature inside [`src/features/starter/`](src/features/starter).

- **Starter Dashboard Component**: [`StarterDashboard.tsx`](src/features/starter/components/StarterDashboard.tsx) provides a sleek, responsive landing UI showcasing tech stack highlights, quick action buttons, state counter interactive demo, and setup checklists.
- **Zustand State Store**: [`useStarterStore.ts`](src/features/starter/store/useStarterStore.ts) demonstrates reactive state management with client local storage persistence.

## 2. Cloudflare D1 Edge Binding Integration

- **D1 Database Binding**: Connects to Cloudflare D1 SQLite database binding `env.DB` using `getDb()`.
- **API Route Sample**: Type-safe querying via Drizzle ORM client (`getDb()`).
- **Remote D1 Fallback Proxy**: Provides transparent HTTP API access during local Next.js server execution (`npm run dev`).

## 3. PWA Web App Manifest & Styling

- **Tailwind CSS v4 Styling**: Uses utility-first CSS with dark mode support and Inter font styling.
- **PWA Manifest Metadata**: `public/manifest.json` configured for installable application capabilities.

## 4. How to Remove the Starter Demo & Build Custom Features

All starter demo state, components, and types are isolated inside `src/features/starter/`.

### Step 1: Create your new feature domain

```bash
mkdir -p src/features/my-feature/components src/features/my-feature/store src/features/my-feature/types
```

### Step 2: Remove the starter demo folder

```bash
rm -rf src/features/starter
```

### Step 3: Connect your component in `src/app/page.tsx`

```typescript
import { MyFeatureComponent } from "@/features/my-feature/components/MyFeatureComponent";

export default function HomePage() {
  return <MyFeatureComponent />;
}
```
