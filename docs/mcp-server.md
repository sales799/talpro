# Talpro MCP Server

OAuth 2.1 + Dynamic Client Registration (DCR) MCP server mounted on the main
Talpro Express app. Replaces the previous API-key-gated deployment at
`mcp.hcitalks.com` — any Claude.ai account (HireIQ, Talpro, TalproIndia, new
hires) connects with one click after completing a browser-based authorize
flow. No per-account key distribution, no edge allowlist drift.

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/.well-known/oauth-protected-resource`   | RFC 9728 protected resource metadata |
| GET  | `/.well-known/oauth-authorization-server` | RFC 8414 authorization server metadata |
| POST | `/oauth/register`                         | RFC 7591 dynamic client registration |
| GET  | `/oauth/authorize`                        | Login + consent page (HTML) |
| POST | `/oauth/authorize`                        | Credential submission, issues auth code |
| POST | `/oauth/token`                            | `authorization_code` + `refresh_token` grants (PKCE S256) |
| POST | `/oauth/revoke`                           | RFC 7009 token revocation |
| POST | `/mcp`                                    | MCP Streamable HTTP — initialize + tool calls |
| GET  | `/mcp`                                    | MCP Streamable HTTP — server-sent event stream |
| DELETE | `/mcp`                                  | MCP Streamable HTTP — session termination |

## Environment

Set these in `.env` (see `.env.example` for the canonical list):

```bash
MCP_ISSUER=https://mcp.hcitalks.com     # public origin
MCP_JWT_SECRET=<32+ random bytes hex>   # HS256 signing key for access tokens
MCP_ALLOWED_EMAILS=bhaskar@talpro.in,hi@hireiqpro.com,...
MCP_AUTH_PASSCODE=<shared team passcode>   # falls back to TALPRO_ADMIN_TOKEN
# MCP_OAUTH_DB_PATH=.data/mcp-oauth.sqlite # optional override
```

Missing `MCP_JWT_SECRET` auto-generates one on boot and logs it (match the
behaviour of `TALPRO_ADMIN_TOKEN`). **Pin it in `.env` for production** —
otherwise tokens invalidate on every restart.

## Deploy runbook (mcp.hcitalks.com)

1. `npm install` — picks up the new `@modelcontextprotocol/sdk` and `jose` deps.
2. Populate the env vars above in the VPS `.env`.
3. `npm run build && pm2 restart <process>` (or your current deploy command).
4. Verify discovery:
   ```bash
   curl -s https://mcp.hcitalks.com/.well-known/oauth-protected-resource | jq
   curl -s https://mcp.hcitalks.com/.well-known/oauth-authorization-server | jq
   ```
5. Confirm `/mcp` returns a 401 with the right `WWW-Authenticate` header:
   ```bash
   curl -i https://mcp.hcitalks.com/mcp
   # HTTP/2 401
   # www-authenticate: Bearer realm="mcp", resource_metadata="https://mcp.hcitalks.com/.well-known/oauth-protected-resource"
   ```

## Reverse-proxy / edge notes

- The edge currently returns `403 x-deny-reason: host_not_allowed` for
  off-VPS callers. Loosen that rule to at minimum allow Claude.ai egress ranges
  (or better: remove the IP gate entirely and rely on OAuth for AuthN). The
  new server is designed so OAuth is the sole trust boundary.
- Preserve the `Authorization`, `Mcp-Session-Id`, and `Mcp-Protocol-Version`
  headers. Many reverse proxies strip unknown headers by default.
- Streamable HTTP needs long-lived GET streaming. Bump `proxy_read_timeout` to
  at least 1h on nginx (or the equivalent on Caddy).

## Adding a claude.ai connector

1. claude.ai → **Settings → Customize → Connectors → Add custom connector**
2. Name: `Talpro MCP`
3. URL: `https://mcp.hcitalks.com/mcp`
4. **No custom header needed** — claude.ai will discover the auth server,
   register via DCR, and redirect you to the authorize page.
5. On the authorize page: enter your email + the team passcode. After submit,
   you're redirected back to claude.ai with the connector marked Connected.

## Tool surface (as of this PR)

Real handlers:
- `ping`, `echo`, `whoami`, `vps_system_info`

Stubbed (return `not_implemented` with the exact shell-out / API call needed):
- `pm2_list`, `pm2_tail_logs`, `hubspot_contact_search`, `n8n_workflow_list`,
  `db_query_readonly`

Fill in the stubs in `server/mcp/tools.ts` as each integration comes online.

## How auth works end-to-end

```
claude.ai                   mcp.hcitalks.com
  │                             │
  │ GET /mcp                    │
  ├────────────────────────────▶│ 401 + WWW-Authenticate with resource_metadata URL
  │                             │
  │ GET /.well-known/oauth-protected-resource   →  authorization_servers
  │ GET /.well-known/oauth-authorization-server →  registration + authorize + token URLs
  │                             │
  │ POST /oauth/register        │ (one-time DCR — issues fresh client_id)
  │                             │
  │ redirect user → GET /oauth/authorize?...PKCE...
  │                             │   login + consent page
  │                             │   user enters email + passcode
  │                             │   → 302 back to claude.ai?code=...
  │                             │
  │ POST /oauth/token (code + code_verifier)
  │                             │   → {access_token, refresh_token}
  │                             │
  │ POST /mcp (Authorization: Bearer ...) 
  │                             │   initialize → tools/list → tools/call
```

PKCE S256 is mandatory on the code grant; public clients can skip the client
secret (`token_endpoint_auth_method=none` is honoured). Refresh tokens rotate
on every use and are revoked after rotation.

## Where state lives

- `oauth_clients`, `oauth_auth_codes`, `oauth_refresh_tokens`,
  `oauth_login_sessions` in a SQLite file (`.data/mcp-oauth.sqlite` by default,
  WAL mode). Chosen over Postgres because no migration is required — pop the
  file in, restart, done. Migrate to Postgres when you need multi-instance.
- Access tokens are stateless JWTs — not stored anywhere; verification is a
  signature + audience + expiry check. Revoking an access token mid-life means
  rotating `MCP_JWT_SECRET` (blunt, but fine given 1h TTL).
