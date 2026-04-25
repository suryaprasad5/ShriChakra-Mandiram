import Link from 'next/link';
import { navItems } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="om-footer">ॐ</span>
          <span>ShriChakra Mandiram</span>
        </div>
        <div className="footer-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <p className="footer-address">123 Mandir Marg, Bengaluru, Karnataka 560001 · +91 98765 43210</p>
        <p className="footer-copy">© 2025 ShriChakra Mandiram. All rights reserved. · Jai Mata Di 🙏</p>
      </div>
    </footer>
  );
}
