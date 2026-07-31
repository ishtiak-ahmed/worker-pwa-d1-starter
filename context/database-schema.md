# Database Schema & Data Models

## Cloudflare D1 Schema (Drizzle ORM)

The database schema is defined in [`src/db/schema.ts`](src/db/schema.ts) using Drizzle ORM's SQLite core exports.

```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// 1. Users Table
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

// 2. Items Table
export const items = sqliteTable("items", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

// TypeScript Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
```

## D1 Edge Access & Client Initialization

In Next.js Server Components, Server Actions, or API Route Handlers, fetch the database client using `getDb()` from [`src/db/index.ts`](src/db/index.ts):

```typescript
import { getDb } from "@/db";
import { items } from "@/db/schema";

export async function GET() {
  // 1. Fetch Drizzle ORM client (supports native Worker bindings & dev HTTP API fallback)
  const db = await getDb();

  // 2. Execute type-safe D1 query
  const allItems = await db.select().from(items);

  return Response.json(allItems);
}
```

## Migration Workflow (`drizzle-kit`)

Migration SQL files are stored in `./drizzle` and managed via Drizzle Kit:

- **Generate migrations**: `npm run db:generate`
- **Apply migrations locally**: `npm run db:migrate:local`
- **Apply migrations to remote edge**: `npm run db:migrate:remote`
- **Seed initial data**: `npm run db:seed:local` / `npm run db:seed:remote`
