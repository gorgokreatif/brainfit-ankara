import type { Metadata } from 'next';
import Container from '@/components/Container';
import Section from '@/components/Section';
import { breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'BrainFit Ankara kişisel verilerin korunması ve işlenmesine ilişkin aydınlatma metni.',
  robots: 'noindex',
};

export default function KvkkPage() {
  const bcSchema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'KVKK Aydınlatma Metni', href: '/kvkk' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <Section bg="paper" py="lg">
        <Container narrow>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-8" style={{ color: 'var(--ink)' }}>
            KVKK Aydınlatma Metni
          </h1>

          <div className="prose prose-lg max-w-none font-body" style={{ color: 'var(--ink)' }}>
            <p><strong>Veri Sorumlusu:</strong> BrainFit Ankara</p>
            <p><strong>Adres:</strong> Çankaya Mah. Tunalı Hilmi Cad., Çankaya / Ankara</p>
            <p><strong>E-posta:</strong> ankara@brainfit.com.tr</p>

            <h2>1. Kişisel Verilerin İşlenme Amacı</h2>
            <p>Sitemizdeki değerlendirme formları ve iletişim formları aracılığıyla toplanan kişisel veriler (ad soyad, telefon, e-posta, çocuğun yaşı) aşağıdaki amaçlarla işlenmektedir:</p>
            <ul>
              <li>Randevu ve görüşme planlanması</li>
              <li>Değerlendirme sonuçlarının paylaşılması</li>
              <li>Hizmet hakkında bilgi verilmesi</li>
            </ul>

            <h2>2. Kişisel Verilerin Aktarımı</h2>
            <p>Kişisel verileriniz üçüncü taraflarla paylaşılmamakta veya satılmamaktadır. Yalnızca yasal yükümlülükler kapsamında yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir.</p>

            <h2>3. Kişisel Verilerin Toplanma Yöntemi</h2>
            <p>Veriler, web sitesi formları aracılığıyla açık rıza temelinde toplanmaktadır.</p>

            <h2>4. İlgili Kişinin Hakları</h2>
            <p>6698 sayılı KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklarınız mevcuttur:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse bunlara ilişkin bilgi talep etme</li>
              <li>Yanlış veya eksik işleme durumunda düzeltme talep etme</li>
              <li>Kişisel verilerinizin silinmesini talep etme</li>
              <li>İşlemeye itiraz etme</li>
            </ul>
            <p>Bu haklarınızı kullanmak için <a href="mailto:ankara@brainfit.com.tr">ankara@brainfit.com.tr</a> adresine yazılı başvurabilirsiniz.</p>

            <h2>5. Çerezler (Cookies)</h2>
            <p>Sitemiz yalnızca temel işlevsellik için zorunlu çerezler kullanmaktadır. Kişisel verilerinizi izleyen üçüncü taraf analitik çerezleri aktif değildir.</p>

            <p style={{ marginTop: 32, fontSize: '0.875rem', opacity: 0.6 }}>Son güncelleme: Haziran 2026</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
