import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VINTIE | Premium Men\'s Clothing Lagos',
  description: "Lagos' finest men's clothing store. Premium quality, unmatched style. 3rd Floor, E-Centre Sabo, Yaba, Lagos.",
  keywords: 'mens clothing lagos, fashion nigeria, vintie, yaba lagos fashion',
  openGraph: {
    title: 'VINTIE | Premium Men\'s Clothing Lagos',
    description: "Lagos' finest men's clothing store.",
    url: 'https://vintie.shop',
    siteName: 'VINTIE',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
