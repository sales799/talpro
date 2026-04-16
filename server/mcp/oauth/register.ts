import type { Request, Response } from "express";
import { z } from "zod";
import { createClient } from "./storage";

/**
 * RFC 7591 — Dynamic Client Registration.
 *
 * MCP clients (claude.ai, Claude Desktop, mcp-inspector, etc.) POST here with
 * their redirect_uris and requested grant types; we mint a fresh client_id
 * (and secret, when the client wants confidential auth) and echo the
 * registration back per the spec.
 */

const registerSchema = z.object({
  client_name: z.string().min(1).max(200).default("Unnamed MCP Client"),
  redirect_uris: z.array(z.string().url()).min(1).max(16),
  grant_types: z
    .array(z.enum(["authorization_code", "refresh_token"]))
    .optional()
    .default(["authorization_code", "refresh_token"]),
  token_endpoint_auth_method: z
    .enum(["none", "client_secret_basic", "client_secret_post"])
    .optional()
    .default("none"),
  scope: z.string().optional(),
});

export async function registerEndpoint(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({
      error: "invalid_client_metadata",
      error_description: parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; "),
    });
  }

  const input = parsed.data;
  const { client, client_secret } = createClient({
    client_name: input.client_name,
    redirect_uris: input.redirect_uris,
    grant_types: input.grant_types,
    token_endpoint_auth_method: input.token_endpoint_auth_method,
  });

  res.status(201).json({
    client_id: client.client_id,
    ...(client_secret ? { client_secret } : {}),
    client_name: client.client_name,
    redirect_uris: client.redirect_uris,
    grant_types: client.grant_types,
    token_endpoint_auth_method: client.token_endpoint_auth_method,
    client_id_issued_at: Math.floor(client.created_at / 1000),
  });
}
