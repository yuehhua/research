// @ts-check
import { defineConfig } from 'astro/config';

// ISB Lab — deployed to GitHub Pages at https://yuehhua.github.io/research/
export default defineConfig({
  site: 'https://yuehhua.github.io',
  base: '/lab',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
