# Prompt 04 — İnteraktif Değerlendirme & Form (En Kritik Dönüşüm Aracı)

> `STATUS.md` oku. 02 bitmiş olmalı.

---

**Görev:** `/degerlendirme` rotasında, oyunlaştırılmış hisli bir mini değerlendirme akışı kur. Sonuçta form ile lead'i mail olarak topla. Veritabanı YOK.

### Önemli çerçeve (etik + yasal)
- Bu bir **tanı aracı DEĞİL**. Her yerde "profil / eğilim / gelişime açık alan" dili kullan.
- Kaygı YARATMA; var olan belirsizliği nete çeviren, rahatlatıp harekete geçiren bir ton kullan.
- Sonuç asla "çocuğunuzda X bozukluğu var" demez. "Şu alanlara bakmak faydalı olabilir" der.

### Akış (5 adım)
1. **Davet ekranı:** "2 dakikada çocuğunuzun güçlü ve gelişime açık alanlarını görün." Başlat butonu.
2. **5–7 soru, ekranda tek soru:** görsel/oyunsu seçenekler, ilerleme çubuğu. Her soru 5 alandan birine puan yazar (Dikkat, İşitsel, Görsel, Motor, Sosyal-Duygusal). Sorular ebeveynin gözlemlediği davranışlar üzerinden (örn. "Çocuğunuz yönergeleri kaç kez tekrar ister?").
   - **Oyunlaştırma fikri:** saf anket gibi durmasın; kart seçme, kaydırıcı, basit görsel eşleştirme gibi hafif etkileşimler. Ama AĞIR animasyon/oyun motoru YOK — hafif React state + CSS yeterli. three.js YOK.
3. **Opt-in (son soru ile sonuç arası):** "Sonucunuzu görmek ve ücretsiz değerlendirme görüşmesi için bilgilerinizi bırakın." Form: ad, telefon, e-posta, çocuğun yaşı. Kısa tut (5 alan veya az). KVKK onay kutusu (ayrı pazarlama izni isteğe bağlı).
4. **Sonuç sayfası:** 5 alanın basit görsel profili (bar/radar — hafif SVG, kütüphane şart değil). Her alan için 1-2 cümle yorum + genel "şu alana bakmak faydalı" önerisi. Net sonraki adım: **"Ücretsiz Değerlendirme Görüşmesi planlayın"** + **WhatsApp destek butonu** (wa.me linki).
5. **Mail gönderimi:** form gönderilince lead bilgisi + tüm cevaplar + hesaplanan profil sana mail olarak gider.

### Mail altyapısı (`src/lib/mail.ts` + route handler / server action)
- **Önce Resend dene** (`RESEND_API_KEY` env). Vercel ile sorunsuz, ücretsiz katman yeterli.
- Resend kullanılamazsa **Nodemailer + Gmail SMTP** (uygulama şifresi, `GMAIL_USER` / `GMAIL_APP_PASSWORD` env) fallback.
- `.env.example` oluştur, gerçek anahtar koyma.
- Mail içeriği: lead iletişim + çocuğun yaşı + 5 alan puanları + ham cevaplar. Konu: "Yeni Değerlendirme — [ad]".
- **Google Takvim notu:** SMTP doğrudan takvim etkinliği açmaz. Maile, tek tıkla etkinlik oluşturan bir "Google Takvim'e ekle" linki (takvim URL şeması) göm — kullanıcı maili açıp ekleyebilsin. Otomatik takvim entegrasyonu bu aşamada YOK; gerekirse sonra eklenir.

### Performans & teknik
- Değerlendirme akışı client component (state gerekli) ama mümkün olduğunca yalın.
- Form gönderimi server action veya `/app/api/lead/route.ts`.
- Spam koruması: basit honeypot alanı + rate limit (basit, bellek içi yeterli).

### Doğrulama
- Akış uçtan uca çalışsın (yerelde test maili). `npm run build` geçsin. `STATUS.md` 04'ü işaretle.
- Kullanıcıya hatırlat: Resend veya Gmail app-password anahtarını `.env`'e koymalı.
