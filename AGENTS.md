# A README for AI Coding Agents

This document provides comprehensive technical information about the 30 Days of AZD Templates project for AI agents, automation tools, and programmatic interaction.

## Project Overview

**Repository**: https://github.com/30DaysOf/AZD-Templates  
**Live Site**: https://30daysof.github.io/AZD-Templates  
**Framework**: Astro v5.16.7 with Starlight v0.37.2  
**Language**: TypeScript 5.9.3  
**Node Version**: 20.x  
**Package Manager**: npm

## Target Audience & Content Guidelines

**Audience**: Beginners with a technical or professional background who are new to Azure Developer CLI and AI application deployment. They have foundational knowledge but need clear, practical guidance.

**Content Writing Principles**:

1. **Clear & Action-Oriented**: Use concise, direct language focused on what learners will do
   - ✅ "Deploy your first AI application with AZD"
   - ❌ "Leveraging the synergistic capabilities of AZD for deployment optimization"

2. **Reference Requirements**: Every lesson must include at least 3 references with minimum 2 from Microsoft Docs
   - Ensures authoritative, up-to-date information
   - Provides pathways for deeper learning

3. **Simple & Friendly Language**: Avoid buzzwords, jargon, and fancy terminology
   - ✅ "Connect your app to the cloud"
   - ❌ "Establish cloud-native integration paradigms"
   - Explain technical terms when first introduced

4. **Use Analogies**: Include relatable analogies to explain complex concepts
   - Format: Info admonition with home icon (`:house:` or home icon)
   - Example: "Think of AZD templates like a recipe for baking - it lists all ingredients (services) and steps (configuration) needed"
   - Use everyday comparisons (cooking, home organization, travel) for technical concepts

**Example Admonition Structure**:

```markdown
:::tip[Think of it like...]
Just like a house blueprint shows where each room goes, an AZD template maps out where each service fits in your application.
:::
```

## Architecture

### Technology Stack

```yaml
framework: Astro (Static Site Generator)
theme: Starlight (Documentation Theme)
styling: CSS with Starlight variables
components: Astro Components (.astro files)
content: MDX/Markdown files
data: JSON (centralized lesson metadata)
deployment: GitHub Actions → GitHub Pages
development: DevContainer (Node 20 + TypeScript)
```

### Directory Structure

```
/workspaces/AZD-Templates/
├── .devcontainer/
│   └── devcontainer.json           # VS Code DevContainer config
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment
├── src/
│   ├── assets/
│   │   └── hero.svg                # Hero image
│   ├── components/
│   │   └── LessonCards.astro       # Interactive lesson browser component
│   ├── data/
│   │   └── lessons.json            # SINGLE SOURCE OF TRUTH for lesson metadata
│   ├── content/
│   │   ├── config.ts               # Content collections configuration
│   │   └── docs/
│   │       ├── index.mdx           # Homepage (splash template)
│   │       ├── 00-introduction/    # Week 0 (1 lesson: 0.1)
│   │       ├── 01-fundamentals/    # Week 1 (7 lessons: 1.1-1.7)
│   │       ├── 02-azd-deep-dive/   # Week 2 (7 lessons: 2.1-2.7)
│   │       ├── 03-deconstruction/  # Week 3 (7 lessons: 3.1-3.7)
│   │       ├── 04-experimentation/ # Week 4 (7 lessons: 4.1-4.7)
│   │       └── 05-summary/         # Week 5 (1 lesson: 5.1)
│   └── styles/
│       └── custom.css              # Optional custom styles
├── setup/                          # Project documentation directory
│   ├── PRD.md                      # Product Requirements Document
│   ├── SETUP.md                    # Content author guide
│   ├── AGENTS.md                   # This file (AI agent documentation)
│   └── PRE-COMMIT-CHECKLIST.md     # Pre-commit verification
├── astro.config.mjs                # Astro configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Human-readable documentation
```

> **Note**: All project documentation files are centralized in the `setup/` directory for easy reference when refreshing content, re-evaluating changes, or automating updates.

## Data Models

### Lesson Object Schema

**File**: `src/data/lessons.json`

```typescript
interface Lesson {
  title: string; // Format: "X.Y - Lesson Title"
  link: string; // Absolute path with base: "/AZD-Templates/path/"
  week: string; // Format: "Week X" where X is 0-5
  tags: string[]; // Array of single-word tags (no spaces)
  description: string; // 1-2 sentence description (100-150 chars)
  lastUpdated: string; // ISO 8601 format: "YYYY-MM-DDTHH:mm:ssZ"
}
```

**Example**:

```json
{
  "title": "1.1 - Introduction to Microsoft Foundry",
  "link": "/AZD-Templates/01-fundamentals/day-1-microsoft-foundry/",
  "week": "Week 1",
  "tags": ["Platform", "Services"],
  "description": "Explore Microsoft Foundry as a unified platform for building, deploying, and managing AI applications with integrated tools and services.",
  "lastUpdated": "2026-01-08T00:00:00Z"
}
```

### Lesson Content File Structure

**Location**: `src/content/docs/[week-folder]/[lesson-file].md`

**Frontmatter**:

```yaml
---
title: Lesson Title (without day number)
description: One-sentence description
---
```

**Required Sections** (no H1 headings in content):

1. Introduction paragraph
2. `## What You'll Learn` - Bullet list
3. `## Resources` - 3 references (min 2 from Microsoft Docs)
4. Content sections with `##` headings
5. `## Ask Copilot` - 3 suggested questions
6. `## Related Resources` - Additional links

## Configuration Files

### astro.config.mjs

```javascript
{
  output: "static",
  site: "https://30daysof.github.io",
  base: "/AZD-Templates",
  integrations: [
    starlight({
      title: "30DaysOfAZD",
      description: "...",
      social: [{ icon: "github", label: "GitHub", href: "..." }],
      sidebar: [ /* week-based structure */ ]
    })
  ]
}
```

**Critical**: All internal links must include the `/AZD-Templates` base path.

### package.json Scripts

```json
{
  "dev": "astro telemetry disable && astro dev --host 127.0.0.1",
  "build": "astro telemetry disable && astro build",
  "preview": "astro telemetry disable && astro preview",
  "astro": "astro telemetry disable && astro"
}
```

**Note**: All scripts disable telemetry and dev server binds to `127.0.0.1` for DevContainer compatibility.

## Component: LessonCards.astro

**Purpose**: Interactive lesson browser with search, filter, and sort capabilities

**Features**:

- Real-time search (searches title field)
- Week filter (Week 0-5)
- Topic filter (single-word tags)
- Sort by: Lesson Order (default) or Recently Updated
- Responsive grid layout
- Week-specific gradient badge colors

**Data Flow**:

```
lessons.json → LessonCards.astro → HTML cards → JavaScript filters
```

**Styling**:

- Grid: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- Card height: Flexbox with spacer for consistent alignment
- Week badge colors: CSS gradients based on `data-week` attribute

## Build Process

### Development

```bash
npm run dev
# Starts server at http://127.0.0.1:4321/AZD-Templates
# Hot reload enabled for .astro, .md, .mdx, .json files
```

### Production Build

```bash
npm run build
# Output: ./dist/ directory
# Static HTML, CSS, JS
# Base path prepended to all routes
```

### Deployment Pipeline

**Trigger**: Push to `main` branch

**Steps**:

1. Checkout repository
2. Setup Node.js 20
3. Run `npm ci` (clean install)
4. Run `npm run build`
5. Upload `dist/` as artifact
6. Deploy to GitHub Pages

**File**: `.github/workflows/deploy.yml`

## DevContainer Configuration

**Base Image**: `mcr.microsoft.com/devcontainers/typescript-node:20`

**Features**:

- Node.js 20
- TypeScript
- Azure CLI
- GitHub CLI (`gh`)
- Python 3

**Port Forwarding**: 4321 (Astro dev server)

**Post-Create Command**: `npm install`

## Content Management

### Adding a New Lesson

1. **Update lessons.json**:

   ```json
   {
     "title": "X.Y - New Lesson",
     "link": "/AZD-Templates/0X-folder/new-lesson/",
     "week": "Week X",
     "tags": ["Tag1", "Tag2"],
     "description": "Brief description.",
     "lastUpdated": "2026-01-08T00:00:00Z"
   }
   ```

2. **Create markdown file**:
   - Path: `src/content/docs/0X-folder/new-lesson.md`
   - Include frontmatter
   - Follow lesson template structure

3. **Update sidebar** (if needed):
   - Edit `astro.config.mjs`
   - Add entry to appropriate week section

### Updating Existing Content

**Option 1 - Metadata Only**:

- Edit `src/data/lessons.json`
- Update `lastUpdated` timestamp
- Rebuild automatically reflects changes

**Option 2 - Content Changes**:

- Edit markdown file in `src/content/docs/`
- Optionally update `lessons.json` metadata
- Update `lastUpdated` timestamp

## API Endpoints (Static)

This is a static site with no API endpoints. All data is built at compile time.

**Data Access**:

- Lesson metadata: Import `src/data/lessons.json`
- Content: Accessed via Astro content collections API

## Automation Guidelines

### For CI/CD

```bash
# Install dependencies
npm ci

# Run build
npm run build

# Check for errors
echo $?  # Should be 0

# Preview build
npm run preview
```

### For Content Scripts

```javascript
// Read lesson data
const lessons = require("./src/data/lessons.json");

// Update lastUpdated for all lessons
lessons.forEach((lesson) => {
  lesson.lastUpdated = new Date().toISOString();
});

// Write back
fs.writeFileSync("./src/data/lessons.json", JSON.stringify(lessons, null, 2));
```

### For Link Validation

```bash
# Find all internal links
grep -r "](/0" src/content/docs/

# Should include base path
grep -r "](/AZD-Templates/" src/content/docs/
```

## Tag Standardization

**Rule**: Single-word tags only (for consistent card heights)

**Mapping**:

```
"Getting Started" → "Quickstart"
"AI Services" → "Services"
"Use Case" → "Scenario"
"Azure Portal" → "Portal"
"AI Agents" → "Agents"
"Hands-on Exercises" → "Exercises"
"AI Search" → "Search"
"AI Models" → "Models"
"Next Steps" → "Resources"
```

## Week Badge Colors

**CSS Gradients** (in LessonCards.astro):

```css
Week 0: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)  /* Teal/Pink */
Week 1: linear-gradient(135deg, #667eea 0%, #764ba2 100%)  /* Purple */
Week 2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)  /* Pink */
Week 3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)  /* Blue */
Week 4: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)  /* Green */
Week 5: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)  /* Peach */
```

## Environment Variables

**None required** for build/deployment.

**Optional** (for development):

- `ASTRO_TELEMETRY_DISABLED=1` (handled in scripts)

## Known Limitations

1. **Static Site**: No server-side rendering or API routes
2. **Base Path**: All links must include `/AZD-Templates` prefix
3. **Build Time**: Content changes require full rebuild
4. **Search**: Client-side only, limited to title field
5. **Mobile**: Responsive but limited to 3-column max on desktop

## Performance Metrics

- **Build Time**: ~5-10 seconds (30 lessons)
- **Page Load**: <2 seconds (static HTML)
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)

## Security Considerations

- No user input processing
- No authentication/authorization
- Static content only
- All external links open in new tab
- No cookies or tracking

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .astro node_modules dist

# Reinstall
npm install

# Rebuild
npm run build
```

### Links Not Working

- Check base path: `/AZD-Templates` prefix required for hero buttons and external links in lessons.json
- Internal sidebar links are relative (start with `/`) - Astro applies base automatically
- Verify `astro.config.mjs` base setting
- Check trailing slashes in links

### DevContainer Issues

- Rebuild container: `Dev Containers: Rebuild Container`
- Check port 4321 forwarding
- Verify `--host 127.0.0.1` in dev script

## Version History

- **v1.0** (January 2026): Initial release
- **v1.1** (January 8, 2026): Interactive lesson browser, centralized JSON data

## Related Documentation

### Project Documentation (in `setup/` directory)

- **setup/PRD.md**: Product requirements and specifications
- **setup/SETUP.md**: Content author customization guide
- **setup/AGENTS.md**: This file (AI agent technical documentation)
- **setup/PRE-COMMIT-CHECKLIST.md**: Pre-commit verification checklist
- **README.md**: Human-readable project overview (root directory)

> **Important**: Always consult these files when refreshing content, re-evaluating changes, or performing automated updates.

### External Documentation

- **Astro Docs**: https://docs.astro.build
- **Starlight Docs**: https://starlight.astro.build

---

**Last Updated**: January 8, 2026  
**Maintained By**: 30DaysOf Team
