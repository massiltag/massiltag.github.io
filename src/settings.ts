import type { Lang } from './i18n/types';

/**
 * Site switches. Changes apply on the next `npm run build` (then commit and push docs/).
 */
export const settings = {
  /**
   * true: the site is replaced by a single page with only the glowing "MT" chip (click = email),
   * hidden from search engines. None of the portfolio content is built or published.
   */
  disabled: false,

  /** Show the ambient sound toggle in the header. */
  sound: false,

  /** Language served at "/"; the other one is served at /fr/ or /en/. */
  defaultLanguage: 'en' as Lang,
};
