import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Çerez Politikası — BrainFit Ankara',
  description: 'BrainFit Ankara web sitesinde kullanılan çerezler hakkında bilgi.',
}

export default function CerezPolitikasiPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-[#23231f] mb-2">Çerez Politikası</h1>
      <p className="text-sm text-[#9a968c] mb-8">Son güncelleme: Haziran 2026</p>

      <div className="text-[#3c3c38] leading-relaxed space-y-6 text-sm">

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">1. Çerez Nedir?</h2>
          <p>
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza
            yerleştirilen küçük metin dosyalarıdır. Siteyi bir sonraki ziyaretinizde tanınmanızı,
            oturum bilgilerinizin hatırlanmasını ve siteyi daha verimli kullanmanızı sağlarlar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">2. Kullandığımız Çerez Türleri</h2>

          <div className="space-y-4 mt-3">
            <div className="bg-[#f8f6f2] rounded-[12px] p-4">
              <h3 className="font-bold text-[#23231f] mb-1">Zorunlu Çerezler</h3>
              <p className="text-[#6c6c68]">
                Sitenin düzgün çalışması için gereklidir. Yönetim paneli oturum doğrulaması ve
                güvenlik işlemleri bu kapsamda değerlendirilir. Bu çerezler devre dışı bırakılamaz;
                ancak yalnızca teknik işlev görürler, kişisel tercihlerinizi veya davranışlarınızı
                izlemezler.
              </p>
              <table className="w-full mt-3 text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ece6db]">
                    <th className="text-left py-1.5 pr-4 text-[#23231f]">Çerez Adı</th>
                    <th className="text-left py-1.5 pr-4 text-[#23231f]">Amaç</th>
                    <th className="text-left py-1.5 text-[#23231f]">Süre</th>
                  </tr>
                </thead>
                <tbody className="text-[#6c6c68]">
                  <tr className="border-b border-[#ece6db]">
                    <td className="py-1.5 pr-4 font-mono">authjs.session-token</td>
                    <td className="py-1.5 pr-4">Yönetici oturum doğrulama (NextAuth)</td>
                    <td className="py-1.5">Oturum</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4 font-mono">__Secure-authjs.session-token</td>
                    <td className="py-1.5 pr-4">Yönetici oturum doğrulama (HTTPS)</td>
                    <td className="py-1.5">Oturum</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#f8f6f2] rounded-[12px] p-4">
              <h3 className="font-bold text-[#23231f] mb-1">Analitik Çerezler</h3>
              <p className="text-[#6c6c68]">
                Ziyaretçi sayısını ve sayfa görüntüleme istatistiklerini ölçmek amacıyla
                <strong> Vercel Analytics</strong> kullanılmaktadır. Toplanan veriler anonim olup
                kişisel kimliğinizi doğrudan ifşa etmez. Bu veriler yalnızca site performansını
                iyileştirmek için kullanılır.
              </p>
              <table className="w-full mt-3 text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ece6db]">
                    <th className="text-left py-1.5 pr-4 text-[#23231f]">Sağlayıcı</th>
                    <th className="text-left py-1.5 pr-4 text-[#23231f]">Amaç</th>
                    <th className="text-left py-1.5 text-[#23231f]">Gizlilik</th>
                  </tr>
                </thead>
                <tbody className="text-[#6c6c68]">
                  <tr>
                    <td className="py-1.5 pr-4">Vercel Inc.</td>
                    <td className="py-1.5 pr-4">Sayfa görüntüleme ve performans ölçümü</td>
                    <td className="py-1.5">Anonim</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#f8f6f2] rounded-[12px] p-4">
              <h3 className="font-bold text-[#23231f] mb-1">Performans Çerezleri</h3>
              <p className="text-[#6c6c68]">
                <strong>Vercel Speed Insights</strong> aracılığıyla Core Web Vitals metrikleri
                (LCP, FID, CLS vb.) ölçülmektedir. Bu ölçümler sayesinde ziyaretçilerin siteyi
                daha hızlı ve sorunsuz deneyimlemesi sağlanır. Toplanan veriler anonim olarak
                işlenmektedir.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
          <p className="mb-3">
            Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz. Ancak zorunlu çerezlerin
            devre dışı bırakılması sitenin bazı işlevlerinin çalışmamasına neden olabilir.
          </p>
          <p className="mb-2">Yaygın tarayıcılar için çerez ayarları:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#6c6c68]">
            <li>Google Chrome: Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
            <li>Mozilla Firefox: Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
            <li>Safari: Tercihler → Gizlilik → Çerezleri engelle</li>
            <li>Microsoft Edge: Ayarlar → Gizlilik, arama ve hizmetler → Çerezler</li>
          </ul>
          <p className="mt-3">
            Analitik ve performans çerezlerini devre dışı bırakmak için tarayıcınızdaki
            içerik engelleyici uzantılarını da kullanabilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">4. Üçüncü Taraf Çerezleri</h2>
          <p>
            Sitemizde sosyal medya butonları veya üçüncü taraf reklam ağları bulunmamaktadır.
            Kullanılan dış kaynaklar (Google Fonts gibi) teknik hizmet sağlayıcıları olup
            davranışsal reklamcılık amacıyla çerez yerleştirmemektedir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">5. Politika Güncellemeleri</h2>
          <p>
            Bu çerez politikası, yasal değişiklikler veya kullanılan teknolojilerin güncellenmesi
            durumunda önceden bildirmeksizin değiştirilebilir. Güncel versiyon her zaman bu sayfada
            yayımlanır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#23231f] mb-2">6. İletişim</h2>
          <p>
            Çerez uygulamalarımız hakkında sorularınız için:{' '}
            <a href="mailto:info@brainfitankara.com" className="text-[#51AD32] underline">
              info@brainfitankara.com
            </a>
          </p>
        </section>

        <section className="border-t border-[#ece6db] pt-6">
          <p className="text-xs text-[#9a968c]">
            Ayrıca <a href="/kvkk" className="text-[#51AD32] underline">KVKK Aydınlatma Metni</a> ve{' '}
            <a href="/gizlilik-politikasi" className="text-[#51AD32] underline">Gizlilik Politikası</a>{' '}
            sayfalarımızı incelemenizi öneririz.
          </p>
        </section>

      </div>
    </main>
  )
}
