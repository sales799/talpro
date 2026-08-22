import * as schema from "@shared/schema";

const dbUrl = process.env.DATABASE_URL || '';
export const isDatabaseConfigured = dbUrl.length > 0;

const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');

// Use standard pg for local PostgreSQL, Neon driver for cloud (*.neon.tech)
let pool: any = null;
let db: any = null;

if (!isDatabaseConfigured) {
  console.warn('[database] DATABASE_URL is not configured; database-backed features are unavailable');
} else if (isLocal) {
  // Standard pg driver — works with local PostgreSQL over TCP
  const pg = await import('pg');
  pool = new pg.default.Pool({
    connectionString: dbUrl,
    ssl: false,
  });
  const { drizzle } = await import('drizzle-orm/node-postgres');
  db = drizzle({ client: pool, schema });
} else {
  // Neon serverless driver — WebSocket for cloud PostgreSQL
  const { Pool: NeonPool, neonConfig } = await import('@neondatabase/serverless');
  const ws = (await import('ws')).default;
  neonConfig.webSocketConstructor = ws;
  pool = new NeonPool({ connectionString: dbUrl });
  const { drizzle } = await import('drizzle-orm/neon-serverless');
  db = drizzle({ client: pool, schema });
}

export { pool, db };
