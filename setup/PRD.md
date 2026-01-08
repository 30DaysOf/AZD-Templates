# Product Requirements Document: 30 Days of AZD Templates

## Project Overview

A comprehensive 30-day learning journey website built with Astro Starlight, teaching Azure Developer CLI (AZD) templates from fundamentals to production-ready AI solutions.

## Objectives

- Create an educational website with 30 days of structured content
- Organize content into 4 themed weeks plus introduction and summary
- Enable local development in a devcontainer
- Automate deployment to GitHub Pages via GitHub Actions
- Provide consistent, high-quality learning experience

## Technical Requirements

### Platform

- **Framework**: Astro with Starlight integration
- **Node Version**: 20.x
- **Package Manager**: npm
- **Hosting**: GitHub Pages

### Content Structure

```
30 Days = Introduction (0.1) + 4 Weeks (28 Days: 1.1-4.7) + Summary (5.1)

Week 0: Introduction (Lesson 0.1)
Week 1: Fundamentals (Lessons 1.1-1.7)
Week 2: AZD Deep Dive (Lessons 2.1-2.7)
Week 3: Deconstruction (Lessons 3.1-3.7)
Week 4: Experimentation (Lessons 4.1-4.7)
Week 5: Summary (Lesson 5.1)

Total: 30 lessons across 6 weeks
```

### Homepage Features

- **Hero Section**: Course tagline, "Get Started" and "View on GitHub" action buttons
- **Course Overview Cards**: 4 cards representing each main week (Week 1-4) with icons
- **Interactive Lesson Browser**:
  - Real-time search across all lessons
  - Filter by week (Week 0-5)
  - Filter by topic tags (single-word tags for consistent card height)
  - Sort by Lesson Order or Recently Updated
  - Displays all 30 lessons as cards with title, description, and tags
  - Week-specific gradient badge colors

### Lesson Data Management

- All lesson metadata stored in `/src/data/lessons.json`
- Each lesson includes:
  - Title (numbered format: X.Y - Title)
  - Link (with base path `/AZD-Templates`)
  - Week (Week 0-5)
  - Tags (single-word only: e.g., "Quickstart" not "Getting Started")
  - Description (1-2 sentences)
  - lastUpdated timestamp (ISO 8601 format)
- Updating JSON file automatically rebuilds affected pages

### Lesson Template

Each lesson must include:

- Title and description
- "What You'll Learn" section (2-4 bullets)
- Resources section with 3 references (minimum 2 from Microsoft Docs)
- Lesson content organized in sections
- "Ask Copilot" section with 3 suggested questions
- "Related Resources" section

## Implementation Checklist

### Phase 1: Project Setup

- [x] Create PRD.md in repository root
- [x] Initialize Astro project with Starlight template in root
- [x] Configure package.json with appropriate scripts
- [x] Set up tsconfig.json for TypeScript support
- [x] Create README.md, AGENTS.md, and SETUP.md documentation

### Phase 2: Configuration

- [x] Configure astro.config.mjs with:
  - Site URL: `https://30daysof.github.io`
  - Base path: `/AZD-Templates`
  - Title: `30DaysOfAZD`
  - Sidebar with week-based structure (collapsible weeks)
  - Social links (GitHub) in array format
- [x] Create `/src/data/lessons.json` for centralized lesson management
- [x] Create `/src/components/LessonCards.astro` for interactive lesson browser
- [x] Configure content collections in src/content/config.ts

### Phase 3: Content Creation

#### Introduction (Week 0)

- [x] Create `/src/content/docs/00-introduction/index.md` (Lesson 0.1)
  - Course overview
  - Learning objectives
  - Prerequisites
  - How to use the course

#### Week 1: Fundamentals (Lessons 1.1-1.7)

- [x] 1.1: Introduction to Microsoft Foundry
- [x] 1.2: Enterprise Retail AI Scenario
- [x] 1.3: App Development Lifecycle
- [x] 1.4: AI App Architecture
- [x] 1.5: Manual Provisioning
- [x] 1.6: ARM Templates
- [x] 1.7: AZD Templates Introduction

#### Week 2: AZD Deep Dive (Lessons 2.1-2.7)

- [x] 2.1: AZD Workflow
- [x] 2.2: Installation & Commands
- [ ] 2.3: Finding Templates
- [ ] 2.4: Creating Templates
- [ ] 2.5: Deploying Templates
- [ ] 2.6: Deconstructing Templates
- [ ] 2.7: AZD Extensions

#### Week 3: Deconstruction (Lessons 3.1-3.7)

- [ ] 3.1: AI Agents Template Introduction
- [ ] 3.2: Deploy & Explore
- [ ] 3.3: Repository Structure
- [ ] 3.4: Search & Models
- [ ] 3.5: Tracing & Application
- [ ] 3.6: Agent Evaluations
- [ ] 3.7: Agent Extensions

#### Week 4: Experimentation (Lessons 4.1-4.7)

- [ ] 4.1: Modify Template
- [ ] 4.2: Deploy Solution
- [ ] 4.3: Model Creation
- [ ] 4.4: Agent Creation
- [ ] 4.5: Idea to Prototype
- [ ] 4.6: Prototype to Production
- [ ] 4.7: Production to Adoption

#### Summary (Week 5)

- [x] Create `/src/content/docs/05-summary/index.md` (Lesson 5.1)
  - Course recap
  - Skills gained
  - Next steps
  - Resources

### Phase 4: DevContainer Setup

- [x] Update `.devcontainer/devcontainer.json`:
  - Node.js 20 base image
  - Forward port 4321 for Astro dev server
  - Post-create command: `npm install`
  - Install VS Code extensions (Astro, Copilot)
- [x] Configure dev server with `--host 127.0.0.1` flag
- [x] Test devcontainer rebuild
- [x] Verify `npm run dev` works in container

### Phase 5: CI/CD Setup

- [x] Create `.github/workflows/deploy.yml`:
  - Trigger on push to main
  - Checkout code
  - Setup Node.js 20
  - Install dependencies (`npm ci`)
  - Build Astro site (`npm run build`)
  - Upload artifact
  - Deploy to GitHub Pages
- [x] Configure repository settings:
  - Enable GitHub Pages
  - Set source to GitHub Actions
  - Verify Pages permissions

### Phase 6: Interactive Features

- [x] Implement LessonCards component with:
  - Real-time search functionality
  - Week filter (Week 0-5)
  - Topic filter (single-word tags)
  - Sort by Lesson Order or Recently Updated
  - Responsive grid layout
  - Week-specific gradient badge colors
- [x] Integrate lesson browser into homepage
- [x] Remove separate lessons page
- [x] Update sidebar navigation

### Phase 7: Testing & Validation

- [x] Local development test:
  - Run `npm install`
  - Run `npm run dev`
  - Verify all pages render
  - Check navigation works
  - Test interactive lesson browser
- [x] DevContainer test:
  - Rebuild devcontainer
  - Run dev server with proper host binding
  - Verify port forwarding
- [ ] Production build test:
  - Run `npm run build`
  - Run `npm run preview`
  - Check for build errors
- [ ] GitHub Pages deployment:
  - Push to main branch
  - Monitor GitHub Actions
  - Verify deployed site

## Content Standards

### Lesson Structure

Every lesson must follow this template:

```markdown
---
title: Day X - Title
description: One-sentence description
---

# Day X: Title

[Introduction paragraph]

## What You'll Learn

- Learning objective 1
- Learning objective 2
- Learning objective 3
- Learning objective 4

## Resources

1. 📘 [Microsoft Docs Resource](URL) - Description
2. 📘 [Microsoft Docs Resource](URL) - Description
3. 🔗 [GitHub/Video/Blog](URL) - Description

## [Section 1 Title]

[Content]

## [Section 2 Title]

[Content]

## Ask Copilot

1. "Question 1?"
2. "Question 2?"
3. "Question 3?"

## Related Resources

- [Resource 1](URL)
- [Resource 2](URL)
- [Resource 3](URL)

---

**Next**: [Day X+1](link)
```

### Microsoft Docs Integration

- Minimum 2 out of 3 resources must be from learn.microsoft.com
- Resources should be relevant and current
- Include specific documentation links, not just home pages

### Navigation

- Each lesson links to next lesson
- Week introductions explain week theme
- Clear progression from fundamentals to advanced

## File Structure

```
/workspaces/AZD-Templates/
├── .devcontainer/
│   └── devcontainer.json          # DevContainer configuration
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions deployment
├── src/
│   ├── components/
│   │   └── LessonCards.astro      # Interactive lesson browser component
│   ├── data/
│   │   └── lessons.json           # Centralized lesson metadata (30 lessons)
│   ├── content/
│   │   ├── config.ts              # Content collections config
│   │   └── docs/
│   │       ├── index.mdx          # Homepage with hero, overview, lesson browser
│   │       ├── 00-introduction/
│   │       │   └── index.md       # 0.1: Welcome
│   │       ├── 01-fundamentals/
│   │       │   ├── day-1-microsoft-foundry.md       # 1.1
│   │       │   ├── day-2-retail-ai-scenario.md      # 1.2
│   │       │   ├── day-3-app-lifecycle.md           # 1.3
│   │       │   ├── day-4-ai-architecture.md         # 1.4
│   │       │   ├── day-5-manual-provisioning.md     # 1.5
│   │       │   ├── day-6-arm-templates.md           # 1.6
│   │       │   └── day-7-azd-templates.md           # 1.7
│   │       ├── 02-azd-deep-dive/
│   │       │   ├── day-8-azd-workflow.md            # 2.1
│   │       │   ├── day-9-installation.md            # 2.2
│   │       │   ├── day-10-finding-templates.md      # 2.3
│   │       │   ├── day-11-creating-templates.md     # 2.4
│   │       │   ├── day-12-deploying.md              # 2.5
│   │       │   ├── day-13-deconstructing.md         # 2.6
│   │       │   └── day-14-extensions.md             # 2.7
│   │       ├── 03-deconstruction/
│   │       │   ├── day-15-ai-agents-intro.md        # 3.1
│   │       │   ├── day-16-deploy-explore.md         # 3.2
│   │       │   ├── day-17-repository-structure.md   # 3.3
│   │       │   ├── day-18-search-models.md          # 3.4
│   │       │   ├── day-19-tracing-application.md    # 3.5
│   │       │   ├── day-20-evaluations.md            # 3.6
│   │       │   └── day-21-agent-extensions.md       # 3.7
│   │       ├── 04-experimentation/
│   │       │   ├── day-22-modify-template.md        # 4.1
│   │       │   ├── day-23-deploy-solution.md        # 4.2
│   │       │   ├── day-24-model-creation.md         # 4.3
│   │       │   ├── day-25-agent-creation.md         # 4.4
│   │       │   ├── day-26-idea-to-prototype.md      # 4.5
│   │       │   ├── day-27-prototype-to-production.md # 4.6
│   │       │   └── day-28-production-to-adoption.md # 4.7
│   │       └── 05-summary/
│   │           └── index.md        # 5.1: Recap
│   ├── assets/
│   │   └── hero.svg               # Hero image placeholder
│   └── styles/
│       └── custom.css              # Custom styling (optional)
├── astro.config.mjs                # Astro configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript config
├── PRD.md                          # This document
└── README.md                       # Project README
```

## Commands Reference

### Development

```bash
npm install              # Install dependencies
npm run dev             # Start dev server (http://localhost:4321)
npm run build           # Build for production
npm run preview         # Preview production build
npm run astro           # Run Astro CLI commands
```

### DevContainer

```bash
# Rebuild container
Ctrl/Cmd + Shift + P → "Dev Containers: Rebuild Container"

# Inside container
npm run dev
```

### Deployment

- Push to main branch triggers automatic deployment via GitHub Actions
- Deployed site: https://30daysof.github.io/AZD-Templates

## Success Criteria

- [x] All 30 lessons created (0.1 + 1.1-4.7 + 5.1)
- [ ] Each lesson follows the standard template
- [ ] All internal links work correctly with base path
- [x] Local development works in devcontainer
- [x] Interactive lesson browser with search, filter, sort
- [ ] GitHub Actions successfully deploys to Pages
- [ ] Site is accessible and fully functional at https://30daysof.github.io/AZD-Templates
- [x] Navigation is intuitive and clear
- [x] Homepage with hero, overview cards, and lesson browser
- [x] Mobile responsive design
- [ ] No broken links or images
- [x] Lesson metadata centralized in JSON file
- [x] Week-specific gradient badge colors
- [x] Single-word tags for consistent card heights

## Maintenance Plan

### Content Updates

- Review and update Microsoft Docs links quarterly
- Update with new AZD features as released
- Incorporate community feedback
- Add new lessons for advanced topics

### Technical Updates

- Keep Astro and dependencies updated
- Monitor for security vulnerabilities
- Test devcontainer compatibility
- Verify GitHub Actions workflow

## Timeline

- **Phase 1**: PRD & Project Setup (Day 1)
- **Phase 2**: Configuration (Day 1)
- **Phase 3**: Content Creation (Days 1-5)
- **Phase 4**: DevContainer Setup (Day 2)
- **Phase 5**: CI/CD Setup (Day 2)
- **Phase 6**: Testing & Validation (Day 3)

## Stakeholders

- **Content Creators**: Responsible for lesson content
- **Developers**: Maintain technical infrastructure
- **Community**: Provide feedback and contributions
- **Learners**: Primary audience and users

## Risks & Mitigations

| Risk                       | Impact | Mitigation                                           |
| -------------------------- | ------ | ---------------------------------------------------- |
| Microsoft Docs links break | Medium | Regular link validation, maintain backup references  |
| Astro breaking changes     | Low    | Pin versions, test before upgrading                  |
| GitHub Pages downtime      | Low    | Document alternative hosting options                 |
| Content outdated           | Medium | Quarterly review cycle                               |
| DevContainer issues        | Low    | Test across platforms, provide fallback instructions |

## Version History

- **v1.0** (January 2026): Initial PRD and project setup
- **v1.1** (January 8, 2026):
  - Added interactive lesson browser component
  - Centralized lesson data in JSON file
  - Implemented week-based numbering (0.1-5.1)
  - Added homepage with hero and overview cards
  - Implemented search, filter, and sort functionality
  - Added week-specific gradient badge colors
  - Standardized tags to single words
  - Fixed routing with base path prefix

---

**Document Status**: Active
**Last Updated**: January 8, 2026
**Next Review**: April 2026
