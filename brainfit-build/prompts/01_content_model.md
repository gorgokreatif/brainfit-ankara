# Prompt 01 — İçerik Modeli

> Önce `STATUS.md` oku. 00 bitmiş olmalı.

---

**Görev:** Tüm site metinlerini ve yapısal verisini, panelden düzenlenebilecek şekilde `src/content/` altında dosyalara koy. Veritabanı YOK.

### Felsefe
İçerik kodda gömülü olmasın; JSON ve Markdown dosyalarında olsun. Böylece Prompt 07'deki panel bu dosyaları düzenleyip commit'leyebilir. Sayfalar bu dosyaları build sırasında okur (SSG).

### Dosyalar (oluştur ve örnek içerikle doldur)

**`src/content/site.json`** — global ayarlar
```json
{
  "brand": "BrainFit Ankara",
  "phone": "+90 312 000 00 00",
  "whatsapp": "905300000000",
  "email": "ankara@brainfit.com.tr",
  "address": "Çankaya Mah. ... Çankaya / Ankara",
  "mapsEmbed": "https://www.google.com/maps/embed?...",
  "social": { "instagram": "", "facebook": "", "youtube": "" },
  "footer": {
    "about": "BrainFit, ilaçsız ve bilimsel temelli zihin gelişim programıdır.",
    "legalLinks": [{ "label": "KVKK Aydınlatma Metni", "href": "/kvkk" }]
  }
}
```

**`src/content/home.json`** — ana sayfa metinleri (hero başlık, alt başlık, bölüm metinleri, CTA'lar, SSS, yorumlar). Bölüm 03'teki yapıyla birebir uyumlu olsun.

**`src/content/programs.json`** — Junior/Scholar/Senior + Zihin Check-Up tanımları.

**`src/content/team.json`** — Ekibimiz: isim, unvan, kısa bio, foto yolu (`/images/team-xx.jpg`).

**`src/content/pages/`** — disleksi, dehb, dikkat açılış sayfalarının metinleri (her biri ayrı json).

**`src/content/blog/`** — Markdown yazılar. Her dosya frontmatter içersin:
```
---
title: "..."
description: "..."
date: 2026-06-19
cover: /images/blog-xx.jpg
tags: [dikkat, ebeveyn]
---
```

### Yardımcı
`src/lib/content.ts` — JSON ve markdown okuyan tip-güvenli fonksiyonlar (gray-matter + markdown-to-html için `remark` veya benzeri). Build-time okuma; runtime fetch YOK.

### İçerik tonu (kritik)
- Konum: "rehabilitasyon değil, potansiyel". İlaçsız. Bilimsel. Singapur kökenli.
- Anneye hitap: önce duygu (kaygıyı azalt, umut ver), sonra kanıt.
- "Tanı" iddiası YOK. "Değerlendirme/profil/eğilim" dili kullan.
- Abartılı rakam/iddia YOK (Harvard/%70 gibi). Güven kotuğu: Singapur kökeni + bilimsel araştırma + yıllara dayalı deneyim.

### Doğrulama
`npm run build` geçsin. `STATUS.md` 01'i işaretle.
