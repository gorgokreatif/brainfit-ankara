# Prompt 08 — SEO, Performans Denetimi & Deploy

> `STATUS.md` oku. 00-07 bitmiş olmalı. Bu son aşama.

---

**Görev:** Siteyi yayına hazırla: SEO/GEO tamamla, performansı PageSpeed 90+ hedefine çek, Vercel'e deploy et.

### 1. SEO/GEO tamamlama
- Tüm sayfalarda title/description/OG/canonical eksiksiz mi kontrol et.
- JSON-LD doğrula: LocalBusiness (ana + iletişim), FAQPage (ana + açılışlar), Article (blog), BreadcrumbList.
- `sitemap.ts` tüm rotaları + blog yazılarını içersin. `robots.ts` doğru.
- Google Search Console + Google Business Profile için hazır olduğunu kullanıcıya hatırlat (doğrulama meta etiketi yeri bırak).
- GEO/AI aramaları için: net, yapılandırılmış içerik; FAQ'lar; doğal dilde soru-cevap formatı (LLM'lerin alıntılaması kolay olsun).

### 2. Performans denetimi (PageSpeed 90+ / LCP < 2sn)
- Tüm görseller `next/image`, doğru `sizes`, hero `priority`, gerisi lazy.
- Görsel formatları: WebP/AVIF. Kullanıcıya görselleri optimize boyutta üretmesini hatırlat.
- Font: next/font ile, subset Türkçe. Render-blocking yok.
- Kullanılmayan JS/CSS yok. Client component sayısı minimumda.
- Animasyon yalın (CSS), reduced-motion saygılı.
- `npm run build` çıktısında büyük bundle uyarısı varsa düzelt.
- Mümkünse Lighthouse CI veya `npx unlighthouse` ile yerelde ölç, skorları raporla.

### 3. Yasal/teknik son kontrol
- KVKK aydınlatma sayfası (`/kvkk`) ve çerez bildirimi var mı (form veri topluyor).
- 404 sayfası, hata sınırları.
- Tüm dış linkler `rel="noopener"`.

### 4. Deploy
- `.env.example` tam (RESEND_API_KEY veya GMAIL_*, ADMIN_PASSWORD vb.).
- Kullanıcıya: Vercel'e bağla, env değişkenlerini Vercel panelinden gir, `brainfitankara.com` domainini bağla (DNS).
- İlk deploy sonrası canlıda formu test et (gerçek mail düşüyor mu).

### 5. Teslim
- `STATUS.md` 08'i işaretle, kısa bir "yayın sonrası yapılacaklar" notu bırak (Search Console doğrulama, GBP, ilk blog yazıları, gerçek görsellerin yüklenmesi).

### Doğrulama
Canlı URL açılsın, form çalışsın, PageSpeed mobil skorunu kullanıcıya bildir.
