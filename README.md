# ポートフォリオサイト

Astroを使用したポートフォリオサイトです。レスポンシブデザインでモダンなUIを実現しています。

## 🚀 プロジェクト構成

このAstroプロジェクトには以下のフォルダとファイルが含まれています：

```text
/
├── public/
│   ├── images/          # 画像ファイル
│   └── videos/          # 動画ファイル
├── src/
│   ├── components/      # 再利用可能なコンポーネント
│   │   ├── CTA.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   └── MobileMenu.astro
│   ├── layouts/         # レイアウトテンプレート
│   │   └── Layout.astro
│   ├── pages/           # ページファイル
│   │   ├── index.astro     # トップページ
│   │   ├── about.astro     # 自己紹介ページ
│   │   ├── skills.astro    # スキルページ
│   │   ├── experience.astro # 経験・実績ページ
│   │   ├── works.astro     # 作品ページ
│   │   └── contact.astro   # お問い合わせページ
│   └── styles/          # スタイルファイル
│       └── global.css
└── package.json
```

## 📄 ページ概要

- **トップページ** (`index.astro`): メインビジュアルとサイト概要
- **自己紹介** (`about.astro`): プロフィールと経歴
- **スキル** (`skills.astro`): 技術スタックと得意分野
- **経験・実績** (`experience.astro`): 職歴とプロジェクト経験
- **作品** (`works.astro`): ポートフォリオ作品の紹介
- **お問い合わせ** (`contact.astro`): 連絡先情報

## 🎨 技術スタック

- **フレームワーク**: Astro
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript, HTML, CSS

Astroは `src/pages/` ディレクトリ内の `.astro` または `.md` ファイルを探します。各ページはファイル名に基づいてルートとして公開されます。

`src/components/` には再利用可能なAstroコンポーネントを配置しています。

画像や動画などの静的アセットは `public/` ディレクトリに配置されています。

## 🧞 コマンド

すべてのコマンドはプロジェクトのルートディレクトリから実行してください：

| コマンド                   | 動作                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | 依存関係をインストール                          |
| `npm run dev`             | ローカル開発サーバーを `localhost:4321` で起動    |
| `npm run build`           | 本番用サイトを `./dist/` にビルド               |
| `npm run preview`         | ビルドしたサイトをローカルでプレビュー           |
| `npm run astro ...`       | `astro add`, `astro check` などのCLIコマンドを実行 |
| `npm run astro -- --help` | Astro CLIのヘルプを表示                        |

## 🧪 テスト

開発中は以下のコマンドでテストを実行できます。E2E（Playwright）はローカルサーバーが必要です（`npm run dev` を別ターミナルで実行してください）。

### ユニットテスト（Vitest）

- **基本実行**

```powershell
npm run test:unit
```

- **ウォッチモード（ファイル変更時に自動再実行）**

```powershell
npm run test:unit:watch
```

- **カバレッジ測定**

```powershell
npm run test:unit:coverage
```

### E2Eテスト（Playwright）

※先に dev サーバーを起動してから実行してください。

- **全ブラウザでテスト実行**

```powershell
npm run test:e2e
```

- **Chromiumのみでテスト実行**

```powershell
npm run test:e2e:chromium
```

- **UI モードでテスト実行（ブラウザでテスト状況を確認）**

```powershell
npm run test:e2e:ui
```

- **デバッグモード（ステップ実行）**

```powershell
npm run test:e2e:debug
```

- **ヘッドモード（ブラウザを表示してテスト実行）**

```powershell
npm run test:e2e:headed
```

### ビジュアルリグレッションテスト

ビジュアルリグレッションテストは、ベースライン画像と現在のスクリーンショットを比較して視覚的な変更を検出します。

- **ベースライン画像との比較テスト**

```powershell
npm run test:e2e
```
※既存のベースライン画像と比較し、差異があればテスト失敗

- **ベースライン画像の作成・更新**

```powershell
npm run test:baseline
```
※新しいベースライン画像を作成または既存のものを更新（意図的な変更時のみ使用）

### 統合テスト

- **すべてのテストを順に実行**

```powershell
npm run test:all
```

### テストレポート

- **E2E テストレポートをブラウザで表示**

```powershell
npx playwright show-report
```
