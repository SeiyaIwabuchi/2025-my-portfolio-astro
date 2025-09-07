export interface LinkItem {
  href: string;
  label?: string;
  icon?: string;
  external?: boolean;
}

// 環境に応じたbaseパスを取得（Astro設定と同期）
const getBasePath = (): string => {
  // クライアント側ではimport.meta.envを使用
  if (typeof window !== 'undefined' && import.meta.env) {
    return import.meta.env.BASE_URL || '/';
  }

  // サーバー側ではprocess.envを使用
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.BASE_PATH) {
      return process.env.BASE_PATH;
    }

    const env = process.env.NODE_ENV || 'development';
    switch (env) {
      case 'production':
        return process.env.PROD_BASE_PATH || '/';
      case 'staging':
        return '/staging';
      case 'development':
      default:
        return '/';
    }
  }

  return '/';
};

// パスにbaseプレフィックスを適用するヘルパー関数
const applyBasePath = (path: string): string => {
  const basePath = getBasePath();
  // 外部リンクや絶対パスの場合はそのまま返す
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('//')) {
    return path;
  }
  // baseパスが'/'の場合はそのまま返す
  if (basePath === '/') {
    return path;
  }
  // baseパスを適用
  return `${basePath}${path}`.replace(/\/+/g, '/');
};

export const SITE_NAME = "Seiya Iwabuchi's Portfolio";

// 環境に応じたSITE_URLを取得
export const SITE_URL = (() => {
  const basePath = getBasePath();
  const baseUrl = typeof window !== 'undefined' && import.meta.env
    ? import.meta.env.SITE || 'https://your-portfolio-domain.com'
    : 'https://your-portfolio-domain.com';

  if (basePath === '/') {
    return baseUrl;
  }

  return `${baseUrl}${basePath}`;
})();

export const navItems: LinkItem[] = [
  { href: applyBasePath('/index.html'), label: 'ホーム' },
  { href: applyBasePath('/about.html'), label: '自己紹介' },
  { href: applyBasePath('/skills.html'), label: 'スキル' },
  { href: applyBasePath('/works.html'), label: '実績' },
  { href: applyBasePath('/experience.html'), label: '職歴' },
  { href: applyBasePath('/contact.html'), label: 'お問い合わせ' }
];

export const footerLinks: LinkItem[] = [
  { href: applyBasePath('/about.html'), label: '自己紹介' },
  { href: applyBasePath('/skills.html'), label: 'スキル' },
  { href: applyBasePath('/works.html'), label: '実績' },
  { href: applyBasePath('/experience.html'), label: '職歴' },
  { href: applyBasePath('/contact.html'), label: 'お問い合わせ' },
  { href: applyBasePath('/privacy.html'), label: 'プライバシーポリシー' },
  { href: applyBasePath('/terms.html'), label: '利用規約' },
  { href: applyBasePath('/license-page.html'), label: 'ライセンス' }
];

export const socialLinks: LinkItem[] = [
  { href: 'https://zenn.dev/seichan', icon: 'fas fa-blog', label: 'Zenn', external: true },
  { href: 'mailto:0123ook.biz@gmail.com', icon: 'fas fa-envelope', label: 'Email', external: false }
];

export const contactEmail = '0123ook.biz@gmail.com';

// ページファイルで使用する便利な定数
export const PAGE_LINKS = {
  HOME: applyBasePath('/index.html'),
  ABOUT: applyBasePath('/about.html'),
  SKILLS: applyBasePath('/skills.html'),
  WORKS: applyBasePath('/works.html'),
  EXPERIENCE: applyBasePath('/experience.html'),
  CONTACT: applyBasePath('/contact.html'),
  PRIVACY: applyBasePath('/privacy.html'),
  TERMS: applyBasePath('/terms.html'),
  LICENSE: applyBasePath('/license-page.html')
} as const;

// ボタン用のリンク定義
export const CTA_LINKS = {
  VIEW_WORKS: { href: PAGE_LINKS.WORKS, label: '制作実績を見る' },
  VIEW_ALL_WORKS: { href: PAGE_LINKS.WORKS, label: '全ての実績を見る' },
  CONTACT_US: { href: PAGE_LINKS.CONTACT, label: 'お問い合わせ' },
  LEARN_MORE: { href: PAGE_LINKS.ABOUT, label: '詳しく見る' },
  VIEW_SKILLS: { href: PAGE_LINKS.SKILLS, label: '全てのスキルを見る' },
  VIEW_EXPERIENCE: { href: PAGE_LINKS.EXPERIENCE, label: '経歴を見る' }
} as const;

// アセット（画像・動画）用のパス定義
export const ASSETS = {
  // プロフィール画像
  PROFILE_IMAGE: applyBasePath('/images/profile.jpg'),
  SAKURA_IMAGE: applyBasePath('/images/sakura.jpg'),

  // プロジェクト画像
  GADGET_COMPASS_PC: applyBasePath('/images/gadget-compass-pc.png'),
  GADGET_COMPASS_MOBILE: applyBasePath('/images/ガジェットコンパス_スマホ.png'),
  AUTO_VIDEO_THUMBNAIL: applyBasePath('/images/自動動画生成サムネ.png'),

  // 共通アセット
  OGP_DEFAULT: applyBasePath('/images/profile.jpg'),
  VIDEO_THUMBNAIL: applyBasePath('/images/video-thumbnail.jpg'),
  PLACEHOLDER: applyBasePath('/images/placeholder.jpg'),

  // 動画
  FINAL_VIDEO: applyBasePath('/videos/final_video.mp4')
} as const;
