import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				folder: resolve(__dirname, 'folder.html'),
				bookmark: resolve(__dirname, 'bookmark.html'),
				form: resolve(__dirname, 'form.html'),
				deleted: resolve(__dirname, 'deleted.html'),
			},
		},
	},
});
