# TalPro Deployment - Quick Reference Card

**🚀 One-Page Cheatsheet for Common Operations**

---

## 📋 Pre-Deployment Checklist

```bash
☐ npx vitest run          # All tests pass
☐ npm run check           # No TypeScript errors  
☐ Workflow running        # "Start application" active
☐ DATABASE_URL set        # Check Secrets tab
☐ VITE_BASE_URL set       # Production domain
```

---

## 🚢 Deploy to Production

1. **Click "Publish"** in Replit UI (top-right)
2. **Verify settings** (domain, resources)
3. **Confirm deployment**
4. **Wait for build** (2-5 minutes)
5. **Test live URL** (see verification below)

---

## ✅ Post-Deploy Verification

```bash
☐ Homepage loads         https://talpro.in
☐ Blog works            https://talpro.in/blog
☐ Contact form          Submit test inquiry
☐ API responds          GET /api/blog/posts
☐ No console errors     Check browser DevTools
☐ SEO tags present      View page source
```

---

## 💾 Database Backup

### Quick Backup
```bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Backup Before Major Changes
```bash
# Create timestamped backup
pg_dump $DATABASE_URL > backup_talpro_$(date +%Y%m%d_%H%M%S).sql

# Download file from Replit file tree
# Store in safe location (Google Drive, etc.)
```

### Restore from Backup
```bash
# 1. Stop "Start application" workflow
# 2. Restore database
psql $DATABASE_URL < backup_file.sql

# 3. Verify data
psql $DATABASE_URL -c "SELECT COUNT(*) FROM blog_posts;"

# 4. Restart workflow
```

---

## ⏮️ Rollback Procedures

### Full Rollback (Code + Database)
**Via Replit Checkpoints:**
1. Open **Rollback** tab in sidebar
2. Select checkpoint by timestamp
3. Preview changes
4. Click **Restore**
5. ⚠️ **Warning: All changes after checkpoint lost**

### Code-Only Rollback
```bash
# View history
git log --oneline

# Revert specific commit (safe)
git revert <commit-hash>

# Hard reset (destructive)
git reset --hard <commit-hash>
```

### Database-Only Rollback
```bash
# Option 1: Restore from manual backup
psql $DATABASE_URL < backup_file.sql

# Option 2: Use Neon point-in-time recovery
# Login to https://console.neon.tech → Restore
```

---

## 🚨 Emergency Procedures

### Site Down
```bash
1. Check workflow status (restart if stopped)
2. Check https://status.replit.com
3. View workflow logs for errors
4. Rollback if recent deployment
```

### Database Connection Failed
```bash
# Check DATABASE_URL set
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1;"

# Restart workflow
```

### Performance Issues
```bash
# Check bundle size
npm run build

# Run Lighthouse audit
# DevTools → Lighthouse → Generate report

# Check slow queries
# Review logs for "in XXXXms" > 1000ms
```

### Contact Form Not Working
```bash
# Check API endpoint
curl http://localhost:5000/api/contact

# Check database
psql $DATABASE_URL -c "SELECT * FROM contact_inquiries ORDER BY created_at DESC LIMIT 5;"

# Check logs for validation errors
```

---

## 🔧 Useful Commands

### Development
```bash
npm run dev              # Start dev server
npx vitest run           # Run all tests
npm run check            # TypeScript check
npm run build            # Build for production
```

### Database
```bash
npm run db:push                    # Push schema changes
psql $DATABASE_URL                 # Connect to database
psql $DATABASE_URL -c "\dt"        # List tables
psql $DATABASE_URL -c "SELECT COUNT(*) FROM blog_posts;"
```

### Debugging
```bash
# View environment variables
env | grep DATABASE_URL

# Check if port available
lsof -i :5000

# View recent logs
# Check workflow console in Replit
```

---

## 🌐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection (auto-set) |
| `PORT` | ✅ Yes | Server port (auto-set to 5000) |
| `NODE_ENV` | ✅ Yes | production or development |
| `VITE_BASE_URL` | ✅ Yes | https://talpro.in |
| `OPENAI_API_KEY` | ⚪ Optional | Blog content enhancement |
| `SOCIAL_MEDIA_WEBHOOK_URL` | ⚪ Optional | Social distribution |
| `SENDGRID_API_KEY` | ⚪ Optional | Email notifications |

---

## 📞 Emergency Contacts

| Service | Link | Purpose |
|---------|------|---------|
| Replit Status | https://status.replit.com | Platform status |
| Neon Console | https://console.neon.tech | Database management |
| Neon Status | https://status.neon.tech | Database status |
| OpenAI Status | https://status.openai.com | AI services |

---

## 🎯 Key URLs

- **Production**: https://talpro.in
- **Blog**: https://talpro.in/blog
- **API Endpoint**: https://talpro.in/api/blog/posts
- **Careers**: https://talpro.in/careers
- **Contact**: https://talpro.in/contact

---

## 📊 Performance Benchmarks

| Metric | Target | Check Method |
|--------|--------|--------------|
| Homepage Load | < 3s | Lighthouse |
| API Response | < 500ms | Network tab |
| Lighthouse Score | > 90 | DevTools → Lighthouse |
| First Contentful Paint | < 1.5s | Web Vitals |

---

## 🔄 Deployment Workflow

```
┌─────────────────┐
│ Run Tests       │ ← npx vitest run
└────────┬────────┘
         │
┌────────▼────────┐
│ Create Backup   │ ← pg_dump (if major change)
└────────┬────────┘
         │
┌────────▼────────┐
│ Click Publish   │ ← Replit UI
└────────┬────────┘
         │
┌────────▼────────┐
│ Verify Deploy   │ ← Test all functionality
└────────┬────────┘
         │
┌────────▼────────┐
│ Monitor Logs    │ ← Watch for errors (24h)
└─────────────────┘
```

---

## 📝 Quick Notes

- **Backups**: Create before every major deployment
- **Rollback**: Use checkpoints for full rollback, git for code only
- **Database**: Neon provides automatic PITR (7-30 days)
- **Port**: Always use port 5000 (other ports firewalled)
- **Testing**: Test rollback procedures quarterly
- **Documentation**: Update deployment history after each deploy

---

## 🆘 When in Doubt

1. **Check logs first** (workflow console)
2. **Verify workflow running** (restart if needed)
3. **Test database connection** (`psql $DATABASE_URL -c "SELECT 1;"`)
4. **Rollback if recent deployment** (see rollback section)
5. **Check status pages** (Replit, Neon)
6. **Contact support** (if platform issue)

---

**📖 Full Documentation**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive guide  
**🚨 Incident Checklist**: See [INCIDENT_RESPONSE_CHECKLIST.md](./INCIDENT_RESPONSE_CHECKLIST.md)

---

**Last Updated**: November 12, 2025 | **Version**: 1.0.0
