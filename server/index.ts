import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import pinoHttp from "pino-http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { sanitizeInput, blockSensitivePaths, csrfTokenEndpoint, validateCsrf, healthCheck, readinessCheck, securityHeaders } from "./security-middleware";
import { registerMcp } from "./mcp";
import { problemFromError, sendProblem } from "./problem-details";
import { legacyServiceRedirects } from "../client/src/config/services";
import { resolveJobPageStatus } from "./jobs-routes";
import { startLeadDeliveryRecovery } from "./lead-delivery";
import { storage } from "./storage";

const app = express();

app.disable("x-powered-by");
app.use(securityHeaders);
app.use(pinoHttp({
  redact: ["req.headers.authorization", "req.headers.cookie", "req.headers.x-csrf-token", "res.headers.set-cookie"],
}));

// Enable gzip/Brotli compression for all responses
app.use(compression({
  // Compress all responses over 1KB
  threshold: 1024,
  // Compression level (0-9, where 6 is default and good balance)
  level: 6,
  // Only compress text-based responses
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

// ── Security Middleware (Cycle 0) ──
app.use(blockSensitivePaths);

// ── MCP + OAuth 2.1 surface ──
// Mounted before sanitizeInput so JSON-RPC tool arguments and OAuth fields
// (codes, verifiers, passcodes) aren't silently mutated by HTML scrubbing.
registerMcp(app);

app.use(sanitizeInput);
app.get("/api/csrf-token", csrfTokenEndpoint);
app.use("/api", validateCsrf);
app.get("/api/health", healthCheck);
app.get("/api/health/ready", readinessCheck);

app.get("/services/:slug", (req, res, next) => {
  const canonicalSlug = legacyServiceRedirects[req.params.slug];
  if (!canonicalSlug) return next();
  return res.redirect(301, `/services/${canonicalSlug}`);
});

// Preserve truthful HTTP status for dynamic job pages before the SPA shell is served.
app.get("/jobs/:slug", resolveJobPageStatus);

app.get("/services/:slug/:city", (req, res, next) => {
  const canonicalSlug = legacyServiceRedirects[req.params.slug];
  if (!canonicalSlug) return next();
  return res.redirect(301, `/services/${canonicalSlug}`);
});

app.get(/^\/(?:industries|case-studies)(?:\/.*)?$/, (_req, res) => {
  return res.redirect(301, "/services");
});

app.get("/hire/:role/in/:industry", (_req, res) => {
  return res.redirect(301, "/services");
});

app.get(/^\/salary-guide(?:\/.*)?$/, (_req, res) => {
  return res.redirect(301, "/resources");
});

app.get("/salary-calculator", (_req, res) => {
  return res.redirect(301, "/resources");
});

app.get(["/refund", "/shipping"], (_req, res) => {
  return res.redirect(301, "/terms-of-service");
});

app.get("/privacy", (_req, res) => {
  return res.redirect(301, "/privacy-policy");
});

app.get("/terms", (_req, res) => {
  return res.redirect(301, "/terms-of-service");
});

app.get("/gcc-hub", (_req, res) => {
  return res.redirect(301, "/services/gcc-accelerator");
});

app.get(/^\/locations(?:\/.*)?$/, (_req, res) => {
  return res.redirect(301, "/services");
});

app.get("/staffing-quiz", (_req, res) => {
  return res.redirect(301, "/services");
});

app.get("/hire/:role/:city", (_req, res) => {
  return res.redirect(301, "/services");
});

app.get("/services/:service/:city", (req, res) => {
  const canonicalSlug = legacyServiceRedirects[req.params.service] ?? req.params.service;
  return res.redirect(301, `/services/${canonicalSlug}`);
});

app.get(["/hire/:role", "/compare/:slug"], (_req, res) => {
  return res.redirect(301, "/services");
});

app.get(/^\/blog(?:\/.*)?$/, (_req, res) => {
  return res.redirect(301, "/resources");
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // API misses must never fall through to the HTML application shell.
  app.use("/api", (req, res) => {
    return sendProblem(
      res,
      problemFromError(404, "API route not found", "The requested API route was not found.", req.originalUrl),
    );
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    sendProblem(
      res,
      problemFromError(status, status === 500 ? "Internal Server Error" : message, message),
    );
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
    startLeadDeliveryRecovery({
      storage,
      webhookUrl: process.env.LEADHUNTER_WEBHOOK_URL?.trim(),
    });
  });
})();
