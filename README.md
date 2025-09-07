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

## �️ 開発について

このポートフォリオサイトは以下の特徴があります：

- **レスポンシブデザイン**: デスクトップ・タブレット・スマートフォンに対応
- **高速表示**: Astroの静的サイト生成による最適化
- **SEOフレンドリー**: メタタグとstructured dataの最適化
- **アクセシビリティ**: WAI-ARIAガイドラインに準拠

## 👀 もっと学びたい方へ

- [Astro公式ドキュメント](https://docs.astro.build)
- [Astro Discordサーバー](https://astro.build/chat)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
