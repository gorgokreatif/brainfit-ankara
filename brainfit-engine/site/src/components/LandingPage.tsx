import type { Metadata } from 'next';
import Image from 'next/image';
import Container from './Container';
import Section from './Section';
import Button from './Button';
import Faq from './Faq';
import CtaBlock from './CtaBlock';
import ScrollReveal from './ScrollReveal';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';
import { PageContent } from '@/lib/content';

interface Props {
  page: PageContent;
  breadcrumbs: Array<{ name: string; href: string }>;
}

export default function LandingPage({ page, breadcrumbs }: Props) {
  const bcSchema = breadcrumbSchema(breadcrumbs);
  const faqJsonLd = faqSchema(page.faq);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <Section bg="primary-deep" py="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}
              >
                {page.hero.eyebrow}
              </p>
              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white mb-5">
                {page.hero.title}
              </h1>
              <p className="text-lg font-body mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {page.hero.body}
              </p>
              <Button href="/degerlendirme" variant="secondary" size="lg">
                Ücretsiz Değerlendirme Al
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] relative" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <Image
                  src={page.hero.image}
                  alt={page.hero.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1280px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── SYMPTOMS ──────────────────────────────────────────────── */}
      <Section bg="white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <h2 className="text-3xl font-display font-bold mb-6" style={{ color: 'var(--ink)' }}>
                {page.symptoms.title}
              </h2>
              <ul className="space-y-3">
                {page.symptoms.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body" style={{ color: 'var(--ink)' }}>
                    <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="9" fill="var(--warm)" opacity=".15"/>
                      <circle cx="9" cy="9" r="3.5" fill="var(--warm)"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* ── APPROACH ──────────────────────────────────────── */}
            <ScrollReveal delay={100}>
              <div className="rounded-2xl p-7" style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border-subtle)' }}>
                <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--ink)' }}>
                  {page.approach.title}
                </h2>
                {page.approach.body.split('\n\n').map((para, i) => (
                  <p key={i} className="font-body mb-3 leading-relaxed" style={{ color: 'rgba(22,32,46,0.72)' }}>{para}</p>
                ))}
                <div
                  className="mt-4 p-4 rounded-xl border-l-4 font-body text-sm italic"
                  style={{ borderColor: 'var(--accent)', backgroundColor: 'rgba(31,168,160,0.06)', color: 'rgba(22,32,46,0.65)' }}
                >
                  {page.approach.trustNote}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <Section bg="paper">
        <Container narrow>
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-center mb-10" style={{ color: 'var(--ink)' }}>
              Sık Sorulan Sorular
            </h2>
          </ScrollReveal>
          <Faq items={page.faq} />
        </Container>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <CtaBlock
        title={page.cta.title}
        body={page.cta.body}
        ctaLabel={page.cta.ctaLabel}
        ctaHref={page.cta.ctaHref}
      />
    </>
  );
}

export function generateLandingMetadata(page: PageContent): Metadata {
  return {
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.meta.keywords,
  };
}
