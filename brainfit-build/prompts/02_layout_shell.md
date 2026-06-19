# Prompt 02 — Layout Shell & SEO Altyapısı

> `STATUS.md` oku. 01 bitmiş olmalı.

---

**Görev:** Tüm sayfaların paylaşacağı kabuğu (header, footer, navigasyon, sabit CTA'lar) ve SEO altyapısını kur.

### 1. Header
- Logo (sol), navigasyon (Programlar, Zihin Check-Up, Değerlendirme, Hakkımızda, Ekibimiz, Blog, İletişim).
- Sağda belirgin tek CTA butonu: **"Ücretsiz Değerlendirme"** → `/degerlendirme`.
- Mobilde hamburger menü (yalın, JS minimum).
- Sticky ama hafif; scroll'da gölge eklensin (CSS).

### 2. Sabit iletişim
- Mobilde sağ altta sabit **WhatsApp butonu** (`https://wa.me/<whatsapp>` — site.json'dan). Yeni sekmede açılsın, `rel="noopener"`.
- Tıklama hedefi 44px+ (erişilebilirlik).

### 3. Footer
- Marka kısa açıklama (site.json'dan), iletişim, sosyal linkler, yasal linkler (KVKK), telif satırı.
- Tüm metinler site.json'dan gelsin (panelden düzenlenebilir).

### 4. SEO altyapısı (kritik — GEO/SEO hedefi)
- `app/layout.tsx`'te Metadata API ile varsayılan title/description/OpenGraph.
- Her sayfa kendi `generateMetadata`'sını versin.
- `src/lib/seo.ts`: JSON-LD üreticileri — `LocalBusiness` (ad, adres, telefon, coğrafi konum, açılış saatleri), `FAQPage` (SSS için), `BreadcrumbList`.
- `app/sitemap.ts` ve `app/robots.ts` (Next.js native). Blog yazıları sitemap'e dahil.
- `lang="tr"`, doğru `<html>` ve viewport ayarları.

### 5. Ortak bileşenler (`src/components/`)
- `Button`, `Section`, `Container`, `CtaBlock`, `Faq`, `TestimonialCard`, `WhatsAppFab`.
- Hepsi token renklerini kullansın. Mümkün olduğunca server component.

### 6. Erişilebilirlik & performans tabanı
- Görünür klavye focus halkaları.
- Renk kontrastı WCAG AA.
- `prefers-reduced-motion` ile animasyonları kapat.

### Doğrulama
`npm run build` geçsin, layout tüm sayfalarda görünsün. `STATUS.md` 02'yi işaretle.
