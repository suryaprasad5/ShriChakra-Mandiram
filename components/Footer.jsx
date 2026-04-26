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
        <p className="footer-address">Srichakra LALITHA MANDIRAM Uttarahalli to kengeri Road, Near Paduka Mandir, Uttarahalli Hobli, Landmark -- Just before to patalamma temple cross, Gubbalala, Subramanyapura, Bengaluru, Karnataka 560061 · +91 98867 14586</p>
        <p className="footer-copy">© 2026 ShriChakra Mandiram. All rights reserved. · 🙏</p>
      </div>
    </footer>
  );
}
