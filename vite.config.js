import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	esbuild: {
		loader: 'jsx',
		jsxFactory: 'h',
		jsxFragment: 'Fragment'
	  },
	define: {
		global: 'window'
	},
	plugins: [react()],
	css: {
		modules: true
	  },
	resolve: {
		alias: {
		  react: path.resolve('./node_modules/react')
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css']
	  },
	  build: {
		outDir: './build',
		rollupOptions: {
		  output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
		  }
		},
		commonjsOptions: { transformMixedEsModules: true },
		chunkSizeWarningLimit: 500
	  }
});
