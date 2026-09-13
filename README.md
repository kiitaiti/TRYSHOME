# TRYS MOTORS 公式サイト

町田の中古車販売・買取「TRYS MOTORS」のホームページ。
**Astro（静的生成）+ microCMS（ブログ・売買実績）+ Netlify（ホスティング・フォーム）** で構成しています。

- 設計・参考サイト分析: [docs/DESIGN.md](docs/DESIGN.md)
- 掲載情報の取得元: [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md)
- 公開前チェックリスト: [docs/PRELAUNCH_CHECKLIST.md](docs/PRELAUNCH_CHECKLIST.md)
- 実施した検証・未検証事項: [docs/VERIFICATION.md](docs/VERIFICATION.md)

---

## 1. 構成

| 項目 | 内容 |
| --- | --- |
| フレームワーク | Astro 5 + TypeScript（`output: 'static'`、URL は末尾スラッシュ固定） |
| CMS | microCMS（`blogs` / `works` の 2 API） |
| ホスティング | Netlify（GitHub 連携で自動ビルド、Netlify Forms でお問い合わせ受信） |
| 画像 | `src-images/` の元画像を `npm run images` で最適化 → `public/images/`（WebP + フォールバック） |
| フォント | Google Fonts（Noto Sans JP / Poppins） |

```
src/
  config/site.ts        店名・住所・電話・リンクなどサイト全体の設定（本番ドメインは PUBLIC_SITE_URL で上書き）
  data/content.ts       サービス・流れ・FAQ などの固定文言
  data/images.json      最適化画像のマニフェスト（自動生成）
  lib/microcms.ts       microCMS クライアント（ビルド時のみ／全件分割取得／デモモード）
  lib/demo-data.ts      DEMO_MODE 用のサンプルデータ
  layouts/Base.astro    共通レイアウト（meta / OGP / JSON-LD / ヘッダー / フッター / モバイル固定バー）
  components/           共通コンポーネント
  pages/                各ページ（下記 URL 構成）
  styles/global.css     デザイントークン（色・余白・タイポ）と共通スタイル
public/
  _redirects            旧URL → 新URL の 301 リダイレクト
  images/               最適化済み画像
  robots.txt / favicon.svg / apple-touch-icon.png
scripts/optimize-images.mjs  画像最適化スクリプト
netlify.toml            Netlify のビルド設定・セキュリティヘッダー
```

### URL 構成

| URL | 内容 |
| --- | --- |
| `/` | トップ |
| `/about/` | TRYS MOTORS について（旧 `/concept/`） |
| `/service/` | サービス |
| `/works/`, `/works/page/2/` | 売買実績一覧（12件ごとにページ分割） |
| `/works/category/sale/` ほか | 区分での絞り込み（販売 / 買取 / バイク） |
| `/works/[id]/` | 売買実績詳細 |
| `/blog/`, `/blog/page/2/`, `/blog/category/[slug]/`, `/blog/[id]/` | ブログ |
| `/faq/` | よくある質問 |
| `/access/` | 事業者情報・アクセス |
| `/contact/` → `/thanks/` | お問い合わせ → 送信完了 |
| `/privacy/` | プライバシーポリシー（旧 `/privacy_policy/`） |
| `/404.html` | 404（Netlify が自動で使用） |

在庫車一覧はサイト内に持たず、正式な掲載先（カーセンサー店舗ページ）へ外部リンクしています。

---

## 2. ローカルでの動かし方

```bash
npm install
cp .env.example .env      # 値を編集
npm run dev               # http://localhost:4321
npm run build             # dist/ に静的ファイルを生成
npm run preview           # ビルド結果の確認
npm run check             # 型チェック
npm run images            # src-images/ を差し替えたときに再実行
```

### 環境変数（`.env`）

| 変数 | 必須 | 説明 |
| --- | --- | --- |
| `MICROCMS_SERVICE_DOMAIN` | 本番で必須 | `https://<この値>.microcms.io` のサービスID |
| `MICROCMS_API_KEY` | 本番で必須 | microCMS の API キー（**GET 権限のみ**で発行）。ビルド時にサーバー側でだけ使い、ブラウザには出ません |
| `DEMO_MODE` | 任意 | `true` でサンプル記事を表示（CMS 未接続のレイアウト確認用）。本番ビルドでは原則拒否されますが、**サイトURLが `*.netlify.app` のみ（独自ドメイン未接続）の仮公開中だけ許可**され、画面下に「仮公開中」バナーが出ます。独自ドメインを接続する前に必ず削除してください |
| `PUBLIC_SITE_URL` | 任意 | 本番ドメイン（既定 `https://trysmotors.jp`）。canonical / OGP / sitemap に使用 |
| `PUBLIC_GA_ID` | 任意 | GA4 測定ID。未設定なら計測タグを出力しません |

> `.env` は Git に含めません（`.gitignore` 済み）。`PUBLIC_` を付けた変数はブラウザにも渡るため、API キーには絶対に付けないでください。

### CMS 接続に失敗した場合の挙動

本番ビルドで認証・通信に失敗した場合、架空の記事へ置き換えることはせず **ビルドを失敗させます**（前回の公開状態が維持されます）。Netlify のデプロイログにエラー理由（HTTP ステータス等）が出ます。

---

## 3. microCMS の設定

サービスを作成し、以下 2 つの API（**リスト形式**）を作成してください。フィールドID は厳密に一致させる必要があります。

### API 1: ブログ　エンドポイント `blogs`

| 表示名 | フィールドID | 種類 | 必須 | 備考 |
| --- | --- | --- | --- | --- |
| タイトル | `title` | テキストフィールド | 必須 | |
| アイキャッチ | `eyecatch` | 画像 | 任意 | 推奨 1600×1200px 前後（4:3）。未設定でも表示できます |
| カテゴリー | `category` | セレクトフィールド | 任意 | 選択肢: `お知らせ` / `納車・ご成約` / `お役立ち情報` / `日常`（複数選択オフ） |
| 概要 | `excerpt` | テキストエリア | 任意 | 一覧・OGP 用の 60〜110 文字程度。未入力なら本文から自動生成 |
| 本文 | `body` | リッチエディタ | 必須 | 見出し・リスト・リンク・画像・引用・表に対応 |

公開日は microCMS 標準の `publishedAt` を使用します（並び順も `publishedAt` 降順）。

### API 2: 売買実績　エンドポイント `works`

| 表示名 | フィールドID | 種類 | 必須 | 備考 |
| --- | --- | --- | --- | --- |
| タイトル | `title` | テキストフィールド | 必須 | 例）「ダイハツ タント ご成約」 |
| 一覧用画像 | `eyecatch` | 画像 | 任意 | |
| ギャラリー | `gallery` | 複数画像 | 任意 | 詳細ページの「写真」に表示 |
| 区分 | `category` | セレクトフィールド | 任意 | 選択肢: `販売` / `買取` / `バイク`（複数選択オフ） |
| メーカー | `maker` | テキストフィールド | 任意 | |
| 車種 | `model` | テキストフィールド | 任意 | |
| 年式 | `year` | テキストフィールド | 任意 | 例）「H24年式」「2015年式」 |
| 概要 | `excerpt` | テキストエリア | 任意 | |
| 本文 | `body` | リッチエディタ | 必須 | |

- カテゴリーの選択肢を増減する場合は `src/config/site.ts` の `blogCategories` / `workCategories` も合わせて更新してください（一致しない選択肢は URL にそのままエンコードされて動作はします）。
- 価格などの追加項目は、運用方法が決まってから追加してください（現状は設けていません）。
- **API キー**: 「API キー」画面で **GET のみ許可** したキーを作成し、Netlify の環境変数に設定します。

### Webhook（更新時の自動再ビルド）

1. Netlify: Site configuration → Build & deploy → Build hooks → **Add build hook**（名前例: `microcms`）。生成された URL を控えます。
2. microCMS: 各 API（`blogs` と `works` の両方）→ API 設定 → Webhook → **カスタム通知** → URL に 1 の Build hook URL を貼り付け。
3. 通知タイミングは **「コンテンツの公開・更新」「コンテンツの公開終了」「コンテンツの削除」** をすべてオンにします。
4. Build hook URL は秘密情報です。Git やドキュメントに貼らないでください。

> CMS で公開しても、**Netlify の再ビルドが完了するまで（通常 1〜3 分）サイトには反映されません**。Netlify の Deploys 画面で「Published」になったら反映されています。

---

## 4. GitHub → Netlify の公開手順

1. **GitHub にリポジトリを作成**し、このフォルダを push します。
   ```bash
   git init && git add -A && git commit -m "Initial site"
   git remote add origin git@github.com:<org>/<repo>.git
   git push -u origin main
   ```
2. **Netlify** → Add new site → Import an existing project → GitHub のリポジトリを選択。
   - Build command: `npm run build` ／ Publish directory: `dist`（`netlify.toml` に記載済みなので自動で入ります）
3. **環境変数**（Site configuration → Environment variables）に以下を追加。
   - `MICROCMS_SERVICE_DOMAIN`、`MICROCMS_API_KEY`（Scopes は Builds のみで可）
   - `PUBLIC_SITE_URL`（本番ドメイン。例 `https://trysmotors.jp`）
   - 必要に応じて `PUBLIC_GA_ID`
   - `DEMO_MODE` は **設定しない**
4. Deploy を実行し、`https://<site>.netlify.app` で表示を確認。
5. **フォームの有効化**（重要）: Netlify → Forms → 「Enable form detection」をオン → 再デプロイ。`contact` というフォームが検出されていることを確認し、Forms → Form notifications で **受信通知メールの宛先** を設定します。
6. **独自ドメイン**: Domain management で `trysmotors.jp` を追加し、現在の DNS を Netlify の案内どおりに変更（HTTPS は自動発行）。
7. 公開後、[docs/PRELAUNCH_CHECKLIST.md](docs/PRELAUNCH_CHECKLIST.md) の項目をすべて確認します。

以降は `main` ブランチへ push すると自動でビルド・公開されます。Pull Request ごとに Deploy Preview も作成されます（プレビューは `noindex` にはなりませんが、Netlify 側で検索エンジンから除外されます）。

---

## 5. 日々の更新手順

### ブログ記事を公開する
1. microCMS → ブログ → 「追加」。タイトル・本文（必要ならアイキャッチ・カテゴリー・概要）を入力。
2. 「公開」を押す → Webhook で Netlify が再ビルド → 数分後にサイトに反映。
3. トップの「最新情報」には新しい順に 3 件、`/blog/` には全件（12 件ごとにページ分割）が表示されます。

### 売買実績を公開する
1. microCMS → 売買実績 → 「追加」。タイトル・区分（販売/買取/バイク）・一覧用画像・本文を入力。メーカー・車種・年式は任意。
2. 「公開」→ 再ビルド後、トップに最新 6 件、`/works/` に全件が表示されます。
3. **実績は「過去の事例」として表示されます。** 現在販売中の車は従来どおりカーセンサーに掲載してください（サイト内の「在庫車一覧」ボタンはカーセンサーへリンクしています）。

### 文言・電話番号・営業時間などを変える
- 基本情報: `src/config/site.ts`
- サービス・流れ・FAQ・サポート内容: `src/data/content.ts`
- 変更後に GitHub へ push すると自動反映されます。

### 写真を差し替える
1. `src-images/` に同じファイル名で置き換え（または追加）。
2. `npm run images` を実行 → `public/images/` と `src/data/images.json` が更新されます。
3. 追加した画像は `<Picture name="ファイル名（拡張子なし）" ... />` で使えます。

---

## 6. お問い合わせフォーム（Netlify Forms）

- `src/pages/contact.astro` の `<form name="contact" data-netlify="true" netlify-honeypot="bot-field">` を Netlify がビルド時に検出します。
- JS 有効時は fetch で送信し「送信中／完了／失敗」を表示、完了後 `/thanks/` へ遷移。JS 無効時も通常の POST で送信できます。
- スパム対策: ハニーポット（`bot-field`）を実装済み。さらに強化する場合は Netlify の Akismet 連携（有料プランで自動）や reCAPTCHA（`data-netlify-recaptcha="true"` の追加）を検討してください。
- **受信確認の必須設定**: Netlify → Forms → form detection をオンにして再デプロイ／Form notifications で通知先メールを登録／公開後にテスト送信して受信を確認。
- 送信内容は Netlify の Forms 画面にも保存されます（無料プランは月 100 件まで）。

---

## 7. 旧URLからのリダイレクト

`public/_redirects` に、旧サイトの sitemap.xml から抽出した全 URL（固定ページ・売買実績 21 件・ブログ 277 件）の 301 リダイレクトを記載しています。

- `/concept/` → `/about/`、`/privacy_policy/` → `/privacy/` など固定ページは対応ページへ
- 旧ブログ記事・旧売買実績は CMS 移行後に ID が変わるため、一覧ページへ転送しています。個別に移行した記事は右側を新 URL に書き換えると記事単位で転送できます。
- 旧 `/used-car/`（2020 年の在庫掲載）はカーセンサーの店舗ページへ転送しています。
- 全 URL をトップへ返す一括リダイレクトは設定していません。
