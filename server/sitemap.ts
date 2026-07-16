const PUBLIC_BASE_URL = "https://talproindia.com";

export const STATIC_SITEMAP_PATHS = [
  "/sitemap/core.xml",
  "/sitemap/services.xml",
  "/sitemap/roles.xml",
  "/sitemap/locations.xml",
  "/sitemap/industries.xml",
  "/sitemap/guides.xml",
] as const;

type BlogSitemapPost = {
  slug: string;
  publishedAt: Date | string | null;
};

function escapeXmlValue(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastModified(value: BlogSitemapPost["publishedAt"]): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().split("T")[0];
}

export function renderSitemapIndex(): string {
  const sitemapPaths = [...STATIC_SITEMAP_PATHS, "/sitemap/blog.xml"];
  const entries = sitemapPaths
    .map((pathname) => `  <sitemap><loc>${PUBLIC_BASE_URL}${pathname}</loc></sitemap>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

export function renderBlogSitemap(posts: BlogSitemapPost[]): string {
  const entries = posts
    .filter((post) => post.slug.trim().length > 0)
    .map((post) => {
      const loc = `${PUBLIC_BASE_URL}/blog/${encodeURIComponent(post.slug.trim())}`;
      const lastModified = toLastModified(post.publishedAt);
      return `  <url>
    <loc>${escapeXmlValue(loc)}</loc>${lastModified ? `\n    <lastmod>${lastModified}</lastmod>` : ""}
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}
