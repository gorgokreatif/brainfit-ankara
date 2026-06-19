# STATUS.md — İlerleme Takibi

> Claude Code: her aşama bitince ilgili satırı `[x]` yap, yanına tarih + 1 cümle not yaz.
> Bir sonraki oturumda ilk işin bu dosyayı okumak.

## Aşamalar
- [x] 00 — Kurulum & tasarım token'ları (2026-06-19 — Next.js 14 + TS + Tailwind + src/ yapısı + token'lar + Plus Jakarta Sans/Inter fontlar; build ✓)
- [x] 01 — İçerik modeli (2026-06-19 — site/home/programs/team/assessment JSON + 3 landing page JSON + 3 blog MD + lib/content.ts; build ✓)
- [x] 02 — Layout shell (header/footer/SEO) (2026-06-19 — Header+Footer+WhatsAppFab+sitemap+robots+JSON-LD+ortak bileşenler; build ✓)
- [x] 03 — Ana sayfa (2026-06-19 — hero + belirtiler + konumlandırma + 5 alan + programlar + yorumlar + SSS + CTA; build ✓)
- [x] 04 — İnteraktif değerlendirme + form (2026-06-19 — 5-adım akış, kart sorular, opt-in form, SVG bar chart sonuç, Resend+Nodemailer mail, rate limit+honeypot; build ✓)
- [x] 05 — İç sayfalar (2026-06-19 — /programlar, /zihin-check-up, /hakkimizda, /ekibimiz, /iletisim, /disleksi, /dikkat-eksikligi, /dikkat-gelistirme; Breadcrumb+FAQ JSON-LD, ContactForm; build ✓)
- [x] 06 — Blog (2026-06-19 — /blog liste + /blog/[slug] SSG, markdown→HTML, Article+Breadcrumb JSON-LD, Tailwind Typography; build ✓)
- [x] 07 — Yönetim paneli (2026-06-19 — Option A: local+cookie auth, site/team/blog CRUD, middleware, login sayfası; build ✓)
- [x] 08 — SEO + performans + deploy (2026-06-19 — /kvkk, 404, GSC verification env, sitemap+kvkk, .env.example tam; 32 route build ✓)

## Görsel durumu (kullanıcı Nano Banana 2 ile üretecek)
- [ ] Görseller `public/images/` altına kondu (bkz. IMAGE_PROMPTS.md)

## Notlar / takılınan yerler
Tüm promptlar tamamlandı. 32 route, build ✓.

## Yayın Sonrası Yapılacaklar
1. **Gerçek görseller**: public/images/ altına hero.jpg, belirti.jpg, yaklasim.jpg, program-junior/scholar/senior.jpg, checkup-process.jpg, hakkimizda.jpg, blog-01/02/03.jpg, team üye fotoğrafları
2. **Vercel deploy**: gorgokreatif/brainfit-ankara reposuna push → Vercel otomatik deploy
3. **Env değişkenleri**: Vercel panelinden RESEND_API_KEY, ADMIN_PASSWORD, LEAD_TO_EMAIL girin
4. **Google Search Console**: Site doğrulama → NEXT_PUBLIC_GSC_VERIFICATION ekle → sitemap.xml gönder
5. **Google Business Profile**: brainfit-ankara.com domain bağlayın, GBP'de URL güncelleyin
6. **Admin paneli**: ADMIN_PASSWORD belirleyin; `/admin` ile giriş, içerik düzenleyebilirsiniz
7. **Gerçek iletişim bilgileri**: site.json → phone, email, address, whatsapp güncelleyin

## Kararlar (değiştirme)
- Tek şube: Ankara
- DB yok, içerik dosyada, form → mail
- PageSpeed 90+ / LCP < 2sn / three.js yok / minimal animasyon
- Konum: rehabilitasyon değil potansiyel; ilaçsız; bilimsel; Singapur kökeni
- 5 değerlendirme alanı: Dikkat, İşitsel, Görsel, Motor, Sosyal-Duygusal
- Birincil dönüşüm: değerlendirme → form (mail) + WhatsApp destek butonu
- Ücretsiz değerlendirme görüşmesi teklifi kullanılabilir
