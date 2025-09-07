import { test, expect } from '@playwright/test';

/**
 * 実際のブラウザでのE2E操作テスト
 * ベースライン動作の確認とビジュアルリグレッション検出
 */

test.describe('🏠 ホームページ - ベースライン動作確認', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // ページの読み込み完了を待機
    await page.waitForLoadState('networkidle');
  });

  test('ページが正常に読み込まれること', async ({ page }) => {
    // モバイルサイズに設定してハンバーガーボタンを表示させる
    await page.setViewportSize({ width: 375, height: 667 });
    
    // ページタイトルの確認
    await expect(page).toHaveTitle(/Portfolio/);
    
    // 基本要素の存在確認（より具体的なセレクタを使用）
    await expect(page.locator('nav').first()).toBeVisible(); // メインナビゲーション
    await expect(page.locator('#hamburger-btn')).toBeVisible();
    await expect(page.locator('#mobile-menu')).toBeAttached();
  });

  test('デスクトップナビゲーションが正しく表示されること', async ({ page }) => {
    // デスクトップサイズに設定
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // デスクトップナビゲーションの確認（モバイルメニュー内のリンクではなく、ヘッダーの直接リンクを確認）
    const navItems = [
      { href: '/about', text: '自己紹介' },
      { href: '/skills', text: 'スキル' },
      { href: '/works', text: '実績' },
      { href: '/experience', text: '職歴' },
      { href: '/contact', text: 'お問い合わせ' }
    ];

    // デスクトップナビゲーション内のリンクを確認（mobile-menu以外）
    for (const item of navItems) {
      const link = page.locator(`.hidden.md\\:flex a[href="${item.href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toHaveText(item.text);
    }
    
    // ロゴリンクの確認
    const logoLink = page.locator('a[href="/"]').first();
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toContainText('Portfolio');
    
    // ハンバーガーボタンがデスクトップで非表示であることを確認
    await expect(page.locator('#hamburger-btn')).toBeHidden();
  });
});

test.describe('📱 モバイル表示とメニュー操作', () => {
  test.beforeEach(async ({ page }) => {
    // モバイルサイズに設定
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('モバイルでハンバーガーボタンが表示されること', async ({ page }) => {
    // ハンバーガーボタンの確認
    const hamburgerBtn = page.locator('#hamburger-btn');
    await expect(hamburgerBtn).toBeVisible();
    
    // ARIA属性の確認
    await expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(hamburgerBtn).toHaveAttribute('aria-label', 'メニューを開く');
  });

  test('モバイルメニューの開閉動作', async ({ page }) => {
    const hamburgerBtn = page.locator('#hamburger-btn');
    const mobileMenu = page.locator('#mobile-menu');
    
    // 初期状態：メニューが閉じている
    await expect(mobileMenu).not.toHaveClass(/open/);
    
    // メニューを開く
    await hamburgerBtn.click();
    await page.waitForTimeout(300); // アニメーション待機
    
    // メニューが開いた状態を確認
    await expect(mobileMenu).toHaveClass(/open/);
    await expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(hamburgerBtn).toHaveClass(/active/);
    
    // ハンバーガーボタンのアニメーション確認（line2は開いた時に opacity:0 になる）
    const line1 = page.locator('.line1');
    const line2 = page.locator('.line2');
    const line3 = page.locator('.line3');
    
    await expect(line1).toBeVisible();
    // line2はactiveクラス時にopacity:0になるため、existence checkのみ
    await expect(line2).toBeAttached();
    await expect(line3).toBeVisible();
  });

  test('ESCキーでメニューが閉じること', async ({ page }) => {
    const hamburgerBtn = page.locator('#hamburger-btn');
    const mobileMenu = page.locator('#mobile-menu');
    
    // メニューを開く
    await hamburgerBtn.click();
    await expect(mobileMenu).toHaveClass(/open/);
    
    // ESCキーでメニューを閉じる
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    // メニューが閉じたことを確認
    await expect(mobileMenu).not.toHaveClass(/open/);
    await expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('メニューリンクをクリックでメニューが閉じること', async ({ page }) => {
    const hamburgerBtn = page.locator('#hamburger-btn');
    const mobileMenu = page.locator('#mobile-menu');
    
    // メニューを開く
    await hamburgerBtn.click();
    await expect(mobileMenu).toHaveClass(/open/);
    
    // メニュー内のリンクをクリック
    const aboutLink = mobileMenu.locator('a[href="/about"]');
    await aboutLink.click();
    
    // ページ遷移を待機
    await page.waitForURL('/about');
    
    // メニューが閉じていることを確認（新しいページで）
    const newMobileMenu = page.locator('#mobile-menu');
    await expect(newMobileMenu).not.toHaveClass(/open/);
  });
});

test.describe('🔗 ページ遷移とナビゲーション', () => {
  const pages = [
    { path: '/about', title: '自己紹介' },
    { path: '/skills', title: 'スキル' },
    { path: '/works', title: '実績' },
    { path: '/experience', title: '職歴' },
    { path: '/contact', title: 'お問い合わせ' }
  ];

  pages.forEach(({ path, title }) => {
    test(`${title}ページ (${path}) が正常に表示されること`, async ({ page }, testInfo) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      // ローディングスピナーが非表示になるのを待機
      const spinner = page.locator('#loading-spinner');
      await expect(spinner).toHaveClass(/hidden/);
      
      // ページが正常に読み込まれることを確認
      await expect(page.locator('nav').first()).toBeVisible();
      
      // 現在のページがアクティブになっていることを確認
      const activeLink = page.locator(`a[href="${path}"]`).first();
        if (testInfo.project.name.includes('mobile')) {
            // モバイルではメニューを開いてからチェック
            await page.locator('#hamburger-btn').click();
            await page.waitForTimeout(300);
            const mobileLink = page.locator(`#mobile-menu a[href="${path}"]`);
            await expect(mobileLink).toBeVisible();
        } else {
            // デスクトップでは直接チェック
            await expect(activeLink).toBeVisible();
        }
    });
  });
});

test.describe('🖥️ レスポンシブ表示確認', () => {
  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Mobile Small', width: 320, height: 568 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`${name} (${width}x${height}) でレイアウトが崩れないこと`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 基本要素の表示確認
      await expect(page.locator('nav').first()).toBeVisible();
      
      // ビューポートに応じた表示の確認
      if (width >= 768) {
        // デスクトップ・タブレット：デスクトップナビが表示
        await expect(page.locator('.hidden.md\\:flex')).toBeVisible();
        await expect(page.locator('#hamburger-btn')).toBeHidden();
      } else {
        // モバイル：ハンバーガーボタンが表示
        await expect(page.locator('#hamburger-btn')).toBeVisible();
      }
    });
  });
});

test.describe('♿ アクセシビリティ確認', () => {
  test('キーボードナビゲーションが機能すること', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Tabキーでナビゲーション
    await page.keyboard.press('Tab');
    
    // フォーカスが適切に移動することを確認
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON']).toContain(focusedElement);
  });

  test('ARIA属性が適切に設定されていること', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const hamburgerBtn = page.locator('#hamburger-btn');
    
    // 初期のARIA属性
    await expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(hamburgerBtn).toHaveAttribute('aria-label', 'メニューを開く');
    
    // メニューを開いた後のARIA属性
    await hamburgerBtn.click();
    await page.waitForTimeout(300);
    
    await expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(hamburgerBtn).toHaveAttribute('aria-label', 'メニューを閉じる');
  });
});

test.describe('🚫 404ページ - エラーページ動作確認', () => {
  test('404ページが正しく表示されること', async ({ page }) => {
    // 存在しないページにアクセス
    await page.goto('/nonexistent-page');
    await page.waitForLoadState('networkidle');

    // ページタイトルの確認（Layout.astroで自動的にサイト名が付加される）
    await expect(page).toHaveTitle('ページが見つかりません | Seiya Iwabuchi\'s Portfolio');

    // 404の数字が表示されていること
    const errorNumber = page.locator('h1').first();
    await expect(errorNumber).toBeVisible();
    await expect(errorNumber).toHaveText('404');

    // エラーメッセージが表示されていること
    const errorTitle = page.locator('h2').first();
    await expect(errorTitle).toBeVisible();
    await expect(errorTitle).toHaveText('ページが見つかりません');

    // 説明文が表示されていること（404ページ内の説明文を特定）
    const errorDescription = page.locator('section p').first();
    await expect(errorDescription).toBeVisible();
    await expect(errorDescription).toContainText('お探しのページは存在しないか');
  });

  test('ホームに戻るボタンが機能すること', async ({ page }) => {
    // 404ページにアクセス
    await page.goto('/nonexistent-page');
    await page.waitForLoadState('networkidle');

    // 404ページの「ホームに戻る」ボタンを特定（SVGアイコンを含むボタン）
    const homeButton = page.locator('a[href="/"]:has(svg)').first();
    await expect(homeButton).toBeVisible();
    await expect(homeButton).toHaveText('ホームに戻る');

    // ボタンをクリックしてホームページに遷移
    await homeButton.click();
    await page.waitForLoadState('networkidle');

    // ホームページに遷移したことを確認
    await expect(page).toHaveURL(/\/$/);
    await expect(page).toHaveTitle(/Portfolio/);
  });

  test('主要ページへのリンクが存在すること', async ({ page }) => {
    // 404ページにアクセス
    await page.goto('/nonexistent-page');
    await page.waitForLoadState('networkidle');

    // 主要ページへのリンクが存在することを確認（404ページ内のリンクのみ）
    const links = [
      { href: '/works', text: '制作実績' },
      { href: '/skills', text: 'スキル・技術' },
      { href: '/experience', text: '経歴・経験' },
      { href: '/contact', text: 'お問い合わせ' }
    ];

    for (const link of links) {
      // 404ページ内のリンクを特定（ヘッダーやフッターのリンクを除外）
      const linkElement = page.locator(`section a[href="${link.href}"]`);
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toHaveText(link.text);
    }
  });

  test('404ページのナビゲーションがモバイル対応であること', async ({ page }) => {
    // モバイルサイズに設定
    await page.setViewportSize({ width: 375, height: 667 });

    // 404ページにアクセス
    await page.goto('/nonexistent-page');
    await page.waitForLoadState('networkidle');

    // モバイルでも主要要素が表示されていること
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('h2').first()).toBeVisible();
    await expect(page.locator('a[href="/"]:has(svg)').first()).toBeVisible();

    // 主要ページへのリンクもモバイルで表示されていること（404ページ内のリンクのみ）
    const worksLink = page.locator('section a[href="/works"]');
    await expect(worksLink).toBeVisible();
  });
});
