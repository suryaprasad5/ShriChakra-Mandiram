import Link from 'next/link';
import { navItems, siteName, trustAddress } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="om-footer">ॐ</span>
          <span>{siteName}</span>
        </div>
        <div className="footer-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <p className="footer-address">{trustAddress.join(' ')}</p>
        <p className="footer-copy">© 2026 {siteName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
