/**
 * JWT signing/verification for MCP access tokens.
 *
 * Access tokens are stateless HS256 JWTs signed with MCP_JWT_SECRET so the
 * resource server (the /mcp endpoint) can verify them without a database round
 * trip. Refresh tokens remain opaque DB-backed IDs issued by the token endpoint.
 */

import { SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

const RAW_SECRET =
  process.env.MCP_JWT_SECRET || crypto.randomBytes(32).toString("hex");

if (!process.env.MCP_JWT_SECRET) {
  // Surface the auto-generated secret in logs the same way security-middleware
  // surfaces the admin token — operators can pin it via env on next restart.
  console.log(`[mcp-oauth] Auto-generated MCP_JWT_SECRET: ${RAW_SECRET}`);
  console.log(`[mcp-oauth] Set MCP_JWT_SECRET env var to persist across restarts`);
}

const SECRET = new TextEncoder().encode(RAW_SECRET);

export interface AccessTokenClaims {
  sub: string;
  aud: string;
  iss: string;
  client_id: string;
  scope: string;
}

export async function signAccessToken(
  claims: AccessTokenClaims,
  ttlSeconds: number
): Promise<string> {
  return await new SignJWT({
    client_id: claims.client_id,
    scope: claims.scope,
  })
    .setProtectedHeader({ alg: "HS256", typ: "at+jwt" })
    .setSubject(claims.sub)
    .setIssuer(claims.iss)
    .setAudience(claims.aud)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + ttlSeconds)
    .setJti(crypto.randomBytes(12).toString("hex"))
    .sign(SECRET);
}

export async function verifyAccessToken(
  token: string,
  expectedAudience: string,
  expectedIssuer: string
): Promise<AccessTokenClaims> {
  const { payload } = await jwtVerify(token, SECRET, {
    audience: expectedAudience,
    issuer: expectedIssuer,
  });
  return {
    sub: String(payload.sub ?? ""),
    aud: expectedAudience,
    iss: expectedIssuer,
    client_id: String(payload.client_id ?? ""),
    scope: String(payload.scope ?? ""),
  };
}
