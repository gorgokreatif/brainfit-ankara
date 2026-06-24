import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrainFit Ankara — Bilişsel Gelişim Merkezi | Cog-Map Zihin Check-Up',
  description: 'BrainFit Ankara, çocukların dikkat, hafıza ve bilişsel gelişimini bilimsel değerlendirme ve kişiye özel egzersiz programlarıyla destekleyen bütünsel bir zihin gelişim merkezidir.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
