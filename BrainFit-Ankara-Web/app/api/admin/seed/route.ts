import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function POST() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const catDikkat = await prisma.blogCategory.upsert({
    where: { id: 'cat-dikkat' },
    create: { id: 'cat-dikkat', name: 'Dikkat & Odaklanma', color: '#00B4E5' },
    update: {},
  })
  const catGelisim = await prisma.blogCategory.upsert({
    where: { id: 'cat-gelisim' },
    create: { id: 'cat-gelisim', name: 'Bilişsel Gelişim', color: '#51AD32' },
    update: {},
  })
  const catAile = await prisma.blogCategory.upsert({
    where: { id: 'cat-aile' },
    create: { id: 'cat-aile', name: 'Aile Rehberi', color: '#CE007F' },
    update: {},
  })

  const team = [
    { id: 'team-1', name: 'Uzm. Psk. Ayşe Kaya', role: 'Klinik Psikolog & Merkez Direktörü', bio: "Çocuk ve ergen psikolojisi alanında 12 yıllık deneyimiyle BrainFit Ankara'nın kurucu direktörüdür.", tags: 'Klinik Psikoloji,DEHB,Bilişsel Gelişim', color: '#00B4E5', order: 1 },
    { id: 'team-2', name: 'Uzm. Öğrt. Mehmet Arslan', role: 'Özel Eğitim Uzmanı', bio: 'Özel eğitim ve disleksi alanında uzmanlaşmış, kişiye özel destek programları hazırlamaktadır.', tags: 'Özel Eğitim,Disleksi,Okuma Güçlüğü', color: '#51AD32', order: 2 },
    { id: 'team-3', name: 'Uzm. Fzt. Selin Demir', role: 'Çocuk Fizyoterapisti', bio: 'Psiko-motor gelişim ve duyusal bütünleme alanında uzman.', tags: 'Fizyoterapi,Motor Gelişim,Duyusal Bütünleme', color: '#CE007F', order: 3 },
    { id: 'team-4', name: 'Uzm. Psk. Burak Yılmaz', role: 'Çocuk Psikologu', bio: 'BrainFit Junior ve Scholar programlarını yönetmektedir.', tags: 'Çocuk Psikolojisi,Erken Müdahale', color: '#F8AF00', order: 4 },
  ]

  for (const m of team) {
    await prisma.teamMember.upsert({ where: { id: m.id }, create: m, update: m })
  }

  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    create: { id: 'main', phone: '+90 312 XXX XX XX', whatsapp: '+905XXXXXXXXX', email: 'info@brainfitankara.com', address: 'Çankaya, Ankara', hours: 'Hafta içi 09:00 – 18:00', mapsEmbed: '', updatedAt: new Date() },
    update: {},
  })

  const posts = [
    {
      id: 'post-1',
      title: 'Çocuğunuzun Dikkat Süresi Neden Bu Kadar Kısa?',
      slug: 'cocugunuzun-dikkat-suresi',
      excerpt: 'Dikkat süresi yaşa göre değişir — ama "bu kadar kısa olmamalı" dediğiniz anda harekete geçme vakti gelmiş olabilir.',
      content: `<h2>Dikkat Süresi Aslında Ne Kadar Olmalı?</h2>
<p>Ebeveynlerin en sık sorduğu sorulardan biri: <em>"Benim çocuğum neden 5 dakika bile oturamıyor?"</em> Cevap, beklediğinizden çok daha nüanslı.</p>
<p>Araştırmalar, dikkat süresinin yaşla doğrudan orantılı olduğunu gösteriyor. Kabaca bir kural: <strong>yaş × 2-5 dakika</strong>. Yani 6 yaşında bir çocuktan 12-30 dakika sürekli odaklanması beklenebilir; ancak bu rakam aktivitenin türüne, çocuğun motivasyonuna ve ortama göre büyük farklılıklar gösterir.</p>

<h2>Kısa Dikkat Süresinin Gerçek Nedenleri</h2>
<p>Her kısa dikkat süresi DEHB değildir. Araştırmalar, aşağıdaki faktörlerin dikkat süresini doğrudan etkilediğini ortaya koyuyor:</p>
<ul>
  <li><strong>Yetersiz uyku:</strong> 7-12 yaş arası için önerilen 9-11 saat uyku eksikliği, prefrontal korteksi — yani dikkat ve yürütücü işlevlerin merkezi — doğrudan baskılar. (Walker, 2017)</li>
  <li><strong>Dijital ekran alışkanlığı:</strong> Hızlı geçişlere alışan beyin, yavaş ilerleyen görevlerde "düşük uyarılma" hisseder ve dikkati kaçar.</li>
  <li><strong>Kaygı ve stres:</strong> Akademik baskı veya aile içi çatışma, çalışma belleği kapasitesini tüketir — odaklanmak için gereken zihinsel alan kalmazibisi.</li>
  <li><strong>Görsel-işitsel işleme güçlükleri:</strong> Çocuğun %20'si fark edilmeden hafif düzeyde görsel veya işitsel işleme güçlüğü yaşar. Bu durumda çocuk aslında "dikkatini vermek" istiyor, ama beyin girdiyi verimli işleyemiyor.</li>
</ul>

<h2>Dikkat Eksikliği mi, Dikkat Farklılığı mı?</h2>
<p>DEHB gerçek bir nörogelişimsel farklılıktır ve tanı için kapsamlı bir değerlendirme gerekir. Ancak pratikte gördüğümüz vakaların büyük çoğunluğu, <strong>desteklenebilir dikkat güçlükleri</strong>dir — yani doğru müdahaleyle hızla iyileşme gösteren durumlar.</p>
<p>BrainFit'teki Cog-Map değerlendirmemizde, dikkat profilini beş farklı boyutta inceliyoruz: sürekli dikkat, inhibitör kontrol, tepki tutarlılığı, seçici dikkat ve bölünmüş dikkat. Bu detaylı profil, hangi müdahalenin en etkili olacağını belirlememizi sağlıyor.</p>

<h2>Evde Uygulayabileceğiniz 3 Strateji</h2>
<ol>
  <li><strong>Pomodoro'nun çocuk versiyonu:</strong> Küçük, net zaman dilimleri belirleyin — 8 yaş için 15 dakika çalışma, 5 dakika serbest. Timer görsel olmalı (kum saati veya görsel zamanlayıcı).</li>
  <li><strong>Görevi somutlaştırın:</strong> "Ödevini yap" yerine "Bu 3 matematik sorusunu çöz" deyin. Beyin belirsiz görevlerde daha fazla enerji harcar.</li>
  <li><strong>Dikkat "kasını" egzersiz ettirin:</strong> Satranç, blok yapı, bulmaca ve strateji oyunları prefrontal korteksi doğrudan çalıştırır. Haftada 3-4 seans 20 dakika yeterli.</li>
</ol>

<p><em>Çocuğunuzun dikkat profilini bilimsel olarak görmek ister misiniz? <a href="/test">Ücretsiz Mini Test</a> ile 5 dakikada temel bilişsel haritanızı çıkarın.</em></p>`,
      categoryId: catDikkat.id,
      tags: 'dikkat,odaklanma,DEHB,çalışma belleği',
      published: true,
      publishedAt: new Date('2026-01-15'),
    },
    {
      id: 'post-2',
      title: 'DEHB mi, Dikkat Dağınıklığı mı? Farkı Nasıl Anlarsınız?',
      slug: 'dehb-mi-dikkat-daginikligi-mi',
      excerpt: 'Her dikkat sorunu DEHB değildir. Ancak her iki durumda da erken müdahale büyük fark yaratır — işte ayırt edici belirtiler.',
      content: `<h2>İki Kavramın Farkı</h2>
<p>Günlük dilde "dikkat dağınıklığı" ve "DEHB" çoğu zaman birbirinin yerine kullanılıyor. Oysa bunlar farklı kavramlar. DEHB (Dikkat Eksikliği ve Hiperaktivite Bozukluğu), nörogelişimsel bir tanıdır ve DSM-5 kriterlerine göre belirlenen belirli semptomları gerektirir. Dikkat dağınıklığı ise çok daha geniş bir şemsiye kavramdır.</p>

<h2>DEHB'in Temel Belirtileri</h2>
<p>Amerikan Psikiyatri Birliği'nin tanı kriterlerine göre DEHB şu özellikleri içerir:</p>
<ul>
  <li>En az 6 aydır süren ve birden fazla ortamda (ev + okul) gözlemlenen belirtiler</li>
  <li>Dikkat eksikliği alt tipi: kolay dağılma, görevleri tamamlamada güçlük, organizasyon sorunları</li>
  <li>Hiperaktivite/dürtüsellik alt tipi: aşırı hareket, sırasını bekleyememe, düşünmeden davranma</li>
  <li>12 yaşından önce başlayan semptomlar</li>
</ul>
<p><strong>Önemli:</strong> Bu kriterlerin hepsinin aynı anda karşılanması gerekir. Sadece "çok hareketli" ya da "sınıfta dağılıyor" gözlemi tek başına DEHB tanısı koymak için yeterli değildir.</p>

<h2>DEHB'i Taklit Eden Durumlar</h2>
<p>Aşağıdaki durumlar, DEHB ile çok benzer görünebilir ancak tamamen farklı müdahale gerektirir:</p>
<ul>
  <li><strong>Uyku sorunları:</strong> Kronik uyku eksikliği olan çocuklar DEHB ile neredeyse özdeş bir dikkat profili gösterir.</li>
  <li><strong>Kaygı bozukluğu:</strong> Kaygılı çocuklar da dikkatlerini toplayamaz — ancak bu, beynin tehlikeye karşı alarm modunda olmasından kaynaklanır.</li>
  <li><strong>Öğrenme güçlükleri:</strong> Disleksisi olan bir çocuk, okuma görevlerinde anlayamadığı için dağılıyor görünür. Sorun dikkat değil, fonolojik işlemedir.</li>
  <li><strong>Gifted (Üstün Zeka):</strong> Yetenekli çocuklar, yeterince zorlanmadıkları görevlerde sıkılır ve dağılır görünür.</li>
</ul>

<h2>Ne Zaman Uzman Görüşü Alınmalı?</h2>
<p>Aşağıdaki durumlardan ikisi veya daha fazlası 6 aydır devam ediyorsa profesyonel değerlendirme önerilir:</p>
<ul>
  <li>Okul performansı belirgin şekilde düşüyor</li>
  <li>Öğretmenler ve aile aynı endişeyi dile getiriyor</li>
  <li>Arkadaşlık ilişkileri olumsuz etkileniyor</li>
  <li>Çocuk kendini "aptal" ya da "tembel" olarak tanımlıyor</li>
</ul>
<p>BrainFit Ankara'da uyguladığımız Cog-Map protokolü, DEHB ile benzer görünen durumları birbirinden ayırt eden 18 sayfalık kapsamlı bir profil sunar. Tanı koymak psikiyatristin işidir; ancak bilişsel profilinizi anlamak için bu değerlendirme kritik bir başlangıç noktasıdır.</p>

<p><em>Merak ediyorsanız, <a href="/test">5 dakikalık ücretsiz bilişsel tarama</a> ile temel dikkat profilinizi görebilirsiniz.</em></p>`,
      categoryId: catDikkat.id,
      tags: 'DEHB,dikkat eksikliği,tanı,nörogelişim',
      published: true,
      publishedAt: new Date('2026-01-22'),
    },
    {
      id: 'post-3',
      title: 'Beyin Egzersizleri Gerçekten İşe Yarıyor mu? Bilim Ne Diyor?',
      slug: 'beyin-egzersizleri-ise-yariyor-mu',
      excerpt: 'Nöroplastisite sayesinde beyin her yaşta değişebilir. Ancak hangi egzersizlerin gerçekten işe yaradığı bilimsel tartışmanın tam merkezinde.',
      content: `<h2>Nöroplastisite: Beynin Değişme Kapasitesi</h2>
<p>Beyin "sabit" bir organ değildir. Nöroplastisite, sinir sisteminin deneyime yanıt olarak yapısal ve işlevsel değişiklikler gösterme kapasitesini tanımlar. Bu süreç, özellikle 0-12 yaş arasında doruk noktasına ulaşır — ancak yetişkinlikte de devam eder.</p>
<p>Londra taksi şoförlerinin hipokampüsünün (uzamsal hafıza merkezi) mesleki deneyimle genişlediğini gösteren klasik çalışmadan (Maguire et al., 2000) bu yana yüzlerce araştırma, doğru aktivasyonun beynin fiziksel yapısını değiştirebildiğini kanıtladı.</p>

<h2>İşe Yaradığı Kanıtlanan Aktiviteler</h2>
<p>Tüm "beyin eğitimi" uygulamaları eşit değildir. Güçlü bilimsel kanıt bulunanlar:</p>
<ul>
  <li><strong>Müzik eğitimi:</strong> Planlı müzik pratiği, hem motor korteks hem de prefrontal kortekste ölçülebilir yapısal değişikliklere yol açar. Dikkat, çalışma belleği ve dil becerileriyle güçlü korelasyon gösterir. (Schellenberg, 2004)</li>
  <li><strong>Satranç:</strong> Planlama, örüntü tanıma ve inhibitör kontrol becerilerini aynı anda çalıştırır. Akademik performansla pozitif ilişki kurulmuştur.</li>
  <li><strong>Aerobik egzersiz:</strong> Koşu, yüzme, dans gibi sürekli aerobik aktiviteler BDNF (beyin kökenli nörotrofik faktör) salınımını artırarak nörogenezi — yeni nöron oluşumunu — destekler.</li>
  <li><strong>Çalışma belleği eğitimi (Cogmed, BrainFit protokolleri):</strong> Yapılandırılmış, zorluk düzeyi artan hafıza egzersizleri, gerçek hayat görevlerine transfer edilebilen kazanımlar üretir. (Klingberg et al., 2005)</li>
</ul>

<h2>İşe Yaramadığı Gösterilen Yaklaşımlar</h2>
<p>Lumosity gibi uygulamaların arkasındaki şirket, 2016'da FTC tarafından yanıltıcı reklamlara karşı 2 milyon dolar ceza ödedi. Neden? Oyunda iyileşmek, gerçek hayat becerilerine çoğunlukla transfer olmuyor. "Transfer problemi" beyin eğitimi araştırmalarının en büyük sorunu olmaya devam ediyor.</p>
<p><strong>Sonuç:</strong> Beyin egzersizlerinden maksimum fayda sağlamak için aktivite, hedef bilişsel beceriyle doğrudan ilgili olmalı; zorluk düzeyi artmalı; ve gerçek hayat bağlamında pratik yapılmalıdır.</p>

<h2>BrainFit Yaklaşımı</h2>
<p>BrainFit programlarında kullandığımız egzersizler, her çocuğun Cog-Map profili doğrultusunda kişiselleştirilir. Güçlü alanlara değil, geliştirilmesi gereken alanlara odaklanarak beynin en plastik olduğu dönemde maksimum kazanım hedefleriz.</p>`,
      categoryId: catGelisim.id,
      tags: 'nöroplastisite,beyin egzersizi,bilişsel gelişim,çalışma belleği',
      published: true,
      publishedAt: new Date('2026-02-01'),
    },
    {
      id: 'post-4',
      title: 'Disleksi Olan Çocuklar Neden Genellikle Olağanüstü Yaratıcıdır?',
      slug: 'disleksi-olan-cocuklar-neden-akilli',
      excerpt: 'Disleksi bir zeka sorunu değil, beyin organizasyonunun farklı bir biçimidir. Ve bu farklılık beklenmedik güçler de beraberinde getirir.',
      content: `<h2>Disleksi Nedir — Gerçekten?</h2>
<p>Disleksi, yazılı dili okuma ve işleme sürecinde yaşanan nörobiyolojik kökenli bir güçlüktür. Dünyada çocukların yaklaşık %10'unu etkiler ve Türkiye'de her sınıfta ortalama 2-3 disleksili öğrenci bulunur. Ancak vakaların büyük çoğunluğu hâlâ fark edilmiyor.</p>
<p>Kritik nokta: Disleksi, zeka düşüklüğüyle hiçbir ilişkisi olmayan bir durumdur. Beynin sol hemisferindeki fonolojik işleme güçlüğünden kaynaklanır — harfleri seslere bağlama mekanizması yavaş ya da atipik çalışır.</p>

<h2>Disleksili Beynin Güçlü Yönleri</h2>
<p>Son 20 yılın araştırmaları ilgi çekici bir tablo ortaya koyuyor. Disleksili bireyler bazı bilişsel alanlarda istatistiksel olarak üstün performans gösteriyor:</p>
<ul>
  <li><strong>Büyük resim düşünme:</strong> Detaylar yerine örüntüleri ve genel yapıları hızla kavrama kapasitesi.</li>
  <li><strong>3 boyutlu uzamsal zeka:</strong> Mühendisler, mimarlar ve sanatçılar arasında disleksi oranının genel nüfusa kıyasla yüksek olduğu gözlemleniyor.</li>
  <li><strong>Analoji ve metafor üretme:</strong> Sol hemisfer baskısının azalması, sağ hemisfer yaratıcı bağlantılarını güçlendirebilir.</li>
  <li><strong>Yüksek empati:</strong> Hayatları boyunca "farklı" olmayı deneyimleyen disleksili bireyler çoğunlukla güçlü sosyal sezgiye sahip.</li>
</ul>
<p>Steve Jobs, Richard Branson, Albert Einstein, Pablo Picasso — bu isimler tesadüf değil.</p>

<h2>Erken Müdahalenin Kritik Önemi</h2>
<p>Araştırmalar, 7 yaş öncesinde başlayan müdahalenin disleksili çocukların %80'inde okuma seviyesini normale yaklaştırdığını gösteriyor. (Shaywitz, 2003) Bu pencere kapandıktan sonra ilerleme mümkün — ama çok daha yavaş.</p>
<p>Müdahale ertelendiğinde ortaya çıkan en büyük hasar okumaktan değil, öz güvenden olur. "Ben aptalım" inancı bir kez yerleşince bilişsel müdahaleden çok daha zorlu bir sorunla yüz yüze gelirsiniz.</p>

<h2>BrainFit Disleksi Programı</h2>
<p>Programımız, Orton-Gillingham yaklaşımına dayanan çoklu duyusal okuma müdahalesi ile bilişsel güçlendirme çalışmalarını birleştiriyor. Çocuğun hem güçlü yönlerini kullanarak özgüvenini artırıyor hem de fonolojik işleme becerisini sistematik biçimde geliştiriyoruz.</p>`,
      categoryId: catGelisim.id,
      tags: 'disleksi,okuma güçlüğü,nöroçeşitlilik,yaratıcılık',
      published: true,
      publishedAt: new Date('2026-02-10'),
    },
    {
      id: 'post-5',
      title: 'Çocuğunuzla Ders Çalışmanın Bilimi: Yardım mı, Engel mi?',
      slug: 'cocugunuzla-nasil-ders-calismalisiniz',
      excerpt: 'Ebeveynlerin ders sürecine dahil olma biçimi, akademik başarıyı doğrudan etkiler. Ama nasıl dahil olacağınız tam olarak önemlidir.',
      content: `<h2>Yardım Etmek mi, Bağımsızlığı Desteklemek mi?</h2>
<p>Her ebeveynin sezgisel tepkisi çocuğunu takılınan yerde kurtarmaktır. Ama araştırmalar şaşırtıcı bir şeyi gösteriyor: ebeveyn yardımının kalitesi, miktarından çok daha belirleyici.</p>
<p>Vygotsky'nin "Yakın Gelişim Alanı" kavramı burada kritik: Çocuk ne çok kolay ne de çok zor görevlerde gelişir — tam sınırındaki görevlerde. Ebeveyn bu sınırı zorlamadan, ama yalnız da bırakmadan tutar.</p>

<h2>Yapmamanız Gereken 4 Şey</h2>
<ul>
  <li><strong>Cevabı vermek:</strong> "5×7=35" demek yerine "5 tane 7 var, hepsini toplarsan?" diye sormak. Çocuğun beyni çözümü bulduğunda dopamin salgılar — bu bağımlılık yaratan motivasyonun kaynağı.</li>
  <li><strong>Yanı başında oturmak:</strong> Sürekli gözetim altında çalışan çocuk bağımsız çalışma rutini geliştiremez. Fiziksel varlığınız "sen yapamassın" mesajı taşıyabilir.</li>
  <li><strong>Hataları anında düzeltmek:</strong> Hata, öğrenmenin en güçlü tetikleyicisidir. Beyin hatadan sonra bilgiyi daha güçlü kodlar — bu süreci kısmayın.</li>
  <li><strong>Sonucu ödüllendirmek:</strong> "100 aldın, sana oyun alıyorum" yerine "Bu kadar çok çalıştın, gördüm" demek. Dışsal ödüller içsel motivasyonu uzun vadede aşındırır. (Deci & Ryan, 2000)</li>
</ul>

<h2>Yapmanız Gereken 3 Şey</h2>
<ol>
  <li><strong>Rutin oluşturun:</strong> Beyin aynı saatte, aynı yerde çalışmaya koşullanır. Hazırlık enerjisini bu rutin tasarruf eder.</li>
  <li><strong>Soru sorun, cevap vermeyin:</strong> Sokrates yöntemini uygulayın — düşünceyi yönlendirin, ama düşünmelerini sağlayın.</li>
  <li><strong>Mücadeleyi normalleştirin:</strong> "Bu zor, nasıl düşündüğünü anlat bana" demek, "Dur, anlatayım" demekten çok daha güçlü bir kaldıraç.</li>
</ol>

<h2>Öğrenme Güçlüğü Şüpheniz Varsa</h2>
<p>Eğer çocuğunuz yeterli zaman ve destek almasına rağmen hâlâ belirli alanlarda takılıyorsa, bu yöntem sorunları değil, işleme farklılıkları olabilir. Cog-Map değerlendirmesi tam olarak bu noktada netlik sağlıyor.</p>`,
      categoryId: catAile.id,
      tags: 'ders çalışma,motivasyon,bağımsız öğrenme,aile',
      published: true,
      publishedAt: new Date('2026-02-18'),
    },
    {
      id: 'post-6',
      title: 'Uyku Çocuğunuzun Beyni İçin Neden Bir Süper Güç?',
      slug: 'uyku-beyin-gelisimi',
      excerpt: 'Uyku yalnızca dinlenme değil, beynin bilgileri işleyip kalıcı belleğe aktardığı, toksinleri temizlediği aktif bir süreçtir.',
      content: `<h2>Uyku Sırasında Beyin Ne Yapar?</h2>
<p>Çocuğunuz uyurken beyin aktivitesi durmuyor — tam tersine bazı kritik süreçler yalnızca uyku sırasında gerçekleşiyor.</p>
<ul>
  <li><strong>Bellek pekiştirme:</strong> Gün içinde hippocampüste geçici olarak depolanan bilgiler, derin uyku sırasında kortekse aktarılır ve uzun süreli belleğe dönüşür. Bir sınav öncesi gece geç saate kadar çalışmak, bu sürecin kesilmesi anlamına gelir.</li>
  <li><strong>Glimfatik temizlik:</strong> Beyin, uyku sırasında gündüzden %60 daha büyüyen glimfatik kanalları aracılığıyla metabolik atıkları temizler. Bu atıklar arasında ileriki yaşlarda nörodejeneratif hastalıklarla ilişkilendirilen proteinler de var.</li>
  <li><strong>Duygusal işleme:</strong> REM uykusu, gün içinde yaşanan duygusal yükü azaltır. Yetersiz REM olan çocuklar daha reaktif ve kaygılı görünür.</li>
</ul>

<h2>Yaşa Göre Önerilen Uyku Süreleri</h2>
<ul>
  <li>3-5 yaş: 10-13 saat (şekerleme dahil)</li>
  <li>6-12 yaş: 9-11 saat</li>
  <li>13-18 yaş: 8-10 saat</li>
</ul>
<p>Türkiye'de yapılan araştırmalar, okul çağı çocuklarının %40'ının bu sürenin altında uyuduğunu gösteriyor.</p>

<h2>Uyku Kalitesini Bozan 3 Alışkanlık</h2>
<ol>
  <li><strong>Yatmadan önce ekran:</strong> Mavi ışık, uyku hormonU melatonin üretimini 2-3 saate kadar baskılıyor. Yatmadan en az 1 saat önce ekranlar kapatılmalı.</li>
  <li><strong>Düzensiz uyku saati:</strong> Hafta sonu "telafi uykusu" biyolojik saati kaydırır, pazartesi sabahları performansı düşürür.</li>
  <li><strong>Kafein:</strong> Çikolata, kola ve enerji içeceklerindeki kafein, çocuklarda 8-10 saat boyunca etkin kalabilir.</li>
</ol>

<p><em>Çocuğunuzun dikkat ve bellek kapasitesini görmek ister misiniz? <a href="/test">Ücretsiz Mini Test</a> ile şimdi değerlendirin.</em></p>`,
      categoryId: catGelisim.id,
      tags: 'uyku,bellek,beyin gelişimi,melatonin',
      published: true,
      publishedAt: new Date('2026-03-01'),
    },
    {
      id: 'post-7',
      title: 'Çocuğunuzda Okul Kaygısı mı Var? Belirtileri ve Yönetim Yolları',
      slug: 'okul-kaygisiyla-basa-cikmak',
      excerpt: 'Sabah karın ağrısı, okula gitmeyi reddetme, gece uyuyamama — bunlar dramacılık değil, gerçek bir biyolojik alarm tepkisi.',
      content: `<h2>Okul Kaygısı Neden Gerçektir?</h2>
<p>Ebeveynlerin en sık yaptığı hata, çocuğun endişelerini küçümsemek: "Bir şey olmaz, git okula." Ama beyin açısından bakıldığında, kaygı fiziksel tehditten ayırt edilemez. Amigdala alarm verdiğinde kortizol yükselir, kalp hızlanır, mide bulanır — bunlar drama değil, fizyoloji.</p>

<h2>Okul Kaygısının Farklı Yüzleri</h2>
<ul>
  <li><strong>Ayrılık kaygısı (erken yaşlarda):</strong> Anne-babadan ayrılma korkusu, özellikle 5-8 yaşında yaygın. Bağlanma figürünün yokluğunun tehlike sinyali olarak algılanması.</li>
  <li><strong>Sosyal kaygı (okul ortası-dönem):</strong> Sınıfta konuşmaktan, hata yapmaktan, arkadaşlar tarafından reddedilmekten korku.</li>
  <li><strong>Performans kaygısı:</strong> Sınavlar, sunumlar, beden eğitimi dersleri gibi değerlendirme anlarında yoğunlaşma.</li>
  <li><strong>Okul reddi (şiddetli vakalar):</strong> Kaygı o noktaya gelmiştir ki çocuk fiziksel semptomlar üretir. Baş ağrısı, mide bulantısı okul sabahlarında "sihirli biçimde" ortaya çıkar.</li>
</ul>

<h2>Ebeveynin Yapabileceği 5 Şey</h2>
<ol>
  <li><strong>Kaygıyı geçersiz kılmayın:</strong> "Bir şey olmaz" cümlesi beyne "hislerim önemsiz" mesajı gönderir. Bunun yerine: "Endişeli hissediyorsun, anlıyorum."</li>
  <li><strong>Rutini güçlendirin:</strong> Öngörülebilirlik kaygıyı azaltır. Sabah aynı sırayla yapılan aktiviteler, beyne "her şey kontrol altında" sinyali gönderir.</li>
  <li><strong>Kademeli maruziyet:</strong> Kaçınma kaygıyı güçlendirir. Çocuğu korktuğu durumla kademeli ve kontrollü biçimde yüzleştirmek, zamanla kaygı eşiğini yükseltir.</li>
  <li><strong>Nefes tekniklerini öğretin:</strong> "Kutu nefesi" (4 say nefes al, 4 say tut, 4 say ver, 4 say bekle) parasempatik sistemi 90 saniye içinde aktive eder.</li>
  <li><strong>Okulla iletişimi güçlendirin:</strong> Öğretmen ve rehber öğretmenin durumdan haberi olmalı. Koordineli yaklaşım çok daha etkili.</li>
</ol>

<h2>Ne Zaman Uzman Yardımı Almalı?</h2>
<p>Kaygı 3 haftadan uzun sürüyorsa, okul devamsızlığına yol açıyorsa veya sosyal hayatı ciddi biçimde kısıtlıyorsa çocuk psikologu değerlendirmesi önerilir. BrainFit'teki ekibimiz hem bilişsel hem de duygusal boyutu birlikte ele alıyor.</p>`,
      categoryId: catAile.id,
      tags: 'okul kaygısı,ayrılık kaygısı,sosyal kaygı,aile',
      published: true,
      publishedAt: new Date('2026-03-08'),
    },
    {
      id: 'post-8',
      title: 'Cog-Map Değerlendirmesi Nedir ve Çocuğunuza Ne Kazandırır?',
      slug: 'cog-map-degerlendirmesi-nedir',
      excerpt: 'Cog-Map, tek bir test değil — çocuğun tüm bilişsel profilini 18 sayfada ortaya çıkaran kapsamlı bir zihin haritalama protokolüdür.',
      content: `<h2>Neden Standart IQ Testleri Yeterli Değil?</h2>
<p>IQ testi tek bir sayı üretir ve bu sayı bir çocuğun güçlü ve zayıf yönleri hakkında çok az şey söyler. 130 IQ'lu bir çocuğun çalışma belleği zayıf olabilir; 95 IQ'lu başka bir çocuğun görsel-uzamsal zekası olağanüstü olabilir. Müdahale planlamak için bu detaya ihtiyaç var.</p>
<p>Cog-Map protokolü tam olarak bu boşluğu doldurmak için tasarlandı.</p>

<h2>Cog-Map Neleri Ölçer?</h2>
<p>Protokol 5 temel bilişsel alan üzerinde çalışır:</p>
<ul>
  <li><strong>Dikkat & Yürütücü İşlevler:</strong> Sürekli dikkat, inhibitör kontrol, bilişsel esneklik ve planlama. Go/No-Go, Trail Making gibi standardize edilmiş görevler.</li>
  <li><strong>Görsel-Uzamsal Bellek:</strong> Corsi Blok testi ve görsel arama görevleri. Matematik ve okuma ile doğrudan ilişkili.</li>
  <li><strong>İşitsel İşleme:</strong> Fonolojik farkındalık, ritim algısı ve işitsel ayrım. Okuma güçlükleri ve dil gelişimiyle bağlantılı.</li>
  <li><strong>Psiko-motor Gelişim:</strong> Tepki süresi, el-göz koordinasyonu ve motor tutarlılık.</li>
  <li><strong>Sosyal-Duygusal Profil:</strong> Duygu tanıma, empati ölçeği ve sosyal uyum değerlendirmesi.</li>
</ul>

<h2>Süreç Nasıl İşliyor?</h2>
<ol>
  <li><strong>Ön görüşme (15-20 dk):</strong> Aile ile birlikte gelişimsel öykü, okul süreci ve mevcut endişeler.</li>
  <li><strong>Değerlendirme seansı (60-90 dk):</strong> Çocukla bire bir, oyun bazlı, standartlaştırılmış görevler.</li>
  <li><strong>Rapor hazırlama (3-5 iş günü):</strong> 18 sayfalık, puanlama grafikleri ve yaş normlarıyla kişisel profil raporu.</li>
  <li><strong>Geri bildirim görüşmesi (30 dk):</strong> Sonuçlar, güçlü yönler, müdahale önerileri ve okul için tavsiye mektubu.</li>
</ol>

<h2>Kim İçin Uygundur?</h2>
<p>Cog-Map, tanı koymak için değil, <strong>anlayıp yol haritası çıkarmak için</strong> kullanılır. Özellikle şu durumlarda önerilir:</p>
<ul>
  <li>Akademik performans yaşa göre beklenenden düşük</li>
  <li>DEHB, disleksi veya öğrenme güçlüğü şüphesi</li>
  <li>Üstün yetenekli çocuklarda güçlü/zayıf alan analizi</li>
  <li>Okul başarısı ile test performansı arasında ciddi tutarsızlık</li>
  <li>Terapi veya destek programı başlamadan önce temel profil belirleme</li>
</ul>

<p><em>Başlamak ister misiniz? Önce <a href="/test">ücretsiz Mini Test</a> ile temel bilişsel profili görün, ardından Cog-Map için randevu alın.</em></p>`,
      categoryId: catGelisim.id,
      tags: 'cog-map,değerlendirme,bilişsel profil,tanı',
      published: true,
      publishedAt: new Date('2026-03-15'),
    },
  ]

  for (const p of posts) {
    await prisma.blogPost.upsert({ where: { slug: p.slug }, create: p, update: p })
  }

  return NextResponse.json({ ok: true, message: 'Seed tamamlandı: 3 kategori, 4 ekip üyesi, 8 zengin blog yazısı güncellendi.' })
}
