export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/deities', label: 'Deities' },
  { href: '/sevas', label: 'Sevas' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/contact', label: 'Contact' },
];

export const basePath = process.env.GITHUB_PAGES !== 'false' ? '/ShriChakra-Mandiram' : '';

export const siteName = 'Shreechakra Mandiram';

export const fullTempleName = 'Shreevidya Shreechakra Mahameru Mandiram';

export const trustAddress = [
  'SHREEVIDYA UPASANA MAHAPEETAM TRUST (R).',
  'Regd. Office: Sy. No. 46/1, 3rd Main, Veeranjaneya Nagar, Turahalli,',
  'Subrahmanyapura Post, Uttarahalli Hobli, Bangalore - 560061',
];

export function withBasePath(path) {
  if (!path || path.startsWith('http') || path.startsWith('#')) return path;
  return `${basePath}${path}`;
}
