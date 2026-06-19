import type { Metadata } from 'next';
import Image from 'next/image';
import { breadcrumbSchema } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Button from '@/components/Button';
import CtaBlock from '@/components/CtaBlock';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Hakkımızda — BrainFit Ankara',
  description: 'BrainFit, 2001 yılında Singapur\'da kurulan, bilimsel temelli zihin gelişim sistemidir. Ankara şubemizle ilaçsız, kişiye özel programlar sunuyoruz.',
  alternates: { canonical: 'https://brainfitankara.com/hakkimizda' },
};

const values = [
  { icon: '🔬', title: 'Bilimsel Temel', desc: 'Nöroplastisite araştırmalarına dayalı, kanıta dayalı yöntemler.' },
  { icon: '💊', title: 'İlaçsız Yaklaşım', desc: 'Beyin kapasitesini doğal yollarla güçlendiren egzersizler.' },
  { icon: '🧩', title: 'Kişiye Özel', desc: 'Her birey farklıdır. Programlar profile göre yapılandırılır.' },
  { icon: '📈', title: 'Ölçülebilir İlerleme', desc: 'Düzenli değerlendirmeler ile somut, izlenebilir sonuçlar.' },
];

export default function HakkimizdaPage() {
  const bcSchema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <Section bg="primary-deep" py="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}>
                BrainFit Ankara
              </p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-5 leading-tight">
                2001&apos;den bu yana, Singapur&apos;dan Ankara&apos;ya.
              </h1>
              <p className="text-lg font-body" style={{ color: 'rgba(255,255,255,0.78)' }}>
                BrainFit, küresel ağıyla 20 yılı aşkın bilimsel araştırmanın pratiğe dönüşmüş halidir.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] relative" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <Image src="/images/hakkimizda.jpg" alt="BrainFit Ankara ekibi" fill className="object-cover" priority sizes="(max-width: 1280px) 50vw, 600px"/>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section bg="white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <h2 className="text-3xl font-display font-bold mb-5" style={{ color: 'var(--ink)' }}>
                Hikayemiz
              </h2>
              <div className="space-y-4 font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.72)' }}>
                <p>
                  BrainFit, 2001 yılında Singapur&apos;da, çocukların öğrenme güçlüklerini beyin kapasitesini geliştirerek aşabileceği inancıyla kuruldu. Kuruluştan bu yana yapılan araştırmalar, nöroplastisite — yani beynin her yaşta değişebilme kapasitesi — ilkesini merkeze alan bir sistem ortaya koydu.
                </p>
                <p>
                  Bugün BrainFit, Asya&apos;dan Orta Doğu&apos;ya uzanan bir ağa sahip. Ankara şubemiz, bu global bilgi birikimini Türkiye&apos;ye taşımak amacıyla kurulmuştur.
                </p>
                <p>
                  Ankara&apos;da misyonumuz nettir: çocukların ve yetişkinlerin ne yapabildiklerine değil, neden yapalışlar gibi göründüklerini bulmak ve o alandaki kapasiteyi güçlendirmek.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="rounded-2xl p-7" style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border-subtle)' }}>
                <h3 className="text-xl font-display font-bold mb-5" style={{ color: 'var(--ink)' }}>Nöroplastisite nedir?</h3>
                <p className="font-body leading-relaxed mb-4" style={{ color: 'rgba(22,32,46,0.7)' }}>
                  Beyin, eskiden zannedildiği gibi sabit değildir. Nöroplastisite, beynin doğru uyarımla yeni bağlantılar kurma ve var olanları güçlendirme kapasitesini tanımlar.
                </p>
                <p className="font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.7)' }}>
                  Bu, dikkat güçlüğü, okuma zorluğu veya motor koordinasyon sorunlarının — doğru egzersizlerle — gerçekten iyileşebileceği anlamına gelir. BrainFit bu prensibi yapılandırılmış, kişiselleştirilmiş programlara dönüştürür.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section bg="paper">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-center mb-12" style={{ color: 'var(--ink)' }}>Değerlerimiz</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 70}>
                <div className="rounded-2xl p-6 bg-white" style={{ border: '1px solid var(--border-subtle)' }}>
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="font-semibold font-display mb-2" style={{ color: 'var(--ink)' }}>{v.title}</h3>
                  <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.6)' }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBlock
        title="BrainFit'i tanıyalım."
        body="Ücretsiz ilk görüşmede ekibimizle tanışın, sorularınızı sorun ve çocuğunuza uygun yolu birlikte belirleyin."
        ctaLabel="Ücretsiz Görüşme Al"
        ctaHref="/iletisim"
      />
    </>
  );
}
