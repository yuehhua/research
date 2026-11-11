// @ts-check
import { defineConfig } from 'astro/config';

// ISB Lab — deployed to GitHub Pages at https://yuehhua.github.io/lab/
export default defineConfig({
  site: 'https://yuehhua.github.io',
  base: '/lab',
  trailingSlash: 'ignore',
  // Lesson pages moved to the courses site (yuehhua/course repo) on 2026-11-11;
  // keep old /lab/lessons/* links alive.
  redirects: Object.fromEntries(
    ['discrete-math', 'data-structures-algorithms', 'bioinformatics'].flatMap((slug) => [
      [`/lessons/${slug}`, `https://yuehhua.github.io/course/lessons/${slug}/`],
      [`/en/lessons/${slug}`, `https://yuehhua.github.io/course/en/lessons/${slug}/`],
    ])
  ),
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
