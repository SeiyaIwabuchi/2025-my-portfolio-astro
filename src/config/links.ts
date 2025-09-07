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
  { href: '/terms', label: '利用規約' }
];

export const socialLinks: LinkItem[] = [
  { href: 'https://zenn.dev/seichan', icon: 'fas fa-blog', label: 'Zenn', external: true },
  { href: 'mailto:0123ook.biz@gmail.com', icon: 'fas fa-envelope', label: 'Email', external: false }
];

export const contactEmail = '0123ook.biz@gmail.com';
