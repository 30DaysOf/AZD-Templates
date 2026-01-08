# SETUP.md - Content Author Guide

This guide helps content authors customize, update, and rebuild the 30 Days of AZD Templates website.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Content Management](#content-management)
- [Customization](#customization)
- [Building and Testing](#building-and-testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js 20 or later**: [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git**: [Download here](https://git-scm.com/)
- **Code Editor**: VS Code recommended

### Optional

- **VS Code Extensions**:
  - Astro
  - MDX
  - GitHub Copilot (helpful for content generation)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/30DaysOf/AZD-Templates.git
cd AZD-Templates
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open http://localhost:4321/AZD-Templates in your browser.

### 4. Using DevContainer (Optional)

If you have VS Code with Remote-Containers:

1. Open the project in VS Code
2. Click "Reopen in Container" when prompted
3. Wait for the container to build
4. Run `npm run dev` in the terminal

## Content Management

### Lesson Metadata (`src/data/lessons.json`)

**This is the single source of truth for all lesson information displayed on the homepage.**

#### Lesson Object Structure

```json
{
  "title": "X.Y - Lesson Title",
  "link": "/AZD-Templates/path/to/lesson/",
  "week": "Week X",
  "tags": ["Tag1", "Tag2"],
  "description": "Brief 1-2 sentence description.",
  "lastUpdated": "2026-01-08T00:00:00Z"
}
```

#### Field Requirements

| Field         | Format                 | Description                               |
| ------------- | ---------------------- | ----------------------------------------- |
| `title`       | `X.Y - Title`          | X = week number (0-5), Y = lesson number  |
| `link`        | `/AZD-Templates/path/` | Must include base path and trailing slash |
| `week`        | `Week X`               | X is 0-5                                  |
| `tags`        | `["Word1", "Word2"]`   | Single words only (no spaces!)            |
| `description` | String                 | 100-150 characters, 1-2 sentences         |
| `lastUpdated` | ISO 8601               | `YYYY-MM-DDTHH:mm:ssZ`                    |

#### Adding a New Lesson

1. **Open `src/data/lessons.json`**

2. **Add your lesson object** (maintain order by week/lesson):

```json
{
  "title": "2.3 - Finding Templates",
  "link": "/AZD-Templates/02-azd-deep-dive/day-10-finding-templates/",
  "week": "Week 2",
  "tags": ["Templates", "Discovery"],
  "description": "Learn how to discover AZD templates through galleries, repositories, and community resources.",
  "lastUpdated": "2026-01-08T00:00:00Z"
}
```

3. **Save the file** - changes will hot-reload automatically

#### Updating Existing Lessons

Simply edit the relevant fields in `lessons.json`:

```json
{
  "title": "1.1 - Introduction to Microsoft Foundry",
  "description": "NEW DESCRIPTION HERE",
  "lastUpdated": "2026-01-09T00:00:00Z" // Update timestamp
}
```

#### Tag Guidelines

**✅ Good Tags** (single words):

- Quickstart
- Platform
- Services
- Architecture
- Deployment
- Exercises

**❌ Bad Tags** (multiple words):

- Getting Started
- AI Services
- Hands-on Exercises

**Tag Mapping Reference**:

```
"Getting Started" → "Quickstart"
"AI Services" → "Services"
"Use Case" → "Scenario"
"Azure Portal" → "Portal"
"AI Agents" → "Agents"
"Hands-on Exercises" → "Exercises"
```

### Lesson Content Files

#### File Location

Lessons are organized by week:

```
src/content/docs/
├── 00-introduction/index.md        # Lesson 0.1
├── 01-fundamentals/
│   ├── day-1-microsoft-foundry.md  # Lesson 1.1
│   ├── day-2-retail-ai-scenario.md # Lesson 1.2
│   └── ...
├── 02-azd-deep-dive/
│   ├── day-8-azd-workflow.md       # Lesson 2.1
│   └── ...
├── 03-deconstruction/
├── 04-experimentation/
└── 05-summary/index.md             # Lesson 5.1
```

#### Lesson Template

Every lesson file should follow this structure:

```markdown
---
title: Lesson Title (without day number)
description: One-sentence description
---

[Introduction paragraph explaining the lesson]

## What You'll Learn

- Learning objective 1
- Learning objective 2
- Learning objective 3
- Learning objective 4 (optional)

## Resources

1. 📘 [Resource Name](https://learn.microsoft.com/...) - Description
2. 📘 [Another MS Docs Resource](https://learn.microsoft.com/...) - Description
3. 🔗 [Additional Resource](https://...) - Description

## Section Title 1

[Content here]

## Section Title 2

[Content here]

### Subsection (if needed)

[Content here]

## Ask Copilot

1. "Question 1 about the topic?"
2. "Question 2 about implementation?"
3. "Question 3 about best practices?"

## Related Resources

- [Resource 1](https://...)
- [Resource 2](https://...)
- [Resource 3](https://...)

---

**Next**: [Next Lesson Title](/AZD-Templates/path/to/next/)
```

#### Creating a New Lesson File

1. **Navigate to the appropriate week folder**:

   ```bash
   cd src/content/docs/02-azd-deep-dive/
   ```

2. **Create new file**:

   ```bash
   touch day-10-finding-templates.md
   ```

3. **Add frontmatter and content** following the template above

4. **Update `lessons.json`** with metadata

5. **Update sidebar** (if needed) in `astro.config.mjs`

#### Important: No Duplicate H1 Headings

**❌ Don't do this**:

```markdown
---
title: My Lesson
---

# My Lesson <!-- DON'T duplicate the title -->
```

**✅ Do this**:

```markdown
---
title: My Lesson
---

Introduction paragraph starts here.

## First Section
```

The frontmatter `title` becomes the page's H1 automatically.

### Sidebar Configuration

To add/modify lessons in the left navigation sidebar:

**Edit `astro.config.mjs`**:

```javascript
sidebar: [
  { label: "🏠 Home", link: "/" },
  { label: "🎯 Introduction", link: "/00-introduction/" },
  {
    label: "📚 Week 1: Fundamentals",
    collapsed: false,
    items: [
      {
        label: "1.1: Microsoft Foundry",
        link: "/01-fundamentals/day-1-microsoft-foundry/",
      },
      {
        label: "1.2: Retail AI Scenario",
        link: "/01-fundamentals/day-2-retail-ai-scenario/",
      },
      // Add more lessons here
    ],
  },
  // Add more weeks
];
```

## Customization

### Homepage Modifications

**File**: `src/content/docs/index.mdx`

#### Update Hero Section

```markdown
---
title: Your Course Title
description: Your tagline
template: splash
hero:
  tagline: Your custom tagline here
  image:
    file: ../../assets/hero.svg
  actions:
    - text: Get Started
      link: /00-introduction/
      icon: right-arrow
      variant: primary
---
```

#### Update Course Overview Cards

```jsx
<CardGrid>
  <Card title="Week 0: Introduction" icon="information">
    Your custom description
  </Card>
  <Card title="Week 1: Fundamentals" icon="open-book">
    Your custom description
  </Card>
  // Add more cards
</CardGrid>
```

### Styling Customization

#### Week Badge Colors

**File**: `src/components/LessonCards.astro`

Find the week badge color section:

```css
.lesson-card[data-week="Week 1"] .week-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

Change gradient colors as needed:

```css
.lesson-card[data-week="Week 1"] .week-tag {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
  color: white; /* or #1a1a1a for dark text */
}
```

#### Custom CSS

**File**: `src/styles/custom.css` (create if doesn't exist)

```css
/* Your custom styles */
:root {
  --sl-color-accent: #your-color;
}
```

**Import in `astro.config.mjs`**:

```javascript
starlight({
  customCss: ["./src/styles/custom.css"],
  // ...
});
```

### Site Configuration

**File**: `astro.config.mjs`

#### Change Site URL

```javascript
export default defineConfig({
  site: "https://your-username.github.io",
  base: "/Your-Repo-Name",
  // ...
});
```

#### Update Social Links

```javascript
social: [
  {
    icon: "github",
    label: "GitHub",
    href: "https://github.com/your-username/your-repo",
  },
  {
    icon: "twitter",
    label: "Twitter",
    href: "https://twitter.com/your-handle",
  },
];
```

## Building and Testing

### Development Build

```bash
npm run dev
```

- Hot reload enabled
- Fast refresh on file changes
- Errors shown in terminal and browser

### Production Build

```bash
npm run build
```

- Output: `./dist/` directory
- Optimized assets
- Static HTML generation

### Preview Production Build

```bash
npm run build
npm run preview
```

Visit http://localhost:4321/AZD-Templates

### Validate Build

```bash
# Build should exit with code 0
npm run build
echo $?  # Should output: 0

# Check for broken links (example)
npm run build && npx broken-link-checker http://localhost:4321/AZD-Templates --recursive
```

## Deployment

### Automatic Deployment (GitHub Pages)

**Triggered on**: Push to `main` branch

**Workflow**: `.github/workflows/deploy.yml`

**Process**:

1. Commit your changes
2. Push to `main` branch
3. GitHub Actions automatically:
   - Installs dependencies
   - Builds the site
   - Deploys to GitHub Pages
4. Site updates in 2-5 minutes

**Check deployment**:

- Go to repository → Actions tab
- Click on latest workflow run
- Verify "Deploy to GitHub Pages" step succeeded

### Manual Deployment

If you need to deploy manually:

```bash
# Build the site
npm run build

# Deploy dist/ folder to your hosting provider
# (varies by provider)
```

### Configure GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Source: GitHub Actions
4. Wait for initial deployment

## Troubleshooting

### Common Issues

#### 1. Dev Server Not Accessible

**Problem**: Can't access http://localhost:4321/AZD-Templates

**Solutions**:

- Check if dev server is running
- Try http://127.0.0.1:4321/AZD-Templates
- Check port 4321 isn't blocked
- In DevContainer, verify port forwarding

#### 2. Links Not Working

**Problem**: Internal links return 404

**Solution**: Ensure all links include base path:

```markdown
❌ [Link](/lesson/)
✅ [Link](/AZD-Templates/lesson/)
```

#### 3. Lesson Not Appearing

**Checklist**:

- [ ] Added to `lessons.json`
- [ ] Created markdown file
- [ ] Added to sidebar in `astro.config.mjs` (if needed)
- [ ] Link path matches file location
- [ ] Restarted dev server

#### 4. Build Errors

```bash
# Clear cache and rebuild
rm -rf .astro node_modules dist
npm install
npm run build
```

#### 5. Styling Not Updating

**Solutions**:

- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Clear Astro cache: `rm -rf .astro`
- Restart dev server

### Getting Help

1. **Check documentation**:
   - [Astro Docs](https://docs.astro.build)
   - [Starlight Docs](https://starlight.astro.build)
   - [PRD.md](./PRD.md)
   - [AGENTS.md](./AGENTS.md)

2. **Search existing issues**:
   - [GitHub Issues](https://github.com/30DaysOf/AZD-Templates/issues)

3. **Ask for help**:
   - [GitHub Discussions](https://github.com/30DaysOf/AZD-Templates/discussions)
   - Open a new issue with details

## Best Practices

### Content Writing

- **Be concise**: Users skim content
- **Use headings**: Break up long sections
- **Include examples**: Code snippets and screenshots
- **Link to docs**: Provide Microsoft Learn references
- **Update timestamps**: Keep `lastUpdated` current

### File Organization

- **Consistent naming**: Use kebab-case for files
- **Logical folders**: Group by week
- **Clear titles**: Make lesson purpose obvious

### Version Control

- **Commit often**: Small, focused commits
- **Write clear messages**: Describe what changed
- **Test before pushing**: Build locally first

### Performance

- **Optimize images**: Use appropriate formats and sizes
- **Minimize dependencies**: Only add what's needed
- **Test build time**: Should be under 30 seconds

## Advanced Topics

### Custom Components

Create reusable components in `src/components/`:

```astro
---
// MyComponent.astro
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<div class="custom-component">
  <h3>{title}</h3>
  <slot />
</div>

<style>
  .custom-component {
    border: 1px solid var(--sl-color-gray-5);
    padding: 1rem;
  }
</style>
```

Use in content:

```mdx
import MyComponent from "../../components/MyComponent.astro";

<MyComponent title="Example">Content here</MyComponent>
```

### Content Collections API

Programmatically access lessons:

```typescript
import { getCollection } from "astro:content";

const lessons = await getCollection("docs");
const weekOneLessons = lessons.filter((lesson) =>
  lesson.slug.startsWith("01-fundamentals/")
);
```

### Bulk Updates

Update all `lastUpdated` timestamps:

```javascript
const fs = require("fs");
const lessons = require("./src/data/lessons.json");

const now = new Date().toISOString();
lessons.forEach((lesson) => {
  lesson.lastUpdated = now;
});

fs.writeFileSync("./src/data/lessons.json", JSON.stringify(lessons, null, 2));
```

## Checklist: Publishing New Content

- [ ] Update `lessons.json` with new lesson metadata
- [ ] Create markdown file with complete content
- [ ] Follow lesson template structure
- [ ] Include minimum 2 Microsoft Docs references
- [ ] Use single-word tags only
- [ ] Update sidebar in `astro.config.mjs` (if needed)
- [ ] Test locally with `npm run dev`
- [ ] Build successfully with `npm run build`
- [ ] Commit changes with clear message
- [ ] Push to `main` branch
- [ ] Verify deployment in Actions tab
- [ ] Check live site for updates

---

**Need Help?** Check [AGENTS.md](./AGENTS.md) for technical details or [README.md](./README.md) for overview.

**Last Updated**: January 8, 2026
