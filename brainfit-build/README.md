# BrainFit Ankara — Build Paketi Kullanım Kılavuzu

Bu klasör, Claude Code'un terminalde sırayla takip ederek BrainFit Ankara sitesini kurmasını sağlar.

## İçindekiler
```
BUILD_PLAN.md            # Ana yol haritası — Claude Code önce bunu okur
STATUS.md                # İlerleme takibi — Claude Code kendini bununla yönetir
prompts/
  00_setup.md            # Kurulum & tasarım token'ları
  01_content_model.md    # İçerik dosya şeması
  02_layout_shell.md     # Header/footer/SEO altyapısı
  03_homepage.md         # Ana sayfa
  04_assessment.md       # İnteraktif değerlendirme + form (en kritik)
  05_inner_pages.md      # Programlar, check-up, hakkımızda, ekibimiz, iletişim, açılışlar
  06_blog.md             # Markdown blog
  07_admin_panel.md      # Hafif yönetim paneli
  08_seo_perf_deploy.md  # SEO + performans + Vercel deploy
  IMAGE_PROMPTS.md       # Nano Banana 2 görsel promptları
```

## Nasıl kullanılır

### 1. Bu klasörü projenin kök dizinine koy
Boş bir proje klasörü aç, bu dosyaları içine kopyala.

### 2. Claude Code'u başlat ve ilk talimatı ver
Terminalde Claude Code'a şunu yaz:

> "Bu klasördeki `BUILD_PLAN.md` ve `STATUS.md` dosyalarını oku. Sonra `prompts/00_setup.md`'yi uygula. Bitince `STATUS.md`'yi güncelle ve dur, bana haber ver."

### 3. Aşamaları sırayla ilerlet
Her aşama bitince bir sonrakini ver:

> "Şimdi `prompts/01_content_model.md`'yi uygula."

Claude Code `STATUS.md` sayesinde nerede kaldığını bilir; oturum kapansa bile kaldığı yerden devam edebilir. İstersen tek seferde de verebilirsin:

> "`BUILD_PLAN.md`'deki sırayı takip ederek 00'dan 08'e kadar tüm aşamaları uygula, her aşama sonunda `STATUS.md`'yi güncelle ve build'i doğrula. Karar/görsel gereken yerde dur ve bana sor."

### 4. Görselleri sen üret
`prompts/IMAGE_PROMPTS.md`'deki promptları **Nano Banana 2** ile üret, belirtilen dosya adlarıyla `public/images/` altına koy. Görseller olmadan da site çalışır (placeholder); hazır olunca koyarsın.

### 5. Yayın
Aşama 08'de Claude Code seni Vercel deploy + env değişkenleri + domain bağlama konusunda yönlendirecek.

## Hatırlatmalar
- **Mail için:** Resend hesabı (ücretsiz katman) en sorunsuzu; alternatif Gmail uygulama şifresi. Anahtarları Vercel env'e gir, koda yazma.
- **Panel için:** tek yönetici + az değişen içerik olduğu için "yerel/build-time panel" (Prompt 07, seçenek A) önerilir; "her yerden düzenlemek isterim" dersen Claude Code canlı panel (B) kurar.
- **Değişmez kararlar:** tek şube, DB yok, three.js yok, minimal animasyon, PageSpeed 90+, "tanı değil değerlendirme" dili, "rehabilitasyon değil potansiyel" konumu.

## Sıra şeması
```
00 setup
   └─ 01 içerik modeli
        └─ 02 layout shell ──┬─ 03 ana sayfa
                             ├─ 04 değerlendirme + form
                             ├─ 05 iç sayfalar
                             └─ 06 blog
                                  └─ 07 panel (01-06'ya bağlı)
                                       └─ 08 SEO + performans + deploy
```
