export interface LinkItem {
  href: string;
  label?: string;
  icon?: string;
  external?: boolean;
}

export const SITE_NAME = "Seiya Iwabuchi's Portfolio";
export const SITE_URL = "https://your-portfolio-domain.com";

export const navItems: LinkItem[] = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: '自己紹介' },
  { href: '/skills', label: 'スキル' },
  { href: '/works', label: '実績' },
  { href: '/experience', label: '職歴' },
  { href: '/contact', label: 'お問い合わせ' }
];

export const footerLinks: LinkItem[] = [
  { href: '/about', label: '自己紹介' },
  { href: '/skills', label: 'スキル' },
  { href: '/works', label: '実績' },
  { href: '/experience', label: '職歴' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/terms', label: '利用規約' },
  { href: '/license', label: 'ライセンス' }
];

export const socialLinks: LinkItem[] = [
  { href: 'https://zenn.dev/seichan', icon: 'fas fa-blog', label: 'Zenn', external: true },
  { href: 'mailto:0123ook.biz@gmail.com', icon: 'fas fa-envelope', label: 'Email', external: false }
];

export const contactEmail = '0123ook.biz@gmail.com';

// ページファイルで使用する便利な定数
export const PAGE_LINKS = {
  HOME: '/',
  ABOUT: '/about',
  SKILLS: '/skills',
  WORKS: '/works',
  EXPERIENCE: '/experience',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  LICENSE: '/license'
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
