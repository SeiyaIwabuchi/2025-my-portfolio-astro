import { defineConfig, devices } from '@playwright/test';

// 環境に応じたbaseパスを取得（Astro設定と同期）
const getBasePath = () => {
  // テスト実行時は常にルートパスを使用（開発サーバーの制約のため）
  if (process.env.NODE_ENV === 'test') {
    return '/';
  }

  // 環境変数からbaseパスを取得
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH;
  }

  // 環境に応じた自動設定（Astro設定と同期）
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return process.env.PROD_BASE_PATH || '/';
    case 'development':
    default:
      return '/';
  }
};

// baseパスを取得
const basePath = getBasePath();
const port = process.env.PORT || '4321';
const baseURL = `http://localhost:${port}${basePath}`;
console.log(`Using base URL: ${baseURL}`);
console.log(process.env.NODE_ENV === 'test' ? 'npm run dev' : (process.env.NODE_ENV === 'production' ? 'npm run dev:prod' : 'npm run dev'));

export default defineConfig({
  // テストディレクトリ
  testDir: './tests/e2e',

  // 並列実行の設定
  fullyParallel: true,

  // CI環境での設定
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 8, // 同時実行数を4に固定

  // タイムアウト設定
  timeout: 30000,
  expect: {
    // スクリーンショット比較のタイムアウトを延長
    timeout: 15000,
  },

  // レポート設定
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  // 全テスト共通設定
  use: {
    // 動的に設定されたベースURL
    baseURL: baseURL,

    // スクリーンショット設定
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // トレース設定
    trace: 'on-first-retry',
  },

  // プロジェクト設定（異なるブラウザ・デバイス）
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // フォント一貫性のためのオプション
        launchOptions: {
          args: ['--font-render-hinting=none', '--disable-font-subpixel-positioning']
        }
      },
    },
    
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
        // フォント一貫性のためのオプション
        launchOptions: {
          args: ['--font-render-hinting=none', '--disable-font-subpixel-positioning']
        }
      },
    },
    
    {
      name: 'mobile-safari',
      use: { 
        ...devices['iPhone 12'],
        // Safariではフォント設定が限定的
      },
    },
  ],

  // 開発サーバー設定
  webServer: {
    command: process.env.NODE_ENV === 'test' ? 'npm run dev' : (process.env.NODE_ENV === 'production' ? 'npm run dev:prod' : 'npm run dev'),
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
