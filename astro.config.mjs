import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://30daysof.github.io',
	base: '/AZD-Templates',
	integrations: [
		starlight({
			title: 'AZD Templates',
			description: 'Jumpstart your AI Solution Development with AI App Templates',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/30DaysOf/AZD-Templates',
				},
			],
			sidebar: [
				{
					label: '1. App Scenario',
					autogenerate: { directory: '1-app-scenario' },
				},
				{
					label: '2. Infra Setup',
					autogenerate: { directory: '2-infra-setup' },
				},
				{
					label: '3. Solution Templates',
					autogenerate: { directory: '3-solution-templates' },
				},
				{
					label: '4. Experimentation Sandbox',
					autogenerate: { directory: '4-experimentation-sandbox' },
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
	],
});
