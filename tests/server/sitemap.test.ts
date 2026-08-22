import { describe, expect, it } from "vitest";
import {
  STATIC_SITEMAP_PATHS,
  renderBlogSitemap,
  renderSitemapIndex,
} from "../../server/sitemap";

describe("sitemap rendering", () => {
  it("publishes every governed static sitemap without the blocked blog surface", () => {
    const xml = renderSitemapIndex();

    expect(xml).toContain("<sitemapindex");
    for (const path of STATIC_SITEMAP_PATHS) {
      expect(xml).toContain(`https://talproindia.com${path}`);
    }
    expect(xml).not.toContain("https://talproindia.com/sitemap/blog.xml");
  });

  it("renders safe blog URLs and valid publication dates", () => {
    const xml = renderBlogSitemap([
      { slug: "route-integrity", publishedAt: new Date("2026-07-16T10:00:00Z") },
      { slug: "hiring & growth", publishedAt: null },
    ]);

    expect(xml).toContain("https://talproindia.com/blog/route-integrity");
    expect(xml).toContain("<lastmod>2026-07-16</lastmod>");
    expect(xml).toContain("https://talproindia.com/blog/hiring%20%26%20growth");
    expect(xml).not.toContain("undefined");
  });
});
