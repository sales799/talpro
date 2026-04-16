/**
 * Minimal Zod → JSON Schema converter for tool.inputSchema.
 *
 * The MCP spec requires tool inputSchema to be a JSON Schema object. We keep
 * a tiny hand-rolled converter rather than pulling in `zod-to-json-schema` —
 * our tool schemas are intentionally simple (flat objects of primitives) so
 * a 40-line converter covers the full surface.
 */

import { z, ZodTypeAny } from "zod";

export function zodToJsonSchema(schema: ZodTypeAny): Record<string, unknown> {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape as Record<string, ZodTypeAny>;
    const properties: Record<string, unknown> = {};
    const required: string[] = [];
    for (const [key, child] of Object.entries(shape)) {
      properties[key] = zodToJsonSchema(child);
      if (!(child instanceof z.ZodOptional) && !(child instanceof z.ZodDefault)) {
        required.push(key);
      }
    }
    const out: Record<string, unknown> = {
      type: "object",
      properties,
      additionalProperties: false,
    };
    if (required.length) out.required = required;
    return out;
  }
  if (schema instanceof z.ZodString) return { type: "string" };
  if (schema instanceof z.ZodNumber) return { type: "number" };
  if (schema instanceof z.ZodBoolean) return { type: "boolean" };
  if (schema instanceof z.ZodDefault) {
    const inner = zodToJsonSchema((schema as any)._def.innerType);
    return { ...inner, default: (schema as any)._def.defaultValue() };
  }
  if (schema instanceof z.ZodOptional) {
    return zodToJsonSchema((schema as any)._def.innerType);
  }
  if (schema instanceof z.ZodArray) {
    return { type: "array", items: zodToJsonSchema((schema as any)._def.type) };
  }
  if (schema instanceof z.ZodEnum) {
    return { type: "string", enum: (schema as any)._def.values };
  }
  if (schema instanceof z.ZodLiteral) {
    return { const: (schema as any)._def.value };
  }
  return {};
}
