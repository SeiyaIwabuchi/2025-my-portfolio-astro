import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // テストディレクトリ
  testDir: './tests/e2e',
  
  // 並列実行の設定
  fullyParallel: true,
  
  // CI環境での設定
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
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
    // ベースURL
    baseURL: 'http://localhost:4321',
    
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
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
