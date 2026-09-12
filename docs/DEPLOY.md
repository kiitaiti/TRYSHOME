# GitHub → Netlify 公開手順

## 1. GitHub にリポジトリを作成して push

```bash
cd trys-home
git init
git add .
git commit -m "TRYS HOME サイト初版"
git branch -M main
git remote add origin https://github.com/<your-account>/trys-home.git
git push -u origin main
```

`.env` は `.gitignore` 済みです。API キーを絶対にコミットしないでください。

## 2. Netlify でサイトを作成

1. Netlify にログイン → **Add new site → Import an existing project → GitHub** を選択
2. リポジトリ `trys-home` を選択
3. ビルド設定は `netlify.toml` から自動で読み込まれます
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 22
4. **Environment variables** に以下を追加（Site configuration → Environment variables）

| Key | Value | 備考 |
| --- | --- | --- |
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスID（`https://xxxx.microcms.io` の `xxxx`） | 必須 |
| `MICROCMS_API_KEY` | microCMS の API キー（GET 権限のみで可） | 必須 |
| `SITE_URL` | 公開URL（例 `https://www.tryshome.co.jp`） | sitemap / OGP / canonical に使用 |

5. **Deploy site** を押す。初回ビルド後、`https://<site-name>.netlify.app` で確認できます。

> キーが未設定のまま production をビルドすると、意図しないサンプルデータ公開を防ぐためビルドが失敗します。
> Deploy Preview（プルリクエスト）や branch deploy ではサンプルデータでビルドされます。

## 3. 独自ドメイン（tryshome.co.jp）の設定

1. Netlify → Domain management → **Add a domain** で `www.tryshome.co.jp`（と `tryshome.co.jp`）を追加
2. 現在のDNS管理画面で、Netlify が案内する CNAME / A レコードを設定
3. HTTPS（Let's Encrypt）は自動で発行されます
4. `SITE_URL` 環境変数を本番ドメインにし、再デプロイ（`public/robots.txt` の Sitemap 行も同じURLにしてください）

## 4. お問い合わせフォーム（Netlify Forms）の有効化

このサイトのフォームは Netlify Forms を使います。**Netlify 側で有効化しないと送信は失敗します**
（失敗した場合、画面には「送信できませんでした」と電話案内が出ます。送信できたように見せることはありません）。

1. Netlify → Site configuration → **Forms** → **Enable form detection** を ON にして再デプロイ
2. Forms → `contact` が検出されていることを確認
3. Forms → Form notifications → **Email notification** で通知先メールアドレスを登録
4. 公開後、実際にテスト送信して通知メールが届くことを確認
5. 迷惑投稿対策として honeypot（`company-website`）を設定済み。必要なら Netlify の reCAPTCHA も追加可能

無料プランでは月100件までの送信制限があります。超える場合はプラン変更、または外部フォーム（Formspree 等）への差し替えを検討してください（`src/pages/contact.astro` の `action` と送信処理を変更）。

## 5. microCMS 更新 → 自動再ビルド

[docs/MICROCMS.md](MICROCMS.md) の「Webhook 設定」を参照してください。

## 6. 公開前チェック

[docs/CHECKLIST.md](CHECKLIST.md) を確認してください。
