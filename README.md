# TRYS HOME 公式サイト（リニューアル）

東京都町田市のリフォーム会社 **TRYS HOME（株式会社TRYS）** の公式サイト。
Astro（静的生成）+ TypeScript + microCMS。GitHub → Netlify で公開する構成です。

## 構成

| 項目 | 内容 |
| --- | --- |
| フレームワーク | [Astro](https://astro.build) 5（`output: 'static'`、ビルド時にHTMLを生成） |
| 言語 | TypeScript（`astro check` で型検査） |
| CMS | microCMS（`news` / `works` の2 API。ビルド時に取得） |
| ホスティング | Netlify（`netlify.toml`） |
| フォーム | Netlify Forms（`/contact/`） |
| 依存ライブラリ | `astro` `@astrojs/sitemap` `sharp`（画像最適化）のみ |

## セットアップ

```bash
npm install
cp .env.example .env   # microCMS のキーを入れる（無くてもサンプルデータで動きます）
npm run dev            # http://localhost:4321
npm run build          # 型検査 + 本番ビルド（dist/）
npm run preview        # dist/ をローカル確認
```

`.env` が無い／キーが空の場合はサンプルデータ（`src/data/sample-*.json`）でビルドされ、
記事タイトルに【サンプル】と付いたダミーデータが表示されます。
Netlify の production コンテキストではキー未設定だとビルドが失敗します（`ALLOW_SAMPLE_DATA=true` で明示的に許可した場合を除く）。

## ディレクトリ

```
src/
  pages/            ルーティング（トップ / reform / works / news / about / company / contact / privacy / 404）
  layouts/          BaseLayout（head・OGP・構造化データ・ヘッダー/フッター）
  components/       Header, Footer, MobileBar, Loader(初回演出), Sugitora, WorkCard, BeforeAfter ほか
  data/             site.ts（会社情報）, reform.ts（リフォーム分類）, content.ts（特長/流れ/FAQ）, sample-*.json
  lib/microcms.ts   microCMS クライアント（取得失敗時はビルドを止める）
  assets/           ロゴ・スギトラ・施工写真（astro:assets で最適化）
  styles/global.css デザイントークン・共通スタイル
public/             favicon, ogp.png, robots.txt, loader/（演出用の軽量画像）, sample/（サンプルデータ用画像）
docs/               公開手順・microCMS 定義・更新マニュアル・確認事項
```

## ドキュメント

- [docs/DEPLOY.md](docs/DEPLOY.md) — GitHub → Netlify 公開手順、Netlify Forms の有効化
- [docs/MICROCMS.md](docs/MICROCMS.md) — API・フィールド定義、Webhook（自動再ビルド）設定
- [docs/MANUAL.md](docs/MANUAL.md) — お知らせ・施工実績の更新マニュアル
- [docs/CHECKLIST.md](docs/CHECKLIST.md) — 未設定項目と公開前の確認事項
- [docs/DESIGN.md](docs/DESIGN.md) — 参考サイトの分析と反映方針、素材の扱い
