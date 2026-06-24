import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://brainfitankara.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BrainFit Ankara — Bilişsel Gelişim Merkezi | Cog-Map Zihin Check-Up',
    template: '%s | BrainFit Ankara',
  },
  description: 'BrainFit Ankara, çocukların dikkat, hafıza ve bilişsel gelişimini bilimsel değerlendirme ve kişiye özel egzersiz programlarıyla destekleyen bütünsel bir zihin gelişim merkezidir.',
  keywords: 'BrainFit Ankara, bilişsel gelişim, dikkat eksikliği, DEHB, disleksi, cog-map, zihin gelişim merkezi, çocuk gelişimi',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'BrainFit Ankara',
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
}

// GEO (Generative Engine Optimization): AI arama motorları için yapısal veri
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'EducationalOrganization'],
      '@id': `${SITE_URL}/#organization`,
      name: 'BrainFit Ankara',
      alternateName: 'BrainFit Ankara Bilişsel Gelişim Merkezi',
      description:
        'BrainFit Ankara, çocukların dikkat, hafıza, görsel-işitsel beceriler, psiko-motor gelişim ve sosyal-duygusal becerilerini bütünsel yaklaşımla destekleyen bir zihin gelişim merkezidir. Cog-Map Zihin Check-Up ile bilimsel değerlendirme yapılır, kişiye özel egzersiz programları oluşturulur.',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ankara',
        addressCountry: 'TR',
      },
      areaServed: { '@type': 'City', name: 'Ankara' },
      knowsAbout: [
        'Bilişsel Gelişim',
        'Dikkat Eksikliği Hiperaktivite Bozukluğu (DEHB)',
        'Disleksi',
        'Öğrenme Güçlüğü',
        'Cog-Map Zihin Check-Up',
        'Psiko-motor Gelişim',
        'Görsel Beceriler',
        'İşitsel Beceriler',
        'Sosyal-Duygusal Gelişim',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'BrainFit Ankara Programları',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cog-Map Zihin Check-Up' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'BrainFit Junior (4–6 yaş)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'BrainFit Scholar (6–18 yaş)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DEHB Destek Programı' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disleksi Destek Programı' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'BrainFit Ankara',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'tr-TR',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
