import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni — BrainFit Ankara',
  description: 'Kişisel Verilerin Korunması Kanunu kapsamında hazırlanmış aydınlatma metni.',
}

export default function KvkkPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-[#23231f] mb-2">KVKK Aydınlatma Metni</h1>
      <p className="text-sm text-[#9a968c] mb-8">6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca hazırlanmıştır.</p>

      <div className="prose prose-sm max-w-none text-[#3c3c38] leading-relaxed space-y-6">

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">1. Veri Sorumlusu</h2>
          <p>
            Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") madde 10 uyarınca
            <strong> BrainFit Ankara</strong> (bundan böyle "BrainFit" veya "Şirket" olarak anılacaktır) tarafından
            hazırlanmıştır. BrainFit Ankara, Çankaya, Ankara adresinde faaliyet göstermekte olup veri sorumlusu
            sıfatıyla hareket etmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">2. İşlenen Kişisel Veriler</h2>
          <p>BrainFit Ankara olarak; web sitemiz, mini beyin değerlendirme testi, iletişim formu ve randevu sistemi
          aracılığıyla aşağıdaki kişisel veriler toplanmaktadır:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad (veli/ilgili kişi adı)</li>
            <li><strong>Çocuğa Ait Bilgiler:</strong> Çocuğun adı, yaşı, yaş grubu</li>
            <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi</li>
            <li><strong>Konum Bilgisi:</strong> Şehir bilgisi</li>
            <li><strong>Test ve Değerlendirme Verileri:</strong> Mini beyin değerlendirme testi sonuçları ve metrikleri</li>
            <li><strong>Randevu Bilgileri:</strong> Tercih edilen tarih, saat ve ek notlar</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <p>Toplanan kişisel veriler aşağıdaki amaçlarla işlenmektedir:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Çocuk gelişim değerlendirmesi ve bireyselleştirilmiş program önerisi sunulması</li>
            <li>Randevu talebi ve uzman görüşmesinin planlanması</li>
            <li>E-posta veya telefon yoluyla iletişim sağlanması ve geri bildirim verilmesi</li>
            <li>Hizmet kalitesinin artırılması ve istatistiksel analizler yapılması</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">4. Kişisel Verilerin İşlenme Hukuki Dayanağı</h2>
          <p>Kişisel verileriniz KVKK madde 5 kapsamında aşağıdaki hukuki dayanaklar çerçevesinde işlenmektedir:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Açık rıza (KVKK m.5/1) — Test ve randevu formlarındaki onay kutucuğu aracılığıyla</li>
            <li>Sözleşmenin kurulması veya ifası (KVKK m.5/2-c) — Randevu ve hizmet süreçleri için</li>
            <li>Meşru menfaat (KVKK m.5/2-f) — Hizmet kalitesinin iyileştirilmesi amacıyla</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">5. Kişisel Verilerin Aktarımı</h2>
          <p>
            Kişisel verileriniz; yasal zorunluluklar haricinde üçüncü kişi ve kurumlara satılmamakta veya
            ticari amaçla devredilmemektedir. Verileriniz yalnızca hizmetin yürütülmesi amacıyla aşağıdaki
            taraflarla paylaşılabilir:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Vercel Inc. (hosting/altyapı hizmetleri — ABD)</li>
            <li>Neon Technologies (veritabanı hizmetleri — AB/ABD)</li>
            <li>E-posta servis sağlayıcısı (bildirim iletimi için)</li>
            <li>Yetkili kamu kurum ve kuruluşları (yasal zorunluluk halinde)</li>
          </ul>
          <p className="mt-2">
            Yurt dışı aktarımlar, KVKK madde 9 kapsamında Kişisel Verileri Koruma Kurulu kararları ve
            standart sözleşme hükümleri çerçevesinde gerçekleştirilmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">6. Kişisel Verilerin Saklanma Süresi</h2>
          <p>
            Kişisel verileriniz, hizmet ilişkisinin sona ermesinden itibaren en fazla <strong>2 yıl</strong> süreyle
            saklanmakta; bu sürenin dolması veya işleme amacının ortadan kalkması halinde silinmekte,
            yok edilmekte ya da anonim hale getirilmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">7. İlgili Kişinin Hakları</h2>
          <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>KVKK'nın 7. maddesi uyarınca silinmesini ya da yok edilmesini isteme</li>
            <li>Düzeltme ve silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</li>
            <li>Otomatik sistemler aracılığıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
            <li>Kanuna aykırı işleme nedeniyle zarara uğranılması halinde zararın giderilmesini talep etme</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">8. Başvuru Yolu</h2>
          <p>
            Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki iletişim kanalları aracılığıyla
            BrainFit Ankara{"'"}ya başvurabilirsiniz:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>E-posta:</strong> <a href="mailto:info@brainfitankara.com" className="text-[#51AD32] underline">info@brainfitankara.com</a></li>
            <li><strong>Adres:</strong> Çankaya, Ankara</li>
          </ul>
          <p className="mt-2">
            Başvurunuz en geç <strong>30 gün</strong> içinde yanıtlanacaktır. Başvurunun reddedilmesi,
            verilen cevabın yetersiz bulunması veya süresinde yanıt verilmemesi halinde
            Kişisel Verileri Koruma Kurulu{"'"}na şikayette bulunma hakkınız saklıdır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">9. Çerezler (Cookies)</h2>
          <p>
            Web sitemiz oturum yönetimi ve teknik işlevsellik amacıyla zorunlu çerezler kullanmaktadır.
            Bu çerezler, siteyi kullanabilmeniz için gerekli olup kişisel tercihlerinizi veya
            davranışlarınızı izlemek amacıyla kullanılmamaktadır.
          </p>
        </section>

        <section className="border-t border-[#ece6db] pt-6">
          <p className="text-xs text-[#9a968c]">
            Bu aydınlatma metni en son <strong>Haziran 2026</strong> tarihinde güncellenmiştir.
            BrainFit Ankara, yasal değişiklikler veya hizmet güncellemeleri doğrultusunda bu metni
            önceden bildirmeksizin güncelleme hakkını saklı tutar.
          </p>
        </section>

      </div>
    </main>
  )
}
