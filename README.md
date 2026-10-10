# taguemout.com

Personal portfolio of Massil Taguemout, built with [Astro](https://astro.build), a scroll-driven printed-circuit animation (Canvas 2D), [GSAP](https://gsap.com) and [Lenis](https://lenis.darkroom.engineering).

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check, then build into docs/ (not committed)
npm run preview  # serve the build locally
```

Requires Node 20.19+ (Astro 5).

## Content

All text lives in `src/i18n/`: `en.ts` (default, served at `/`) and `fr.ts` (served at `/fr/`), both typed by `types.ts`. Set `disabled: true` on a project to hide it.

## Settings

`src/settings.ts` holds the site switches, applied on the next build:

- `disabled`: when `true`, the whole site is replaced by a single page showing only the glowing "MT" chip (click to email), hidden from search engines. No portfolio content is built or published.
- `sound`: show or hide the ambient sound toggle.
- `defaultLanguage`: language served at `/` (`'en'` or `'fr'`); the other one is served at `/fr/` or `/en/`.

`npm run build` ends with `scripts/prune-assets.mjs`, which deletes any built asset no page references.

## Deployment

Every push to `develop` is built and deployed to GitHub Pages by `.github/workflows/build.yml` (pull requests are only built). The build output in `docs/` is not committed. The custom domain is set in the repository's Pages settings.
