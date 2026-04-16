/**
 * Centralised config for the MCP OAuth layer.
 *
 * ISSUER is the canonical public URL the MCP server is served at; it anchors
 * every metadata URL, the JWT `iss` claim, and the JWT `aud` claim (per the
 * MCP auth spec the resource server and authorization server share the origin).
 */

export const MCP_ISSUER =
  process.env.MCP_ISSUER || "https://mcp.hcitalks.com";

export const ACCESS_TOKEN_TTL_SECONDS = 60 * 60;          // 1 hour
export const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
export const AUTH_CODE_TTL_SECONDS = 60;                   // 60 seconds
export const LOGIN_SESSION_TTL_SECONDS = 10 * 60;          // 10 minutes

export const MCP_SCOPES = ["mcp:tools"] as const;
export const DEFAULT_SCOPE = MCP_SCOPES.join(" ");

/**
 * Allowlist of email addresses permitted to complete the authorize flow.
 *
 *   MCP_ALLOWED_EMAILS="bhaskar@talpro.in,hi@hireiqpro.com"
 *
 * Unset or empty => any email that passes the shared auth check is allowed.
 */
export function getAllowedEmails(): string[] | null {
  const raw = process.env.MCP_ALLOWED_EMAILS?.trim();
  if (!raw) return null;
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Shared secret users paste on the consent page to prove they're on the team.
 * Reuses TALPRO_ADMIN_TOKEN by default so operators don't have to juggle a
 * second credential; override with MCP_AUTH_PASSCODE if you want MCP login
 * decoupled from the admin API token.
 */
export function getAuthPasscode(): string | null {
  const passcode =
    process.env.MCP_AUTH_PASSCODE || process.env.TALPRO_ADMIN_TOKEN || null;
  return passcode;
}
