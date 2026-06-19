import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import { getSiteData } from '@/lib/content';
import { localBusinessSchema } from '@/lib/seo';

const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: 'BrainFit Ankara — Beyin Egzersizi & Zihin Gelişim Merkezi',
    template: '%s | BrainFit Ankara',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? undefined,
  },
  description:
    'BrainFit Ankara: ilaçsız, bilimsel temelli zihin gelişim programları. Ücretsiz değerlendirme ile çocuğunuzun güçlü ve gelişime açık alanlarını keşfedin.',
  keywords: ['brainfit ankara', 'beyin egzersizi', 'zihin gelişim', 'disleksi', 'dikkat eksikliği', 'öğrenme güçlüğü ankara'],
  metadataBase: new URL('https://brainfitankara.com'),
  openGraph: {
    siteName: 'BrainFit Ankara',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSiteData();
  const schema = localBusinessSchema(site);

  return (
    <html lang="tr" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer site={site} />
        <WhatsAppFab whatsapp={site.whatsapp} />
      </body>
    </html>
  );
}
