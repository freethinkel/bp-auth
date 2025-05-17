/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve('./src/lib')
		}
	},
	test: {
		globals: true,
		setupFiles: ['./tests/setup.ts']
	}
});
