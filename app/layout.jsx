import './globals.css';
import AppChrome from '@/components/AppChrome';
import { basePath, siteName } from '@/lib/site';

export const metadata = {
  title: siteName,
  description: `Sacred temple website for ${siteName}.`,
  icons: {
    icon: `${basePath}/favicon.ico`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
        <script src={`${basePath}/temple-content-config.js`} />
      </head>
      <body>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
