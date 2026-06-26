import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası — BrainFit Ankara',
  description: 'BrainFit Ankara gizlilik politikası ve kişisel veri koruma ilkeleri.',
}

export default function GizlilikPolitikasiPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-[#23231f] mb-2">Gizlilik Politikası</h1>
      <p className="text-sm text-[#9a968c] mb-8">Son güncelleme: Haziran 2026</p>

      <div className="text-[#3c3c38] leading-relaxed space-y-6 text-sm">

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">1. Genel Bakış</h2>
          <p>
            BrainFit Ankara olarak ziyaretçilerimizin ve kullanıcılarımızın gizliliğine büyük önem veriyoruz.
            Bu Gizlilik Politikası; web sitemiz (<strong>brainfitankara.com</strong>) aracılığıyla toplanan
            kişisel verilerin nasıl işlendiğini, saklandığını ve korunduğunu açıklamaktadır.
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuat çerçevesinde
            hazırlanmıştır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">2. Topladığımız Bilgiler</h2>
          <p className="mb-2">Sitemizi kullanırken aşağıdaki bilgiler toplanabilir:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Kimlik ve iletişim bilgileri:</strong> İsim, soyisim, telefon numarası, e-posta adresi
            </li>
            <li>
              <strong>Çocuğa ait bilgiler:</strong> Çocuğun adı, yaşı ve yaş grubu (ebeveyn onayıyla)
            </li>
            <li>
              <strong>Test verileri:</strong> Mini beyin değerlendirme testi yanıtları ve sonuçları
            </li>
            <li>
              <strong>Randevu bilgileri:</strong> Tercih edilen tarih, saat, notlar
            </li>
            <li>
              <strong>Teknik veriler:</strong> IP adresi, tarayıcı türü, sayfa görüntüleme verileri
              (anonim istatistik amaçlı)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">3. Verileri Nasıl Kullanıyoruz</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Randevu talebinizi almak ve sizinle iletişime geçmek</li>
            <li>Çocuğunuzun gelişim değerlendirmesini gerçekleştirmek ve program önermek</li>
            <li>Test sonuçlarınızı size iletmek ve uzman görüşmesi planlamak</li>
            <li>Hizmet kalitesini iyileştirmek ve istatistiksel analizler yapmak</li>
            <li>Yasal yükümlülükleri yerine getirmek</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">4. Verilerinizi Kimlerle Paylaşıyoruz</h2>
          <p className="mb-2">
            Kişisel verileriniz üçüncü şahıslara satılmaz veya ticari amaçla devredilmez.
            Yalnızca aşağıdaki taraflarla hizmet amacıyla paylaşılabilir:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Vercel Inc.</strong> — web sitesi barındırma ve altyapı hizmetleri</li>
            <li><strong>Neon Technologies</strong> — güvenli veritabanı hizmetleri</li>
            <li><strong>E-posta servis sağlayıcısı</strong> — bildirim ve onay e-postaları için</li>
            <li><strong>Yasal merciler</strong> — kanunen zorunlu hallerde yetkili kamu kurumları</li>
          </ul>
          <p className="mt-2">
            Yurt dışı aktarımlar KVKK'nın 9. maddesi kapsamında gerçekleştirilmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">5. Veri Güvenliği</h2>
          <p>
            Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari tedbirler alınmaktadır:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>HTTPS (TLS) şifreleme ile veri iletimi güvence altındadır</li>
            <li>Yönetim paneline erişim güçlü kimlik doğrulama ile korunmaktadır</li>
            <li>HTTP güvenlik başlıkları (X-Frame-Options, HSTS, CSP) uygulanmaktadır</li>
            <li>Veritabanı erişimi yalnızca yetkili sistem bileşenleriyle sınırlıdır</li>
            <li>Hassas kimlik bilgileri hash'lenerek saklanmaktadır</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">6. Saklama Süreleri</h2>
          <p>
            Kişisel verileriniz hizmet ilişkisinin sona ermesinden itibaren en fazla <strong>2 yıl</strong> süreyle
            saklanmaktadır. Bu sürenin dolması ya da işleme amacının ortadan kalkması durumunda veriler
            silinmekte, yok edilmekte veya anonim hale getirilmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">7. Çocuklara Ait Veriler</h2>
          <p>
            18 yaşın altındaki bireylere ait veriler yalnızca ebeveyn veya yasal velinin açık onayıyla
            toplanmaktadır. Ebeveyn onayı alınmaksızın çocuğa ait kişisel veri işlenmemektedir.
            Ebeveynler, çocuklarına ait verilerin silinmesini her zaman talep edebilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">8. Haklarınız</h2>
          <p className="mb-2">KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Yanlış verilerin düzeltilmesini isteme</li>
            <li>Verilerinizin silinmesini veya yok edilmesini talep etme</li>
            <li>Veri işlemeye itiraz etme</li>
            <li>Verilerin taşınabilirliğini talep etme</li>
          </ul>
          <p className="mt-3">
            Talepleriniz için:{' '}
            <a href="mailto:info@brainfitankara.com" className="text-[#51AD32] underline">
              info@brainfitankara.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">9. Politika Güncellemeleri</h2>
          <p>
            Bu politika, yasal değişiklikler veya hizmet güncellemeleri doğrultusunda önceden
            bildirmeksizin güncellenebilir. Güncel versiyon her zaman bu sayfada yayımlanır.
          </p>
        </section>

        <section className="border-t border-[#ece6db] pt-6">
          <p className="text-xs text-[#9a968c]">
            Daha fazla bilgi için <a href="/kvkk" className="text-[#51AD32] underline">KVKK Aydınlatma Metni</a> ve{' '}
            <a href="/cerez-politikasi" className="text-[#51AD32] underline">Çerez Politikası</a> sayfalarını
            inceleyebilirsiniz.
          </p>
        </section>

      </div>
    </main>
  )
}
