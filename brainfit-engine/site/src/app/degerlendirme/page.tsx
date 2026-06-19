import type { Metadata } from 'next';
import { getAssessmentData, getSiteData } from '@/lib/content';
import Assessment from '@/components/Assessment';

export const metadata: Metadata = {
  title: 'Ücretsiz Zihin Değerlendirmesi',
  description: '7 gözlem sorusuyla çocuğunuzun 5 gelişim alanındaki profilini anında görün. Tanı değil, yön. Ücretsiz ve anonim.',
  alternates: { canonical: 'https://brainfitankara.com/degerlendirme' },
};

export default function DegerlendirmePage() {
  const data = getAssessmentData() as unknown as Parameters<typeof Assessment>[0]['data'];
  const site = getSiteData();
  return <Assessment data={data} whatsapp={site.whatsapp} />;
}
