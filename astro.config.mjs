// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// 環境に応じたbaseパス設定
const getBasePath = () => {
  // 注意: .envファイルはastro.config.mjsでは読み込まれません
  // 環境変数はCLIやnpm scriptsから渡す必要があります
  // 例: BASE_PATH=/custom-path npm run dev

  // 環境変数からbaseパスを取得（優先度: BASE_PATH > 自動判定）
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH;
  }

  return '/';
};

// https://astro.build/config
export default defineConfig({
  base: getBasePath(),
  integrations: [tailwind()],
  // Playwright実行時（NODE_ENV=test）はdev toolbarを無効化して干渉を防ぐ
  devToolbar: {
    enabled: process.env.NODE_ENV !== 'test'
  }
});