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
  title: 'Programlar — Junior, Scholar & Senior',
  description: 'BrainFit Ankara yaş grubuna göre zihin gelişim programları: Junior (3–6), Scholar (6–18), Senior (18+). Ücretsiz değerlendirme ile başlayın.',
  alternates: { canonical: 'https://brainfitankara.com/programlar' },
};

const COLOR_MAP: Record<string, string> = {
  warm: 'var(--warm)',
  primary: 'var(--primary)',
  'primary-deep': 'var(--primary-deep)',
};

export default function ProgramlarPage() {
  const { programs, checkup } = getProgramsData();
  const bcSchema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Programlar', href: '/programlar' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      {/* Hero */}
      <Section bg="primary-deep" py="lg">
        <Container>
          <div className="max-w-2xl">
            <p
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
              style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}
            >
              Programlar
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-5 leading-tight">
              Her yaş için, her profile özel.
            </h1>
            <p className="text-lg font-body mb-8" style={{ color: 'rgba(255,255,255,0.78)' }}>
              BrainFit programları tek tip değildir. Değerlendirme profilinize göre kişiselleştirilmiş bir yol çizilir.
            </p>
            <Button href="/degerlendirme" variant="secondary" size="lg">
              Ücretsiz Değerlendirme ile Başla
            </Button>
          </div>
        </Container>
      </Section>

      {/* Programs */}
      {programs.map((p, i) => {
        const even = i % 2 === 0;
        return (
          <Section key={p.id} id={p.id} bg={even ? 'white' : 'paper'}>
            <Container>
              <ScrollReveal>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${even ? '' : 'lg:grid-flow-dense'}`}>
                  <div className={even ? '' : 'lg:col-start-2'}>
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm font-semibold font-display mb-3"
                      style={{ backgroundColor: COLOR_MAP[p.color] + '18', color: COLOR_MAP[p.color] }}
                    >
                      {p.ages}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-2" style={{ color: 'var(--ink)' }}>
                      {p.name}
                    </h2>
                    <p className="text-lg font-body font-semibold mb-4" style={{ color: COLOR_MAP[p.color] }}>{p.tagline}</p>
                    <p className="font-body leading-relaxed mb-6" style={{ color: 'rgba(22,32,46,0.7)' }}>{p.description}</p>
                    <ul className="space-y-2 mb-6">
                      {p.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 font-body text-sm" style={{ color: 'var(--ink)' }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill={COLOR_MAP[p.color]} opacity=".12"/>
                            <path d="M5 8l2 2 4-4" stroke={COLOR_MAP[p.color]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm font-body italic mb-6" style={{ color: 'rgba(22,32,46,0.55)' }}>{p.process}</p>
                    <Button href="/degerlendirme">Ücretsiz Değerlendirme Al</Button>
                  </div>
                  <div className={even ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative" style={{ backgroundColor: 'var(--paper)' }}>
                      <Image src={p.image} alt={`BrainFit ${p.name} programı`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"/>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </Container>
          </Section>
        );
      })}

      {/* Checkup teaser */}
      <Section bg="primary-deep">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
                {checkup.subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{checkup.name}</h2>
              <p className="font-body text-sm mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>{checkup.tagline}</p>
              <p className="font-body leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>{checkup.description}</p>
              <div className="flex gap-4 mb-6">
                <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent)' }}>Süre</p>
                  <p className="text-sm text-white">{checkup.duration}</p>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent)' }}>Çıktı</p>
                  <p className="text-sm text-white">{checkup.output}</p>
                </div>
              </div>
              <Button href="/zihin-check-up" variant="secondary" size="lg">Check-Up Hakkında Daha Fazla</Button>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <ol className="space-y-4">
                {checkup.steps.map((s) => (
                  <li key={s.step} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-display"
                      style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                    >
                      {s.step}
                    </span>
                    <div>
                      <p className="font-semibold font-display text-white">{s.title}</p>
                      <p className="text-sm font-body" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <CtaBlock
        title="Hangi program sizin için?"
        body="Ücretsiz değerlendirme, çocuğunuzun profilini ortaya koyar ve en uygun programı belirlememizi sağlar."
        ctaLabel="Ücretsiz Değerlendirmeye Başla"
        ctaHref="/degerlendirme"
      />
    </>
  );
}
