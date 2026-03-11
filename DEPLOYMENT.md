# TalPro Website Deployment Documentation

**Last Updated:** November 12, 2025  
**Version:** 1.0.0  
**Platform:** Replit with Neon PostgreSQL Database

---

## Table of Contents

1. [Deployment Overview](#1-deployment-overview)
2. [Pre-Deployment Checklist](#2-pre-deployment-checklist)
3. [Deployment Steps](#3-deployment-steps)
4. [Post-Deployment Verification](#4-post-deployment-verification)
5. [Environment Variables](#5-environment-variables)
6. [Database Backup Strategy](#6-database-backup-strategy)
7. [Rollback Procedures](#7-rollback-procedures)
8. [Incident Response](#8-incident-response)
9. [Deployment History](#9-deployment-history)
10. [Emergency Contacts](#10-emergency-contacts)

---

## 1. Deployment Overview

### 1.1 Platform Architecture

TalPro website runs on **Replit's built-in publishing system**, which provides:

- **Automatic Builds**: No manual build scripts needed
- **TLS/SSL**: Automatic HTTPS with valid certificates
- **Health Checks**: Built-in health monitoring and automatic recovery
- **Deployment Domain**: `*.replit.app` (or custom domain if configured)
- **Single-Click Publishing**: Deploy directly from Replit UI

### 1.2 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (Neon serverless, persistent storage)
- **Runtime**: Single process serving both frontend and backend on port 5000
- **Build Command**: `npm run build` (Vite + esbuild)
- **Start Command**: `npm run dev` (development) or `npm start` (production)

### 1.3 Key Features

- **Unified Server**: Express serves both API and static frontend files
- **Hot Module Replacement**: Development mode includes Vite HMR
- **Database Persistence**: All data stored in Neon PostgreSQL
- **Automatic Checkpoints**: Replit creates snapshots for easy rollback
- **Blog Automation**: Integrated autopublisher and AI gatekeeper systems

---

## 2. Pre-Deployment Checklist

Before deploying to production, complete the following checklist:

### 2.1 Code Quality Checks

- [ ] **Run all tests**: Execute `npx vitest run` - all tests must pass
- [ ] **TypeScript compilation**: Run `npm run check` - no type errors
- [ ] **Code review**: Review recent changes in git history
- [ ] **No console errors**: Check browser console in development mode
- [ ] **No TODOs**: Resolve or document any remaining TODO comments

### 2.2 Workflow Status

- [ ] **"Start application" workflow running**: Verify in Replit UI
- [ ] **No server errors**: Check workflow logs for errors or warnings
- [ ] **Application accessible**: Test at development URL
- [ ] **Database connection**: Verify database queries working

### 2.3 Environment Variables

Verify all required environment variables are set:

- [ ] `DATABASE_URL` - PostgreSQL connection string (auto-configured by Replit)
- [ ] `OPENAI_API_KEY` - For blog content enhancement (optional but recommended)
- [ ] `SOCIAL_MEDIA_WEBHOOK_URL` - For blog social media distribution (optional)
- [ ] `VITE_BASE_URL` - Production domain (e.g., `https://talpro.in`)
- [ ] `SENDGRID_API_KEY` - For contact form email notifications (if using SendGrid)

### 2.4 Database Migrations

- [ ] **Schema up to date**: Run `npm run db:push` if schema changes exist
- [ ] **Verify tables**: Confirm all required tables exist (users, contact_inquiries, blog_posts)
- [ ] **Test queries**: Execute sample queries to verify database access

### 2.5 Content Verification

- [ ] **Blog posts**: Verify blog posts display correctly
- [ ] **Contact form**: Test form submission end-to-end
- [ ] **Career listings**: Check PyjamaHR integration working
- [ ] **Images/assets**: Confirm all images load properly
- [ ] **Navigation**: Test all menu links and routes

---

## 3. Deployment Steps

### 3.1 Standard Deployment Process

Replit provides a streamlined deployment workflow:

#### Step 1: Open Replit Project
Navigate to your TalPro project in Replit

#### Step 2: Click "Publish" Button
Located in the Replit UI header (typically top-right)

#### Step 3: Review Deployment Settings
- **Domain**: Verify deployment domain (e.g., `talpro.replit.app` or custom domain)
- **Resources**: Check allocated CPU/memory resources
- **Environment**: Ensure production environment variables are set
- **Database**: Confirm database connection configured

#### Step 4: Confirm Deployment
Click "Confirm" or "Deploy" to start the deployment process

#### Step 5: Monitor Build Process
- Watch build logs for any errors
- Typical build time: 2-5 minutes
- Vite builds frontend assets
- esbuild bundles backend server

#### Step 6: Wait for Health Checks
Replit automatically:
- Starts the server on port 5000
- Performs HTTP health checks
- Verifies application responding
- Activates traffic routing

#### Step 7: Verify Deployment
- Visit production URL
- Confirm application loads correctly
- Check deployment status indicator (green = success)

### 3.2 Custom Domain Deployment

If using a custom domain (e.g., `talpro.in`):

1. **Configure DNS**: Point domain A/CNAME records to Replit
2. **Add Domain in Replit**: Navigate to deployment settings → Add custom domain
3. **Verify Domain**: Complete domain ownership verification
4. **Update Environment Variables**: Set `VITE_BASE_URL` to custom domain
5. **Deploy**: Follow standard deployment steps above
6. **Test SSL**: Verify HTTPS works on custom domain

### 3.3 First-Time Deployment

For initial production deployment:

1. **Create Database Backup**: Export current data before first deploy
2. **Set Production Environment Variables**: Configure all secrets
3. **Deploy**: Follow standard deployment steps
4. **Smoke Test**: Thoroughly test all critical functionality
5. **Monitor Logs**: Watch for errors in first 24 hours
6. **Document**: Record deployment in deployment history section

---

## 4. Post-Deployment Verification

After deployment completes, perform the following verification steps:

### 4.1 Core Functionality Tests

#### Homepage & Navigation
- [ ] Homepage loads without errors
- [ ] All navigation menu items work
- [ ] Footer links functional
- [ ] Mobile menu opens/closes correctly

#### Key Pages
- [ ] **About Page**: Loads with team information, timeline, awards
- [ ] **Services Pages**: Custom Software, Mobile App, AI/ML services display
- [ ] **Industry Pages**: Banking, Energy, Logistics pages load
- [ ] **Case Studies**: Case study list and detail pages work
- [ ] **Contact Page**: Form displays correctly

#### Blog System
- [ ] **Blog List**: `/blog` shows all published posts
- [ ] **Blog Post**: Individual posts display with proper formatting
- [ ] **Blog Images**: Hero images and inline images load
- [ ] **Blog API**: `GET /api/blog/posts` returns JSON data

#### Contact Form
- [ ] Form fields validate properly
- [ ] Submit button works
- [ ] Success message displays after submission
- [ ] Data saves to database (check via database query)
- [ ] Email notification sent (if configured)

#### Careers Integration
- [ ] Careers page loads job listings
- [ ] Jobs fetched from PyjamaHR
- [ ] Filtering and search work
- [ ] Application links functional

### 4.2 Technical Verification

#### Performance
- [ ] **Page Load Time**: Homepage loads in < 3 seconds
- [ ] **API Response Time**: Blog API responds in < 500ms
- [ ] **Bundle Size**: Check network tab - JS bundles reasonable size
- [ ] **Lighthouse Score**: Run Lighthouse audit (aim for 90+ performance)

#### SEO & Meta Tags
- [ ] **Title Tags**: Each page has unique, descriptive title
- [ ] **Meta Descriptions**: Pages include meta description
- [ ] **Canonical URLs**: Every page has canonical tag pointing to `https://talpro.in`
- [ ] **Open Graph Tags**: Social media preview tags present
- [ ] **Sitemap**: `/sitemap.xml` accessible
- [ ] **Robots.txt**: `/robots.txt` accessible

#### Browser Compatibility
- [ ] **Chrome**: Test in latest Chrome
- [ ] **Firefox**: Test in latest Firefox
- [ ] **Safari**: Test in Safari (if available)
- [ ] **Mobile**: Test on mobile device or responsive mode

#### Console & Errors
- [ ] **No JavaScript errors**: Check browser console
- [ ] **No network errors**: Check network tab for failed requests
- [ ] **No 404s**: Verify no broken links or missing resources
- [ ] **HTTPS**: Green padlock in browser address bar

### 4.3 Database Verification

- [ ] **Connection**: Database connection active
- [ ] **Queries**: Test SELECT, INSERT operations
- [ ] **Data Integrity**: Verify existing data intact
- [ ] **Backups**: Confirm automatic backups enabled

### 4.4 Monitoring Setup

- [ ] **Server Logs**: Access to production logs available
- [ ] **Error Tracking**: Note any new errors in logs
- [ ] **Traffic Monitoring**: Monitor initial traffic patterns
- [ ] **Database Performance**: Check query performance metrics

---

## 5. Environment Variables

### 5.1 Required Environment Variables

#### DATABASE_URL
- **Description**: PostgreSQL connection string for Neon database
- **Format**: `postgresql://[user]:[password]@[host]/[database]`
- **Auto-configured**: Replit sets this automatically when database created
- **Production**: Same database used in dev and production
- **Example**: `postgresql://user:pass@ep-cool-cloud-123.us-east-2.aws.neon.tech/neondb`

#### PORT
- **Description**: Server listening port
- **Default**: `5000`
- **Required**: Must be 5000 (other ports firewalled on Replit)
- **Auto-configured**: Set by Replit automatically

#### NODE_ENV
- **Description**: Application environment
- **Values**: `development` or `production`
- **Production**: Set to `production` for optimizations
- **Development**: Set to `development` for debugging

### 5.2 Optional Environment Variables

#### OPENAI_API_KEY
- **Description**: OpenAI API key for blog content enhancement
- **Required for**: Automatic blog post rewriting and optimization
- **Fallback**: System skips AI enhancement if not set
- **Get Key**: https://platform.openai.com/api-keys
- **Format**: `sk-...`

#### SOCIAL_MEDIA_WEBHOOK_URL
- **Description**: Webhook URL for social media post distribution
- **Required for**: Automatic LinkedIn/Facebook/X posting when blog published
- **Fallback**: No social media distribution if not set
- **Format**: Full HTTPS URL to webhook endpoint

#### VITE_BASE_URL
- **Description**: Base URL for the deployed application
- **Required for**: Canonical URLs, social media metadata
- **Production**: `https://talpro.in` or `https://talproindia.com`
- **Development**: `http://localhost:5000`
- **Note**: Must be full URL with protocol, no trailing slash

#### SENDGRID_API_KEY
- **Description**: SendGrid API key for email notifications
- **Required for**: Contact form email delivery
- **Fallback**: Contact submissions saved to database but no email sent
- **Get Key**: https://app.sendgrid.com/settings/api_keys
- **Format**: `SG.`-prefixed key

### 5.3 Setting Environment Variables

#### In Replit Development
1. Open "Secrets" tab in Replit sidebar
2. Click "Add new secret"
3. Enter variable name (e.g., `OPENAI_API_KEY`)
4. Enter variable value
5. Click "Add secret"

#### In Replit Production
1. Navigate to deployment settings
2. Go to "Environment Variables" section
3. Add each production variable
4. Save and redeploy

### 5.4 Environment Variable Checklist

Use this checklist before deployment:

```
✓ DATABASE_URL - Auto-configured by Replit
✓ PORT - Auto-set to 5000
✓ NODE_ENV - Set to "production"
□ OPENAI_API_KEY - Optional, recommended for blog features
□ SOCIAL_MEDIA_WEBHOOK_URL - Optional, for social distribution
✓ VITE_BASE_URL - Set to production domain
□ SENDGRID_API_KEY - Optional, for contact form emails
```

---

## 6. Database Backup Strategy

### 6.1 Automatic Backups (Neon PostgreSQL)

Neon provides automatic database backups as part of the serverless PostgreSQL service:

#### Built-in Features
- **Point-in-Time Recovery (PITR)**: Restore to any point in the last 7-30 days (plan dependent)
- **Automatic Snapshots**: Daily automatic backups
- **Retention Period**: 7 days (Free tier) to 30 days (paid plans)
- **Zero Configuration**: Backups happen automatically, no setup required
- **Branch-based Backups**: Each Neon branch has independent backup history

#### Accessing Neon Backups
1. Log in to Neon console: https://console.neon.tech
2. Select your TalPro project
3. Navigate to "Backups" or "Restore" section
4. Select desired restore point
5. Restore to new branch or existing database

### 6.2 Manual Backup Procedures

For critical changes, create manual backups before deployment:

#### Creating Manual Backup

**Option 1: Using pg_dump (Recommended)**

```bash
# Full database backup with timestamp
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup with compression
pg_dump $DATABASE_URL | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Backup specific tables only
pg_dump $DATABASE_URL -t blog_posts -t contact_inquiries > backup_selective_$(date +%Y%m%d_%H%M%S).sql
```

**Option 2: Using Replit Shell**

1. Open Replit Shell
2. Run backup command:
   ```bash
   pg_dump $DATABASE_URL > backup_talpro_$(date +%Y%m%d_%H%M%S).sql
   ```
3. Download file: Click on file in file tree → Download

#### Backup Best Practices

- **Before Major Changes**: Always backup before schema changes or major deployments
- **Before Data Migration**: Backup before bulk data operations
- **Weekly Backups**: Schedule weekly manual backups for extra safety
- **Document Backups**: Record backup metadata in deployment history
- **Store Safely**: Download and store backups outside of Replit (cloud storage, local machine)

#### Backup Metadata Template

Document each manual backup with:

```
Date: 2025-11-12 14:30 UTC
Filename: backup_talpro_20251112_143000.sql
Size: 2.5 MB
Database: talpro_production
Tables: users (5 records), blog_posts (23 records), contact_inquiries (147 records)
Purpose: Before blog autopublisher deployment
Created By: Admin
Stored: Google Drive backup folder
```

### 6.3 Database Restore Procedures

#### Restoring from Manual Backup

**Step 1: Stop the Application**
```bash
# In Replit, stop the "Start application" workflow
# Click the stop button or use Ctrl+C in console
```

**Step 2: Restore Database**
```bash
# Restore from backup file
psql $DATABASE_URL < backup_file.sql

# Restore from compressed backup
gunzip -c backup_file.sql.gz | psql $DATABASE_URL

# Restore with error logging
psql $DATABASE_URL < backup_file.sql 2> restore_errors.log
```

**Step 3: Verify Data Integrity**
```bash
# Check table counts
psql $DATABASE_URL -c "SELECT COUNT(*) FROM blog_posts;"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM contact_inquiries;"

# Verify recent records
psql $DATABASE_URL -c "SELECT id, title, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 5;"
```

**Step 4: Restart Application**
```bash
# Restart the "Start application" workflow
# or run: npm run dev
```

**Step 5: Test Application**
- Access application URL
- Verify blog posts display
- Test database queries
- Check for errors in logs

#### Restoring from Neon Point-in-Time Recovery

1. **Access Neon Console**: https://console.neon.tech
2. **Select Project**: Choose TalPro database project
3. **Navigate to Restore**: Find "Restore" or "Backups" section
4. **Choose Restore Point**: Select date/time to restore to
5. **Create Branch**: Restore to new branch for safety
6. **Test Restored Data**: Verify data in new branch
7. **Switch Connection**: Update DATABASE_URL to new branch if valid
8. **Delete Old Branch**: Archive old branch after confirming restore

### 6.4 Data Protection Best Practices

#### Backup Schedule Recommendations

- **Daily**: Automatic Neon backups (no action required)
- **Weekly**: Manual pg_dump backup downloaded and archived
- **Before Deployments**: Manual backup before major changes
- **Before Migrations**: Backup before schema changes

#### Data Integrity Checks

- **Regular Testing**: Test backup restoration quarterly
- **Validation Queries**: Document key queries to verify data integrity
- **Record Counts**: Track expected record counts for each table
- **Schema Versioning**: Use Drizzle migrations for schema version control

#### Backup Storage Strategy

- **Multiple Locations**: Store backups in at least 2 locations
- **Version Control**: Keep schema files in git repository
- **Naming Convention**: Use consistent naming: `backup_talpro_YYYYMMDD_HHMMSS.sql`
- **Retention Policy**: Keep weekly backups for 3 months, monthly for 1 year

#### Production Data Security

- **Separate Environments**: Never restore production data to development
- **Access Control**: Limit who can access production database
- **Audit Logging**: Log all production database access
- **Encryption**: Neon provides encryption at rest and in transit

---

## 7. Rollback Procedures

### 7.1 Replit Checkpoint System

Replit automatically creates checkpoints during development that include complete snapshots of:

- **All Code Files**: Every file in the project
- **Database State**: Full PostgreSQL database snapshot
- **Chat History**: Conversation with Replit Agent
- **Environment Configuration**: Settings and secrets

#### When Checkpoints Are Created

- **Automatic**: At regular intervals during active development
- **Before Major Changes**: System creates checkpoints before significant edits
- **Manual**: You can request checkpoint creation before risky operations
- **Before Deployments**: Recommended to create checkpoint before deploying

#### Checkpoint Retention

- **Free Tier**: Limited checkpoint history (typically last few hours)
- **Paid Plans**: Extended checkpoint retention (days to weeks)
- **Duration**: Checkpoints accessible based on Replit plan

### 7.2 Rollback Using Replit Checkpoints

**Complete System Rollback (Code + Database)**

#### Step 1: Access Rollback Interface
1. Open Replit project
2. Look for "Rollback" or "Time Travel" tab in sidebar
3. Click to open checkpoint browser

#### Step 2: Browse Checkpoints
- View checkpoints listed chronologically
- See timestamp for each checkpoint
- Preview checkpoint description/context

#### Step 3: Preview Checkpoint
- Select checkpoint to preview
- Review code changes included
- Verify it's the correct restore point
- Check timestamp matches expected rollback time

#### Step 4: Confirm Rollback
- Click "Restore" or "Rollback to this checkpoint"
- Read warning about data loss
- Confirm you understand changes will be lost
- Proceed with rollback

#### Step 5: System Restoration
Replit will restore:
- ✓ All code files to checkpoint state
- ✓ Database to checkpoint snapshot
- ✓ Chat history to that point
- ✗ Any work after checkpoint **permanently deleted**

#### Step 6: Verify Rollback
- Check file timestamps updated
- Test application functionality
- Verify database data correct
- Restart workflow if needed

⚠️ **CRITICAL WARNING**: Replit checkpoint rollback is **destructive and irreversible**. All changes made after the checkpoint will be **permanently deleted**. Always create a manual backup before rollback if you need to preserve any recent work.

### 7.3 Manual Code Rollback (Git-Based)

If using git version control, you can rollback code independently:

#### View Git History

```bash
# View commit history
git log --oneline

# View detailed commit history
git log --graph --decorate --all

# View changes in specific commit
git show <commit-hash>
```

#### Soft Rollback (Preserve Work)

```bash
# Revert a specific commit (creates new commit)
git revert <commit-hash>

# Revert multiple commits
git revert <commit-hash-1> <commit-hash-2>

# Revert but don't commit yet (review changes first)
git revert --no-commit <commit-hash>
```

#### Hard Rollback (Destructive)

```bash
# Reset to specific commit (DESTRUCTIVE - loses all changes after)
git reset --hard <commit-hash>

# Reset to previous commit
git reset --hard HEAD~1

# Reset to 3 commits ago
git reset --hard HEAD~3
```

#### After Git Rollback

```bash
# Restart the application workflow
# Changes take effect immediately

# If you need to update deployment
# Commit and push changes, then redeploy
```

### 7.4 Database-Only Rollback

When you need to rollback database without touching code:

#### Option 1: Restore from Manual Backup

```bash
# 1. Stop application workflow
# 2. Restore from backup file
psql $DATABASE_URL < backup_file.sql

# 3. Verify restoration
psql $DATABASE_URL -c "SELECT COUNT(*) FROM blog_posts;"

# 4. Restart application
```

#### Option 2: Neon Point-in-Time Recovery

```bash
# Use Neon console to restore to specific time
# See section 6.3 for detailed steps
```

#### Option 3: Manual Data Correction

For small issues, manually correct data:

```bash
# Example: Delete accidentally published blog post
psql $DATABASE_URL -c "DELETE FROM blog_posts WHERE id = 123;"

# Example: Restore specific record from backup
# 1. Extract record from backup file
# 2. Insert into current database
```

### 7.5 Rollback Decision Matrix

Use this matrix to choose the right rollback approach:

| Situation | Recommended Approach | Data Loss Risk |
|-----------|---------------------|----------------|
| Bad deployment - code & database corrupted | Replit Checkpoint Rollback | High - all changes after checkpoint lost |
| Bad deployment - code only broken | Git-based rollback | Low - only code changes reverted |
| Database corruption | Database restore from backup | Medium - database changes since backup lost |
| Single bad commit | `git revert <commit>` | None - creates new commit undoing changes |
| Need to undo last hour of work | Replit Checkpoint (if available) | High - last hour lost |
| Accidentally deleted blog posts | Database restore or manual correction | Low to Medium |
| Schema migration failed | Database restore + code rollback | Medium - data since backup lost |

### 7.6 Rollback Testing

Test rollback procedures regularly to ensure they work when needed:

#### Quarterly Rollback Drill

1. **Schedule Test**: Pick low-traffic time
2. **Create Checkpoint**: Manually create checkpoint before test
3. **Make Test Changes**: Add test blog post, modify data
4. **Perform Rollback**: Practice rollback procedure
5. **Verify Success**: Confirm test changes removed
6. **Document Results**: Record any issues encountered
7. **Update Procedures**: Improve documentation based on findings

#### Test Scenarios

- **Scenario 1**: Rollback last commit using git
- **Scenario 2**: Restore database from manual backup
- **Scenario 3**: Use Replit checkpoint to rollback 1 hour
- **Scenario 4**: Restore single table from backup

---

## 8. Incident Response

### 8.1 Site Down - Complete Outage

**Symptoms**: Website not accessible, 502/503 errors, timeout errors

#### Immediate Actions (0-5 minutes)

1. **Check Workflow Status**
   ```bash
   # In Replit, check "Start application" workflow
   # If stopped: Click "Run" to restart
   ```

2. **Check Replit System Status**
   - Visit https://status.replit.com
   - Look for ongoing incidents or maintenance

3. **Check Server Logs**
   ```bash
   # View recent logs in workflow console
   # Look for errors like "port already in use", "database connection failed"
   ```

4. **Quick Restart**
   ```bash
   # Stop and restart the workflow
   # This resolves most transient issues
   ```

#### Investigation (5-15 minutes)

5. **Review Recent Changes**
   - Check git history: `git log --oneline -10`
   - Identify last deployment or code change
   - Review recent commits for obvious issues

6. **Check Database Connection**
   ```bash
   psql $DATABASE_URL -c "SELECT 1;"
   # If fails, database connection issue (see 8.2)
   ```

7. **Test Server Directly**
   ```bash
   curl http://localhost:5000
   # Check if server responding locally
   ```

#### Resolution

8. **If Recent Deployment**: Rollback (see section 7)
9. **If Database Issue**: Follow section 8.2
10. **If Replit Outage**: Wait for platform recovery, monitor status page
11. **If Unknown**: Contact Replit support with error logs

#### Post-Incident

- Document incident in deployment history
- Identify root cause
- Update monitoring/alerting if applicable

### 8.2 Database Connection Issues

**Symptoms**: "Database connection failed", queries timing out, 500 errors on data operations

#### Diagnosis (0-5 minutes)

1. **Verify DATABASE_URL**
   ```bash
   echo $DATABASE_URL
   # Should show full PostgreSQL connection string
   # If empty or incorrect, environment variable issue
   ```

2. **Test Connection Directly**
   ```bash
   psql $DATABASE_URL -c "SELECT current_database();"
   # If succeeds: Server code issue
   # If fails: Neon database issue
   ```

3. **Check Neon Status**
   - Login to https://console.neon.tech
   - Check project status
   - Look for maintenance or issues

#### Quick Fixes

4. **Restart Application**
   ```bash
   # Stop and restart workflow
   # Resets connection pool
   ```

5. **Verify Database Not Paused**
   - Neon free tier pauses inactive databases
   - Activity resumes database automatically
   - Check Neon console for pause status

#### Advanced Troubleshooting

6. **Check Connection Limits**
   ```bash
   psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"
   # Neon has connection limits based on plan
   ```

7. **Check Schema**
   ```bash
   psql $DATABASE_URL -c "\dt"
   # Verify tables exist
   ```

8. **Review Migration Status**
   ```bash
   npm run db:push
   # Push latest schema if migrations pending
   ```

#### Resolution Steps

- **If DATABASE_URL missing**: Set in environment variables, restart
- **If Neon database down**: Wait for Neon recovery or contact support
- **If connection limit reached**: Upgrade Neon plan or reduce connections
- **If schema mismatch**: Run `npm run db:push` to sync schema

### 8.3 Performance Degradation

**Symptoms**: Slow page loads, high response times, timeout errors under load

#### Quick Checks (0-5 minutes)

1. **Check Web Vitals**
   - Open browser DevTools → Lighthouse
   - Run performance audit
   - Note FCP, LCP, TTI metrics

2. **Review Server Logs**
   ```bash
   # Look for slow API responses in logs
   # TalPro logs API timing: "GET /api/blog/posts 200 in 1234ms"
   ```

3. **Check Database Performance**
   ```bash
   psql $DATABASE_URL -c "SELECT query, calls, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 5;"
   # Identifies slow queries (if pg_stat_statements enabled)
   ```

#### Analysis (5-15 minutes)

4. **Bundle Size Analysis**
   ```bash
   npm run build
   # Check build output for bundle sizes
   # Look for unusually large chunks (>500KB)
   ```

5. **Network Analysis**
   - Open DevTools → Network tab
   - Check for large assets (images, fonts, JS)
   - Look for slow API calls
   - Verify compression enabled (gzip/brotli)

6. **Database Query Analysis**
   ```bash
   # Enable query logging if needed
   # Check for missing indexes
   # Verify query efficiency
   ```

#### Optimization Actions

7. **Backend Optimizations**
   - Add database indexes for frequently queried columns
   - Enable query result caching
   - Optimize slow API endpoints

8. **Frontend Optimizations**
   - Lazy load components: `React.lazy()`
   - Optimize images: compress, use WebP format
   - Code splitting: review Vite chunk strategy
   - Remove unused dependencies

9. **Infrastructure**
   - Check Replit resource allocation
   - Consider upgrading Replit plan for more resources
   - Verify compression enabled (already configured)

#### Monitoring

10. **Set Performance Baselines**
    - Document current metrics
    - Track key endpoints: homepage, blog list, API calls
    - Set up alerts for regression

### 8.4 Contact Form Issues

**Symptoms**: Form submissions failing, no email notifications, data not saving

#### Diagnosis

1. **Check Network Tab**
   - Open DevTools → Network
   - Submit form and watch for POST to `/api/contact`
   - Check response status code

2. **Check Server Logs**
   ```bash
   # Look for POST /api/contact in logs
   # Check for validation errors or database errors
   ```

3. **Test Database Insert**
   ```bash
   psql $DATABASE_URL -c "SELECT * FROM contact_inquiries ORDER BY created_at DESC LIMIT 5;"
   # Verify submissions being saved
   ```

#### Common Issues

- **Validation Error**: Check form validation schema matches backend
- **Database Error**: Verify contact_inquiries table exists
- **Email Not Sending**: Check SENDGRID_API_KEY set (optional feature)
- **CORS Error**: Verify API endpoint accessible

### 8.5 Blog System Issues

**Symptoms**: Blog posts not displaying, autopublisher failing, images not loading

#### Quick Fixes

1. **Check Blog API**
   ```bash
   curl http://localhost:5000/api/blog/posts
   # Should return JSON array of posts
   ```

2. **Check Database**
   ```bash
   psql $DATABASE_URL -c "SELECT id, title, published FROM blog_posts WHERE published = true;"
   ```

3. **Autopublisher Issues**
   - Check blog-autopublisher logs
   - Verify webhook endpoint accessible
   - Test with single post: `cd blog-autopublisher && node test-single-post.cjs`

4. **Gatekeeper Issues**
   - Check blog-gatekeeper logs
   - Verify OPENAI_API_KEY set (if using AI analysis)
   - Check SQLite database: `blog-gatekeeper/gatekeeper.db`

---

## 9. Deployment History

Track all deployments to production using this template:

### Deployment Log Template

| Date | Version | Changes | Deployed By | Status | Rollback? | Notes |
|------|---------|---------|-------------|--------|-----------|-------|
| 2025-11-12 | 1.0.0 | Initial deployment documentation | DevOps | Success | No | Created comprehensive deployment docs |

### How to Update Deployment History

After each deployment, add a new row with:

- **Date**: Deployment date (YYYY-MM-DD format)
- **Version**: Semantic version number (major.minor.patch)
- **Changes**: Brief description of what was deployed
- **Deployed By**: Person or team who deployed
- **Status**: Success, Failed, or Rolled Back
- **Rollback?**: Yes/No - was rollback required?
- **Notes**: Additional context, issues encountered, etc.

### Version Numbering Guidelines

- **Major (X.0.0)**: Breaking changes, major features, database schema changes
- **Minor (0.X.0)**: New features, non-breaking changes
- **Patch (0.0.X)**: Bug fixes, minor updates

---

## 10. Emergency Contacts

### 10.1 Platform Support

#### Replit Support
- **Status Page**: https://status.replit.com
- **Support Email**: support@replit.com
- **Documentation**: https://docs.replit.com
- **Community**: https://replit.com/talk

#### Neon Database Support
- **Status Page**: https://status.neon.tech
- **Console**: https://console.neon.tech
- **Documentation**: https://neon.tech/docs
- **Support**: support@neon.tech

### 10.2 Third-Party Services

#### SendGrid (Email Delivery)
- **Status**: https://status.sendgrid.com
- **Support**: https://support.sendgrid.com
- **Dashboard**: https://app.sendgrid.com

#### OpenAI (Blog Enhancement)
- **Status**: https://status.openai.com
- **Documentation**: https://platform.openai.com/docs
- **Support**: https://help.openai.com

#### PyjamaHR (Careers Integration)
- **Company Page**: https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO
- **Support**: Contact PyjamaHR support team

### 10.3 Domain & DNS

#### Domain Registrar
- **Domain**: talpro.in / talproindia.com
- **Registrar**: [Document your registrar]
- **Login**: [Document access details]

#### DNS Provider
- **Provider**: [Document your DNS provider]
- **Dashboard**: [Link to DNS management]

### 10.4 Internal Contacts

Document internal team contacts for emergencies:

| Role | Name | Contact | Availability |
|------|------|---------|--------------|
| Primary DevOps | [Name] | [Email/Phone] | [Hours] |
| Backup DevOps | [Name] | [Email/Phone] | [Hours] |
| Database Admin | [Name] | [Email/Phone] | [Hours] |
| Project Manager | [Name] | [Email/Phone] | [Hours] |

---

## Appendix A: Useful Commands

### Development
```bash
# Start development server
npm run dev

# Run tests
npx vitest run

# Run tests in watch mode
npx vitest

# Type check
npm run check

# Build for production
npm run build
```

### Database
```bash
# Push schema changes
npm run db:push

# Connect to database
psql $DATABASE_URL

# Backup database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql

# Count records
psql $DATABASE_URL -c "SELECT 'blog_posts' as table_name, COUNT(*) FROM blog_posts UNION SELECT 'contact_inquiries', COUNT(*) FROM contact_inquiries;"
```

### Deployment
```bash
# Check environment variables
env | grep -E "DATABASE_URL|OPENAI_API_KEY|VITE_BASE_URL"

# Test production build locally
npm run build && npm start
```

---

## Appendix B: Troubleshooting Guide

### Common Error Messages

#### "Database connection failed"
- **Cause**: DATABASE_URL not set or incorrect
- **Fix**: Check environment variables, restart workflow

#### "Port 5000 already in use"
- **Cause**: Previous server process still running
- **Fix**: Kill process or restart Replit workspace

#### "Module not found"
- **Cause**: Missing dependencies
- **Fix**: Run `npm install`

#### "CORS error"
- **Cause**: Frontend trying to access API from different origin
- **Fix**: Verify Vite proxy configuration, check CORS headers

#### "Out of memory"
- **Cause**: Insufficient resources
- **Fix**: Optimize bundle size, upgrade Replit plan

---

## Document Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-11-12 | Initial deployment documentation created | DevOps Team |

---

**End of Deployment Documentation**

For quick reference, see [DEPLOYMENT_QUICK_REFERENCE.md](./DEPLOYMENT_QUICK_REFERENCE.md)  
For incident response checklist, see [INCIDENT_RESPONSE_CHECKLIST.md](./INCIDENT_RESPONSE_CHECKLIST.md)
