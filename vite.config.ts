/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';
import * as manifest from './src/manifest.json';
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
	server: {
		port: 3000,
	},
	plugins: [
		svelte(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true,
			},
			manifest: manifest,
		}),
	],
	base: './',
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
	test: {
		globals: true,
	},
});
