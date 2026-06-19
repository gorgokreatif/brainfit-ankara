# Prompt 05 — İç Sayfalar

> `STATUS.md` oku. 02 bitmiş olmalı. Metinler content dosyalarından gelir.

---

**Görev:** Aşağıdaki sayfaları kur. Hepsi tutarlı layout, tek CTA mantığı ve SEO metadata kullansın.

### Sayfalar

**`/programlar`** (+ alt detaylar)
- Junior (3-6), Scholar (6-18), Senior (18-99). programs.json'dan.
- Her programda: kime uygun, ne kazandırır, nasıl ilerler. CTA: Ücretsiz Değerlendirme.

**`/zihin-check-up`**
- CogMap/Zihin Check-Up nedir, 5 alanı nasıl ölçer, süreç adımları (görsel).
- "Tanı değil, gelişim haritası" vurgusu.

**`/hakkimizda`**
- BrainFit'in hikayesi: Singapur kökeni, bilimsel temel, ilaçsız yaklaşım, nöroplastisite.
- Ankara şubesinin değerleri/misyonu.

**`/ekibimiz`**
- team.json'dan kartlar: foto, isim, unvan, kısa bio. Panelden düzenlenebilir olacak (Prompt 07).

**`/iletisim`**
- Adres, telefon, e-posta, harita embed (site.json), WhatsApp. Kısa iletişim formu (aynı mail altyapısı, Prompt 04'teki mail lib'i yeniden kullan).

**Açılış sayfaları (SEO/GEO için kritik):**
- `/disleksi`, `/dikkat-eksikligi` (DEHB), `/dikkat-gelistirme` — content/pages/*.json'dan.
- Her biri: belirti empati bölümü + BrainFit yaklaşımı + "tanı değil gelişim" + SSS + güçlü CTA.
- Bu sayfalar yerel arama niyetini hedefler ("disleksi ankara" vb.) — başlık/H1/metadata buna göre, doğal dille (anahtar kelime spam YOK).

### Kurallar
- Çoğu server component. Her sayfa `generateMetadata` + uygun JSON-LD (Breadcrumb; açılışlarda FAQPage).
- "Tanı" dili YOK; "değerlendirme/gelişim/profil" dili.

### Doğrulama
`npm run build` geçsin, tüm rotalar açılsın. `STATUS.md` 05'i işaretle.
