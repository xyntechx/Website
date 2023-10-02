/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                "primary-black": "#313131",
                "secondary-black": "#444444",
                "dim-black": "#8A8A8A",
                "primary-blue": "#33C2FF",
            },
        },
    },
    plugins: [],
};
