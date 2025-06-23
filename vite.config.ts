import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/rpc': {
        target: 'https://eth.llamarpc.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rpc/, ''),
      },
      '/subgraphs': {
        target: 'https://api.thegraph.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/subgraphs/, '')
      },
    },
  },
});
