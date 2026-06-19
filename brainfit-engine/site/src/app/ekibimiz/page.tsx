import type { Metadata } from 'next';
import Image from 'next/image';
import { getTeamData } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Button from '@/components/Button';
import CtaBlock from '@/components/CtaBlock';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Ekibimiz — BrainFit Ankara Uzmanları',
  description: 'BrainFit Ankara\'nın sertifikalı uzman eğitimcileri. Çocuk gelişimi ve öğrenme güçlükleri alanında deneyimli ekibimizle tanışın.',
  alternates: { canonical: 'https://brainfitankara.com/ekibimiz' },
};

export default function EkibimizPage() {
  const { members } = getTeamData();
  const bcSchema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Ekibimiz', href: '/ekibimiz' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <Section bg="primary-deep" py="lg">
        <Container>
          <div className="max-w-2xl">
            <p className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}>
              Ekibimiz
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-5">
              Uzman ellerde, güvenli bir süreç.
            </h1>
            <p className="text-lg font-body" style={{ color: 'rgba(255,255,255,0.78)' }}>
              BrainFit Ankara ekibi, uluslararası sertifika almış, çocuk gelişimi ve nöroplastisite alanında uzmanlaşmış eğitimcilerden oluşmaktadır.
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="white">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members
              .sort((a, b) => a.order - b.order)
              .map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 80}>
                  <div className="rounded-2xl overflow-hidden shadow-md" style={{ border: '1px solid var(--border-subtle)' }}>
                    <div className="relative aspect-[3/4] bg-paper">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold font-display text-lg" style={{ color: 'var(--ink)' }}>{m.name}</h3>
                      <p className="text-sm font-semibold mb-3" style={{ color: 'var(--primary)' }}>{m.title}</p>
                      <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.65)' }}>{m.bio}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
          </div>

          <ScrollReveal>
            <div className="mt-16 rounded-2xl p-8 text-center" style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border-subtle)' }}>
              <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--ink)' }}>
                BrainFit Sertifikasyonu
              </h2>
              <p className="font-body max-w-xl mx-auto mb-6" style={{ color: 'rgba(22,32,46,0.65)' }}>
                Tüm BrainFit uzmanları, Singapur merkezli uluslararası akredite eğitim programından geçmiş ve sertifika almıştır. Eğitim süreci; değerlendirme metodolojisi, egzersiz protokolleri ve aile iletişimini kapsar.
              </p>
              <Button href="/iletisim">Ekibimizle Tanışın</Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <CtaBlock
        title="Uzmanlarımızla ücretsiz görüşün."
        body="İlk görüşmede ekibimizle tanışın, çocuğunuzun durumunu paylaşın ve sonraki adımları birlikte planlayın."
        ctaLabel="Ücretsiz Görüşme Al"
        ctaHref="/iletisim"
      />
    </>
  );
}
