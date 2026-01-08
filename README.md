# 30 Days of AZD Templates

A comprehensive 30-day learning journey teaching Azure Developer CLI (AZD) templates from fundamentals to production-ready AI solutions.

🌐 **Live Site**: [https://30daysof.github.io/AZD-Templates](https://30daysof.github.io/AZD-Templates)

## 📚 What You'll Learn

This hands-on curriculum takes you from AI application fundamentals to building production-ready solutions with Azure Developer CLI:

| Week  | Title           | Description                                                     |
| ----- | --------------- | --------------------------------------------------------------- |
| **0** | Introduction    | Course overview and prerequisites                               |
| **1** | Fundamentals    | Microsoft Foundry, AI architecture, and provisioning approaches |
| **2** | AZD Deep Dive   | Installation, commands, templates, and workflows                |
| **3** | Deconstruction  | Analyze real AI Agents templates                                |
| **4** | Experimentation | Build from prototypes to production                             |
| **5** | Summary         | Recap and next steps                                            |

**Total**: 30 lessons across 6 weeks

## ✨ Features

### Interactive Learning Experience

- **Search & Filter**: Find lessons by keywords, week, or topic
- **Smart Sorting**: Order by lesson sequence or recently updated
- **Progress Tracking**: Week-based organization with color-coded badges
- **Rich Content**: Each lesson includes objectives, resources, and hands-on exercises

### Modern Tech Stack

- Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
- Deployed via GitHub Actions to GitHub Pages
- DevContainer support for consistent development environment
- Responsive design for mobile and desktop

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or later
- npm (comes with Node.js)
- Git

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/30DaysOf/AZD-Templates.git
   cd AZD-Templates
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321/AZD-Templates`

### Using DevContainer

If you're using VS Code with the Remote-Containers extension:

1. Open the repository in VS Code
2. Click "Reopen in Container" when prompted
3. Wait for the container to build
4. Run `npm run dev` in the integrated terminal

## 📖 Documentation

Core project documentation is located in the `setup/` directory:

- **[PRD.md](./setup/PRD.md)** - Complete product requirements and technical specifications
- **[SETUP.md](./setup/SETUP.md)** - Guide for content authors to customize and rebuild
- **[AGENTS.md](./setup/AGENTS.md)** - Technical documentation for AI agents and automation
- **[PRE-COMMIT-CHECKLIST.md](./setup/PRE-COMMIT-CHECKLIST.md)** - Pre-commit verification checklist

> **Note**: These files provide comprehensive guidance for different audiences and use cases. Refer to them when refreshing content, re-evaluating changes, or onboarding new contributors.

## 🛠️ Available Commands

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Start local dev server at localhost:4321 |
| `npm run build`   | Build production site to `./dist/`       |
| `npm run preview` | Preview production build locally         |
| `npm run astro`   | Run Astro CLI commands                   |

## 📝 Content Structure

```
src/
├── components/
│   └── LessonCards.astro      # Interactive lesson browser
├── data/
│   └── lessons.json            # Centralized lesson metadata
├── content/
│   └── docs/
│       ├── index.mdx           # Homepage
│       ├── 00-introduction/    # Week 0
│       ├── 01-fundamentals/    # Week 1 (7 lessons)
│       ├── 02-azd-deep-dive/   # Week 2 (7 lessons)
│       ├── 03-deconstruction/  # Week 3 (7 lessons)
│       ├── 04-experimentation/ # Week 4 (7 lessons)
│       └── 05-summary/         # Week 5
```

## 🎨 Customization

### Updating Lesson Content

All lesson metadata is centralized in `src/data/lessons.json`. Each lesson entry includes:

```json
{
  "title": "X.Y - Lesson Title",
  "link": "/AZD-Templates/path/to/lesson/",
  "week": "Week X",
  "tags": ["Tag1", "Tag2"],
  "description": "Brief description of the lesson.",
  "lastUpdated": "2026-01-08T00:00:00Z"
}
```

See [SETUP.md](./SETUP.md) for detailed customization instructions.

## 🚢 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch:

1. GitHub Actions workflow builds the site
2. Artifacts are uploaded
3. Site is deployed to `https://30daysof.github.io/AZD-Templates`

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Issues**: Found a bug or typo? [Open an issue](https://github.com/30DaysOf/AZD-Templates/issues)
2. **Suggest Content**: Ideas for new lessons or improvements
3. **Submit PRs**: Fix bugs, improve documentation, or add content

### Content Guidelines

- Follow the lesson template structure
- Include minimum 2 Microsoft Docs references in Resources section
- Use single-word tags for consistency
- Update `lastUpdated` timestamp in lessons.json

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build)
- Content focused on [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/)
- Part of the [#30DaysOf](https://github.com/30DaysOf) learning series

## 📞 Support

- **Documentation**: Check [SETUP.md](./SETUP.md) for detailed guides
- **Issues**: [GitHub Issues](https://github.com/30DaysOf/AZD-Templates/issues)
- **Discussions**: [GitHub Discussions](https://github.com/30DaysOf/AZD-Templates/discussions)

---

**Happy Learning! 🎓** Start your journey at [30daysof.github.io/AZD-Templates](https://30daysof.github.io/AZD-Templates)
