# BrainFit Engine

Tek komutla bir BrainFit şubesi sitesini içerik + görsel + CMS ile üretip Vercel'e deploy eden pipeline.

```
node scripts/launch.js --branch=config/branch.ankara.json --deploy
```

Bu komut sırayla: içeriği üretir → Magnific görsellerini hazırlar/doğrular → marka temasını yazar → Next.js build alır → Vercel'e prod deploy eder.

---

## Mimari

```
brainfit-engine/
├── config/
│   ├── branch.example.json     # şablon — yeni şube = bunun kopyası
│   └── branch.ankara.json      # Ankara şubesinin verisi (sen oluşturacaksın)
├── scripts/
│   ├── launch.js               # ORKESTRATÖR — tek komut
│   └── lib/
│       ├── content.js          # branch.json → content.json (opsiyonel LLM)
│       └── magnific.js         # Magnific görsel üretimi/doğrulama
└── site/                       # Next.js 14 App Router uygulaması
    ├── app/                    # sayfalar + theme.css (üretilen)
    ├── components/             # NeuralHero (three.js), ScrollReveal, vb.
    ├── content/content.json    # üretilen içerik (build bunu okur)
    └── public/generated/       # üretilen görseller
```

Felsefe: **branch.json tek doğruluk kaynağı.** Yeni şehir açmak = yeni bir `branch.<şehir>.json` doldurup komutu çalıştırmak. Kod hiç değişmez.

---

## Neler gerekli (senin tarafında)

| İhtiyaç | Ne için | Nasıl |
|---|---|---|
| Node ≥ 20 | Pipeline'ı çalıştırmak | `node --version` |
| Vercel hesabı + CLI | Deploy | `npm i -g vercel && vercel login` |
| Domain (brainfitankara.com) | Yayın | DNS'i Vercel'e yönlendir, `vercel domains add` |
| Magnific erişimi | Görseller | Aşağıya bak — iki mod var |
| (Opsiyonel) Anthropic API key | İçeriği LLM ile zenginleştirmek | `USE_LLM=1` + `ANTHROPIC_API_KEY` |

### Görsel üretiminin iki modu

Magnific MCP'n Claude.ai connector'ında. Bu pipeline iki şekilde çalışabilir:

**Mod A — MCP / manuel (varsayılan, en güvenli):** Görselleri Claude.ai'da Magnific MCP'nle üretirsin, dosyaları `site/public/generated/<key>.jpg` olarak koyarsın. Pipeline çalıştığında hangi görsellerin gerektiğini ve prompt'larını listeler. Retry maliyeti tamamen senin kontrolünde — bu, video/görselin "değişken maliyet" sorununa karşı en korumalı yol.

**Mod B — API (otomatik):** `MAGNIFIC_API_KEY` ve `MAGNIFIC_ENDPOINT` env değişkenlerini verirsen pipeline doğrudan üretir. Magnific'in REST şeması değişebildiği için endpoint konfigüre edilebilir bırakıldı.

Üretilmiş görsel zaten varsa tekrar üretilmez (`FORCE_IMAGES=1` ile zorlanır). Bu, gereksiz retry maliyetini keser.

---

## Animasyon yaklaşımı (full mod)

`site/components/` altında:
- `NeuralHero` — three.js ile hero'da canlı nöron-ağı sahnesi (lazy-load, `prefers-reduced-motion` ve mobilde statik görsele düşer)
- `ScrollReveal` — IntersectionObserver tabanlı, GPU-dostu reveal
- `ParallaxSection` — scroll-bağlı görsel hareketi

Performans notu: three.js sahnesi yalnızca hero'da; alt bölümler hafif scroll efektleriyle. Bu sayede mobil Lighthouse skoru ve yerel SEO korunur — bu sektörde dönüşümün asıl belirleyicisi bu.

---

## CMS

Site, `content.json` + `public/generated/` üzerinden çalışır. Tam CMS (blog, randevu, şube yönetimi, görsel yükleme) için iki yol:

1. **Git tabanlı (önerilen başlangıç):** İçerik dosyaları repo'da; panel onları düzenleyip commit eder. Sıfır ek altyapı maliyeti.
2. **Headless CMS:** Sanity/Payload entegrasyonu — randevu ve blog için kalıcı veritabanı gerektiğinde.

İlk sürümde git-tabanlı + basit korumalı admin route ile başlamanı öneririm; randevu hacmi büyüyünce headless'a geçeriz.

---

## Yeni şube açmak

```bash
cp config/branch.example.json config/branch.izmir.json
# branch.izmir.json'u doldur (domain, şehir, iletişim, renkler)
node scripts/launch.js --branch=config/branch.izmir.json --deploy
```
