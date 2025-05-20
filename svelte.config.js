import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'@': './src/lib/'
		},
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	}
};

export default config;
