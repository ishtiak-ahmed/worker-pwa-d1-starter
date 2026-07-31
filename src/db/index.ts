import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

/**
 * Creates a lightweight D1Database HTTP proxy for Cloudflare D1 REST API.
 * Used during `npm run dev` so Next.js can connect directly to remote D1 with Fast Refresh.
 */
function createRemoteD1(accountId: string, databaseId: string, apiToken: string) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  async function executeQuery(sql: string, params: unknown[] = []) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Cloudflare D1 HTTP API Error (${response.status}): ${errText}`);
    }

    const data = (await response.json()) as {
      success: boolean;
      result?: Array<{ results?: unknown[]; success?: boolean; meta?: unknown }>;
      errors?: Array<{ message?: string }>;
    };

    if (!data.success) {
      throw new Error(data.errors?.[0]?.message || "Cloudflare D1 Query Failed");
    }

    return data.result?.[0] || { results: [], success: true, meta: {} };
  }

  const createStatement = (sql: string, params: unknown[] = []) => ({
    bind(...newParams: unknown[]) {
      return createStatement(sql, newParams);
    },
    async all() {
      return executeQuery(sql, params);
    },
    async first(colName?: string) {
      const res = await executeQuery(sql, params);
      const row = (res.results as Record<string, unknown>[])?.[0];
      if (!row) return null;
      return colName ? row[colName] : row;
    },
    async run() {
      return executeQuery(sql, params);
    },
    async raw() {
      const res = await executeQuery(sql, params);
      return (res.results as Record<string, unknown>[])?.map((r) => Object.values(r)) || [];
    },
  });

  return {
    prepare(sql: string) {
      return createStatement(sql);
    },
    async batch(statements: Array<{ all: () => Promise<unknown> }>) {
      const results = [];
      for (const stmt of statements) {
        results.push(await stmt.all());
      }
      return results;
    },
    async exec(sql: string) {
      const res = await executeQuery(sql);
      const meta = res.meta as { changes?: number; duration?: number } | undefined;
      return { count: meta?.changes || 0, duration: meta?.duration || 0 };
    },
  } as unknown as D1Database;
}

export async function getDb() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  // 1. In development (`npm run dev`), if remote D1 credentials are set in .env.local,
  // query remote D1 over Cloudflare HTTP API to enable Fast Refresh + Remote DB access.
  if (
    process.env.NODE_ENV === "development" &&
    accountId &&
    databaseId &&
    apiToken &&
    !apiToken.includes("your_cloudflare_api_token")
  ) {
    const remoteD1 = createRemoteD1(accountId, databaseId, apiToken);
    return drizzle(remoteD1, { schema });
  }

  // 2. In Workers runtime or local preview (`npm run preview`), use native Cloudflare Worker binding.
  try {
    const { env } = await getCloudflareContext();
    if (env?.DB) {
      return drizzle(env.DB, { schema });
    }
  } catch (err) {
    // Fallback to HTTP proxy if getCloudflareContext fails during dev mode
    if (accountId && databaseId && apiToken && !apiToken.includes("your_cloudflare_api_token")) {
      const remoteD1 = createRemoteD1(accountId, databaseId, apiToken);
      return drizzle(remoteD1, { schema });
    }
    throw err;
  }

  throw new Error(
    "D1 database binding missing. Set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, and CLOUDFLARE_API_TOKEN in .env.local for dev mode, or configure binding in wrangler.jsonc."
  );
}
