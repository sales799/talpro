import type { Request, Response } from "express";
import { MCP_ISSUER, MCP_SCOPES } from "./config";

/**
 * RFC 9728 — OAuth 2.0 Protected Resource Metadata.
 * MCP clients fetch this after a 401 to learn which authorization servers
 * protect the `/mcp` resource.
 */
export function protectedResourceMetadata(_req: Request, res: Response) {
  res.json({
    resource: `${MCP_ISSUER}/mcp`,
    authorization_servers: [MCP_ISSUER],
    scopes_supported: MCP_SCOPES,
    bearer_methods_supported: ["header"],
    resource_documentation: `${MCP_ISSUER}/docs/mcp`,
  });
}

/**
 * RFC 8414 — OAuth 2.0 Authorization Server Metadata.
 */
export function authorizationServerMetadata(_req: Request, res: Response) {
  res.json({
    issuer: MCP_ISSUER,
    authorization_endpoint: `${MCP_ISSUER}/oauth/authorize`,
    token_endpoint: `${MCP_ISSUER}/oauth/token`,
    registration_endpoint: `${MCP_ISSUER}/oauth/register`,
    revocation_endpoint: `${MCP_ISSUER}/oauth/revoke`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: [
      "none",
      "client_secret_basic",
      "client_secret_post",
    ],
    scopes_supported: MCP_SCOPES,
    service_documentation: `${MCP_ISSUER}/docs/mcp`,
  });
}
