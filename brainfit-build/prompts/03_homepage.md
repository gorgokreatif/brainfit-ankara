# Prompt 03 — Ana Sayfa

> `STATUS.md` oku. 02 bitmiş olmalı. Tüm metinler `home.json`'dan gelir.

---

**Görev:** Dönüşüm odaklı ana sayfayı kur. Her bölüm tek bir işe hizmet eder ve aynı CTA'ya yönlendirir.

### Bölüm sırası (yukarıdan aşağı)

**1. Hero**
- Kanca başlık: "Çocuğunuzun yapamadığını görüyorsunuz. Biz **neden** yapamadığını buluyoruz."
- Alt başlık: ilaçsız, bilimsel, kişiye özel zihin gelişimi (kısa).
- Tek birincil CTA: "Ücretsiz Değerlendirme" → `/degerlendirme`. İkincil link: "Programları incele".
- İmza efekt: ARKA PLANDA çok hafif, yavaş hareketli nöron/bağlantı noktaları dokusu — SADECE CSS/SVG, GPU-dostu, `prefers-reduced-motion`'da durur. LCP'yi bozmayacak (görsel arka plan değil, hafif vektör). three.js YOK.
- Hero görseli: `next/image`, öncelikli (priority), `/images/hero.jpg`.

**2. "Bu belirtileri görüyor musunuz?"** (kendini teşhis köprüsü)
- Kısa, empati kuran madde listesi (okumada zorlanma, dikkatini toplayamama, vb.).
- Sonunda yumuşak köprü: "Tanı koymuyoruz — neyin geliştirilebileceğini gösteriyoruz." → Değerlendirmeye CTA.

**3. BrainFit nedir / konumlandırma**
- "Rehabilitasyon değil, potansiyel" eksenini anlat. İlaçsız + bilimsel + Singapur kökeni güven kotukları.
- 3-4 kısa güven göstergesi (yıl, yaklaşım, kişiye özel program). Abartılı rakam yok.

**4. 5 gelişim alanı**
- Dikkat, İşitsel, Görsel, Motor, Sosyal-Duygusal — her biri ikon + 1 cümle.
- Değerlendirmenin bu 5 alanı ölçtüğünü ima et, CTA ile bağla.

**5. Programlar önizleme**
- Junior / Scholar / Senior kartları (programs.json'dan), "detay" linkleriyle.

**6. Sosyal kanıt**
- Gerçek yorumlar (isim + şehir + foto). CTA'nın hemen yanında/altında dursun (dönüşüm için kritik).

**7. SSS**
- home.json'dan; FAQPage JSON-LD ile eşleşsin (SEO).

**8. Kapanış CTA bloğu**
- Güçlü tek çağrı: "2 dakika ayırın, çocuğunuzun zihin profilini görün." → Değerlendirme.

### Kurallar
- Çoğu bölüm server component. Animasyon yalnız hero imza efekti + hafif scroll-reveal (CSS, opsiyonel, reduced-motion'a duyarlı).
- Mobilde LCP < 2sn hedefini koru; hero görselini optimize et.

### Doğrulama
`npm run build` geçsin. `STATUS.md` 03'ü işaretle.
