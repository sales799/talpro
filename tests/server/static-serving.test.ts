import { afterEach, beforeEach, describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";
import fs from "node:fs";
import path from "node:path";
import {
  getStaticShellCopy,
  normalizePathname,
  resolvePrerenderedDocument,
  serveStatic,
} from "../../server/vite";

describe("production static route resolution", () => {
  it("keeps canonical routes slashless", () => {
    expect(normalizePathname("/about/")).toBe("/about");
    expect(normalizePathname("/services/it-staffing///")).toBe("/services/it-staffing");
    expect(normalizePathname("/")).toBe("/");
  });

  it("resolves route-specific prerender documents", () => {
    expect(resolvePrerenderedDocument("/release/public", "/")).toBe("/release/public/index.html");
    expect(resolvePrerenderedDocument("/release/public", "/legal/compliance"))
      .toBe("/release/public/legal/compliance/index.html");
  });

  it("renders truthful error shells instead of homepage copy", () => {
    const notFound = getStaticShellCopy("/missing", 404);
    const unavailable = getStaticShellCopy("/jobs/platform-engineer", 503);

    expect(notFound.title).toBe("Page not found");
    expect(notFound.documentTitle).toContain("not found");
    expect(unavailable.title).toContain("temporarily unavailable");
    expect(unavailable.description).not.toContain("builds and scales");
  });
});

describe("production HTML requests", () => {
  let distPath: string;
  let app: ReturnType<typeof express>;
  const shell = '<!DOCTYPE html><html><head><title>Homepage shell</title><meta name="description" content="Homepage description"></head><body><div id="root"></div></body></html>';
  const home = '<!DOCTYPE html><html><head><title>Home | Talpro</title><link rel="canonical" href="https://talproindia.com/"></head><body><div id="root"><h1>Homepage fingerprint</h1></div></body></html>';
  const employers = '<!DOCTYPE html><html><head><title>Employers | Talpro</title><link rel="canonical" href="https://talproindia.com/employers"></head><body><div id="root"><h1>Employer page fingerprint</h1></div></body></html>';

  beforeEach(() => {
    distPath = fs.mkdtempSync(path.join(process.cwd(), "tests/.route-fixture-"));
    fs.mkdirSync(path.join(distPath, "employers"));
    fs.mkdirSync(path.join(distPath, "blog"));
    fs.writeFileSync(path.join(distPath, "index.html"), home);
    fs.writeFileSync(path.join(distPath, "spa.html"), shell);
    fs.writeFileSync(path.join(distPath, "employers/index.html"), employers);
    fs.writeFileSync(path.join(distPath, "blog/index.html"), "Retired article fingerprint");
    fs.writeFileSync(path.join(distPath, "app.js"), "// served asset");
    app = express();
    app.get("/jobs/:slug", (req, res, next) => {
      res.locals.spaStatus = req.params.slug === "expired" ? 404
        : req.params.slug === "unavailable" ? 503 : 200;
      next();
    });
    serveStatic(app, distPath);
  });

  afterEach(() => {
    fs.rmSync(distPath, { recursive: true, force: true });
  });

  it("serves the requested initial HTML and canonical even with enquiry attribution", async () => {
    const response = await request(app).get("/employers?utm_source=partner&service=it-staffing");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toBe(employers);
    expect(response.text).not.toContain("Homepage fingerprint");
  });

  it.each([
    ["/employers///?utm_source=partner%20referral&service=it-staffing", "/employers?utm_source=partner%20referral&service=it-staffing"],
    ["/employers/index.html?utm_source=partner", "/employers?utm_source=partner"],
    ["/index.html?utm_source=partner", "/?utm_source=partner"],
  ])("canonicalizes %s without losing the query", async (source, destination) => {
    const response = await request(app).get(source);
    expect(response.status).toBe(301);
    expect(response.headers.location).toBe(destination);
  });

  it.each(["/missing", "//employers", "/spa.html", "/spa%2ehtml", "/blog/index.html"])(
    "returns a genuine error document for %s instead of exposing homepage or retired HTML",
    async (source) => {
      const response = await request(app).get(source);
      expect(response.status).toBe(404);
      expect(response.text).toContain("<title>Page not found | Talpro</title>");
      expect(response.text).toContain('name="robots" content="noindex, nofollow"');
      expect(response.text).not.toContain("Homepage fingerprint");
      expect(response.text).not.toContain("Retired article fingerprint");
    },
  );

  it("reports missing published prerenders as unavailable", async () => {
    const response = await request(app).get("/about");
    expect(response.status).toBe(503);
    expect(response.text).toContain("<title>Temporarily unavailable | Talpro</title>");
    expect(response.text).not.toContain("Homepage fingerprint");
  });

  it("never reuses rendered homepage HTML when the empty SPA document is missing", async () => {
    fs.rmSync(path.join(distPath, "spa.html"));
    const response = await request(app).get("/missing");
    expect(response.status).toBe(404);
    expect(response.text).toContain("Page not found");
    expect(response.text).not.toContain("Homepage fingerprint");
  });

  it.each([
    ["active", 200],
    ["expired", 404],
    ["unavailable", 503],
  ])("preserves the governed status for %s jobs", async (slug, status) => {
    const response = await request(app).get(`/jobs/${slug}`);
    expect(response.status).toBe(status);
    if (status === 404) expect(response.text).toContain("Page not found");
    if (status === 503) expect(response.text).toContain("Temporarily unavailable");
  });

  it("continues serving regular assets", async () => {
    const response = await request(app).get("/app.js");
    expect(response.status).toBe(200);
    expect(response.text).toBe("// served asset");
  });
});
