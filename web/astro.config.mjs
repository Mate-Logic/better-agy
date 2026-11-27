// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://better-agy.mate-logic.tech',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  // The site reads ../plugins at build time.
  vite: { server: { fs: { allow: ['..'] } } },
});
