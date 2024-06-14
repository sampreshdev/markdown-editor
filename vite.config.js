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
		  '@ant-design/icons/lib/dist$': path.resolve(__dirname, './icons.js'),
		  react: path.resolve('./node_modules/react')
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css']
	  },
	  server: {
		open: true,
		port: 8080,
		proxy: {
		  '/api': {
				target: 'https://app.dev.antrika.com',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
		  }
		}
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
