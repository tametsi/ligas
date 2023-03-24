/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				dark: {
					...require('daisyui/src/colors/themes')[
						'[data-theme=dark]'
					],
					primary: '#1ca8b6',
				},
				light: {
					...require('daisyui/src/colors/themes')[
						'[data-theme=garden]'
					],
					primary: '#1ca8b6',
				},
				night: {
					...require('daisyui/src/colors/themes')[
						'[data-theme=night]'
					],
					primary: '#1ca8b6',
				},
			},
		],
	},
};
