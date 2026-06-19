# Prompt 06 — Blog

> `STATUS.md` oku. 02 bitmiş olmalı.

---

**Görev:** Markdown tabanlı, SEO-dostu, hızlı bir blog kur. Veritabanı YOK; yazılar `src/content/blog/*.md`.

### Yapı
- `/blog` — yazı listesi (kart: kapak, başlık, açıklama, tarih, etiket). Sayfalama gerekirse basit.
- `/blog/[slug]` — yazı detayı. Markdown → HTML (build-time, remark/rehype). frontmatter'dan başlık/açıklama/kapak/tarih/etiket.
- Etikete göre filtre opsiyonel (basit).

### İçerik tonu / SEO
- Kaygılı ebeveynin Google'da aradığı sorulara cevap veren yazılar: "Çocuğum neden okurken zorlanıyor?", "Dikkat dağınıklığı mı, DEHB mi?" gibi.
- "Tanı" değil bilgilendirme + yumuşak yönlendirme. Her yazı sonunda Değerlendirme CTA'sı.
- Her yazı: `generateMetadata` (title/description/OG), Article JSON-LD, kanonik URL.
- Sitemap'e dahil (Prompt 02'deki sitemap.ts otomatik toplasın).

### Performans
- Tamamen statik üretim. Kapak görselleri `next/image`.
- Markdown render build-time; runtime JS minimum.

### Örnek
2-3 örnek yazı ekle (gerçekçi, yayına hazır kalitede, BrainFit tonunda).

### Doğrulama
`npm run build` geçsin, liste + en az 1 yazı açılsın. `STATUS.md` 06'yı işaretle.
