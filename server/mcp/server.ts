import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "./zod-json-schema";
import { TOOLS, toolByName, type ToolContext } from "./tools";

/**
 * Build a fresh MCP Server instance. Each HTTP session/transport gets its own
 * Server — the SDK's Streamable HTTP transport is 1:1 with a Server.
 */
export function buildMcpServer(ctx: ToolContext): Server {
  const server = new Server(
    {
      name: "talpro-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: zodToJsonSchema(t.inputSchema),
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (req): Promise<any> => {
    const tool = toolByName(req.params.name);
    if (!tool) {
      return {
        isError: true,
        content: [
          { type: "text", text: `Unknown tool: ${req.params.name}` },
        ],
      };
    }
    const parsed = tool.inputSchema.safeParse(req.params.arguments ?? {});
    if (!parsed.success) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Invalid arguments for ${tool.name}: ${parsed.error.issues
              .map((i) => `${i.path.join(".")}: ${i.message}`)
              .join("; ")}`,
          },
        ],
      };
    }
    try {
      return await tool.handler(parsed.data, ctx);
    } catch (err) {
      return {
        isError: true,
        content: [
          { type: "text", text: `Tool ${tool.name} failed: ${(err as Error).message}` },
        ],
      };
    }
  });

  return server;
}
