/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"blue-xyn": "#67c6d4",
				"bg-xyn": "#313131",
				"gray-xyn": "#b8b2ad"
			},
		},
	},
	plugins: [],
}
