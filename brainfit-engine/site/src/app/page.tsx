import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getHomeData, getProgramsData } from '@/lib/content';
import { faqSchema } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Button from '@/components/Button';
import Faq from '@/components/Faq';
import TestimonialCard from '@/components/TestimonialCard';
import ScrollReveal from '@/components/ScrollReveal';
import CtaBlock from '@/components/CtaBlock';

export const metadata: Metadata = {
  title: 'BrainFit Ankara — Beyin Egzersizi & Zihin Gelişim Merkezi',
  description: 'BrainFit Ankara: ilaçsız, bilimsel temelli zihin gelişim programları. Ücretsiz değerlendirme ile çocuğunuzun güçlü ve gelişime açık alanlarını keşfedin.',
  alternates: { canonical: 'https://brainfitankara.com' },
};

const areaIcons: Record<string, ReactElement> = {
  focus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
      <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="11"/>
    </svg>
  ),
  ear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
      <path d="M3 18c0-5 3-9 9-9s9 4 9 9M12 3v2M12 18a3 3 0 01-3 3"/>
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  hand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
      <path d="M18 11V6a2 2 0 00-4 0v5M14 10V4a2 2 0 00-4 0v6M10 9.5V4a2 2 0 00-4 0v10l-2-2a2 2 0 00-3 3l4 4a6 6 0 0012 0v-6a2 2 0 00-4 0z"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
};

export default function HomePage() {
  const home = getHomeData() as {
    hero: { headline: string; subheadline: string; ctaPrimary: {label:string;href:string}; ctaSecondary: {label:string;href:string} };
    symptoms: { title: string; intro: string; items: string[]; bridge: string; ctaLabel: string };
    positioning: { title: string; body: string; trustSignals: Array<{label:string;detail:string}> };
    areas: { title: string; subtitle: string; items: Array<{id:string;label:string;description:string;icon:string}> };
    testimonials: { title: string; items: Array<{quote:string;name:string;location:string;program:string}> };
    faq: { title: string; items: Array<{q:string;a:string}> };
    closingCta: { title: string; body: string; ctaLabel: string; ctaHref: string };
  };
  const { programs } = getProgramsData();

  const faqJsonLd = faqSchema(home.faq.items);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ backgroundColor: 'var(--primary-deep)' }}
      >
        {/* CSS neural dots bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          {[
            { cx: '15%', cy: '25%', r: 4 },
            { cx: '80%', cy: '15%', r: 6 },
            { cx: '65%', cy: '70%', r: 3 },
            { cx: '30%', cy: '80%', r: 5 },
            { cx: '90%', cy: '50%', r: 4 },
          ].map((dot, i) => (
            <svg
              key={i}
              className="neural-dot absolute"
              style={{ left: dot.cx, top: dot.cy, opacity: 0.18 }}
              width={dot.r * 2 + 80}
              height={dot.r * 2 + 80}
              viewBox={`0 0 ${dot.r * 2 + 80} ${dot.r * 2 + 80}`}
            >
              <circle cx={dot.r + 40} cy={dot.r + 40} r={dot.r} fill="#1FA8A0"/>
              <circle cx={dot.r + 40} cy={dot.r + 40} r={dot.r + 36} fill="none" stroke="#1FA8A0" strokeWidth="0.5"/>
            </svg>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,76,130,0.4) 0%, transparent 60%)' }} />

        <Container className="relative z-10 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-block text-xs font-semibold tracking-widest uppercase mb-5 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}>
              BrainFit Ankara
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-white mb-6">
              {home.hero.headline}
            </h1>
            <p className="text-lg md:text-xl mb-10 font-body" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {home.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href={home.hero.ctaPrimary.href} variant="secondary" size="lg">
                {home.hero.ctaPrimary.label}
              </Button>
              <Button
                href={home.hero.ctaSecondary.href}
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10"
              >
                {home.hero.ctaSecondary.label}
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] relative bg-white/5">
              <Image
                src="/images/hero.jpg"
                alt="BrainFit Ankara eğitim seansı"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 50vw, 600px"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── SYMPTOMS ──────────────────────────────────────────────────────── */}
      <Section bg="white" id="belirtiler">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3" style={{ color: 'var(--ink)' }}>
                {home.symptoms.title}
              </h2>
              <p className="font-body mb-6" style={{ color: 'rgba(22,32,46,0.65)' }}>{home.symptoms.intro}</p>
              <ul className="space-y-3 mb-8">
                {home.symptoms.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body" style={{ color: 'var(--ink)' }}>
                    <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="9" fill="var(--accent)" opacity=".15"/>
                      <circle cx="9" cy="9" r="3.5" fill="var(--accent)"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-body italic mb-5" style={{ color: 'rgba(22,32,46,0.55)' }}>{home.symptoms.bridge}</p>
              <Button href="/degerlendirme">{home.symptoms.ctaLabel}</Button>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative" style={{ backgroundColor: 'var(--paper)' }}>
                <Image
                  src="/images/belirti.jpg"
                  alt="Kaygılı ebeveyn çocukla"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ── POSITIONING ────────────────────────────────────────────────────── */}
      <Section bg="paper" id="hakkinda">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={80}>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative" style={{ backgroundColor: 'var(--primary-deep)', opacity: 0.95 }}>
                <Image
                  src="/images/yaklasim.jpg"
                  alt="BrainFit Ankara stüdyo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-5" style={{ color: 'var(--ink)' }}>
                {home.positioning.title}
              </h2>
              {home.positioning.body.split('\n\n').map((para, i) => (
                <p key={i} className="font-body mb-4 leading-relaxed" style={{ color: 'rgba(22,32,46,0.72)' }}>{para}</p>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {home.positioning.trustSignals.map((ts) => (
                  <div key={ts.label} className="rounded-xl p-4" style={{ backgroundColor: 'white', border: '1px solid var(--border-subtle)' }}>
                    <p className="text-sm font-semibold font-display mb-1" style={{ color: 'var(--primary-deep)' }}>{ts.label}</p>
                    <p className="text-xs font-body" style={{ color: 'rgba(22,32,46,0.6)' }}>{ts.detail}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ── 5 ALANLAR ──────────────────────────────────────────────────────── */}
      <Section bg="primary-deep" id="alanlar">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-3">
              {home.areas.title}
            </h2>
            <p className="text-center font-body mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {home.areas.subtitle}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {home.areas.items.map((area, i) => (
              <ScrollReveal key={area.id} delay={i * 70}>
                <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    {areaIcons[area.icon] ?? null}
                  </div>
                  <p className="font-semibold font-display text-sm text-white mb-1">{area.label}</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{area.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={400}>
            <div className="text-center mt-10">
              <Button href="/degerlendirme" variant="secondary" size="lg">
                Kendi Profilimi Öğren
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ── PROGRAMS ─────────────────────────────────────────────────────── */}
      <Section bg="white" id="programlar">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3" style={{ color: 'var(--ink)' }}>
              Her Yaş İçin Program
            </h2>
            <p className="text-center font-body mb-12" style={{ color: 'rgba(22,32,46,0.6)' }}>
              Junior&rsquo;dan Senior&rsquo;a — yaşa ve profile özel, kanıta dayalı egzersiz programları.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col" style={{ border: '1px solid var(--border-subtle)' }}>
                  <div
                    className="relative h-44 overflow-hidden"
                    style={{ backgroundColor: p.color === 'warm' ? 'var(--warm)' : p.color === 'primary' ? 'var(--primary)' : 'var(--primary-deep)' }}
                  >
                    <Image
                      src={p.image}
                      alt={`BrainFit ${p.name} programı`}
                      fill
                      className="object-cover opacity-60"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <p className="text-4xl font-display font-extrabold">{p.name}</p>
                      <p className="text-sm opacity-80">{p.ages}</p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 bg-white">
                    <p className="font-body text-sm leading-relaxed mb-4 flex-1" style={{ color: 'rgba(22,32,46,0.7)' }}>
                      {p.tagline}
                    </p>
                    <Link
                      href={`/programlar#${p.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold font-display hover:underline"
                      style={{ color: 'var(--primary)' }}
                    >
                      Detaylı bilgi
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Section bg="paper" id="yorumlar">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12" style={{ color: 'var(--ink)' }}>
              {home.testimonials.title}
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {home.testimonials.items.map((t, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <TestimonialCard {...t} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section bg="white" id="sss">
        <Container narrow>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10" style={{ color: 'var(--ink)' }}>
              {home.faq.title}
            </h2>
          </ScrollReveal>
          <Faq items={home.faq.items} />
        </Container>
      </Section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <CtaBlock
        title={home.closingCta.title}
        body={home.closingCta.body}
        ctaLabel={home.closingCta.ctaLabel}
        ctaHref={home.closingCta.ctaHref}
      />
    </>
  );
}
