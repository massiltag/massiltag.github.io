import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://taguemout.com',
  // built by GitHub Actions and deployed to Pages, see .github/workflows/build.yml
  outDir: './docs',
  devToolbar: { enabled: false },
});
