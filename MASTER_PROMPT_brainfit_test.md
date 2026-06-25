# BrainFit "Zihin Check-Up Mini" — Master Build Prompt (Claude Code için)

> Bu dosyanın tamamını terminaldeki Claude Code'a yapıştır. Üst kısım **master prompt** (rol + görev + kısıtlar), alt kısım **birebir uygulanacak içerik ve algoritma spesifikasyonu**. Claude Code bunu olduğu gibi inşa etmeli; tasarım/metin değişikliği gerekiyorsa bana sormalı.

---

## 1. ROL VE BAĞLAM

Sen, Next.js (App Router) + Vercel + Vercel Blob altyapısı üzerinde çalışan bir senior front-end + lead-gen geliştiricisisin. BrainFit Ankara (bilişsel gelişim merkezi) sitesine, **lead toplayan ücretsiz bir mini bilişsel değerlendirme testi** ekleyeceksin. Site şu an canlı: tasarım dili, renkler ve component yapısı mevcut siteyle (site-iota-ten-71.vercel.app) bire bir uyumlu olmalı. Mevcut Tailwind/komponent sistemini ve marka tonunu ("rehabilitation değil, potansiyel" / "etiketlemeden anlamak") koru.

Bu test **tanı koymaz**. Bir tarama/farkındalık aracıdır ve tek gerçek amacı: kullanıcıdan (genelde anne) iletişim bilgisi toplayıp, ardından "Cog-Map Zihin Check-Up" randevusuna yönlendirmek. Bilimsellik algısını yükseltmek için tepki süresi (RT) ve doğruluk ölçen mini görevler içerir, ama sonuç ham puan değil **yaş-grubuna göre normalize edilmiş, pozitif çerçeveli bir profil** olarak sunulur.

## 2. GÖREV

`/test` rotası altında, 5 dakikada bitirilebilen, **mobil-öncelikli (mobile-first)**, tek sayfa akışlı (multi-step state machine) bir test uygulaması kur. Akış:

1. **Karşılama + yaş kategorisi seçimi**
2. **Lead formu** (test SONUNDA değil, sonuç ÖNCESİNDE — aşağıda gerekçe var)
3. **5 alanın mini görevleri** (yaş kategorisine göre içerik değişir)
4. **Sonuç ekranı** (radar/bar profil + CTA)
5. Veri Vercel Blob'a yazılır + (opsiyonel) Resend ile bildirim.

## 3. KESİN KISITLAR (NON-NEGOTIABLE)

- **Süre:** Toplam aktif görev süresi ≤ 5 dk. Hedef: 6 mini görev × ~30-45 sn + form ~60 sn.
- **Mobil:** Tüm görevler tek elle, dikey ekranda, parmakla yapılabilmeli. Min dokunma hedefi 48×48px. `touch-action: manipulation`, çift-tap zoom engelli. Sürükleme YOK (mobilde güvenilmez) — sadece tap.
- **RT ölçümü:** `performance.now()` kullan (Date.now değil). Her tap'in stimulus-onset'e göre gecikmesini ms cinsinden kaydet.
- **Web RT uyarısı (önemli):** Tarayıcı/cihaz gecikmesi nedeniyle ham RT lab değerleriyle KARŞILAŞTIRILAMAZ. Bu yüzden algoritma ham ms'i değil **kişinin kendi içindeki tutarlılığını (varyans) ve kendi yaş grubu bandına göre yüzdelik dilimini** kullanır. Mutlak ms değerini kullanıcıya ASLA gösterme.
- **İşitsel görev:** Kulaklık zorunlu değil ama "kulaklık önerilir + ses açık mı?" kontrol ekranı koy. Ses çıkmıyorsa o görevi atlayıp profilde "işitsel: ölçülemedi, merkezde değerlendirilir" notu göster (lead yine de toplanır).
- **KVKK:** Form altında açık rıza onay kutusu (zorunlu), KVKK metnine link. Veri yalnızca ön görüşme amacıyla kullanılır ibaresi. 18 yaş altı için "ebeveyn/veli olarak dolduruyorum" onayı.
- **Veri kaybı koruması:** Lead, görevler tamamlanmasa bile kaydedilsin (form submit anında 1. POST; görevler bitince 2. PATCH ile skorlar eklensin). Terk eden kullanıcı da lead'dir.
- **Erişilebilirlik:** Renk-körü güvenli paletler, `prefers-reduced-motion` desteği, ARIA etiketleri.

## 4. YAŞ KATEGORİLERİ (3 grup)

| Kategori | Yaş | Etiket (UI) | İçerik tonu |
|---|---|---|---|
| A | 4–6 | "Okul Öncesi (4–6 yaş)" | Tamamen görsel/ikon, yazı minimum, sesli yönerge butonu, büyük objeler, ebeveyn yardımıyla |
| B | 7–14 | "Okul Çağı (7–14 yaş)" | Standart zorluk, oyunlaştırılmış, çocuk tek yapabilir |
| C | 15+ | "Genç & Yetişkin (15+)" | Daha hızlı/zorlayıcı eşikler, yetişkin diliyle |

Yaş seçimi, her görevin zorluk parametrelerini (`difficultyConfig[ageGroup]`) ve normalizasyon bandını belirler. Form'daki "çocuğun yaşı" alanı serbest sayı; kategori bu sayıdan otomatik türetilebilir ama kullanıcı kategoriyi en başta seçtiği için ikisi tutarlı tutulmalı.

## 5. LEAD FORM ALANLARI

```
- veli_ad_soyad         (text, zorunlu)
- telefon               (tel, zorunlu, TR formatı +90 maskesi)
- email                 (email, zorunlu)
- test_kimin_icin       (select: "Çocuğum" / "Kendim" / "Öğrencim/Danışanım")
- cocuk_ad              (text, opsiyonel — "kendim" seçilirse gizlenir)
- cocuk_yas             (number, "kendim" değilse zorunlu)
- sehir                 (text, opsiyonel, default boş)  
- kvkk_onay             (checkbox, zorunlu)
- veli_onay_18alti      (checkbox, sadece yaş<18 ise görünür+zorunlu)
- kaynak                (hidden: "mini-test")
- created_at            (otomatik ISO)
```

**Form konumu kararı:** Form, görevlerden ÖNCE alınır. Gerekçe §"ARTI/EKSİ" bölümünde. Kullanıcıya "Sonuçları nereye gönderelim?" çerçevesiyle sorulur — bu, formu engel değil değer vaadi olarak konumlandırır.

---

## 6. TEST İÇERİĞİ — 6 MİNİ GÖREV (5 ALAN)

Sıra önemli: kolay/eğlenceli görevle başla (göz korkutmasın), bilişsel yük ortada zirve yapsın, pozitif/kolay görevle bitir. Önerilen sıra: 1→2→3→4→5→6.

Her görev için **3 yaş varyantı** parametrelerle ayrışır; görev mekaniği aynı kalır, zorluk/hız/uyaran sayısı değişir.

### GÖREV 1 — Dikkat & Odaklanma: "Hedef Avı" (Go/No-Go + seçici dikkat)
**Bilimsel temel:** Go/No-Go & CPT (Continuous Performance Test) paradigması — dürtü kontrolü + sürdürülen dikkat. Web tabanlı Go/No-Go'nun çocuk-yetişkin RT farkını ayırt ettiği literatürde doğrulanmış.

**Mekanik:** Ekranda art arda objeler belirir (her biri 800–1200ms görünür, arada 500ms boşluk). Kullanıcı **hedef** objede tap yapar, **çeldirici**de tap YAPMAZ.
- A (4–6): Hedef = 🐰 tavşan, çeldirici = 🦁 aslan. 12 deneme, %70 hedef. Yavaş tempo (obje 1500ms).
- B (7–14): Hedef = yeşil daire, çeldirici = kırmızı daire + bazen mavi (3 uyaran). 20 deneme, %65 hedef.
- C (15+): Hedef = harf "X" ama yalnızca öncesinde "A" geldiyse (AX-CPT light). 24 deneme. Hızlı tempo (obje 900ms).

**Ölçülen:** doğru tap sayısı (hit), yanlış tap (commission error = dürtüsellik), kaçırma (omission = dikkat dalması), ortalama RT, RT varyansı (RT-CV → dikkat tutarlılığının altın metriği).

### GÖREV 2 — Görsel Gelişim: "Hangisi Farklı / Eşle" (görsel ayrım + kolaydan zora)
**Bilimsel temel:** Görsel arama (visual search) + görsel ayrımlama; zorluk artışı (set size) ile görsel işleme hızı.

**Mekanik:** 6 görevlik mini set, kolaydan zora. Her ekranda bir grup obje; kullanıcı "diğerlerinden farklı olanı" bulup tap'ler. Çeldirici benzerliği arttıkça zorlaşır.
- A: 4 obje, belirgin renk/şekil farkı. 4 ekran.
- B: 6–9 obje, yön/detay farkı (dönmüş şekil). 6 ekran.
- C: 12+ obje, ince detay (eksik çizgi, ayna simetrisi). 8 ekran, süre baskısı (her ekran 6sn).

**Ölçülen:** doğruluk, ekran başına RT, zorluk arttıkça RT artış eğimi (işleme verimliliği).

### GÖREV 3 — Görsel-Mekansal Hafıza: "Işıkları Hatırla" (Corsi Block-Tapping replikası)
**Bilimsel temel:** Corsi Block-Tapping — görsel-mekansal çalışma belleği. Dijital/tablet versiyonları orijinal norm verileriyle uyumlu (span ~5–6). Mobilde tap ile mükemmel replike olur.

**Mekanik:** Izgarada kareler sırayla yanıp söner; kullanıcı aynı sırayla tap'ler. Span doğru oldukça +1 uzar, 2 ardışık hata = dur. (Adaptif span.)
- A: 3×3 ızgara, 2'den başla. Yavaş yanıp sönme (her kare 1000ms).
- B: 3×3 ızgara, 3'ten başla. 700ms.
- C: 4×4 ızgara, 4'ten başla. 500ms. + 1 tur **ters sıra** (backward span).

**Ölçülen:** maksimum span (asıl skor), her seviyede doğru/yanlış. Bu, "Görsel Gelişim" alanına Görev 2 ile birlikte katkı verir (görsel-mekansal hafıza alt boyutu).

### GÖREV 4 — İşitsel Gelişim: "Sesi Yakala / Ritmi Say" (işitsel ayrım + temporal işleme)
**Bilimsel temel:** İşitsel temporal işleme & ayrımlama (TAVS / AudBility paradigmaları); ritim algısı fonolojik farkındalığın temeli. Ham ses değil **örüntü** ölçülür → cihaz/gürültü hatasına daha dayanıklı.

**Ön kontrol:** "Ses açık mı? Şu tonu duyuyor musun?" → test butonu. Duymuyorsa görev atlanır (profilde "merkezde ölçülecek" notu).

**Mekanik:** İki alt görev:
- (a) **İşitsel ayrım:** İki ses çalınır; "aynı mı farklı mı?" (yükseklik/perde farkı). 6 deneme, fark kolaydan zora azalır.
- (b) **Ritim sayma:** Bir ritim çalınır ("kaç vuruş duydun?" veya A grubunda "bu ritmi tekrarla" — ekrana tap ile). 4 deneme.
- A: Sadece "kaç hayvan sesi duydun?" (1–3 ses), büyük belirgin farklar.
- B: Perde ayrımı + 3–5 vuruş sayma.
- C: İnce perde farkı + ritmi tap ile tekrar (inter-tap interval doğruluğu ölçülür).

**Ölçülen:** ayrım doğruluğu, ritim doğruluğu, (C'de) tekrar zamanlama hatası.

### GÖREV 5 — Motor Gelişim: "Hızlı Dokunuş / Takip Et" (psiko-motor hız + el-göz koordinasyonu)
**Bilimsel temel:** Basit RT + hedefe yönelme (reaching/aiming). Çocuklarda 6–9 yaş arası hedefe yönelme RT'si yetişkine yaklaşır; ince motor + el-göz koordinasyonu göstergesi.

**Mekanik:** İki alt görev:
- (a) **Basit RT:** Ekran yeşile döndüğünde olabildiğince hızlı tap. 5 deneme (rastgele 1–3sn gecikme; erken tap = "acele etme" uyarısı, sayılmaz). 
- (b) **Hedef takibi:** Ekranda beliren hedefe (farklı konumlarda) hızlı ve isabetli tap. 8 hedef. İsabet noktası ile hedef merkezi arası sapma (px) = motor isabet.
- A: Büyük hedefler (120px), yavaş. Sadece (a) + 4 büyük hedef tap.
- B: Orta hedefler (80px). Tam set.
- C: Küçük hedefler (50px), hedefler hızlı kaybolur (1.2sn).

**Ölçülen:** basit RT ortalaması + varyansı, hedef isabet sapması, kaçırılan hedef.

### GÖREV 6 — Sosyal-Duygusal Gelişim: "Yüzdeki Duygu" (duygu tanıma) + kısa ebeveyn anketi
**Bilimsel temel:** Yüz ifadesi duygu tanıma (DANVA/CAFE paradigması) sosyal bilişin temel boyutu; çocukta yaşla gelişir. Performans görevi + bildirim ölçeği birlikte.

**Mekanik (2 parça):**
- (a) **Performans:** Bir yüz ifadesi gösterilir (çizim/ikon stili — gerçek çocuk fotoğrafı kullanma, telif+rıza riski; **stilize illüstrasyon kullan**). "Bu yüz ne hissediyor?" 4 seçenek (mutlu/üzgün/kızgın/korkmuş + B-C'de şaşkın/iğrenme). 5 deneme.
  - A: 3 temel duygu (mutlu/üzgün/kızgın), büyük net ifadeler.
  - B: 5 duygu.
  - C: 6 duygu + 1 "karışık/nötr" ince ayrım.
- (b) **Kısa bildirim anketi (3 madde, Likert 1–5):** "Yeni ortamlara uyum", "hayal kırıklığında sakinleşme", "akran ilişkileri" — ebeveyn (A/B) veya öz-bildirim (C) için ifade. Bu, performansla üçgenlenir.

**Ölçülen:** duygu tanıma doğruluğu + anket ortalaması. (Anket asıl ağırlık, çünkü tek görevle sosyal-duygusal alan güvenilir ölçülemez — bunu profilde "gözleme dayalı" olarak çerçevele.)

---

## 7. SKORLAMA & RAPOR ALGORİTMASI

> Amaç: ham puanı **yaş-grubu bandına göre 0–100 "gelişim göstergesi"ne** çevirmek ve 5 alanı pozitif dille sunmak. Tanısal eşik YOK.

### 7.1 Ham metrik → alan ham skoru
Her alan için ham metrikler birleştirilir (örnek ağırlıklar, `config` ile ayarlanabilir):

```
Dikkat        = 0.4*accuracy_norm + 0.3*(1 - commissionRate) + 0.3*(1 - RT_CV_norm)
Görsel        = 0.5*(görev2_accuracy) + 0.5*(corsi_span_norm)        // span yaşa göre normalize
İşitsel       = 0.6*ayrim_accuracy + 0.4*ritim_accuracy   // ölçülemediyse null
Motor         = 0.5*(1 - simpleRT_norm) + 0.3*(1 - isabet_sapma_norm) + 0.2*(1 - RT_CV_norm)
SosyalDuygusal= 0.5*duygu_accuracy + 0.5*(anket_ort/5)
```

### 7.2 Yaşa göre normalizasyon (KRİTİK)
Ham RT/span'ı doğrudan kullanma. Her yaş grubu için literatür-temelli **referans bandı** tanımla (`normBands[ageGroup]`). Örnek RT bandları (basit görsel RT, ms — yalnızca iç normalizasyon için, kullanıcıya gösterilmez):

```
A (4–6):   beklenen ortalama ~600–900ms   (çok değişken; geniş bant)
B (7–14):  ~350–500ms
C (15+):   ~250–350ms
```
RT_norm = kişinin RT'sinin kendi yaş bandı içindeki konumu (0=bandın yavaş ucu, 1=hızlı ucu), 0–1'e clamp. Corsi span normu: A≈2–4, B≈4–6, C≈5–7.

**Tutarlılık (RT_CV)** = std(RT)/mean(RT). Düşük CV = istikrarlı dikkat. Bu metrik cihaz-gecikmesinden bağımsızdır (orana dayanır) → en güvenilir göstergedir, ağırlığı yüksek tut.

### 7.3 Skor → bant etiketi (pozitif çerçeve)
0–100 skoru 3 banda ayır, ama **nötr/pozitif dille**:
```
≥ 70  →  "Güçlü alan 💪"        (Bu alan yaşına göre güçlü görünüyor)
40–69 →  "Gelişmekte 🌱"        (Yaşına uygun, desteklenebilir)
< 40  →  "Desteklenebilir 🎯"   (Bu alanda küçük desteklerle hızlı ilerleme mümkün)
```
"Zayıf", "düşük", "sorun", "risk" gibi kelimeler YASAK. Her zaman gelişim potansiyeli dili.

### 7.4 Sonuç ekranı içeriği
- **Radar grafik** (5 alan, 0–100) — mobilde okunaklı, recharts veya saf SVG.
- Her alan için 1 cümle pozitif açıklama + 1 cümle "BrainFit'te nasıl desteklenir" köprüsü.
- **En güçlü alan** vurgusu (önce övgü → motivasyon).
- **Güçlü uyarı kutusu:** "Bu mini test bir ön fikir verir, tanı koymaz. Çocuğunuzun tam profilini 5 alanda detaylı ölçen Cog-Map Zihin Check-Up ile çıkarıyoruz."
- **Birincil CTA:** "Ücretsiz Ön Görüşme Planla" → /iletisim. **İkincil CTA:** "18 sayfalık Cog-Map'i incele" → /cog-map.
- İşitsel ölçülemediyse: o alanda "merkezde değerlendirilecek" rozeti.

---

## 8. TEKNİK MİMARİ

```
/app/test/page.tsx                → state machine (steps: intro→age→form→tasks→result)
/app/test/components/
    AgeSelect.tsx
    LeadForm.tsx
    tasks/GoNoGo.tsx
    tasks/VisualSearch.tsx
    tasks/CorsiSpan.tsx
    tasks/AuditoryTask.tsx
    tasks/MotorTask.tsx
    tasks/EmotionTask.tsx
    ResultRadar.tsx
/app/test/lib/
    scoring.ts        → tüm normalizasyon + bant mantığı, saf fonksiyonlar (unit-test edilebilir)
    normBands.ts      → yaş bandı sabitleri
    difficultyConfig.ts → ageGroup başına görev parametreleri
/app/api/test-lead/route.ts   → POST (lead) + PATCH (skorlar) → Vercel Blob
```

**Veri akışı:**
1. Form submit → `POST /api/test-lead` → Blob'a `leads/{uuid}.json` yaz, uuid'yi client'a dön.
2. Görevler bitince → `PATCH /api/test-lead?id={uuid}` → aynı dosyaya skor objesi ekle.
3. (Opsiyonel) Resend ile `info@brainfitankara.com`'a "Yeni mini-test lead" maili.

**Blob kayıt şeması:**
```json
{
  "id": "uuid",
  "lead": { "veli_ad_soyad": "...", "telefon": "...", "email": "...", "test_kimin_icin": "...", "cocuk_ad": "...", "cocuk_yas": 8, "kvkk_onay": true },
  "ageGroup": "B",
  "scores": { "dikkat": 72, "gorsel": 64, "isitsel": null, "motor": 80, "sosyalDuygusal": 58 },
  "rawMetrics": { "...": "ham RT/accuracy/span dizileri (iç analiz için)" },
  "completed": true,
  "created_at": "ISO",
  "completed_at": "ISO"
}
```

**State yönetimi:** React `useReducer` veya zustand. localStorage KULLANMA (Artifact değil ama; yine de session içi state yeterli, sayfa yenilenirse baştan — kısa test için kabul edilebilir; istersen sessionStorage ile kaldığı görevden devam ettir).

**Görev component sözleşmesi:** Her task component `onComplete(metrics: TaskMetrics)` callback'i ile bittiğini bildirir; parent reducer skoru toplar. Her görev kendi başına izole, timer'ları `useRef` + cleanup ile yönetir (memory leak yok).

## 9. KABUL KRİTERLERİ (Definition of Done)
- [ ] Mobilde (375px) tüm görevler tek elle yapılabiliyor, taşma yok.
- [ ] Toplam akış gerçek kullanıcıyla ≤ 5 dk.
- [ ] Form gönderildiği an Blob'a lead düşüyor (görev tamamlanmasa bile).
- [ ] Sonuç ekranında ms/ham puan GÖRÜNMÜYOR; sadece 0–100 + pozitif bant.
- [ ] KVKK onayı olmadan form submit edilemiyor.
- [ ] `scoring.ts` saf fonksiyonları için en az birkaç unit test.
- [ ] İşitsel ses kontrolü başarısızsa akış kırılmadan devam ediyor.
- [ ] `prefers-reduced-motion` ve renk-körü palet kontrol edildi.
- [ ] Marka rengi/tonu mevcut siteyle tutarlı.

## 10. İLK ADIM
Önce mimariyi ve `scoring.ts` + `difficultyConfig.ts` iskeletini kur, sonra Görev 1'i (Go/No-Go) uçtan uca (UI + metrik + skor) çalışır hale getir ve bana göster. Onay alınca diğer görevleri sırayla ekle. Her görevden sonra dur ve test edilebilir bir build ver.
