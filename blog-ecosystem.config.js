/**
 * PM2 Ecosystem Config for TalPro Blog Pipeline
 *
 * Services:
 * 1. blog-gatekeeper — AI quality gate + dedup (port 3001)
 * 2. blog-autopublisher — Scheduled content publishing (port 3002)
 *
 * The blog-generator runs inside the main talpro-india Express app.
 * These services are supporting infrastructure.
 *
 * Deploy: pm2 start blog-ecosystem.config.js
 */

module.exports = {
  apps: [
    {
      name: "blog-gatekeeper",
      script: "index.js",
      cwd: "/var/www/talpro/releases/20260306-initial/blog-gatekeeper",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "256M",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        PLATFORM_WEBHOOK_URL: "http://localhost:5001/api/blog/webhook",
        SIMILARITY_THRESHOLD: 0.85,
        AI_ANALYSIS_ENABLED: "false", // Disable until OpenAI key is set
        MIN_QUALITY_SCORE: 6,
        DB_PATH: "/var/www/talpro/data/gatekeeper.db",
      },
    },
    {
      name: "blog-autopublisher",
      script: "index.cjs",
      cwd: "/var/www/talpro/releases/20260306-initial/blog-autopublisher",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "128M",
      cron_restart: "0 4 * * *", // Restart daily at 4 AM IST (10:30 PM UTC)
      env: {
        NODE_ENV: "production",
        PORT: 3002,
        BLOG_WEBHOOK_URL: "http://localhost:5001/api/blog/webhook",
        BLOG_BASE_URL: "https://talproindia.com",
        INITIAL_POSTS: 0, // Don't bulk publish on startup
        DAILY_NUM_POSTS: 2, // 2 posts per day
        DAILY_UTC_HOUR: 4, // 4 AM UTC = 9:30 AM IST
        DAILY_UTC_MIN: 30,
        DELAY_MS: 2000,
        DRY_RUN: 0,
        TITLE_PREFIX: "TalPro",
      },
    },
  ],
};
