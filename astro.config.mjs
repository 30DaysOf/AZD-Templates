import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://30daysof.github.io",
  base: "/AZD-Templates",
  integrations: [
    starlight({
      title: "30DaysOfAZD",
      description:
        "A month-long journey from fundamentals to production-ready AI solutions with Azure Developer CLI",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/30DaysOf/AZD-Templates",
        },
      ],
      sidebar: [
        {
          label: "🏠 Home",
          link: "/",
        },
        {
          label: "🎯 Introduction",
          link: "/00-introduction/",
        },
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
            {
              label: "1.3: App Development Lifecycle",
              link: "/01-fundamentals/day-3-app-lifecycle/",
            },
            {
              label: "1.4: AI App Architecture",
              link: "/01-fundamentals/day-4-ai-architecture/",
            },
            {
              label: "1.5: Manual Provisioning",
              link: "/01-fundamentals/day-5-manual-provisioning/",
            },
            {
              label: "1.6: ARM Templates",
              link: "/01-fundamentals/day-6-arm-templates/",
            },
            {
              label: "1.7: AZD Templates Intro",
              link: "/01-fundamentals/day-7-azd-templates/",
            },
          ],
        },
        {
          label: "🔧 Week 2: AZD Deep Dive",
          collapsed: true,
          items: [
            {
              label: "2.1: AZD Workflow",
              link: "/02-azd-deep-dive/day-8-azd-workflow/",
            },
            {
              label: "2.2: Installation & Commands",
              link: "/02-azd-deep-dive/day-9-installation/",
            },
            {
              label: "2.3: Finding Templates",
              link: "/02-azd-deep-dive/day-10-finding-templates/",
            },
            {
              label: "2.4: Creating Templates",
              link: "/02-azd-deep-dive/day-11-creating-templates/",
            },
            {
              label: "2.5: Deploying Templates",
              link: "/02-azd-deep-dive/day-12-deploying/",
            },
            {
              label: "2.6: Deconstructing Templates",
              link: "/02-azd-deep-dive/day-13-deconstructing/",
            },
            {
              label: "2.7: AZD Extensions",
              link: "/02-azd-deep-dive/day-14-extensions/",
            },
          ],
        },
        {
          label: "🔍 Week 3: Deconstruction",
          collapsed: true,
          items: [
            {
              label: "3.1: AI Agents Template",
              link: "/03-deconstruction/day-15-ai-agents-intro/",
            },
            {
              label: "3.2: Deploy & Explore",
              link: "/03-deconstruction/day-16-deploy-explore/",
            },
            {
              label: "3.3: Repository Structure",
              link: "/03-deconstruction/day-17-repository-structure/",
            },
            {
              label: "3.4: Search & Models",
              link: "/03-deconstruction/day-18-search-models/",
            },
            {
              label: "3.5: Tracing & Application",
              link: "/03-deconstruction/day-19-tracing-application/",
            },
            {
              label: "3.6: Agent Evaluations",
              link: "/03-deconstruction/day-20-evaluations/",
            },
            {
              label: "3.7: Agent Extensions",
              link: "/03-deconstruction/day-21-agent-extensions/",
            },
          ],
        },
        {
          label: "🧪 Week 4: Experimentation",
          collapsed: true,
          items: [
            {
              label: "4.1: Modify Template",
              link: "/04-experimentation/day-22-modify-template/",
            },
            {
              label: "4.2: Deploy Solution",
              link: "/04-experimentation/day-23-deploy-solution/",
            },
            {
              label: "4.3: Model Creation",
              link: "/04-experimentation/day-24-model-creation/",
            },
            {
              label: "4.4: Agent Creation",
              link: "/04-experimentation/day-25-agent-creation/",
            },
            {
              label: "4.5: Idea to Prototype",
              link: "/04-experimentation/day-26-idea-to-prototype/",
            },
            {
              label: "4.6: Prototype to Production",
              link: "/04-experimentation/day-27-prototype-to-production/",
            },
            {
              label: "4.7: Production to Adoption",
              link: "/04-experimentation/day-28-production-to-adoption/",
            },
          ],
        },
        {
          label: "🎯 Summary",
          items: [{ label: "Course Recap", link: "/05-summary/" }],
        },
      ],
    }),
  ],
});
