import type { Express } from "express";
import express from "express";
import {
  authorizationServerMetadata,
  protectedResourceMetadata,
} from "./oauth/metadata";
import { registerEndpoint } from "./oauth/register";
import { authorizeGet, authorizePost } from "./oauth/authorize";
import { tokenEndpoint, revokeEndpoint } from "./oauth/token";
import { requireMcpToken } from "./oauth/middleware";
import { handleMcpRequest } from "./transport";
import { mcpCors } from "./cors";

/**
 * Mount the MCP + OAuth surface on an existing Express app.
 *
 * Exposed endpoints:
 *   GET  /.well-known/oauth-protected-resource   → RFC 9728 PR metadata
 *   GET  /.well-known/oauth-authorization-server → RFC 8414 AS metadata
 *   POST /oauth/register                         → RFC 7591 DCR
 *   GET  /oauth/authorize                        → login+consent page
 *   POST /oauth/authorize                        → credential submission
 *   POST /oauth/token                            → code + refresh grants (PKCE S256)
 *   POST /oauth/revoke                           → RFC 7009 token revocation
 *   POST /mcp                                    → MCP Streamable HTTP (session init + calls)
 *   GET  /mcp                                    → MCP Streamable HTTP (SSE listener)
 *   DELETE /mcp                                  → MCP Streamable HTTP (session close)
 */
export function registerMcp(app: Express): void {
  // All MCP + OAuth routes share the same CORS policy. Mounted first so
  // preflights short-circuit before body parsing.
  app.use(
    [
      "/mcp",
      "/oauth/register",
      "/oauth/token",
      "/oauth/revoke",
      "/.well-known/oauth-protected-resource",
      "/.well-known/oauth-authorization-server",
    ],
    mcpCors
  );

  // Discovery metadata (unauthenticated).
  app.get("/.well-known/oauth-protected-resource", protectedResourceMetadata);
  app.get("/.well-known/oauth-authorization-server", authorizationServerMetadata);

  // DCR — clients self-register before calling /authorize.
  app.post("/oauth/register", express.json({ limit: "16kb" }), registerEndpoint);

  // Authorize (HTML flow — urlencoded form body).
  app.get("/oauth/authorize", authorizeGet);
  app.post(
    "/oauth/authorize",
    express.urlencoded({ extended: false, limit: "16kb" }),
    authorizePost
  );

  // Token + revocation — urlencoded body per OAuth 2.1.
  app.post(
    "/oauth/token",
    express.urlencoded({ extended: false, limit: "16kb" }),
    tokenEndpoint
  );
  app.post(
    "/oauth/revoke",
    express.urlencoded({ extended: false, limit: "16kb" }),
    revokeEndpoint
  );

  // MCP transport. express.json is already mounted globally in server/index.ts
  // and handles the JSON-RPC body for us.
  const mcpAuth = requireMcpToken();
  app.post("/mcp", mcpAuth, handleMcpRequest);
  app.get("/mcp", mcpAuth, handleMcpRequest);
  app.delete("/mcp", mcpAuth, handleMcpRequest);
}
