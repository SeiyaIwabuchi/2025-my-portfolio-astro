# 🚀 岩渕誠也のポートフォリオサイト

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-2025-blue?style=for-the-badge&logo=astro&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-3.0+-000000?style=flat&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E_Testing-2EAD33?style=flat&logo=playwright&logoColor=white)

**フルスタックエンジニアのクリエイティブなポートフォリオサイト**

[🌐 サイトを見る](https://your-portfolio-domain.com) • [📧 お問い合わせ](mailto:0123ook.biz@gmail.com)

</div>

---

## ✨ プロジェクトの魅力

このポートフォリオサイトは、ただの自己紹介サイトではありません。**最先端のWeb技術を駆使した、インタラクティブで没入感のある体験**を提供します。

### 🎯 何が特別か？

- **⚡ 爆速パフォーマンス**: Astroのアイランドアーキテクチャで、ページ読み込みが驚くほど速い
- **🎨 美しいUI/UX**: Tailwind CSSで構築されたモダンでレスポンシブなデザイン
- **🔧 堅牢な品質保証**: Playwrightによる包括的なE2Eテストで信頼性確保
- **📱 完璧なモバイル体験**: あらゆるデバイスで最適化された表示
- **♿ アクセシビリティ対応**: WCAG準拠で、すべての人に優しい設計

### 🌟 技術的なハイライト

```typescript
// 型安全で堅牢な開発体験
interface PortfolioProps {
  title: string;
  technologies: Technology[];
  projects: Project[];
}

// 最新のWeb標準を活用
const portfolio = new Portfolio({
  framework: 'Astro',
  styling: 'Tailwind CSS',
  testing: 'Playwright',
  deployment: 'Vercel/Netlify'
});
```

---

## 🛠️ 技術スタック

<div align="center">

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Astro](https://img.shields.io/badge/Astro-3.0+-000000?style=flat&logo=astro) | 5.13.5 | 高速な静的サイト生成 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript) | 5.5.0 | 型安全な開発 |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=flat&logo=tailwind-css) | 3.0+ | ユーティリティファーストCSS |

### Testing & Quality
| Technology | Purpose |
|------------|---------|
| ![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=flat&logo=playwright) | 包括的なE2Eテスト |
| ![Vitest](https://img.shields.io/badge/Vitest-Unit-646CFF?style=flat&logo=vitest) | 高速ユニットテスト |
| ![Testing Library](https://img.shields.io/badge/Testing_Library-Component-E33332?style=flat&logo=testing-library) | アクセシビリティ対応テスト |

### Development Tools
- **ESLint + Prettier**: コード品質の自動確保
- **Husky + lint-staged**: コミット前の品質チェック
- **Visual Regression Testing**: デザインの一貫性保証

</div>

---

## 🎪 特徴的な機能

### 🌈 インタラクティブな体験

- **スムースなアニメーション**: CSSアニメーションとJavaScriptで実現する流れるような動き
- **レスポンシブデザイン**: モバイルからデスクトップまで完璧な表示
- **ダークモード対応**: ユーザーの好みに合わせたテーマ切り替え（将来拡張）
- **PWA対応**: オフライン対応とアプリのような体験（将来拡張）

### 📊 パフォーマンス最適化

```javascript
// 画像最適化
import { Image } from 'astro:assets';

<Image
  src={profileImage}
  alt="プロフィール画像"
  width={400}
  height={400}
  quality={90}
/>
```

- **画像最適化**: Astroのビルトイン機能で自動最適化
- **フォント読み込み最適化**: Google Fontsの効率的な読み込み
- **CSS最適化**: 未使用CSSの自動削除
- **JavaScript最小化**: バンドルサイズの最適化

### 🧪 品質保証

- **ビジュアルリグレッションテスト**: デザインの変更を自動検出
- **アクセシビリティテスト**: WCAG 2.1 AA準拠の検証
- **クロスブラウザテスト**: Chrome, Firefox, Safari, Edge対応
- **モバイルテスト**: iOS Safari, Android Chrome対応

---

## 🚀 クイックスタート

### 前提条件

- Node.js 22.19.0 (Volta推奨)
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/SeiyaIwabuchi/2025-my-portfolio-astro.git
cd 2025-my-portfolio-astro

# 依存関係をインストール
npm install
```

### 開発サーバー起動

```bash
# 開発モードで起動
npm run dev

# 本番モードで起動（baseパス適用）
npm run dev:prod
```

🌐 **http://localhost:4321** でサイトが表示されます！

### ビルド

```bash
# 本番用ビルド
npm run build

# ビルドプレビュー
npm run preview
```

---

## 📁 プロジェクト構造

```
src/
├── components/          # 🧩 再利用可能なコンポーネント
│   ├── CTA.astro       # コールトゥアクション
│   ├── Footer.astro    # フッター（SNSリンク、サイトマップ）
│   ├── Header.astro    # ヘッダー（ナビゲーション、ロゴ）
│   └── MobileMenu.astro # モバイルメニュー
├── layouts/            # 📐 レイアウトテンプレート
│   └── Layout.astro    # メインlayout（メタデータ、OGP）
├── pages/              # 📄 ページファイル
│   ├── index.astro     # 🏠 トップページ（ヒーローセクション）
│   ├── about.astro     # 👤 自己紹介（プロフィール、経歴）
│   ├── skills.astro    # 🛠️ スキル（技術スタック、得意分野）
│   ├── experience.astro # 💼 経験・実績（職歴、プロジェクト）
│   ├── works.astro     # 🎨 作品（ポートフォリオ作品）
│   ├── contact.astro   # 📧 お問い合わせ（連絡先）
│   └── license.astro   # 📋 ライセンス情報
├── config/             # ⚙️ 設定ファイル
│   └── links.ts        # 🔗 リンク・ルート設定
└── styles/             # 🎨 スタイルファイル
    └── global.css      # グローバルスタイル、ユーティリティ

public/
├── images/             # 🖼️ 画像アセット
└── videos/             # 🎥 動画アセット

tests/
└── e2e/                # 🧪 E2Eテスト
    ├── baseline.spec.ts        # 機能テスト
    └── simple-baseline.spec.ts # ビジュアルテスト
```

---

## 🧪 テスト実行

### ユニットテスト（Vitest）

```bash
# 基本実行
npm run test:unit

# ウォッチモード
npm run test:unit:watch

# カバレッジレポート
npm run test:unit:coverage
```

### E2Eテスト（Playwright）

```bash
# 全ブラウザテスト
npm run test:e2e

# Chromiumのみ
npm run test:e2e:chromium

# UIモード（ブラウザで確認）
npm run test:e2e:ui

# デバッグモード
npm run test:e2e:debug

# ヘッドモード（ブラウザ表示）
npm run test:e2e:headed
```

### ビジュアルリグレッションテスト

```bash
# ベースライン比較
npm run test:e2e

# ベースライン更新（デザイン変更時）
npm run test:baseline
```

### 統合テスト

```bash
# すべてのテスト実行
npm run test:all
```

---

## 🎯 開発哲学

### 🚀 パフォーマンスファースト

- **Core Web Vitals** を重視した最適化
- **Lighthouseスコア** 95+ を目指す
- **バンドルサイズ** の最小化

### ♿ アクセシビリティファースト

- **WCAG 2.1 AA** 準拠
- **キーボードナビゲーション** 対応
- **スクリーンリーダー** 対応

### 🔧 開発者体験ファースト

- **TypeScript** で型安全な開発
- **ESLint + Prettier** でコード品質確保
- **Husky** でコミット品質管理

---

## 🤝 貢献方法

1. **Fork** してブランチを作成
2. **機能追加** または **バグ修正**
3. **テスト** を書いて品質確保
4. **Pull Request** を作成

### 開発環境セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# テスト実行
npm run test:all
```

### コーディング規約

- **TypeScript** を使用
- **ESLint** と **Prettier** に準拠
- **Conventional Commits** を使用
- **テストカバレッジ** 80%以上

---

## 📈 今後の展望

### 🚀 短期目標（v1.x）

- [ ] **PWA対応**（Service Worker, Web App Manifest）
- [ ] **ダークモード** 実装
- [ ] **多言語対応**（i18n）
- [ ] **CMS統合**（Contentful, Strapi）

### 🎯 中期目標（v2.x）

- [ ] **ブログ機能** 追加
- [ ] **プロジェクト詳細ページ** 作成
- [ ] **アニメーション強化**（Framer Motion）
- [ ] **SEO最適化** 強化

### 🌟 長期目標（v3.x）

- [ ] **マイクロサービス化**
- [ ] **AI機能統合**（ChatGPT API）
- [ ] **リアルタイム機能**（WebSocket）
- [ ] **モバイルアプリ** 化（React Native）

---

## 📄 ライセンス

このプロジェクトは **MIT License** の下で公開されています。

---

<div align="center">

**Made with ❤️ by Seiya Iwabuchi**

[🌐 Portfolio](https://your-portfolio-domain.com) • [🐙 GitHub](https://github.com/SeiyaIwabuchi) • [🐦 Twitter](https://twitter.com/your-handle) • [💼 LinkedIn](https://linkedin.com/in/your-profile)

*「コードで世界を変える、一歩ずつ。」*

</div>
