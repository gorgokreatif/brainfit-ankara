import type { Metadata } from 'next';
import Image from 'next/image';
import { getProgramsData } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Button from '@/components/Button';
import CtaBlock from '@/components/CtaBlock';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Zihin Check-Up — 5 Alan Değerlendirmesi',
  description: 'BrainFit Zihin Check-Up, beynin 5 temel alanını ölçen kapsamlı bir profil değerlendirmesidir. Tanı değil, gelişim haritası.',
  alternates: { canonical: 'https://brainfitankara.com/zihin-check-up' },
};

const AREAS = [
  { id: 'dikkat', label: 'Dikkat', color: 'var(--primary)', desc: 'Odaklanma süresi, çalışma hafızası, dürtü kontrolü.' },
  { id: 'isitsel', label: 'İşitsel İşlem', color: 'var(--accent)', desc: 'Sözel bilgiyi işleme, fonolojik farkındalık.' },
  { id: 'gorsel', label: 'Görsel İşlem', color: 'var(--primary-deep)', desc: 'Harf tanıma, satır takibi, uzamsal algı.' },
  { id: 'motor', label: 'Motor Koordinasyon', color: 'var(--warm)', desc: 'El-göz koordinasyonu, yazı becerisi, denge.' },
  { id: 'sosyal', label: 'Sosyal-Duygusal', color: '#6B7280', desc: 'Duygusal düzenleme, empati, ilişki becerileri.' },
];

export default function ZihinCheckUpPage() {
  const { checkup } = getProgramsData();
  const bcSchema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Zihin Check-Up', href: '/zihin-check-up' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <Section bg="primary-deep" py="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}>
                {checkup.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-5 leading-tight">
                {checkup.name}
              </h1>
              <p className="text-lg font-body mb-4" style={{ color: 'rgba(255,255,255,0.78)' }}>
                {checkup.tagline}
              </p>
              <p className="font-body mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>{checkup.description}</p>
              <div
                className="inline-block px-4 py-3 rounded-xl text-sm font-body italic"
                style={{ backgroundColor: 'rgba(31,168,160,0.15)', color: 'rgba(255,255,255,0.8)' }}
              >
                {checkup.note}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] relative" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <Image src={checkup.image} alt="Zihin Check-Up değerlendirmesi" fill className="object-cover" priority sizes="(max-width: 1280px) 50vw, 600px"/>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5 Areas */}
      <Section bg="white">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3" style={{ color: 'var(--ink)' }}>5 Temel Alan</h2>
            <p className="text-center font-body mb-12 max-w-xl mx-auto" style={{ color: 'rgba(22,32,46,0.6)' }}>
              Zihin Check-Up bu 5 alanı standart görevler ve uzman gözlemiyle ölçer. Güçlü ve gelişime açık alanlar ortaya çıkar.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {AREAS.map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 60}>
                <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3" style={{ backgroundColor: a.color + '20' }}>
                    <div className="w-full h-full rounded-xl" style={{ backgroundColor: a.color, opacity: 0.7 }}/>
                  </div>
                  <p className="font-semibold font-display text-sm mb-1" style={{ color: 'var(--ink)' }}>{a.label}</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.6)' }}>{a.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process steps */}
      <Section bg="paper">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-center mb-12" style={{ color: 'var(--ink)' }}>
              Süreç Nasıl İşler?
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {checkup.steps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 80}>
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold font-display text-white"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {s.step}
                  </div>
                  {i < checkup.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5" style={{ backgroundColor: 'var(--border-subtle)' }}/>
                  )}
                  <p className="font-semibold font-display text-sm mb-1" style={{ color: 'var(--ink)' }}>{s.title}</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.6)' }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 text-sm font-body" style={{ color: 'rgba(22,32,46,0.55)' }}>
            <span>⏱ Süre: {checkup.duration}</span>
            <span className="hidden sm:block">·</span>
            <span>📄 Çıktı: {checkup.output}</span>
          </div>
        </Container>
      </Section>

      <CtaBlock
        title="Zihin Check-Up'ı bugün planlayın."
        body="Ücretsiz ilk görüşmede süreci, beklentileri ve uygunluk durumunu birlikte değerlendiriyoruz."
        ctaLabel="Ücretsiz Görüşme Al"
        ctaHref="/iletisim"
      />
    </>
  );
}
