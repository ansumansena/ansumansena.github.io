import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Deploy base path.
 *
 * The site is deployed to the GitHub *user site* repo `ansumansena.github.io`,
 * which serves from the domain root - so base stays '/' and the default
 * `npm run build:pages` is correct.
 *
 * REPO_BASE and `npm run build:pages:subpath` exist only for the project-repo
 * case, where the site would live at ansumansena.github.io/<repo>/.
 */
const REPO_BASE = '/dev-identity/'; // unused while deploying to the user site

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
