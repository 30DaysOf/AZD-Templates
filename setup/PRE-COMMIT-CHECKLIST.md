# Pre-Commit Checklist

Complete this checklist before committing changes to the repository.

## ✅ Documentation

- [x] README.md created (human-readable overview)
- [x] AGENTS.md created (technical documentation for AI agents)
- [x] SETUP.md created (content author guide)
- [x] PRD.md updated with latest changes

## ✅ Code Quality

- [x] No console.log or debug statements in production code
- [x] All files properly formatted
- [x] No TODO/FIXME comments without issues filed
- [x] TypeScript errors resolved
- [x] Build completes successfully

## ✅ Content

- [x] All lesson metadata in lessons.json
- [x] Tags are single-word format
- [x] All links include /AZD-Templates base path
- [x] No duplicate H1 headings in markdown files
- [x] lastUpdated timestamps are current

## ✅ Configuration

- [x] astro.config.mjs properly configured
- [x] package.json scripts include telemetry disable
- [x] DevContainer configuration working
- [x] GitHub Actions workflow configured

## ✅ Security & Privacy

- [x] No API keys or secrets in code
- [x] No personal information in commits
- [x] .gitignore includes sensitive files
- [x] .DO_NOT_COMMIT/ folder excluded

## ✅ Build & Test

Run these commands before committing:

```bash
# Clean build
npm run build

# Should exit with code 0
echo $?

# Preview build
npm run preview
```

Expected results:

- Build completes without errors
- Exit code is 0
- Preview server starts successfully
- All pages load correctly at http://localhost:4321/AZD-Templates

## ✅ Git Status

Check what will be committed:

```bash
# View status
git status

# Review changes
git diff

# Check for untracked files that should be ignored
git status --ignored
```

## ✅ Ignored Files Verification

Ensure these are NOT being committed:

- [ ] `.DO_NOT_COMMIT/` folder
- [ ] `node_modules/`
- [ ] `.astro/`
- [ ] `dist/`
- [ ] `*.log` files
- [ ] `.env` or `.env.local` files

```bash
# Verify gitignore is working
git check-ignore -v .DO_NOT_COMMIT/
# Should output: .gitignore:2:.DO_NOT_COMMIT/
```

## ✅ Commit Message

Use clear, descriptive commit messages:

### Good Examples:

```
Add interactive lesson browser with search and filters
Update lesson metadata schema with tags and timestamps
Fix card alignment issues in LessonCards component
Create comprehensive documentation (README, AGENTS, SETUP)
```

### Bad Examples:

```
Update files
Fix stuff
Changes
WIP
```

## 🚀 Ready to Commit

If all checks pass:

```bash
# Stage changes
git add .

# Commit with message
git commit -m "Your descriptive message here"

# Push to main (triggers deployment)
git push origin main
```

## 📋 Post-Commit Verification

After pushing to main:

1. **Check GitHub Actions**:
   - Go to repository → Actions tab
   - Verify workflow runs successfully
   - Check all steps complete (build, deploy)

2. **Verify Deployment**:
   - Visit https://30daysof.github.io/AZD-Templates
   - Check homepage loads correctly
   - Test lesson browser functionality
   - Verify all links work

3. **Monitor for Issues**:
   - Check for any error messages
   - Verify images and assets load
   - Test on mobile device/responsive design

## 🐛 Rollback Plan

If something goes wrong:

```bash
# Revert last commit
git revert HEAD

# Push revert
git push origin main
```

Or create a hotfix:

```bash
# Create hotfix branch
git checkout -b hotfix/issue-description

# Make fixes
# ... edit files ...

# Commit and push
git add .
git commit -m "Hotfix: description"
git push origin hotfix/issue-description

# Create PR to main
```

## 📝 Additional Notes

- Always test locally before pushing to main
- Main branch triggers automatic deployment
- Breaking changes should be discussed in PRs first
- Document significant changes in commit messages

---

**Last Updated**: January 8, 2026
