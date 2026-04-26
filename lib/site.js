export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/deities', label: 'Deities' },
  { href: '/services', label: 'Services' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const basePath = process.env.GITHUB_PAGES !== 'false' ? '/ShriChakra-Mandiram' : '';

export function withBasePath(path) {
  if (!path || path.startsWith('http') || path.startsWith('#')) return path;
  return `${basePath}${path}`;
}
