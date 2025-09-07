// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// 環境に応じたbaseパス設定
const getBasePath = () => {
  // 環境変数からbaseパスを取得（優先度: BASE_PATH > 自動判定）
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH;
  }

  // 環境に応じた自動設定
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      // 本番環境ではサブディレクトリにデプロイする場合
      return process.env.PROD_BASE_PATH || '/';
    case 'staging':
      // ステージング環境
      return '/staging';
    case 'development':
    default:
      // 開発環境
      return '/';
  }
};

// https://astro.build/config
export default defineConfig({
  base: getBasePath(),
  integrations: [tailwind()]
});