import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function CreateMDMetaJson() {
	const files = await fs.promises.readdir('./static/md');

	let meta = [];
	for (const file of files) {
		if (file === "meta.json") {
			continue;
		}

		meta.push(file);
	}

	fs.writeFile(path.join(__dirname, 'static/md/meta.json'), JSON.stringify(meta), (err) => {
		if (err) throw err;
		console.log('meta.json created');
	});
}

await CreateMDMetaJson();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			precompress: true,
		}),
		prerender: {
			default: true
		}
	}
};

export default config;
