import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {generateMDMeta} from "./markdown-meta.js";

export default defineConfig({
	plugins: [
		{
			name: 'build-script',
			buildStart(options) {
				generateMDMeta();
			}
		},
		sveltekit()
	]
});
