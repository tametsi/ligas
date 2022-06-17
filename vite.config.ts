/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { version } from './package.json';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@lib': path.resolve(__dirname, './src/lib'),
			'@stores': path.resolve(__dirname, './src/stores'),
		},
	},
	plugins: [svelte()],
	base: './',
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
	test: {
		globals: true,
	},
});
