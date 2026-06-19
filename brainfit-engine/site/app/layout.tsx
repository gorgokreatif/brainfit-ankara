import type { Metadata } from 'next';
import './theme.css';
import './globals.css';
import content from '../content/content.json';

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description ?? undefined,
  keywords: content.meta.keywords.join(', '),
  openGraph: {
    title: content.meta.title,
    description: content.meta.description ?? undefined,
    images: [{ url: '/generated/og.jpg', width: 1200, height: 630 }],
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
