import { test, expect } from '@playwright/test';

/**
 * 簡単なベースライン作成用のテスト
 * まずは基本的なスクリーンショットを確実に取得する
 */

test.describe('📸 ベースライン・スクリーンショット生成', () => {
  test('ホームページ - デスクトップ', async ({ page }, testInfo) => {
    // モバイルプロジェクトではデスクトップテストをスキップ
    test.skip(testInfo.project.name.includes('mobile'), 'モバイルプロジェクトではデスクトップテストは不要');
    
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // ページの最下部までゆっくりスクロールしてフェードインアニメーションを発火させる
    await page.evaluate(async () => {
      const scrollHeight = document.body.scrollHeight;
      const steps = 10;
      const stepSize = scrollHeight / steps;
      
      for (let i = 0; i <= steps; i++) {
        window.scrollTo(0, stepSize * i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    });
    await page.waitForTimeout(5000); // フェードインアニメーション完了待機
    
    // 最上部にゆっくり戻す
    await page.evaluate(async () => {
      const currentY = window.scrollY;
      const steps = 5;
      const stepSize = currentY / steps;
      
      for (let i = steps; i >= 0; i--) {
        window.scrollTo(0, stepSize * i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    });
    await page.waitForTimeout(1000); // スクロール完了待機
    
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      threshold: 0.3,
      animations: 'disabled' // CSSアニメーションを無効化
    });
  });

  test('ホームページ - モバイル', async ({ page }, testInfo) => {
    // デスクトッププロジェクトではモバイルテストをスキップ
    test.skip(testInfo.project.name === 'chromium', 'デスクトッププロジェクトではモバイルテストは不要');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // ページの最下部までゆっくりスクロールしてフェードインアニメーションを発火させる
    await page.evaluate(async () => {
      const scrollHeight = document.body.scrollHeight;
      const steps = 8;
      const stepSize = scrollHeight / steps;
      
      for (let i = 0; i <= steps; i++) {
        window.scrollTo(0, stepSize * i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    });
    await page.waitForTimeout(5000); // フェードインアニメーション完了待機
    
    // 最上部にゆっくり戻す
    await page.evaluate(async () => {
      const currentY = window.scrollY;
      const steps = 4;
      const stepSize = currentY / steps;
      
      for (let i = steps; i >= 0; i--) {
        window.scrollTo(0, stepSize * i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    });
    await page.waitForTimeout(1000); // スクロール完了待機
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      threshold: 0.3,
      animations: 'disabled' // CSSアニメーションを無効化
    });
  });

  test('モバイルメニュー - 開いた状態', async ({ page }, testInfo) => {
    // デスクトッププロジェクトではモバイルメニューテストをスキップ
    test.skip(testInfo.project.name === 'chromium', 'デスクトッププロジェクトではモバイルメニューテストは不要');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // メニューを開く
    await page.locator('#hamburger-btn').click();
    await page.waitForTimeout(5000); // アニメーション完了待機を延長

    await expect(page).toHaveScreenshot('mobile-menu-open.png', {
      fullPage: true,
      threshold: 0.3,
      animations: 'disabled' // CSSアニメーションを無効化
    });
  });

  const pages = [
    { path: '/about', name: 'about' },
    { path: '/skills', name: 'skills' },
    { path: '/works', name: 'works' },
    { path: '/experience', name: 'experience' },
    { path: '/contact', name: 'contact' }
  ];

  // デスクトップ版テスト（chromiumプロジェクトのみ）
  pages.forEach(({ path, name }) => {
    test(`${name}ページ - デスクトップ`, async ({ page, browserName }, testInfo) => {
      // モバイルプロジェクトではデスクトップテストをスキップ
      test.skip(testInfo.project.name.includes('mobile'), 'モバイルプロジェクトではデスクトップテストは不要');
      
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      // ページの最下部までゆっくりスクロールしてフェードインアニメーションを発火させる
      await page.evaluate(async () => {
        const scrollHeight = document.body.scrollHeight;
        const steps = 8;
        const stepSize = scrollHeight / steps;
        
        for (let i = 0; i <= steps; i++) {
          window.scrollTo(0, stepSize * i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      });
      await page.waitForTimeout(5000); // フェードインアニメーション完了待機

      // 最上部にゆっくり戻す
      await page.evaluate(async () => {
        const currentY = window.scrollY;
        const steps = 4;
        const stepSize = currentY / steps;
        
        for (let i = steps; i >= 0; i--) {
          window.scrollTo(0, stepSize * i);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      });
      await page.waitForTimeout(1000); // スクロール完了待機
      
      await expect(page).toHaveScreenshot(`${name}-page-desktop.png`, {
        fullPage: true,
        threshold: 0.5, // しきい値を緩める
        animations: 'disabled' // CSSアニメーションを無効化
      });
    });
  });

  // モバイル版テスト（mobile-プロジェクトのみ）
  pages.forEach(({ path, name }) => {
    test(`${name}ページ - モバイル`, async ({ page }, testInfo) => {
      // デスクトッププロジェクトではモバイルテストをスキップ
      test.skip(testInfo.project.name === 'chromium', 'デスクトッププロジェクトではモバイルテストは不要');
      
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      // ページの最下部までゆっくりスクロールしてフェードインアニメーションを発火させる
      await page.evaluate(async () => {
        const scrollHeight = document.body.scrollHeight;
        const steps = 6;
        const stepSize = scrollHeight / steps;
        
        for (let i = 0; i <= steps; i++) {
          window.scrollTo(0, stepSize * i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      });
      await page.waitForTimeout(5000); // フェードインアニメーション完了待機

      // 最上部にゆっくり戻す
      await page.evaluate(async () => {
        const currentY = window.scrollY;
        const steps = 3;
        const stepSize = currentY / steps;
        
        for (let i = steps; i >= 0; i--) {
          window.scrollTo(0, stepSize * i);
          await new Promise(resolve => setTimeout(resolve, 80));
        }
      });
      await page.waitForTimeout(800); // スクロール完了待機
      
      await expect(page).toHaveScreenshot(`${name}-page-mobile.png`, {
        fullPage: true,
        threshold: 0.5, // Safariのフォント差異を考慮してしきい値を上げる
        animations: 'disabled' // CSSアニメーションを無効化
      });
    });
  });
});
