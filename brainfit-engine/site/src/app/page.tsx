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

const STATS = [
  { num: '3.000+', label: 'Değerlendirme', icon: '📊' },
  { num: '5',      label: 'Beyin Alanı',   icon: '🧠' },
  { num: '8+',     label: 'Yıllık Deneyim', icon: '🏆' },
  { num: '%94',    label: 'Aile Memnuniyeti', icon: '⭐' },
];

const STEPS = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: 'Ücretsiz Değerlendirme',
    desc: 'Zihin Check-Up ile çocuğunuzun 5 temel beyin alanı 36 alt parametrede ölçülür. Güçlü ve gelişime açık alanlar belirlenir.',
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Kişiye Özel Program',
    desc: 'Değerlendirme sonuçlarına göre tamamen kişiselleştirilmiş dijital beyin egzersiz programı hazırlanır.',
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Ölçülebilir Sonuç',
    desc: 'Her seans verisi kaydedilir, gelişim grafikle takip edilir. Aile düzenli ilerleme raporu alır.',
  },
];

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
      <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a3258 0%, var(--primary-deep) 40%, #1a5f8f 100%)' }}>
        {/* Animated neural dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          {[
            { cx: '12%', cy: '20%', r: 5 },
            { cx: '78%', cy: '12%', r: 7 },
            { cx: '62%', cy: '72%', r: 4 },
            { cx: '88%', cy: '48%', r: 5 },
            { cx: '35%', cy: '82%', r: 3 },
          ].map((dot, i) => (
            <svg key={i} className="neural-dot absolute" style={{ left: dot.cx, top: dot.cy, opacity: 0.15 }}
              width={dot.r * 2 + 90} height={dot.r * 2 + 90}
              viewBox={`0 0 ${dot.r * 2 + 90} ${dot.r * 2 + 90}`}>
              <circle cx={dot.r + 45} cy={dot.r + 45} r={dot.r} fill="#1FA8A0"/>
              <circle cx={dot.r + 45} cy={dot.r + 45} r={dot.r + 42} fill="none" stroke="#1FA8A0" strokeWidth="0.5"/>
            </svg>
          ))}
        </div>

        <Container className="relative z-10 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(31,168,160,0.22)', color: 'var(--accent)', border: '1px solid rgba(31,168,160,0.3)' }}>
              🧠 BrainFit Ankara
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-[1.1] text-white mb-6">
              {home.hero.headline}
            </h1>
            <p className="text-lg md:text-xl mb-10 font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {home.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={home.hero.ctaPrimary.href}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white transition-all hover:brightness-105 hover:shadow-xl active:scale-95"
                style={{ backgroundColor: 'var(--warm)', boxShadow: '0 4px 20px rgba(232,137,59,0.45)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                {home.hero.ctaPrimary.label}
              </Link>
              <Link href={home.hero.ctaSecondary.href}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold transition-all hover:bg-white/15 active:scale-95"
                style={{ border: '2px solid rgba(255,255,255,0.35)', color: 'white' }}>
                {home.hero.ctaSecondary.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-10">
              {['İlaçsız Yaklaşım', 'Bilimsel Temelli', 'Singapur Kökenli', 'Harvard & Stanford'].map(b => (
                <span key={b} className="text-xs font-semibold flex items-center gap-1.5"
                  style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--accent)">
                    <circle cx="6" cy="6" r="6"/>
                    <path d="M3.5 6l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] relative"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Image src="/images/hero.jpg" alt="BrainFit Ankara eğitim seansı" fill className="object-cover" priority sizes="(max-width: 1280px) 50vw, 600px"/>
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-6 rounded-2xl p-4 shadow-xl"
                style={{ backgroundColor: 'white', border: '1px solid rgba(22,32,46,0.07)' }}>
                <p className="text-2xl font-extrabold font-display" style={{ color: 'var(--primary)' }}>3.000+</p>
                <p className="text-xs font-body" style={{ color: 'rgba(22,32,46,0.6)' }}>Başarılı değerlendirme</p>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 shadow-xl"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                <p className="text-xs font-bold text-center">%94<br/><span className="font-normal opacity-90">Memnuniyet</span></p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
        <Container className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/20">
            {STATS.map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="text-3xl font-extrabold font-display">{s.num}</p>
                <p className="text-xs mt-1 font-body" style={{ color: 'rgba(255,255,255,0.75)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── SYMPTOMS ──────────────────────────────────────────────────────── */}
      <Section bg="white" id="belirtiler">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(232,137,59,0.1)', color: 'var(--warm)' }}>
                Tanıdık Mı?
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--ink)', lineHeight: 1.15 }}>
                {home.symptoms.title}
              </h2>
              <p className="font-body mb-7 text-base leading-relaxed" style={{ color: 'rgba(22,32,46,0.65)' }}>{home.symptoms.intro}</p>
              <ul className="space-y-3 mb-8">
                {home.symptoms.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-sm" style={{ color: 'var(--ink)' }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: 'rgba(232,137,59,0.12)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="var(--warm)"><circle cx="5" cy="5" r="3"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-body italic mb-6" style={{ color: 'rgba(22,32,46,0.5)' }}>{home.symptoms.bridge}</p>
              <Button href="/degerlendirme" size="lg">{home.symptoms.ctaLabel}</Button>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] relative" style={{ backgroundColor: 'var(--paper)' }}>
                <Image src="/images/belirti.jpg" alt="Kaygılı ebeveyn çocukla" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,76,130,0.4) 0%, transparent 60%)' }}/>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ── 3-ADIM SÜREÇ ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--paper)' }} className="py-16 md:py-24">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(31,111,178,0.1)', color: 'var(--primary)' }}>
                Nasıl Çalışır?
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold" style={{ color: 'var(--ink)' }}>
                3 Adımda BrainFit
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.2 }}/>

            {STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative text-center px-4">
                  {/* Step number */}
                  <div className="text-6xl font-extrabold font-display mb-4 leading-none" style={{ color: 'rgba(31,111,178,0.08)' }}>{step.num}</div>
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center -mt-12"
                    style={{ backgroundColor: i === 0 ? 'var(--warm)' : i === 1 ? 'var(--primary)' : 'var(--accent)', color: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold mb-3" style={{ color: 'var(--ink)' }}>{step.title}</h3>
                  <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.65)' }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={350}>
            <div className="text-center mt-12">
              <Button href="/zihin-check-up" variant="primary" size="lg">Zihin Check-Up Nedir?</Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ── POSITIONING ─────────────────────────────────────────────────── */}
      <Section bg="white" id="hakkinda">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal delay={80}>
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] relative">
                <Image src="/images/yaklasim.jpg" alt="BrainFit Ankara stüdyo" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,76,130,0.3) 0%, transparent 60%)' }}/>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(31,168,160,0.1)', color: 'var(--accent)' }}>
                Neden BrainFit?
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-5" style={{ color: 'var(--ink)', lineHeight: 1.15 }}>
                {home.positioning.title}
              </h2>
              {home.positioning.body.split('\n\n').map((para, i) => (
                <p key={i} className="font-body mb-4 leading-relaxed text-base" style={{ color: 'rgba(22,32,46,0.7)' }}>{para}</p>
              ))}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {home.positioning.trustSignals.map((ts) => (
                  <div key={ts.label} className="rounded-2xl p-4 transition-shadow hover:shadow-md"
                    style={{ backgroundColor: 'var(--paper)', border: '1px solid rgba(22,32,46,0.07)' }}>
                    <p className="text-sm font-bold font-display mb-1" style={{ color: 'var(--primary-deep)' }}>{ts.label}</p>
                    <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.58)' }}>{ts.detail}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ── 5 ALANLAR ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a3258 0%, var(--primary-deep) 60%, #0d5a8a 100%)' }}>
        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10" aria-hidden>
          <svg width="100%" height="100%"><defs><pattern id="areaDots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="16" cy="16" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#areaDots)"/></svg>
        </div>

        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(31,168,160,0.25)', color: 'var(--accent)' }}>
                Beyin Profili
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-4">{home.areas.title}</h2>
              <p className="font-body max-w-2xl mx-auto text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>{home.areas.subtitle}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {home.areas.items.map((area, i) => (
              <ScrollReveal key={area.id} delay={i * 70}>
                <div className="rounded-2xl p-6 text-center transition-all hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ backgroundColor: i === 0 ? 'var(--warm)' : i === 1 ? 'var(--accent)' : i === 2 ? 'var(--primary)' : i === 3 ? '#8B5CF6' : '#EC4899' }}>
                    {areaIcons[area.icon] ?? null}
                  </div>
                  <p className="font-bold font-display text-sm text-white mb-2">{area.label}</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{area.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Link href="/degerlendirme"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white transition-all hover:brightness-105 hover:shadow-xl active:scale-95"
                style={{ backgroundColor: 'var(--warm)', boxShadow: '0 4px 20px rgba(232,137,59,0.4)' }}>
                Kendi Profilimi Öğren
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ── PROGRAMS ────────────────────────────────────────────────────── */}
      <Section bg="paper" id="programlar">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(31,111,178,0.1)', color: 'var(--primary)' }}>
                Yaşa Özel
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold" style={{ color: 'var(--ink)' }}>Her Yaş İçin Program</h2>
              <p className="font-body mt-3 max-w-xl mx-auto" style={{ color: 'rgba(22,32,46,0.6)' }}>
                Junior&apos;dan Senior&apos;a — yaşa ve profile özel, kanıta dayalı egzersiz programları.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col bg-white"
                  style={{ border: '1px solid rgba(22,32,46,0.07)' }}>
                  <div className="relative h-48 overflow-hidden"
                    style={{ backgroundColor: p.color === 'warm' ? 'var(--warm)' : p.color === 'primary' ? 'var(--primary)' : 'var(--primary-deep)' }}>
                    <Image src={p.image} alt={`BrainFit ${p.name} programı`} fill className="object-cover opacity-50" sizes="(max-width: 768px) 100vw, 33vw"/>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <p className="text-5xl font-display font-extrabold drop-shadow-lg">{p.name}</p>
                      <span className="mt-2 text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>{p.ages}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="font-body text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(22,32,46,0.7)' }}>{p.tagline}</p>
                    <Link href={`/programlar#${p.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold font-display transition-colors hover:gap-3"
                      style={{ color: 'var(--primary)' }}>
                      Detaylı bilgi
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <Section bg="white" id="yorumlar">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(232,137,59,0.1)', color: 'var(--warm)' }}>
                Ailelerin Sesi
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold" style={{ color: 'var(--ink)' }}>{home.testimonials.title}</h2>
            </div>
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

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--paper)' }} className="py-16 md:py-24">
        <Container narrow>
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(31,111,178,0.1)', color: 'var(--primary)' }}>
                Sıkça Sorulanlar
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold" style={{ color: 'var(--ink)' }}>{home.faq.title}</h2>
            </div>
          </ScrollReveal>
          <Faq items={home.faq.items} />
        </Container>
      </section>

      {/* ── CLOSING CTA ─────────────────────────────────────────────────── */}
      <CtaBlock
        title={home.closingCta.title}
        body={home.closingCta.body}
        ctaLabel={home.closingCta.ctaLabel}
        ctaHref={home.closingCta.ctaHref}
      />
    </>
  );
}
