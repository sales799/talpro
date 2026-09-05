import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { blockSensitivePaths } from "./security-middleware";
import { isKnownClientRoute } from "./client-routes";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use(blockSensitivePaths);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    const pathname = req.originalUrl.split("?")[0];

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      const status = res.locals.spaStatus ?? (isKnownClientRoute(pathname) ? 200 : 404);
      res
        .status(status)
        .set({ "Content-Type": "text/html" })
        .end(injectStaticShell(page, pathname, status));
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express, distPath = path.resolve(import.meta.dirname, "public")) {
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Assets are served directly. Route directories are resolved explicitly
  // below so Express cannot add trailing-slash redirects for canonical pages.
  app.use(blockSensitivePaths);
  const serveAsset = express.static(distPath, { index: false, redirect: false });
  app.use((req, res, next) => {
    // HTML documents belong to the governed route handler, including encoded
    // filenames. Otherwise /spa.html and retired prerenders bypass route status.
    try {
      if (/\.html$/i.test(decodeURIComponent(req.path))) return next();
    } catch {
      return next();
    }
    return serveAsset(req, res, next);
  });

  // Resolve the route-specific prerender where one exists. Dynamic and error
  // pages use the preserved empty SPA document, never the prerendered homepage.
  const spaHtml = path.resolve(distPath, "spa.html");
  app.use("*", async (req, res, next) => {
    // Treat the incoming path as a path. URL() interprets //employers as a
    // different host and silently turns it into the homepage route.
    const [pathname] = req.originalUrl.split("?");
    const searchIndex = req.originalUrl.indexOf("?");
    const search = searchIndex < 0 ? "" : req.originalUrl.slice(searchIndex);
    const normalizedPathname = normalizePathname(pathname);
    try {
      if (pathname.endsWith("/index.html")) {
        const canonicalPath = pathname.slice(0, -"/index.html".length) || "/";
        if (isKnownClientRoute(canonicalPath)) {
          return res.redirect(301, `${normalizePathname(canonicalPath)}${search}`);
        }
      }
      if (pathname !== normalizedPathname && isKnownClientRoute(normalizedPathname)) {
        return res.redirect(301, `${normalizedPathname}${search}`);
      }

      let status = res.locals.spaStatus ?? (isKnownClientRoute(normalizedPathname) ? 200 : 404);
      const prerendered = status === 200
        ? resolvePrerenderedDocument(distPath, normalizedPathname)
        : undefined;
      const pagePath = prerendered && fs.existsSync(prerendered)
        ? prerendered
        : undefined;
      if (!pagePath && status === 200 && res.locals.spaStatus === undefined) {
        // A missing published static page is an incomplete release, not a
        // successful page containing generic homepage copy. Dynamic jobs keep
        // the verification status supplied by their own route middleware.
        status = 503;
      }
      const page = pagePath
        ? await fs.promises.readFile(pagePath, "utf-8")
        : fs.existsSync(spaHtml)
          ? await fs.promises.readFile(spaHtml, "utf-8")
          : '<!DOCTYPE html><html lang="en"><head><title></title><meta name="description" content=""></head><body><div id="root"></div></body></html>';
      const document = pagePath
        ? page
        : injectStaticShell(page, normalizedPathname, status);
      res
        .status(status)
        .set({ "Content-Type": "text/html; charset=UTF-8" })
        .send(document);
    } catch (error) {
      next(error);
    }
  });
}

export function normalizePathname(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function resolvePrerenderedDocument(distPath: string, pathname: string) {
  if (pathname === "/") return path.join(distPath, "index.html");
  return path.join(distPath, ...pathname.split("/").filter(Boolean), "index.html");
}

function injectStaticShell(page: string, pathname: string, status: number) {
  const copy = getStaticShellCopy(pathname, status);
  const withTitle = page.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(copy.documentTitle)}</title>`);
  const withDescription = withTitle.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta name="description" content="${escapeHtml(copy.description)}">`,
  );
  const withRobots = status >= 400
    ? withDescription.replace("</head>", '    <meta name="robots" content="noindex, nofollow">\n  </head>')
    : withDescription;
  return withRobots.replace(
    '<div id="root"></div>',
    `<div id="root">${renderStaticShell(copy)}</div>`,
  );
}

function renderStaticShell(page: StaticShellCopy) {
  return `
    <main style="font-family: Outfit, Arial, sans-serif; background:#0f172a; color:#fff; min-height:100vh; display:flex; align-items:center;">
      <section style="width:min(1120px, calc(100% - 32px)); margin:0 auto; padding:64px 0;">
        <p style="margin:0 0 14px; color:#D4AF37; font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:.08em;">TALPRO INDIA PRIVATE LIMITED</p>
        <h1 style="margin:0; max-width:760px; font-size:clamp(36px, 7vw, 72px); line-height:1.02; letter-spacing:0; font-weight:800;">${escapeHtml(page.title)}</h1>
        <p style="margin:22px 0 0; max-width:660px; color:rgba(255,255,255,.82); font-size:clamp(18px, 3vw, 22px); line-height:1.55;">${escapeHtml(page.description)}</p>
        <p style="margin:28px 0 0; color:rgba(255,255,255,.9); font-size:16px; line-height:1.7;">Speed &middot; Evidence &middot; Ownership</p>
        <a href="/contact" style="display:inline-flex; margin-top:32px; align-items:center; justify-content:center; min-height:48px; padding:0 24px; background:#D4AF37; color:#0f172a; border-radius:8px; text-decoration:none; font-weight:800;">Hire Talent</a>
      </section>
    </main>
  `;
}

type StaticShellCopy = {
  documentTitle: string;
  title: string;
  description: string;
};

export function getStaticShellCopy(pathname: string, status = 200): StaticShellCopy {
  if (status === 404) {
    return {
      documentTitle: "Page not found | Talpro",
      title: "Page not found",
      description: "The requested Talpro page does not exist or is no longer published.",
    };
  }

  if (status >= 500) {
    return {
      documentTitle: "Temporarily unavailable | Talpro",
      title: "This page is temporarily unavailable",
      description: "The requested information cannot be verified right now. Please try again later.",
    };
  }

  if (pathname === "/contact") {
    return {
      documentTitle: "Contact Talpro | Technology Talent and GCC Workforce",
      title: "Share Your Hiring Brief",
      description: "Tell us who you need and Talpro will respond with a scoped hiring plan and named delivery owner.",
    };
  }

  if (pathname.startsWith("/services")) {
    return {
      documentTitle: "Technology Talent and GCC Workforce Solutions | Talpro",
      title: "Technology Talent and GCC Workforce Solutions",
      description: "Choose a governed hiring model for technology talent, contract staffing, permanent hiring, executive search, RPO, or GCC workforce launch.",
    };
  }

  return {
    documentTitle: "Technology Talent and GCC Workforce Partner | Talpro",
    title: "Talpro India Technology Talent and GCC Workforce Partner",
    description: "Talpro builds and scales India technology capability for global companies.",
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
