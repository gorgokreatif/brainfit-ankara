import content from '../content/content.json';
import NeuralHero from '../components/NeuralHero';
import ScrollReveal from '../components/ScrollReveal';
import ParallaxSection from '../components/ParallaxSection';
import ImageWithFallback from '../components/ImageWithFallback';

const PLACEHOLDER_MAPS = 'https://www.google.com/maps/embed?pb=...';

export default function Home() {
  const { hero, intro, skills, programs, checkup, cta, contact, social } = content;
  const hasMap = contact.mapsEmbed && contact.mapsEmbed !== PLACEHOLDER_MAPS;

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{
          backgroundColor: 'rgba(14,27,42,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(54,192,201,0.1)',
        }}
      >
        <a href="#hero" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="BrainFit Ankara" className="h-9 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-6">
          {[
            { href: '#programs', label: 'Programlar' },
            { href: '#checkup', label: 'Check-Up' },
            { href: '#contact', label: 'İletişim' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(246,248,251,0.75)' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Randevu Al
          </a>
        </div>
        {/* Mobile CTA */}
        <a
          href="#contact"
          className="md:hidden px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Randevu
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <NeuralHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />

      {/* ── INTRO ───────────────────────────────────────────────────── */}
      <section id="intro" className="py-24" style={{ backgroundColor: 'var(--paper)' }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <ScrollReveal>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(27,95,176,0.1)', color: 'var(--primary)' }}
            >
              Hakkımızda
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: 'var(--ink)' }}>
              {intro.title}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(14,27,42,0.72)' }}>
              {intro.body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/generated/about.jpg"
                fallback="/generated/about.svg"
                alt="BrainFit Ankara stüdyo"
                className="w-full h-80 object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--primary-deep)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Geliştirdiğimiz Beceriler
            </h2>
            <p className="text-center mb-12" style={{ color: 'rgba(246,248,251,0.6)' }}>
              Beynin 5 temel alanını değerlendiriyor ve güçlendiriyoruz
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
              <ScrollReveal key={skill.name} delay={i * 70}>
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{ backgroundColor: 'rgba(246,248,251,0.07)' }}
                >
                  <div
                    className="w-11 h-11 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    {i + 1}
                  </div>
                  <p className="font-semibold text-white text-sm">{skill.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ────────────────────────────────────────────────── */}
      <section id="programs" className="py-24" style={{ backgroundColor: 'var(--paper)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: 'var(--ink)' }}>
              Programlarımız
            </h2>
            <p className="text-center mb-14" style={{ color: 'rgba(14,27,42,0.6)' }}>
              Her yaş grubuna özel, bilimsel temelli beyin egzersizi programları
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => {
              const headerBg =
                i === 0
                  ? 'var(--warm)'
                  : i === 1
                  ? 'var(--primary)'
                  : 'var(--primary-deep)';
              return (
                <ScrollReveal key={program.id} delay={i * 90}>
                  <div
                    className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
                    style={{ border: '1px solid rgba(14,27,42,0.07)' }}
                  >
                    <div
                      className="flex flex-col items-center justify-center py-10 px-6"
                      style={{ backgroundColor: headerBg }}
                    >
                      <p className="text-5xl font-extrabold text-white mb-1">{program.name}</p>
                      <p className="text-sm text-white opacity-80">{program.ages}</p>
                    </div>
                    <div className="p-6 bg-white flex flex-col flex-1">
                      <p
                        className="leading-relaxed flex-1"
                        style={{ color: 'rgba(14,27,42,0.72)' }}
                      >
                        {program.summary}
                      </p>
                      <a
                        href="#contact"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
                        style={{ color: 'var(--primary)' }}
                      >
                        Detaylı bilgi al
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CHECKUP ─────────────────────────────────────────────────── */}
      <section id="checkup" className="py-28" style={{ backgroundColor: 'var(--ink)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(54,192,201,0.12)', color: 'var(--accent)' }}
            >
              Değerlendirme
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {checkup.name}
            </h2>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(246,248,251,0.78)' }}
            >
              {checkup.summary}
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:scale-105 hover:brightness-110 shadow-lg"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Check-Up Randevusu Al
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA PARALLAX ────────────────────────────────────────────── */}
      <ParallaxSection
        imageSrc="/generated/about.jpg"
        className="py-28"
        overlayOpacity={0.7}
      >
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">{cta.title}</h2>
            <p className="text-lg opacity-85 mb-10 leading-relaxed">{cta.body}</p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {cta.button}
            </a>
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" className="py-24" style={{ backgroundColor: 'var(--paper)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-14"
              style={{ color: 'var(--ink)' }}
            >
              İletişim
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div className="space-y-7">
                <ContactItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  }
                  label="Adres"
                  value={contact.address}
                />
                <ContactItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                  }
                  label="Telefon"
                  value={contact.phone}
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                />
                <ContactItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 0C5.372 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.054 23.217a.504.504 0 0 0 .623.623l5.393-1.469A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                  }
                  label="WhatsApp"
                  value="WhatsApp ile yazın"
                  href={`https://wa.me/${contact.whatsapp}`}
                />
                <ContactItem
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  }
                  label="E-posta"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
                {social.instagram && (
                  <ContactItem
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    }
                    label="Instagram"
                    value="@brainfitankara"
                    href={social.instagram}
                  />
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <div className="rounded-2xl overflow-hidden shadow-2xl h-80 md:h-96">
                {hasMap ? (
                  <iframe
                    src={contact.mapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BrainFit Ankara harita"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3 text-center p-8"
                    style={{ backgroundColor: 'var(--primary-deep)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(246,248,251,0.4)" strokeWidth="1.5" className="w-12 h-12">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p style={{ color: 'rgba(246,248,251,0.5)' }}>Harita yakında eklenecek</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer
        className="py-8 text-center text-sm"
        style={{ backgroundColor: 'var(--ink)', color: 'rgba(246,248,251,0.45)' }}
      >
        <p>
          © {new Date().getFullYear()} BrainFit Ankara — Tüm hakları saklıdır.
        </p>
      </footer>
    </>
  );
}

/* ── Helper ──────────────────────────────────────────────────────────── */
function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: 'rgba(27,95,176,0.1)', color: 'var(--primary)' }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-xs font-bold uppercase tracking-wider mb-0.5"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </p>
        <p style={{ color: 'var(--ink)' }}>{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-opacity hover:opacity-75" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}
