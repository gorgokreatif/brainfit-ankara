# Prompt 00 — Kurulum & Tasarım Token'ları

> Bunu Claude Code'a ilk olarak ver. Önce `BUILD_PLAN.md` ve `STATUS.md`'yi okumasını iste.

---

**Görev:** BrainFit Ankara sitesi için Next.js (App Router) + TypeScript + Tailwind projesini kur ve tasarım sistemini tanımla.

### 1. Proje kurulumu
- `npx create-next-app@latest` ile App Router, TypeScript, Tailwind, ESLint seçili kur.
- `src/` dizini kullan. `app/` App Router altında olsun.
- Gereksiz boilerplate'i (demo içerik) temizle.

### 2. Klasör yapısı (oluştur)
```
src/
  app/                # sayfalar
  components/         # yeniden kullanılabilir bileşenler
  content/            # JSON içerik + blog markdown (Prompt 01'de doldurulacak)
  lib/                # yardımcılar (içerik okuma, mail, seo)
public/
  images/             # Nano Banana 2 görselleri buraya
  logo.svg
```

### 3. Marka tasarım token'ları
Tailwind config + global CSS'e şu CSS değişkenlerini tanımla. **Bunlar markanın resmi renkleridir, değiştirme:**
```
--ink: #16202E          /* ana metin */
--primary: #1F6FB2      /* BrainFit mavi */
--primary-deep: #0E4C82 /* koyu mavi, başlık/buton */
--accent: #1FA8A0       /* teal vurgu */
--warm: #E8893B         /* sıcak turuncu, ikincil vurgu */
--paper: #F4F7FB        /* arka plan */
```
Logo `public/logo.svg`'ye konacak (kullanıcı sağlayacak); yoksa metin logo "BrainFit Ankara" kullan.

### 4. Tipografi
- Display/başlık: karakterli ama okunaklı bir sans (örn. "Plus Jakarta Sans" veya "Sora") — `next/font` ile yükle, böylece performans korunur.
- Gövde: nötr, yüksek okunaklı (örn. "Inter").
- next/font kullan ki font yükleme LCP'yi bozmasın. Google Fonts'u runtime'da `<link>` ile ÇEKME.

### 5. Performans kuralları (baştan uygula)
- Tüm görseller `next/image` ile, `sizes` ve boyut belirtilmiş.
- Animasyon minimal: sadece CSS transition/transform. three.js, framer-motion gibi ağır kütüphane EKLEME.
- `prefers-reduced-motion` saygı göster.
- Hiçbir client component gereksiz yere "use client" almasın; çoğu sayfa server component kalsın.

### 6. Doğrulama
- `npm run dev` çalışsın, `npm run build` hatasız geçsin.
- Bitince `STATUS.md`'de 00 satırını işaretle.

**Tasarım yönü notu:** Şablon görünümünden kaçın. Sıcak, güven veren, "klinik değil ama bilimsel" bir his hedefle. Bol beyaz alan, yumuşak köşeler, sakin mavi-teal palet. Tek imza efekt için fikir: hero'da çok hafif, yavaş hareket eden bir nöron/bağlantı noktaları dokusu (SADECE CSS/SVG, performansı bozmadan). Maksimalizmden kaçın.
