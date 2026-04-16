import type { Request, Response } from "express";
import crypto from "crypto";
import { z } from "zod";
import {
  getClient,
  putAuthCode,
  putLoginSession,
  getLoginSession,
} from "./storage";
import {
  AUTH_CODE_TTL_SECONDS,
  LOGIN_SESSION_TTL_SECONDS,
  DEFAULT_SCOPE,
  getAllowedEmails,
  getAuthPasscode,
} from "./config";

/**
 * OAuth 2.1 authorization endpoint.
 *
 *   GET  /oauth/authorize       → renders login+consent page
 *   POST /oauth/authorize       → validates credentials + issues authorization code
 *
 * AuthN: email from the MCP_ALLOWED_EMAILS allowlist + shared passcode
 * (MCP_AUTH_PASSCODE, defaults to TALPRO_ADMIN_TOKEN). Proof-of-identity is
 * deliberately minimal here — the harder guarantee we need for the MCP auth
 * spec is PKCE + per-client DCR, which this endpoint enforces regardless of
 * how the human authenticates. Upgrade path: swap this login screen for a
 * passport-local or passkey flow without touching callers.
 */

const authorizeQuerySchema = z.object({
  response_type: z.literal("code"),
  client_id: z.string().min(1),
  redirect_uri: z.string().url(),
  code_challenge: z.string().min(43).max(128),
  code_challenge_method: z.literal("S256"),
  scope: z.string().optional(),
  state: z.string().optional(),
});

const LOGIN_COOKIE = "mcp_login";

function errorRedirect(
  res: Response,
  redirect_uri: string | undefined,
  error: string,
  description: string,
  state?: string
) {
  if (!redirect_uri) {
    res.status(400).json({ error, error_description: description });
    return;
  }
  const url = new URL(redirect_uri);
  url.searchParams.set("error", error);
  url.searchParams.set("error_description", description);
  if (state) url.searchParams.set("state", state);
  res.redirect(url.toString());
}

function renderLoginPage(params: {
  clientName: string;
  redirectUri: string;
  queryString: string;
  errorMessage?: string;
}) {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Authorize ${esc(params.clientName)} · Talpro MCP</title>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
           max-width: 420px; margin: 10vh auto; padding: 0 1.25rem; line-height: 1.5; }
    h1 { font-size: 1.2rem; margin-bottom: 0.25rem; }
    p.subtitle { color: #666; margin-top: 0; font-size: 0.92rem; }
    label { display: block; margin-top: 1rem; font-weight: 600; font-size: 0.9rem; }
    input { width: 100%; padding: 0.55rem; font-size: 1rem; border: 1px solid #bbb;
            border-radius: 6px; box-sizing: border-box; margin-top: 0.25rem; }
    button { margin-top: 1.5rem; width: 100%; padding: 0.7rem; font-size: 1rem;
             border: 0; border-radius: 6px; background: #0a7; color: white; cursor: pointer; }
    .err { color: #c00; background: #fee; padding: 0.5rem 0.75rem; border-radius: 6px;
           margin-top: 1rem; font-size: 0.9rem; }
    .client { background: #f4f4f4; padding: 0.75rem; border-radius: 6px;
              margin-top: 1rem; font-size: 0.88rem; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.85em; }
  </style>
</head>
<body>
  <h1>Authorize Talpro MCP access</h1>
  <p class="subtitle">Sign in to grant the connector access to your MCP tools.</p>
  <div class="client">
    <strong>${esc(params.clientName)}</strong><br />
    Redirects to <code>${esc(params.redirectUri)}</code>
  </div>
  ${params.errorMessage ? `<div class="err">${esc(params.errorMessage)}</div>` : ""}
  <form method="POST" action="/oauth/authorize?${esc(params.queryString)}">
    <label>Team email
      <input type="email" name="email" required autofocus autocomplete="email" />
    </label>
    <label>Passcode
      <input type="password" name="passcode" required autocomplete="current-password" />
    </label>
    <button type="submit">Authorize</button>
  </form>
</body>
</html>`;
}

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k) out[k] = decodeURIComponent(rest.join("="));
  }
  return out;
}

function validateQuery(req: Request): { ok: true; query: z.infer<typeof authorizeQuerySchema> } | { ok: false; error: string; description: string } {
  const parsed = authorizeQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return {
      ok: false,
      error: "invalid_request",
      description: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
    };
  }
  return { ok: true, query: parsed.data };
}

export function authorizeGet(req: Request, res: Response) {
  const validation = validateQuery(req);
  if (!validation.ok) {
    return errorRedirect(res, (req.query.redirect_uri as string) || undefined,
      validation.error, validation.description, req.query.state as string | undefined);
  }
  const query = validation.query;

  const client = getClient(query.client_id);
  if (!client) {
    return errorRedirect(res, query.redirect_uri, "invalid_client",
      "Unknown client_id; register via POST /oauth/register", query.state);
  }
  if (!client.redirect_uris.includes(query.redirect_uri)) {
    return errorRedirect(res, query.redirect_uri, "invalid_request",
      "redirect_uri not registered for this client", query.state);
  }

  res
    .status(200)
    .type("html")
    .send(
      renderLoginPage({
        clientName: client.client_name,
        redirectUri: query.redirect_uri,
        queryString: new URLSearchParams(req.query as Record<string, string>).toString(),
      })
    );
}

export function authorizePost(req: Request, res: Response) {
  const validation = validateQuery(req);
  if (!validation.ok) {
    return errorRedirect(res, (req.query.redirect_uri as string) || undefined,
      validation.error, validation.description, req.query.state as string | undefined);
  }
  const query = validation.query;

  const client = getClient(query.client_id);
  if (!client) {
    return errorRedirect(res, query.redirect_uri, "invalid_client",
      "Unknown client_id", query.state);
  }
  if (!client.redirect_uris.includes(query.redirect_uri)) {
    return errorRedirect(res, query.redirect_uri, "invalid_request",
      "redirect_uri not registered for this client", query.state);
  }

  const email = String((req.body?.email ?? "")).trim().toLowerCase();
  const passcode = String(req.body?.passcode ?? "");

  // If the caller already has a valid login cookie and this is a re-auth hit,
  // trust it and skip the passcode check.
  const cookieSubject = (() => {
    const cookies = parseCookies(req.headers.cookie);
    const id = cookies[LOGIN_COOKIE];
    if (!id) return null;
    return getLoginSession(id);
  })();

  const subject = cookieSubject || email;

  const renderErr = (msg: string) =>
    res.status(401).type("html").send(
      renderLoginPage({
        clientName: client.client_name,
        redirectUri: query.redirect_uri,
        queryString: new URLSearchParams(req.query as Record<string, string>).toString(),
        errorMessage: msg,
      })
    );

  if (!cookieSubject) {
    if (!email || !passcode) return renderErr("Email and passcode are required.");

    const allowed = getAllowedEmails();
    if (allowed && !allowed.includes(email)) {
      return renderErr("This email is not on the MCP allowlist.");
    }
    const expected = getAuthPasscode();
    if (!expected) {
      return renderErr("Server misconfigured: MCP_AUTH_PASSCODE / TALPRO_ADMIN_TOKEN not set.");
    }
    const a = Buffer.from(passcode);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return renderErr("Invalid passcode.");
    }

    const sessionId = putLoginSession(email, LOGIN_SESSION_TTL_SECONDS * 1000);
    res.cookie(LOGIN_COOKIE, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: LOGIN_SESSION_TTL_SECONDS * 1000,
      path: "/oauth",
    });
  }

  // Issue the authorization code. Claude.ai does not render a separate consent
  // screen here; the login action is treated as consent for the requested scope.
  const code = `mcpcode_${crypto.randomBytes(24).toString("hex")}`;
  putAuthCode({
    code,
    client_id: query.client_id,
    redirect_uri: query.redirect_uri,
    code_challenge: query.code_challenge,
    code_challenge_method: query.code_challenge_method,
    scope: query.scope ?? DEFAULT_SCOPE,
    subject,
    expires_at: Date.now() + AUTH_CODE_TTL_SECONDS * 1000,
  });

  const url = new URL(query.redirect_uri);
  url.searchParams.set("code", code);
  if (query.state) url.searchParams.set("state", query.state);
  res.redirect(url.toString());
}
