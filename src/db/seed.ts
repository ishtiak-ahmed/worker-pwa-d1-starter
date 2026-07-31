import { items } from "./schema";
import type { D1Database } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/d1";

export async function seedStarterData(d1: D1Database) {
  const db = drizzle(d1);
  const sampleItems = [
    { title: "Cloudflare Worker Setup", description: "Deploy Next.js 15 app on Cloudflare Edge runtime", completed: true },
    { title: "D1 Database Binding", description: "Configured D1 SQLite database via Drizzle ORM", completed: true },
    { title: "Zustand State Management", description: "Client-side reactive store initialized", completed: false },
  ];

  for (const item of sampleItems) {
    await db.insert(items).values(item).onConflictDoNothing();
  }
}
