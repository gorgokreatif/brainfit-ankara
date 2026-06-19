# BUILD_PLAN.md — BrainFit Ankara Sitesi

> **Claude Code, bu dosya senin ana yol haritandır.** Her oturumda önce bu dosyayı oku.
> Aşamaları SIRAYLA uygula. Her aşamayı bitirince `STATUS.md`'yi güncelle.
> Bir aşama bitmeden sonrakine geçme. Takıldığında dur ve kullanıcıya sor.

## Proje özeti

Tek şube (Ankara) için, hız öncelikli, SEO/GEO odaklı bir BrainFit tanıtım + lead toplama sitesi.
Çoklu şube YOK, veritabanı YOK. İçerik git-tabanlı (dosyada), form gönderimi mail ile.

**Hedefler (pazarlık konusu değil):**
- Google PageSpeed (mobil) 90+, LCP < 2sn
- Minimal animasyon: tek hafif imza efekt, gerisi yalın (three.js YOK)
- Konumlandırma: "rehabilitasyon değil, potansiyel" + ilaçsız + bilimsel + Singapur kökeni
- Birincil dönüşüm: interaktif 5 alanlı mini değerlendirme → form (mail) + WhatsApp butonu

## Teknik temel
- Next.js (App Router) + TypeScript
- Statik üretim (SSG) öncelikli; form için tek bir server action / route handler
- İçerik: `/content` altında JSON + Markdown (blog)
- Stil: Tailwind CSS (yalın), CSS değişkenleriyle marka renkleri
- Mail: önce Resend dene (Vercel ile sorunsuz); olmazsa Nodemailer+Gmail SMTP'ye düş
- Deploy: Vercel

## Aşama sırası

| # | Dosya | Ne yapar | Bağımlılık |
|---|-------|----------|------------|
| 00 | `prompts/00_setup.md` | Proje kurulumu, bağımlılıklar, klasör yapısı, tasarım token'ları | — |
| 01 | `prompts/01_content_model.md` | İçerik dosya şeması (JSON/MD) + örnek içerik | 00 |
| 02 | `prompts/02_layout_shell.md` | Header, footer, navigasyon, ortak bileşenler, SEO altyapısı | 01 |
| 03 | `prompts/03_homepage.md` | Ana sayfa: hero, konum, programlar, sosyal kanıt, SSS, CTA | 02 |
| 04 | `prompts/04_assessment.md` | İnteraktif 5 alanlı mini değerlendirme + sonuç + form | 02 |
| 05 | `prompts/05_inner_pages.md` | Programlar, Check-Up, Hakkımızda, Ekibimiz, İletişim, açılış sayfaları | 02 |
| 06 | `prompts/06_blog.md` | Markdown tabanlı blog: liste + yazı + SEO | 02 |
| 07 | `prompts/07_admin_panel.md` | Korumalı hafif panel: içerik metinleri, ekip, blog, footer, iletişim düzenleme | 01-06 |
| 08 | `prompts/08_seo_perf_deploy.md` | Schema, sitemap, performans denetimi, PageSpeed, Vercel deploy | hepsi |

## Görseller
Görseller `prompts/IMAGE_PROMPTS.md` içinde listelenmiştir. Kullanıcı bunları **Nano Banana 2** ile
üretip `public/images/` altına belirtilen dosya adıyla koyacaktır. Sen kodda bu yolları referans ver;
görsel henüz yoksa zarif bir placeholder (renkli blok veya blur) kullan, sayfayı bozma.

## Çalışma kuralları
1. Her aşama başında `STATUS.md`'yi oku, en son nerede kalındığını gör.
2. Aşamayı uygula, `npm run build` ile derlemeyi DOĞRULA.
3. Aşama bitince `STATUS.md`'de o satırı `[x]` yap ve kısa not düş.
4. Kullanıcı görsel/karar girdisi gerektiren bir yere geldiğinde DUR ve sor.
5. Asla veritabanı ekleme, asla three.js ekleme, asla animasyon dozunu artırma.
