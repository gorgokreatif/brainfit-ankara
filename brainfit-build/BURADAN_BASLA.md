# BURADAN BAŞLA — Claude Code İçin Tek Talimat

Merhaba Claude Code. Aşağıdaki talimatı harfiyen uygula. Bu klasörde çalışıyorsun.

## ÖNCE BUNU OKU (kafa karışıklığını önlemek için)
- Bu klasörde gerçek iş emirleri `prompts/` altındadır: `00_setup.md`'den `08_seo_perf_deploy.md`'ye kadar 9 dosya + `IMAGE_PROMPTS.md`.
- `BUILD_PLAN.md` ana yol haritandır, `STATUS.md` ilerleme takibindir.
- Başka bir klasörde "branch.ankara.json" veya yalnızca README içeren eski bir iskelet görürsen ONU YOK SAY. Doğru kaynak burasıdır, `prompts/` klasörüdür.
- Eğer `prompts/` klasörünü ve içindeki 00–08 dosyalarını GÖREMİYORSAN, hiçbir şey üretme; dur ve kullanıcıya "prompts klasörünü göremiyorum, doğru klasörde miyim?" diye sor.

## NE YAPACAKSIN
1. `BUILD_PLAN.md` ve `STATUS.md` dosyalarını oku.
2. `prompts/00_setup.md`'den başlayarak `08`'e kadar SIRAYLA her aşamayı uygula.
3. Her aşama sonunda `npm run build` çalıştırıp derlemenin hatasız geçtiğini DOĞRULA.
4. Her aşama bitince `STATUS.md`'de o satırı `[x]` yap ve 1 cümle not düş.
5. `prompts/07_admin_panel.md`'ye geldiğinde panel için A/B seçeneğini kullanıcıya sor, cevabını bekle.
6. Görseller henüz yoksa zarif placeholder kullan, sayfayı bozma. Görsel promptları `prompts/IMAGE_PROMPTS.md`'de; kullanıcı bunları Nano Banana 2 ile üretip `public/images/` altına koyacak.

## DEĞİŞMEZ KURALLAR (hiçbir koşulda ihlal etme)
- Next.js App Router + TypeScript + Tailwind.
- Tek şube: Ankara. Veritabanı YOK. İçerik dosyada (JSON/Markdown). Form → mail.
- three.js YOK. framer-motion gibi ağır kütüphane YOK. Animasyon minimal (sadece CSS).
- Hedef: Google PageSpeed mobil 90+, LCP < 2sn.
- Dil: "tanı" değil "değerlendirme/profil/gelişime açık alan". Konum: "rehabilitasyon değil, potansiyel" + ilaçsız + bilimsel + Singapur kökeni.
- 5 değerlendirme alanı: Dikkat, İşitsel, Görsel, Motor, Sosyal-Duygusal.
- Birincil dönüşüm: interaktif değerlendirme → form (mail ile lead) + sonuç sayfasında WhatsApp butonu.

## ÇIKTI BEKLENTİSİ (site bomboş OLMAYACAK)
Bitirdiğinde şu sayfalar dolu ve gerçek içerikli olmalı:
- Ana sayfa (hero + belirti köprüsü + konumlandırma + 5 alan + programlar + sosyal kanıt + SSS + CTA)
- /degerlendirme (5 adımlı interaktif değerlendirme + sonuç + form)
- /programlar, /zihin-check-up, /hakkimizda, /ekibimiz, /iletisim
- /disleksi, /dikkat-eksikligi, /dikkat-gelistirme (açılış sayfaları)
- /blog (liste + en az 1 örnek yazı)
- /admin (seçilen panel moduna göre)

Şimdi başla: `BUILD_PLAN.md`'yi oku, sonra `prompts/00_setup.md`'yi uygula. İlk aşama bitince dur ve bana haber ver.
