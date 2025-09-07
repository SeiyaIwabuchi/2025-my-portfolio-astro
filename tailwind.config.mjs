/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'japanese': ['Noto Sans JP', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', 'sans-serif'],
			},
			animation: {
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse 2s infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				}
			}
		},
	},
	plugins: [],
}
