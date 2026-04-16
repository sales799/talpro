/**
 * OAuth 2.1 + DCR state storage for the Talpro MCP server.
 *
 * Backed by SQLite (better-sqlite3, already a project dep) so issued clients,
 * auth codes, and refresh tokens survive process restarts without pulling in
 * a new Postgres migration. Access tokens remain stateless JWTs.
 */

import Database from "better-sqlite3";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const DB_PATH =
  process.env.MCP_OAUTH_DB_PATH ||
  path.join(process.cwd(), ".data", "mcp-oauth.sqlite");

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS oauth_clients (
    client_id          TEXT PRIMARY KEY,
    client_secret_hash TEXT,
    client_name        TEXT NOT NULL,
    redirect_uris      TEXT NOT NULL,
    grant_types        TEXT NOT NULL,
    token_endpoint_auth_method TEXT NOT NULL DEFAULT 'none',
    created_at         INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS oauth_auth_codes (
    code                  TEXT PRIMARY KEY,
    client_id             TEXT NOT NULL,
    redirect_uri          TEXT NOT NULL,
    code_challenge        TEXT NOT NULL,
    code_challenge_method TEXT NOT NULL,
    scope                 TEXT,
    subject               TEXT NOT NULL,
    expires_at            INTEGER NOT NULL,
    consumed              INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS oauth_refresh_tokens (
    token_id     TEXT PRIMARY KEY,
    client_id    TEXT NOT NULL,
    subject      TEXT NOT NULL,
    scope        TEXT,
    expires_at   INTEGER NOT NULL,
    revoked      INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS oauth_login_sessions (
    session_id TEXT PRIMARY KEY,
    subject    TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );
`);

export interface RegisteredClient {
  client_id: string;
  client_secret_hash: string | null;
  client_name: string;
  redirect_uris: string[];
  grant_types: string[];
  token_endpoint_auth_method: "none" | "client_secret_basic" | "client_secret_post";
  created_at: number;
}

function rowToClient(row: any): RegisteredClient | null {
  if (!row) return null;
  return {
    client_id: row.client_id,
    client_secret_hash: row.client_secret_hash,
    client_name: row.client_name,
    redirect_uris: JSON.parse(row.redirect_uris),
    grant_types: JSON.parse(row.grant_types),
    token_endpoint_auth_method: row.token_endpoint_auth_method,
    created_at: row.created_at,
  };
}

export function createClient(input: {
  client_name: string;
  redirect_uris: string[];
  grant_types: string[];
  token_endpoint_auth_method: RegisteredClient["token_endpoint_auth_method"];
  client_secret?: string;
}): { client: RegisteredClient; client_secret?: string } {
  const client_id = `mcp_${crypto.randomBytes(16).toString("hex")}`;
  const client_secret =
    input.token_endpoint_auth_method === "none"
      ? undefined
      : input.client_secret ?? crypto.randomBytes(32).toString("hex");
  const client_secret_hash = client_secret
    ? crypto.createHash("sha256").update(client_secret).digest("hex")
    : null;
  const created_at = Date.now();

  db.prepare(
    `INSERT INTO oauth_clients
     (client_id, client_secret_hash, client_name, redirect_uris, grant_types, token_endpoint_auth_method, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    client_id,
    client_secret_hash,
    input.client_name,
    JSON.stringify(input.redirect_uris),
    JSON.stringify(input.grant_types),
    input.token_endpoint_auth_method,
    created_at
  );

  return {
    client: {
      client_id,
      client_secret_hash,
      client_name: input.client_name,
      redirect_uris: input.redirect_uris,
      grant_types: input.grant_types,
      token_endpoint_auth_method: input.token_endpoint_auth_method,
      created_at,
    },
    client_secret,
  };
}

export function getClient(client_id: string): RegisteredClient | null {
  const row = db
    .prepare(`SELECT * FROM oauth_clients WHERE client_id = ?`)
    .get(client_id);
  return rowToClient(row);
}

export function verifyClientSecret(client: RegisteredClient, secret: string): boolean {
  if (!client.client_secret_hash) return false;
  const h = crypto.createHash("sha256").update(secret).digest("hex");
  const a = Buffer.from(h, "hex");
  const b = Buffer.from(client.client_secret_hash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// ── Auth codes ────────────────────────────────────────────────────

export interface AuthCode {
  code: string;
  client_id: string;
  redirect_uri: string;
  code_challenge: string;
  code_challenge_method: string;
  scope: string | null;
  subject: string;
  expires_at: number;
  consumed: boolean;
}

export function putAuthCode(input: Omit<AuthCode, "consumed">): void {
  db.prepare(
    `INSERT INTO oauth_auth_codes
     (code, client_id, redirect_uri, code_challenge, code_challenge_method, scope, subject, expires_at, consumed)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`
  ).run(
    input.code,
    input.client_id,
    input.redirect_uri,
    input.code_challenge,
    input.code_challenge_method,
    input.scope,
    input.subject,
    input.expires_at
  );
}

export function consumeAuthCode(code: string): AuthCode | null {
  const row: any = db
    .prepare(`SELECT * FROM oauth_auth_codes WHERE code = ?`)
    .get(code);
  if (!row) return null;
  if (row.consumed) return null;
  if (row.expires_at < Date.now()) return null;
  db.prepare(`UPDATE oauth_auth_codes SET consumed = 1 WHERE code = ?`).run(code);
  return {
    code: row.code,
    client_id: row.client_id,
    redirect_uri: row.redirect_uri,
    code_challenge: row.code_challenge,
    code_challenge_method: row.code_challenge_method,
    scope: row.scope,
    subject: row.subject,
    expires_at: row.expires_at,
    consumed: true,
  };
}

// ── Refresh tokens ────────────────────────────────────────────────

export interface RefreshTokenRecord {
  token_id: string;
  client_id: string;
  subject: string;
  scope: string | null;
  expires_at: number;
  revoked: boolean;
}

export function putRefreshToken(input: Omit<RefreshTokenRecord, "revoked">): void {
  db.prepare(
    `INSERT INTO oauth_refresh_tokens
     (token_id, client_id, subject, scope, expires_at, revoked)
     VALUES (?, ?, ?, ?, ?, 0)`
  ).run(
    input.token_id,
    input.client_id,
    input.subject,
    input.scope,
    input.expires_at
  );
}

export function getRefreshToken(token_id: string): RefreshTokenRecord | null {
  const row: any = db
    .prepare(`SELECT * FROM oauth_refresh_tokens WHERE token_id = ?`)
    .get(token_id);
  if (!row) return null;
  return {
    token_id: row.token_id,
    client_id: row.client_id,
    subject: row.subject,
    scope: row.scope,
    expires_at: row.expires_at,
    revoked: !!row.revoked,
  };
}

export function revokeRefreshToken(token_id: string): void {
  db.prepare(`UPDATE oauth_refresh_tokens SET revoked = 1 WHERE token_id = ?`).run(token_id);
}

// ── Login sessions (short-lived cookie-backed) ────────────────────

export function putLoginSession(subject: string, ttlMs: number): string {
  const id = crypto.randomBytes(24).toString("hex");
  db.prepare(
    `INSERT INTO oauth_login_sessions (session_id, subject, expires_at) VALUES (?, ?, ?)`
  ).run(id, subject, Date.now() + ttlMs);
  return id;
}

export function getLoginSession(session_id: string): string | null {
  const row: any = db
    .prepare(`SELECT * FROM oauth_login_sessions WHERE session_id = ?`)
    .get(session_id);
  if (!row) return null;
  if (row.expires_at < Date.now()) return null;
  return row.subject;
}

// Periodic cleanup.
setInterval(() => {
  const now = Date.now();
  db.prepare(`DELETE FROM oauth_auth_codes WHERE expires_at < ? OR consumed = 1`).run(now);
  db.prepare(`DELETE FROM oauth_refresh_tokens WHERE expires_at < ? OR revoked = 1`).run(now);
  db.prepare(`DELETE FROM oauth_login_sessions WHERE expires_at < ?`).run(now);
}, 10 * 60 * 1000).unref();
