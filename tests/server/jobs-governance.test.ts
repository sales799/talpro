import express, { type Express } from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { registerJobRoutes, resolveJobPageStatus } from "../../server/jobs-routes";
import { registerRoutes } from "../../server/routes";

function app(): Express {
  const instance = express();
  instance.use(express.json());
  registerJobRoutes(instance);
  return instance;
}

describe("P2 job publication gate", () => {
  it("returns an honest unavailable state when the job database cannot be reached", async () => {
    const response = await request(app()).get("/api/jobs").expect(503);
    expect(response.body.jobs).toEqual([]);
    expect(response.body.total).toBe(0);
    expect(response.body.availability).toBe("temporarily_unavailable");
  });

  it("does not treat an unavailable job detail as a real vacancy", async () => {
    const response = await request(app()).get("/api/jobs/sample-role").expect(503);
    expect(response.body.message).toContain("temporarily unavailable");
  });

  it("preserves an unavailable status on the dynamic job page shell", async () => {
    const instance = express();
    instance.get("/jobs/:slug", resolveJobPageStatus);
    instance.use((_req, res) => res.status(res.locals.spaStatus ?? 200).send("SPA shell"));
    await request(instance).get("/jobs/sample-role").expect(503);
  });

  it("keeps the governed API ahead of the unreachable legacy handler", async () => {
    const instance = express();
    await registerRoutes(instance);
    const response = await request(instance).get("/api/jobs").expect(503);
    expect(response.body.availability).toBe("temporarily_unavailable");
  });
});
