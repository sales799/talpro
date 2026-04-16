import type { Request, Response } from "express";
import crypto from "crypto";
import {
  consumeAuthCode,
  getClient,
  getRefreshToken,
  putRefreshToken,
  revokeRefreshToken,
  verifyClientSecret,
} from "./storage";
import { verifyPkceS256 } from "./pkce";
import { signAccessToken } from "./jwt";
import {
  MCP_ISSUER,
  ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_SECONDS,
  DEFAULT_SCOPE,
} from "./config";

/**
 * OAuth 2.1 token endpoint. Handles authorization_code + refresh_token grants.
 * PKCE is mandatory for the code grant (S256 only).
 */

function authenticateClient(
  req: Request
): { ok: true; client_id: string; isPublic: boolean } | { ok: false; error: string } {
  const basic = req.headers.authorization?.startsWith("Basic ")
    ? req.headers.authorization.slice(6)
    : null;

  let client_id: string | undefined;
  let client_secret: string | undefined;

  if (basic) {
    const decoded = Buffer.from(basic, "base64").toString("utf8");
    const idx = decoded.indexOf(":");
    if (idx >= 0) {
      client_id = decoded.slice(0, idx);
      client_secret = decoded.slice(idx + 1);
    }
  }

  if (!client_id) client_id = req.body?.client_id;
  if (!client_secret) client_secret = req.body?.client_secret;

  if (!client_id) return { ok: false, error: "client_id missing" };

  const client = getClient(client_id);
  if (!client) return { ok: false, error: "unknown client_id" };

  if (client.token_endpoint_auth_method === "none") {
    return { ok: true, client_id, isPublic: true };
  }
  if (!client_secret) return { ok: false, error: "client_secret missing" };
  if (!verifyClientSecret(client, client_secret)) {
    return { ok: false, error: "invalid client_secret" };
  }
  return { ok: true, client_id, isPublic: false };
}

export async function tokenEndpoint(req: Request, res: Response) {
  const grant_type = String(req.body?.grant_type ?? "");

  const auth = authenticateClient(req);
  if (!auth.ok) {
    return res.status(401).json({ error: "invalid_client", error_description: auth.error });
  }
  const client_id = auth.client_id;

  if (grant_type === "authorization_code") {
    const code = String(req.body?.code ?? "");
    const redirect_uri = String(req.body?.redirect_uri ?? "");
    const code_verifier = String(req.body?.code_verifier ?? "");

    if (!code || !redirect_uri || !code_verifier) {
      return res.status(400).json({
        error: "invalid_request",
        error_description: "code, redirect_uri, and code_verifier are required",
      });
    }

    const record = consumeAuthCode(code);
    if (!record) {
      return res
        .status(400)
        .json({ error: "invalid_grant", error_description: "Authorization code invalid, expired, or already used" });
    }
    if (record.client_id !== client_id) {
      return res.status(400).json({ error: "invalid_grant", error_description: "Client mismatch for code" });
    }
    if (record.redirect_uri !== redirect_uri) {
      return res
        .status(400)
        .json({ error: "invalid_grant", error_description: "redirect_uri mismatch" });
    }
    if (record.code_challenge_method !== "S256" || !verifyPkceS256(code_verifier, record.code_challenge)) {
      return res.status(400).json({ error: "invalid_grant", error_description: "PKCE verification failed" });
    }

    return await issueTokens(res, {
      client_id,
      subject: record.subject,
      scope: record.scope ?? DEFAULT_SCOPE,
    });
  }

  if (grant_type === "refresh_token") {
    const raw = String(req.body?.refresh_token ?? "");
    if (!raw) {
      return res.status(400).json({ error: "invalid_request", error_description: "refresh_token required" });
    }
    const token_id = raw.startsWith("mcprt_") ? raw.slice(6) : null;
    if (!token_id) {
      return res.status(400).json({ error: "invalid_grant", error_description: "Malformed refresh_token" });
    }
    const record = getRefreshToken(token_id);
    if (!record || record.revoked || record.expires_at < Date.now()) {
      return res.status(400).json({ error: "invalid_grant", error_description: "Refresh token invalid or expired" });
    }
    if (record.client_id !== client_id) {
      return res.status(400).json({ error: "invalid_grant", error_description: "Client mismatch for refresh_token" });
    }
    // Rotate.
    revokeRefreshToken(token_id);
    return await issueTokens(res, {
      client_id,
      subject: record.subject,
      scope: record.scope ?? DEFAULT_SCOPE,
    });
  }

  return res.status(400).json({
    error: "unsupported_grant_type",
    error_description: `Grant type '${grant_type}' not supported`,
  });
}

async function issueTokens(
  res: Response,
  input: { client_id: string; subject: string; scope: string }
) {
  const access_token = await signAccessToken(
    {
      sub: input.subject,
      aud: `${MCP_ISSUER}/mcp`,
      iss: MCP_ISSUER,
      client_id: input.client_id,
      scope: input.scope,
    },
    ACCESS_TOKEN_TTL_SECONDS
  );

  const refresh_id = crypto.randomBytes(32).toString("hex");
  putRefreshToken({
    token_id: refresh_id,
    client_id: input.client_id,
    subject: input.subject,
    scope: input.scope,
    expires_at: Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000,
  });

  res.json({
    access_token,
    token_type: "Bearer",
    expires_in: ACCESS_TOKEN_TTL_SECONDS,
    refresh_token: `mcprt_${refresh_id}`,
    scope: input.scope,
  });
}

export async function revokeEndpoint(req: Request, res: Response) {
  const raw = String(req.body?.token ?? "");
  if (raw.startsWith("mcprt_")) {
    revokeRefreshToken(raw.slice(6));
  }
  // Per RFC 7009, revocation always responds 200 regardless of outcome.
  res.status(200).end();
}
