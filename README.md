# taguemout.com

Personal portfolio of Massil Taguemout, built with [Astro](https://astro.build), a scroll-driven printed-circuit animation (Canvas 2D), [GSAP](https://gsap.com) and [Lenis](https://lenis.darkroom.engineering).

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check, then build into docs/
npm run preview  # serve the build locally
```

Requires Node 20.19+ (Astro 5).

## Content

All text lives in `src/i18n/`: `en.ts` (default, served at `/`) and `fr.ts` (served at `/fr/`), both typed by `types.ts`. Set `disabled: true` on a project to hide it.

## Deployment

GitHub Pages serves the committed `docs/` folder. `npm run build` writes there, and `public/CNAME` and `public/.nojekyll` are copied along so the custom domain and the `_astro/` assets keep working.
