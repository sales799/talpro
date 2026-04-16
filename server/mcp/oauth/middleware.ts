import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, AccessTokenClaims } from "./jwt";
import { MCP_ISSUER } from "./config";

/**
 * Bearer-token middleware for /mcp.
 *
 * On auth failure, returns 401 with an MCP-compliant WWW-Authenticate header
 * pointing at our protected-resource metadata — this is the hook that lets
 * any MCP client kick off Dynamic Client Registration + OAuth without
 * human-distributed API keys.
 */

declare module "express-serve-static-core" {
  interface Request {
    mcpAuth?: AccessTokenClaims;
  }
}

const WWW_AUTH = `Bearer realm="mcp", resource_metadata="${MCP_ISSUER}/.well-known/oauth-protected-resource"`;

export function requireMcpToken() {
  return async function mcpAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      res.setHeader("WWW-Authenticate", WWW_AUTH);
      return res
        .status(401)
        .json({ error: "unauthorized", error_description: "Bearer token required" });
    }
    const token = header.slice(7).trim();
    try {
      const claims = await verifyAccessToken(token, `${MCP_ISSUER}/mcp`, MCP_ISSUER);
      req.mcpAuth = claims;
      return next();
    } catch (err) {
      res.setHeader("WWW-Authenticate", WWW_AUTH + `, error="invalid_token"`);
      return res
        .status(401)
        .json({ error: "invalid_token", error_description: (err as Error).message });
    }
  };
}
