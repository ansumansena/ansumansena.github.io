import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * GitHub Pages has no rewrite rules. It serves 404.html for any path it cannot
 * find, so copying index.html to 404.html lets the SPA boot and hand the route
 * to React Router. .nojekyll stops Jekyll from eating files that start with _.
 */
const dist = 'dist';

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html not found - run the build first.');
  process.exit(1);
}

copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
writeFileSync(join(dist, '.nojekyll'), '');
console.log('GitHub Pages: wrote dist/404.html and dist/.nojekyll');
