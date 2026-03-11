# 🚨 TalPro Website - Incident Response Checklist

**Emergency Response Procedures | Print and Keep Handy**

---

## 📋 INCIDENT CLASSIFICATION

Mark the type of incident you're responding to:

- ☐ **CRITICAL** - Site completely down, users cannot access website
- ☐ **HIGH** - Major functionality broken (contact form, blog, database)
- ☐ **MEDIUM** - Performance degradation, slow responses
- ☐ **LOW** - Minor issues, cosmetic problems

**Incident Start Time**: _________________ (UTC)

---

## 🆘 CRITICAL: SITE COMPLETELY DOWN

### Initial Assessment (0-2 minutes)

- ☐ Can you access the website URL? → https://talpro.in
- ☐ Check Replit workflow status (is "Start application" running?)
- ☐ Check Replit status page → https://status.replit.com

### Immediate Actions (2-5 minutes)

- ☐ **Restart workflow** if stopped
  - Click stop button in Replit
  - Click run button to restart
  
- ☐ **Check workflow logs** for errors
  - Look for: "port already in use", "database connection failed"
  - Note error messages: _________________________________

- ☐ **Verify environment variables set**
  ```
  ☐ DATABASE_URL present
  ☐ VITE_BASE_URL present
  ☐ NODE_ENV set to production
  ```

### Investigation (5-15 minutes)

- ☐ **Review recent deployments**
  - Last deployment time: _________________
  - Deployed by: _________________________
  
- ☐ **Check database connection**
  ```bash
  ☐ Run: psql $DATABASE_URL -c "SELECT 1;"
  ☐ Connection works? YES / NO
  ```

- ☐ **Review git history**
  ```bash
  ☐ Run: git log --oneline -10
  ☐ Recent suspicious commits? _________________
  ```

### Resolution Actions

- ☐ **If recent deployment** → Proceed to ROLLBACK checklist
- ☐ **If database issue** → Proceed to DATABASE FAILURE checklist
- ☐ **If Replit outage** → Monitor status page, contact support
- ☐ **If unknown** → Collect logs and escalate

### Post-Incident

- ☐ Site restored and functional
- ☐ Incident documented in deployment history
- ☐ Root cause identified: _________________________________
- ☐ Prevention measures implemented

**Incident Resolution Time**: _________________ (UTC)  
**Total Downtime**: _________________ minutes

---

## 💾 DATABASE FAILURE

### Symptoms

- ☐ "Database connection failed" errors
- ☐ 500 errors on pages requiring data
- ☐ Queries timing out

### Diagnosis Steps (0-5 minutes)

- ☐ **Check DATABASE_URL exists**
  ```bash
  ☐ Run: echo $DATABASE_URL
  ☐ Result: Not empty / Empty (if empty, SET IT!)
  ```

- ☐ **Test database connection**
  ```bash
  ☐ Run: psql $DATABASE_URL -c "SELECT current_database();"
  ☐ Connection works? YES / NO
  ```

- ☐ **Check Neon database status**
  - ☐ Login to https://console.neon.tech
  - ☐ Database status: Active / Paused / Error
  - ☐ Any maintenance notices? _________________

### Quick Fixes

- ☐ **Restart application** (stops/resets connection pool)
- ☐ **Unpause database** (if Neon free tier paused)
- ☐ **Verify schema up to date**
  ```bash
  ☐ Run: npm run db:push
  ```

### Advanced Troubleshooting

- ☐ **Check connection limits**
  ```bash
  ☐ Run: psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"
  ☐ Active connections: _________
  ```

- ☐ **Verify tables exist**
  ```bash
  ☐ Run: psql $DATABASE_URL -c "\dt"
  ☐ Tables exist: blog_posts / contact_inquiries / users
  ```

### Resolution

- ☐ Database connection restored
- ☐ Application queries working
- ☐ Data integrity verified

**Issue Resolved**: YES / NO  
**Resolution Time**: _________________ minutes

---

## ⏮️ EMERGENCY ROLLBACK

### Pre-Rollback Checklist

- ☐ **Identify rollback point**
  - Rollback to: Date/Time _________________ or Commit: _________
  
- ☐ **Create emergency backup** (before rollback)
  ```bash
  ☐ Run: pg_dump $DATABASE_URL > emergency_backup_$(date +%Y%m%d_%H%M%S).sql
  ☐ Backup created: YES / NO
  ```

- ☐ **Document current state**
  - Last known good deployment: _________________
  - Current broken state description: _________________________________

### Rollback Method Selection

Choose ONE rollback method:

**Option A: Full Rollback (Code + Database) via Replit Checkpoint**

- ☐ Open Rollback tab in Replit sidebar
- ☐ Find checkpoint from: _________________
- ☐ Preview checkpoint (verify it's correct)
- ☐ Confirm rollback
- ☐ ⚠️ **ACKNOWLEDGE**: All changes after checkpoint will be permanently lost

**Option B: Code-Only Rollback via Git**

- ☐ Identify commit hash: _________________
- ☐ Choose method:
  - ☐ Soft revert: `git revert <commit-hash>` (creates new commit)
  - ☐ Hard reset: `git reset --hard <commit-hash>` (destructive)
- ☐ Execute rollback command
- ☐ Restart workflow

**Option C: Database-Only Rollback**

- ☐ Stop "Start application" workflow
- ☐ Restore from backup:
  ```bash
  ☐ Run: psql $DATABASE_URL < backup_file.sql
  ```
- ☐ Verify data restored:
  ```bash
  ☐ Run: psql $DATABASE_URL -c "SELECT COUNT(*) FROM blog_posts;"
  ☐ Count matches expected: YES / NO
  ```
- ☐ Restart workflow

### Post-Rollback Verification

- ☐ **Website accessible**
- ☐ **Homepage loads correctly**
- ☐ **Navigation works**
- ☐ **Blog posts display**
- ☐ **Contact form functional**
- ☐ **Database queries working**
- ☐ **No console errors**

**Rollback Successful**: YES / NO  
**Rollback Completed**: _________________ (UTC)

---

## 🐌 PERFORMANCE DEGRADATION

### Symptoms

- ☐ Slow page load times (> 5 seconds)
- ☐ API responses > 2 seconds
- ☐ Timeout errors
- ☐ High server load

### Quick Checks (0-5 minutes)

- ☐ **Run Lighthouse audit**
  - Performance score: _________ (target: > 90)
  - FCP: _________ ms (target: < 1500ms)
  - LCP: _________ ms (target: < 2500ms)

- ☐ **Check server logs**
  - ☐ Look for "in XXXXms" > 1000ms
  - ☐ Slowest endpoint: _________________
  - ☐ Response time: _________ ms

- ☐ **Check bundle size**
  ```bash
  ☐ Run: npm run build
  ☐ Main bundle size: _________ KB (target: < 500KB)
  ```

### Investigation (5-15 minutes)

- ☐ **Network analysis**
  - ☐ Large assets (> 1MB)? List: _________________________________
  - ☐ Slow API calls? Endpoint: _________________
  - ☐ Compression enabled? YES / NO

- ☐ **Database performance**
  - ☐ Any slow queries identified? _________________________________
  - ☐ Missing indexes? _________________________________

### Optimization Actions

- ☐ **Immediate fixes identified**:
  1. _________________________________
  2. _________________________________
  3. _________________________________

- ☐ **Applied optimizations**
- ☐ **Redeployed**
- ☐ **Performance improved**

**Performance Issue Resolved**: YES / NO / PARTIALLY  
**Post-optimization score**: _________

---

## 📝 CONTACT FORM FAILURE

### Symptoms

- ☐ Form submission fails
- ☐ Error messages displayed
- ☐ No confirmation after submit
- ☐ Data not saving to database

### Diagnosis (0-5 minutes)

- ☐ **Check browser console**
  - Error message: _________________________________

- ☐ **Test API endpoint**
  ```bash
  ☐ Run: curl http://localhost:5000/api/contact
  ☐ Response code: _________ (expect 200 or 405)
  ```

- ☐ **Check server logs**
  - ☐ POST /api/contact appears? YES / NO
  - ☐ Error message: _________________________________

- ☐ **Verify database**
  ```bash
  ☐ Run: psql $DATABASE_URL -c "SELECT * FROM contact_inquiries ORDER BY created_at DESC LIMIT 5;"
  ☐ Recent submissions visible? YES / NO
  ```

### Common Issues & Fixes

- ☐ **Validation error** → Check form validation schema
- ☐ **Database error** → Verify contact_inquiries table exists
- ☐ **Email not sending** → Check SENDGRID_API_KEY (optional feature)
- ☐ **CORS error** → Verify API endpoint accessible

**Contact Form Working**: YES / NO

---

## 📰 BLOG SYSTEM FAILURE

### Symptoms

- ☐ Blog posts not displaying
- ☐ Autopublisher failing
- ☐ Images not loading
- ☐ API errors

### Quick Checks

- ☐ **Test blog API**
  ```bash
  ☐ Run: curl http://localhost:5000/api/blog/posts
  ☐ Returns JSON? YES / NO
  ☐ Number of posts: _________
  ```

- ☐ **Check database**
  ```bash
  ☐ Run: psql $DATABASE_URL -c "SELECT id, title, published FROM blog_posts WHERE published = true;"
  ☐ Published posts count: _________
  ```

- ☐ **Autopublisher issues**
  - ☐ Check blog-autopublisher logs
  - ☐ Webhook endpoint accessible? YES / NO
  - ☐ Test single post: `cd blog-autopublisher && node test-single-post.cjs`

- ☐ **Gatekeeper issues**
  - ☐ Check blog-gatekeeper logs
  - ☐ OPENAI_API_KEY set? YES / NO
  - ☐ SQLite database exists? blog-gatekeeper/gatekeeper.db

**Blog System Working**: YES / NO

---

## 📞 ESCALATION & CONTACTS

### When to Escalate

Escalate if:
- ☐ Incident unresolved after 30 minutes
- ☐ Data loss suspected
- ☐ Security breach suspected
- ☐ Platform-wide outage

### Support Contacts

**Replit Platform:**
- Status: https://status.replit.com
- Support: support@replit.com

**Neon Database:**
- Status: https://status.neon.tech
- Console: https://console.neon.tech
- Support: support@neon.tech

**Internal Team:**
- Primary: ___________________________
- Backup: ___________________________
- Manager: ___________________________

---

## 📊 INCIDENT LOG

**Incident ID**: INC-_____________ (generate unique ID)  
**Reported By**: _________________  
**Severity**: Critical / High / Medium / Low  
**Status**: Active / Investigating / Resolved / Escalated

### Timeline

| Time (UTC) | Action Taken | Result |
|------------|--------------|--------|
| __________ | ___________________________________ | _____________ |
| __________ | ___________________________________ | _____________ |
| __________ | ___________________________________ | _____________ |
| __________ | ___________________________________ | _____________ |

### Root Cause

_________________________________________________________________

_________________________________________________________________

### Resolution Summary

_________________________________________________________________

_________________________________________________________________

### Prevention Measures

1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

---

## ✅ POST-INCIDENT CHECKLIST

After incident resolved:

- ☐ **Document incident** in deployment history
- ☐ **Update monitoring** if needed
- ☐ **Communication**: Notify stakeholders of resolution
- ☐ **Post-mortem**: Schedule review meeting (if critical)
- ☐ **Update documentation** with lessons learned
- ☐ **Implement prevention** measures

**Incident Closed**: _________________ (UTC)  
**Documented By**: _________________

---

## 🔄 QUICK REFERENCE

### Most Common Fixes

1. **Restart workflow** → Solves 60% of issues
2. **Check DATABASE_URL** → Fixes connection errors
3. **Rollback recent deployment** → Fixes bad releases
4. **Clear cache / hard refresh** → Fixes frontend issues

### Emergency Commands

```bash
# Restart development server
npm run dev

# Test database connection
psql $DATABASE_URL -c "SELECT 1;"

# Create emergency backup
pg_dump $DATABASE_URL > emergency_backup.sql

# View recent commits
git log --oneline -10

# Check environment variables
env | grep -E "DATABASE_URL|VITE_BASE_URL"
```

---

**📖 Full Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)  
**🚀 Quick Reference**: [DEPLOYMENT_QUICK_REFERENCE.md](./DEPLOYMENT_QUICK_REFERENCE.md)

**Version**: 1.0.0 | **Last Updated**: November 12, 2025

---

**PRINT THIS CHECKLIST AND KEEP IT ACCESSIBLE FOR EMERGENCIES**
