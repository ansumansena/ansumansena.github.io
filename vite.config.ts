import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Deploy base path.
 *
 * Serving from a domain root - a custom domain, Netlify, Vercel, or a GitHub
 * user site repo named `ansumansena.github.io` - needs no change: base is '/'.
 *
 * Only if you deploy to a GitHub *project* repo (e.g. github.com/ansumansena/portfolio,
 * served at ansumansena.github.io/portfolio/) set REPO_BASE to '/portfolio/' and
 * build with `npm run build:ghpages`.
 */
const REPO_BASE = '/dev-identity/';

export default defineConfig(({ mode }) => ({
  base: mode === 'ghpages' ? REPO_BASE : '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));
