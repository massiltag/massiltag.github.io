import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://taguemout.com',
  // GitHub Pages publishes the committed docs/ folder
  outDir: './docs',
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
