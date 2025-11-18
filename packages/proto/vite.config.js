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
				folder_form: resolve(__dirname, 'folder-form.html'),
				bookmark_form: resolve(__dirname, 'bookmark-form.html'),
				deleted: resolve(__dirname, 'deleted.html'),
				login: resolve(__dirname, 'login.html'),
				register: resolve(__dirname, 'register.html'),
			},
		},
	},
	server: {
		proxy: {
			'/api': 'http://localhost:3000',
			'/auth': 'http://localhost:3000',
		},
	},
});
