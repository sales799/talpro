import { describe, expect, it } from "vitest";
import {
  getStaticShellCopy,
  normalizePathname,
  resolvePrerenderedDocument,
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
