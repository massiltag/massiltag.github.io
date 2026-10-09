import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://taguemout.com',
  // GitHub Pages publishes the committed docs/ folder
  outDir: './docs',
  devToolbar: { enabled: false },
});
