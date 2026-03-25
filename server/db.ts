import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Only use WebSocket mode for Neon-hosted databases (*.neon.tech).
// Local PostgreSQL uses standard TCP connections.
const dbUrl = process.env.DATABASE_URL || '';
if (dbUrl.includes('.neon.tech')) {
  neonConfig.webSocketConstructor = ws;
}

if (!dbUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: dbUrl,
  // For local PostgreSQL without SSL
  ...(dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')
    ? { ssl: false }
    : {}),
});
export const db = drizzle({ client: pool, schema });
