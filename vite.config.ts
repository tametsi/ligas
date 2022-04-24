/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	base: './',
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
	test: {
		globals: true,
	},
});
