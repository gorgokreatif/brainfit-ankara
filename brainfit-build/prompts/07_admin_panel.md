# Prompt 07 — Yönetim Paneli (Hafif, Git-Tabanlı)

> `STATUS.md` oku. 01-06 bitmiş olmalı. Bu, kullanıcının kritik gördüğü parça.

---

**Görev:** Tek yöneticinin (sen) içerik dosyalarını tarayıcıdan düzenleyebileceği korumalı, hafif bir panel kur. Veritabanı YOK — panel doğrudan `src/content/` dosyalarını okur/yazar.

### Kapsam (kullanıcının istediği, sık değişenler)
Panelden düzenlenebilir:
- **Ekibimiz** (team.json): ekle/düzenle/sil, foto yolu ata.
- **Sayfa içi metin cümleleri** (home.json, pages/*.json): metin alanlarını düzenle.
- **Blog** (content/blog/*.md): yeni yazı oluştur, düzenle, yayımla/sil. Markdown editör (basit textarea + önizleme yeterli).
- **İletişim & Footer** (site.json): telefon, adres, mail, sosyal, footer metinleri, yasal linkler.

### Mimari kararı (önemli)
İki seçenek var, kullanıcıya kısaca sun ve tercihine göre kur:

**A) Yerel/build-time panel (en basit, önerilen):**
- Panel sadece `npm run dev` ile yerelde çalışır; dosyaları diske yazar; sen `git commit && push` ile yayınlarsın (Vercel otomatik deploy).
- Avantaj: sıfır güvenlik riski (internete açık değil), sıfır ek maliyet. Dezavantaj: yayını sen push'larsın.

**B) Canlı panel (Vercel üzerinde, korumalı):**
- `/admin` rotası, basit şifre/oturum koruması (env'de tek parola, NextAuth credentials veya basit cookie).
- Düzenleme → GitHub API ile repo'ya commit (token env'de) → Vercel otomatik deploy.
- Avantaj: her yerden düzenlersin. Dezavantaj: GitHub token + auth kurulumu, biraz daha karmaşık.

> Kullanıcı tek yönetici ve içerik az değişiyor demişti → **A önerilir.** Ama kullanıcı "her yerden düzenlemek isterim" derse B'yi kur.

### Güvenlik (B seçilirse)
- `/admin` ve API rotaları auth arkasında. Parola env'de (`ADMIN_PASSWORD`), asla kodda değil.
- GitHub token env'de, commit'ler tek repoya sınırlı.
- Rate limit + CSRF koruması.

### UX
- Sade, form tabanlı. Alanlar net Türkçe etiketli ("Ekip üyesi adı", "Footer açıklama").
- Kaydet → diske/repoya yaz → başarı mesajı. Hata → ne olduğunu açık söyle.
- Görsel yükleme: A'da elle `public/images`'a koyma; B'de basit upload (GitHub'a) opsiyonel.

### Doğrulama
- Seçilen modda bir alanı düzenle, değişiklik içerik dosyasına yansısın, sayfa güncellensin.
- `npm run build` geçsin. `STATUS.md` 07'yi işaretle.
