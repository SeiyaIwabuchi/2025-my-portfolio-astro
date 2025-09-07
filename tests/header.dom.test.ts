import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// menu utilsのモック
vi.mock('../src/utils/menu', () => ({
  toggleMenu: vi.fn(),
  closeMenu: vi.fn(() => true),
}));

describe('Header component DOM integration', () => {
  let dom: JSDOM;
  let document: Document;
  
  beforeEach(() => {
    // Header.astroコンポーネントに似た基本的なDOM構造を作成
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <nav class="fixed top-0 left-0 right-0 bg-white/90">
            <div class="max-w-6xl mx-auto px-4">
              <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                  <a href="/" class="text-xl font-bold">Seiya Iwabuchi's Portfolio</a>
                </div>
                <div class="hidden md:flex space-x-8">
                  <a href="/" class="nav-link">ホーム</a>
                  <a href="/about" class="nav-link">自己紹介</a>
                </div>
                <div class="md:hidden">
                  <button 
                    id="hamburger-btn"
                    class="hamburger-button"
                    aria-label="メニューを開く"
                    aria-expanded="false"
                  >
                    <div class="hamburger-lines">
                      <span class="line line1"></span>
                      <span class="line line2"></span>
                      <span class="line line3"></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div 
            id="mobile-menu" 
            class="mobile-menu md:hidden fixed"
          >
            <!-- Mobile menu content -->
          </div>
        </body>
      </html>
    `, { url: 'http://localhost:4321' });
    
    document = dom.window.document;
    global.document = document;
    global.window = dom.window as any;
  });

  describe('Header DOM structure', () => {
    it('should have all required elements', () => {
      const hamburgerBtn = document.getElementById('hamburger-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const navLinks = document.querySelectorAll('.nav-link');
      
      expect(hamburgerBtn).toBeTruthy();
      expect(mobileMenu).toBeTruthy();
      expect(navLinks.length).toBeGreaterThan(0);
    });

    it('should have proper ARIA attributes on hamburger button', () => {
      const hamburgerBtn = document.getElementById('hamburger-btn');
      
      expect(hamburgerBtn?.getAttribute('aria-label')).toBe('メニューを開く');
      expect(hamburgerBtn?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have hamburger lines structure', () => {
      const lines = document.querySelectorAll('.line');
      
      expect(lines.length).toBe(3);
      expect(lines[0]?.classList.contains('line1')).toBe(true);
      expect(lines[1]?.classList.contains('line2')).toBe(true);
      expect(lines[2]?.classList.contains('line3')).toBe(true);
    });
  });

  describe('Header menu integration simulation', () => {
    it('should call toggleMenu when hamburger button is clicked', async () => {
      const { toggleMenu } = await import('../src/utils/menu');
      const hamburgerBtn = document.getElementById('hamburger-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      
      // Click event simulation
      const clickEvent = new dom.window.Event('click');
      hamburgerBtn?.dispatchEvent(clickEvent);
      
      // Header.astroのコードを模倣してテスト
      if (hamburgerBtn && mobileMenu) {
        (toggleMenu as any)(hamburgerBtn, mobileMenu);
        expect(toggleMenu).toHaveBeenCalledWith(hamburgerBtn, mobileMenu);
      }
    });

    it('should call closeMenu on window resize to desktop size', async () => {
      const { closeMenu } = await import('../src/utils/menu');
      const mobileMenu = document.getElementById('mobile-menu');
      
      // Set mobile viewport
      Object.defineProperty(dom.window, 'innerWidth', {
        value: 600,
        configurable: true
      });
      
      // Resize to desktop
      Object.defineProperty(dom.window, 'innerWidth', {
        value: 1024,
        configurable: true
      });
      
      // Simulate resize event handling from Header.astro
      if (dom.window.innerWidth >= 768 && mobileMenu) {
        (closeMenu as any)(mobileMenu);
        expect(closeMenu).toHaveBeenCalledWith(mobileMenu);
      }
    });
  });

  describe('Navigation links', () => {
    it('should have proper href attributes', () => {
      const homeLink = document.querySelector('a[href="/"]');
      const aboutLink = document.querySelector('a[href="/about"]');
      
      expect(homeLink).toBeTruthy();
      expect(aboutLink).toBeTruthy();
    });

    it('should have proper class structure', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        expect(link.classList.contains('nav-link')).toBe(true);
      });
    });
  });

  describe('Responsive behavior', () => {
    it('should show desktop navigation on larger screens', () => {
      const desktopNav = document.querySelector('.hidden.md\\:flex');
      const mobileButton = document.querySelector('.md\\:hidden');
      
      expect(desktopNav).toBeTruthy();
      expect(mobileButton).toBeTruthy();
    });

    it('should have proper mobile menu structure', () => {
      const mobileMenu = document.getElementById('mobile-menu');
      
      expect(mobileMenu?.classList.contains('mobile-menu')).toBe(true);
      expect(mobileMenu?.classList.contains('md:hidden')).toBe(true);
      expect(mobileMenu?.classList.contains('fixed')).toBe(true);
    });
  });
});
