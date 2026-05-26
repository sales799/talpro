/**
 * TalPro India — Security Middleware
 * Cycle 0: Stop the Bleeding
 *
 * Provides:
 * 1. Admin auth middleware (Bearer token)
 * 2. CSRF token generation/validation
 * 3. Sensitive path blocking (returns 404 instead of SPA HTML)
 * 4. Request sanitization
 */

import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { problemFromError, sendProblem } from "./problem-details";

// ── Admin Authentication ──────────────────────────────────────────

const ADMIN_TOKEN = process.env.TALPRO_ADMIN_TOKEN || crypto.randomBytes(32).toString("hex");

// Log the token on startup if auto-generated (so Bhaskar can grab it from PM2 logs)
if (!process.env.TALPRO_ADMIN_TOKEN) {
  console.log(`[security] Auto-generated admin token: ${ADMIN_TOKEN}`);
  console.log(`[security] Set TALPRO_ADMIN_TOKEN env var to use a persistent token`);
}

/**
 * Middleware to protect admin API endpoints.
 * Requires: Authorization: Bearer <TALPRO_ADMIN_TOKEN>
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Authentication required",
      message: "Provide Authorization: Bearer <token> header",
    });
  }

  const token = authHeader.slice(7);

  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Invalid admin token",
    });
  }

  next();
}

// ── CSRF Protection ───────────────────────────────────────────────

// In-memory CSRF token store (with expiry)
const csrfTokens = new Map<string, number>(); // token → expiry timestamp
const CSRF_TTL = 60 * 60 * 1000; // 1 hour

// Cleanup expired tokens every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of Array.from(csrfTokens.entries())) {
    if (now > expiry) csrfTokens.delete(token);
  }
}, 10 * 60 * 1000);

/**
 * GET /api/csrf-token — Issue a new CSRF token
 */
export function csrfTokenEndpoint(_req: Request, res: Response) {
  const token = crypto.randomBytes(32).toString("hex");
  csrfTokens.set(token, Date.now() + CSRF_TTL);
  res.json({ csrfToken: token });
}

/**
 * Middleware to validate CSRF tokens on mutation endpoints.
 * Expects: X-CSRF-Token header or _csrf body field.
 * Skips: Webhook endpoints that use their own auth (shared secret).
 */
export function validateCsrf(req: Request, res: Response, next: NextFunction) {
  // Skip for non-mutation methods
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  // Skip for webhook endpoints (they use shared secrets)
  if (req.path === "/api/blog/webhook" || req.path === "/api/blog/generate") {
    return next();
  }

  // Skip for admin endpoints (they use Bearer token auth)
  if (req.headers.authorization?.startsWith("Bearer ")) {
    return next();
  }

  const token = (req.headers["x-csrf-token"] as string) || req.body?._csrf;

  if (!token || !csrfTokens.has(token)) {
    return sendProblem(
      res,
      problemFromError(
        403,
        "CSRF validation failed",
        "Invalid or missing CSRF token. Fetch one from GET /api/csrf-token.",
        req.originalUrl,
      ),
    );
  }

  // One-time use: delete after validation
  csrfTokens.delete(token);
  next();
}

// ── Sensitive Path Blocking ───────────────────────────────────────

/**
 * Known-bad paths that scanners probe. Returns 404 instead of letting
 * the SPA catch-all serve index.html with a 200 status.
 */
const BLOCKED_PATTERNS: RegExp[] = [
  // Dotfiles
  /^\/?\.env/i,
  /^\/?\.git/i,
  /^\/?\.htaccess/i,
  /^\/?\.svn/i,
  /^\/?\.DS_Store/i,

  // Config/key files
  /^\/?api_?keys?\.(json|txt|xml|yml|yaml)/i,
  /^\/?config\.(json|txt|xml|yml|yaml|php|js)/i,
  /^\/?\.aws/i,
  /^\/?\.ssh/i,
  /^\/?wp-config/i,
  /^\/?web\.config/i,

  // Server-side files that shouldn't exist in a Node app
  /\.php$/i,
  /\.asp$/i,
  /\.aspx$/i,
  /\.jsp$/i,
  /\.cgi$/i,

  // Common attack paths
  /^\/?wp-admin/i,
  /^\/?wp-login/i,
  /^\/?wp-content/i,
  /^\/?administrator/i,
  /^\/?phpmyadmin/i,
  /^\/?phpinfo/i,
  /^\/?xmlrpc/i,

  // API sensitive paths (that were probed March 15)
  /^\/api\/\.env/i,
  /^\/api\/config$/i,
  /^\/api\/v1\/config$/i,
  /^\/api\/stripe\.(js|ts)$/i,
  /^\/api\/webhook\.(js|ts)$/i,
  /^\/api\/phpinfo/i,
];

/**
 * Middleware: block known-bad paths with a proper 404.
 * Place this BEFORE the SPA catch-all.
 */
export function blockSensitivePaths(req: Request, res: Response, next: NextFunction) {
  const path = req.path;

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(path)) {
      // Log the probe attempt for fail2ban integration
      console.warn(`[security] Blocked probe: ${req.method} ${path} from ${req.ip}`);
      return sendProblem(
        res,
        problemFromError(404, "Not found", "The requested resource was not found.", req.originalUrl),
      );
    }
  }

  next();
}

// ── Security Headers ──────────────────────────────────────────────

export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://snap.licdn.com https://assets.calendly.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.google-analytics.com https://www.google.com https://*.sentry.io https://px.ads.linkedin.com https://api.calendly.com",
      "frame-src https://calendly.com https://*.calendly.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  );
  next();
}

// ── Request Sanitization ──────────────────────────────────────────

/**
 * Basic input sanitization middleware.
 * Strips HTML from string fields in request body to prevent XSS.
 */
export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    sanitizeObject(req.body);
  }
  next();
}

function sanitizeObject(obj: Record<string, any>) {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === "string") {
      // Strip HTML tags but allow markdown
      obj[key] = obj[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/javascript:/gi, "");
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}

// ── Health Check ──────────────────────────────────────────────────

/**
 * Enhanced health check with liveness/readiness split
 */
export function healthCheck(req: Request, res: Response) {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "1.0.0",
  });
}

export function readinessCheck(_req: Request, res: Response) {
  // Could add DB connectivity check here
  res.json({ status: "ready" });
}
