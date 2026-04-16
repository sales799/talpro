import type { Request, Response, NextFunction } from "express";

/**
 * CORS for the MCP + OAuth surface.
 *
 * claude.ai and mcp-inspector both call these endpoints from the browser,
 * so we have to reflect the Origin and expose Mcp-Session-Id / WWW-Authenticate
 * for the transport and auth flow.
 */

const ALLOW_ORIGINS = new Set([
  "https://claude.ai",
  "https://claude.com",
  "https://www.claude.ai",
  "https://console.anthropic.com",
  "https://inspector.modelcontextprotocol.io",
]);

export function mcpCors(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin as string | undefined;
  if (origin && ALLOW_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Mcp-Session-Id, WWW-Authenticate"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Max-Age", "600");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
}
