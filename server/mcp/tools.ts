import os from "os";
import { z } from "zod";

/**
 * Tool registry for the Talpro MCP server.
 *
 * Real, runnable handlers ship where the call has no external dependency
 * (uptime, echo, system info). Calls into HubSpot / N8N / PM2 / PostgreSQL
 * ship as clearly-labelled stubs that return a structured "not_implemented"
 * response — that keeps the tool surface discoverable for clients while the
 * downstream integrations come online in follow-up PRs.
 */

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodTypeAny;
  handler: (input: unknown, ctx: ToolContext) => Promise<ToolResult>;
}

export interface ToolContext {
  subject: string;
  clientId: string;
}

export interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

function ok(text: string): ToolResult {
  return { content: [{ type: "text", text }] };
}

function notImplemented(tool: string, detail: string): ToolResult {
  return {
    isError: true,
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            status: "not_implemented",
            tool,
            detail,
            remediation:
              "Wire the downstream integration in server/mcp/tools.ts and redeploy.",
          },
          null,
          2
        ),
      },
    ],
  };
}

export const TOOLS: ToolDefinition[] = [
  {
    name: "ping",
    description: "Health check. Returns 'pong' and the server's wall-clock time.",
    inputSchema: z.object({}).strict(),
    handler: async () => ok(`pong @ ${new Date().toISOString()}`),
  },
  {
    name: "echo",
    description: "Echo a message back. Useful for verifying end-to-end tool invocation.",
    inputSchema: z.object({ message: z.string().min(1).max(4000) }).strict(),
    handler: async (input) => {
      const { message } = input as { message: string };
      return ok(message);
    },
  },
  {
    name: "vps_system_info",
    description:
      "Return basic system information about the VPS host serving the MCP endpoint (hostname, uptime, load, memory, platform).",
    inputSchema: z.object({}).strict(),
    handler: async () => {
      const info = {
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        uptime_seconds: Math.floor(os.uptime()),
        loadavg: os.loadavg(),
        mem_total_bytes: os.totalmem(),
        mem_free_bytes: os.freemem(),
        node_version: process.version,
        process_uptime_seconds: Math.floor(process.uptime()),
      };
      return ok(JSON.stringify(info, null, 2));
    },
  },
  {
    name: "whoami",
    description: "Return the authenticated MCP subject (email) and registered client.",
    inputSchema: z.object({}).strict(),
    handler: async (_input, ctx) =>
      ok(JSON.stringify({ subject: ctx.subject, client_id: ctx.clientId }, null, 2)),
  },
  {
    name: "pm2_list",
    description: "[stub] List PM2 processes managed on the VPS.",
    inputSchema: z.object({}).strict(),
    handler: async () =>
      notImplemented("pm2_list", "Shell out to `pm2 jlist` and parse the JSON payload."),
  },
  {
    name: "pm2_tail_logs",
    description:
      "[stub] Tail the last N lines of a PM2-managed service's logs.",
    inputSchema: z
      .object({
        process_name: z.string().min(1),
        lines: z.number().int().min(1).max(500).default(100),
      })
      .strict(),
    handler: async () =>
      notImplemented(
        "pm2_tail_logs",
        "Invoke `pm2 logs <name> --lines <n> --nostream` and stream the buffered output back."
      ),
  },
  {
    name: "hubspot_contact_search",
    description: "[stub] Search HubSpot contacts by email or domain.",
    inputSchema: z
      .object({ query: z.string().min(2).max(200), limit: z.number().int().min(1).max(50).default(10) })
      .strict(),
    handler: async () =>
      notImplemented(
        "hubspot_contact_search",
        "Call HubSpot Search API /crm/v3/objects/contacts/search with the HubSpot private app token from env."
      ),
  },
  {
    name: "n8n_workflow_list",
    description: "[stub] List N8N workflows on the configured instance.",
    inputSchema: z.object({ active_only: z.boolean().default(false) }).strict(),
    handler: async () =>
      notImplemented(
        "n8n_workflow_list",
        "GET {N8N_URL}/api/v1/workflows with X-N8N-API-KEY header; filter by active=true when requested."
      ),
  },
  {
    name: "db_query_readonly",
    description:
      "[stub] Run a read-only SELECT against the Talpro Postgres database. Writes and DDL are forbidden.",
    inputSchema: z
      .object({
        sql: z.string().min(6).max(10000),
        max_rows: z.number().int().min(1).max(500).default(50),
      })
      .strict(),
    handler: async () =>
      notImplemented(
        "db_query_readonly",
        "Gate on an ast-check that rejects non-SELECT statements, then run via the existing pg pool with a LIMIT."
      ),
  },
];

export function toolByName(name: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.name === name);
}
