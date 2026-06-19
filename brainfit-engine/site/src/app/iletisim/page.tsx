import type { Metadata } from 'next';
import { getSiteData } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Button from '@/components/Button';
import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'İletişim — BrainFit Ankara',
  description: 'BrainFit Ankara ile iletişime geçin. Ücretsiz görüşme randevusu alın, adresimizi öğrenin veya WhatsApp\'tan ulaşın.',
  alternates: { canonical: 'https://brainfitankara.com/iletisim' },
};

export default function IletisimPage() {
  const site = getSiteData();
  const bcSchema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'İletişim', href: '/iletisim' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <Section bg="primary-deep" py="sm">
        <Container>
          <div className="max-w-xl">
            <p className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}>
              İletişim
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Birlikte bir adım atalım.
            </h1>
            <p className="text-lg font-body" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Ücretsiz ilk görüşme için bizi arayın, WhatsApp&apos;tan yazın ya da formu doldurun.
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <div>
                  <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--ink)' }}>Ulaşın</h2>
                  <div className="space-y-4">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, '')}`}
                      className="flex items-start gap-3 font-body hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--ink)' }}
                    >
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(31,111,178,0.1)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(22,32,46,0.5)' }}>Telefon</p>
                        <p>{site.phone}</p>
                      </div>
                    </a>

                    <a
                      href={`https://wa.me/${site.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 font-body hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--ink)' }}
                    >
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(37,211,102,0.1)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(22,32,46,0.5)' }}>WhatsApp</p>
                        <p>Hızlı mesaj için</p>
                      </div>
                    </a>

                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-start gap-3 font-body hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--ink)' }}
                    >
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(31,168,160,0.1)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(22,32,46,0.5)' }}>E-posta</p>
                        <p>{site.email}</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-3 font-body" style={{ color: 'var(--ink)' }}>
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(232,137,59,0.1)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warm)" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(22,32,46,0.5)' }}>Adres</p>
                        <p className="text-sm">{site.address}</p>
                        <p className="text-xs mt-1" style={{ color: 'rgba(22,32,46,0.5)' }}>{site.openHours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border-subtle)' }}>
                  <p className="font-semibold font-display text-sm mb-2" style={{ color: 'var(--ink)' }}>Ücretsiz değerlendirmeye başlamak ister misiniz?</p>
                  <p className="text-xs font-body mb-4" style={{ color: 'rgba(22,32,46,0.6)' }}>
                    Randevu gerekmeden, anında 2 dakikalık interaktif değerlendirmemizi deneyin.
                  </p>
                  <Button href="/degerlendirme" size="sm">Değerlendirmeye Başla →</Button>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={60}>
                <div className="rounded-2xl p-7" style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'white' }}>
                  <h2 className="text-xl font-display font-bold mb-6" style={{ color: 'var(--ink)' }}>
                    Mesaj Gönderin
                  </h2>
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Map embed */}
          {site.mapsEmbed && (
            <div className="mt-12 rounded-2xl overflow-hidden" style={{ height: '360px', border: '1px solid var(--border-subtle)' }}>
              <iframe
                src={site.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BrainFit Ankara Konum"
              />
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
