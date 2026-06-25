import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zihin Check-Up Mini | BrainFit Ankara',
  description: 'Ücretsiz 5 dakikalık bilişsel değerlendirme testi.',
  robots: { index: false },
}

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col">
      {children}
    </div>
  )
}
