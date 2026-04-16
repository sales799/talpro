import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { buildMcpServer } from "./server";
import type { AccessTokenClaims } from "./oauth/jwt";

/**
 * Streamable HTTP transport wiring for /mcp.
 *
 * The SDK transport is session-oriented: the first POST without an
 * Mcp-Session-Id header triggers `initialize`; subsequent POST/GET/DELETE
 * requests must send the session id back. We keep a map of session → transport
 * so the event stream stays open across the tool-call lifecycle.
 */

interface Session {
  transport: StreamableHTTPServerTransport;
  subject: string;
  clientId: string;
}

const sessions = new Map<string, Session>();

export async function handleMcpRequest(req: Request, res: Response): Promise<void> {
  const sessionId = req.header("mcp-session-id") ?? undefined;
  const claims = req.mcpAuth as AccessTokenClaims | undefined;
  if (!claims) {
    // The requireMcpToken middleware runs ahead of us; defensively bail out.
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  if (sessionId && sessions.has(sessionId)) {
    const session = sessions.get(sessionId)!;
    await session.transport.handleRequest(req, res, req.body);
    return;
  }

  // New session — only initialize requests are allowed without a session id.
  if (req.method !== "POST") {
    res.status(400).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Mcp-Session-Id header required for non-initialize requests",
      },
      id: null,
    });
    return;
  }

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (sid: string) => {
      sessions.set(sid, {
        transport,
        subject: claims.sub,
        clientId: claims.client_id,
      });
    },
  });

  transport.onclose = () => {
    const sid = transport.sessionId;
    if (sid) sessions.delete(sid);
  };

  const server = buildMcpServer({
    subject: claims.sub,
    clientId: claims.client_id,
  });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}
