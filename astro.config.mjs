// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番URL。Netlify の環境変数 SITE_URL で上書きできます（例: https://www.tryshome.co.jp）
const site = process.env.SITE_URL || 'https://www.tryshome.co.jp';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: {
    // microCMS の画像は imgix 経由で配信されるため、そのままリモート最適化を許可
    domains: ['images.microcms-assets.io'],
  },
  devToolbar: { enabled: false },
});
