import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Categories
  const catDikkat = await prisma.blogCategory.upsert({
    where: { id: 'cat-dikkat' },
    create: { id: 'cat-dikkat', name: 'Dikkat & Odaklanma', color: '#00B4E5' },
    update: { name: 'Dikkat & Odaklanma', color: '#00B4E5' },
  })
  const catGelisim = await prisma.blogCategory.upsert({
    where: { id: 'cat-gelisim' },
    create: { id: 'cat-gelisim', name: 'Bilişsel Gelişim', color: '#51AD32' },
    update: { name: 'Bilişsel Gelişim', color: '#51AD32' },
  })
  const catAile = await prisma.blogCategory.upsert({
    where: { id: 'cat-aile' },
    create: { id: 'cat-aile', name: 'Aile Rehberi', color: '#CE007F' },
    update: { name: 'Aile Rehberi', color: '#CE007F' },
  })

  console.log('Categories created.')

  // Team members
  const team = [
    {
      id: 'team-1',
      name: 'Uzm. Psk. Ayşe Kaya',
      role: 'Klinik Psikolog & Merkez Direktörü',
      bio: 'Çocuk ve ergen psikolojisi alanında 12 yıllık deneyimiyle BrainFit Ankara\'nın kurucu direktörüdür. Bilişsel gelişim, dikkat bozuklukları ve öğrenme güçlükleri konularında uzmanlaşmıştır.',
      tags: 'Klinik Psikoloji,DEHB,Bilişsel Gelişim',
      color: '#00B4E5',
      order: 1,
    },
    {
      id: 'team-2',
      name: 'Uzm. Öğrt. Mehmet Arslan',
      role: 'Özel Eğitim Uzmanı',
      bio: 'Özel eğitim ve disleksi alanında uzmanlaşmış olan Mehmet Bey, çocukların okuma-yazma süreçlerindeki güçlükleri için kişiye özel destek programları hazırlamaktadır.',
      tags: 'Özel Eğitim,Disleksi,Okuma Güçlüğü',
      color: '#51AD32',
      order: 2,
    },
    {
      id: 'team-3',
      name: 'Uzm. Fzt. Selin Demir',
      role: 'Çocuk Fizyoterapisti',
      bio: 'Psiko-motor gelişim ve duyusal bütünleme alanında uzman olan Selin Hanım, çocukların motor becerilerini ve duyusal işlemleme kapasitelerini geliştirmeye odaklanmaktadır.',
      tags: 'Fizyoterapi,Motor Gelişim,Duyusal Bütünleme',
      color: '#CE007F',
      order: 3,
    },
    {
      id: 'team-4',
      name: 'Uzm. Psk. Burak Yılmaz',
      role: 'Çocuk Psikologu',
      bio: 'Erken çocukluk dönemi değerlendirme ve müdahale programları konusunda deneyimli olan Burak Bey, BrainFit Junior ve Scholar programlarını yönetmektedir.',
      tags: 'Çocuk Psikolojisi,Erken Müdahale,BrainFit Junior',
      color: '#F8AF00',
      order: 4,
    },
  ]

  for (const member of team) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      create: member,
      update: member,
    })
  }
  console.log('Team members created.')

  // Site settings
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    create: {
      id: 'main',
      phone: '+90 312 XXX XX XX',
      whatsapp: '+905XXXXXXXXX',
      email: 'info@brainfitankara.com',
      address: 'Çankaya, Ankara',
      hours: 'Hafta içi 09:00 – 18:00',
      mapsEmbed: '',
      updatedAt: new Date(),
    },
    update: {},
  })
  console.log('Site settings created.')

  // Blog posts
  const posts = [
    {
      id: 'post-1',
      title: 'Çocuğunuzun Dikkat Süresi Neden Bu Kadar Kısa?',
      slug: 'cocugunuzun-dikkat-suresi',
      excerpt: 'Dikkat süresi yaşa göre değişir. Peki çocuğunuzun dikkat süresi yaşına uygun mu? İşte bilmeniz gerekenler.',
      content: `## Dikkat Süresi Nedir?\n\nDikkat süresi, bir çocuğun herhangi bir göreve odaklanabildiği maksimum süreyi ifade eder. Bu süre yaşa göre önemli ölçüde farklılık gösterir.\n\n## Yaşa Göre Normal Dikkat Süreleri\n\n- **3-5 yaş**: 5-10 dakika\n- **6-8 yaş**: 10-20 dakika\n- **9-11 yaş**: 20-35 dakika\n- **12+ yaş**: 30-45 dakika\n\n## Dikkat Sorunlarının İşaretleri\n\nÇocuğunuz sürekli olarak:\n- Görevleri yarıda bırakıyorsa\n- Yönergeleri takip etmekte zorlanıyorsa\n- Sık sık hayal kuruyorsa\n\nbir uzmanla görüşmenizi öneririz.\n\n## BrainFit Ankara'da Nasıl Değerlendiriyoruz?\n\nCog-Map değerlendirmemizle çocuğunuzun dikkat profili detaylı olarak incelenir.`,
      categoryId: catDikkat.id,
      tags: 'dikkat,odaklanma,çocuk gelişimi',
      published: true,
      publishedAt: new Date('2026-01-15'),
    },
    {
      id: 'post-2',
      title: 'DEHB mi, Dikkat Dağınıklığı mı? Farkı Nasıl Anlarsınız?',
      slug: 'dehb-mi-dikkat-daginikligi-mi',
      excerpt: 'Her dikkat sorunu DEHB değildir. Ancak her iki durumda da erken müdahale büyük fark yaratır.',
      content: `## DEHB Nedir?\n\nDikkat Eksikliği Hiperaktivite Bozukluğu (DEHB), nörogelişimsel bir durumdur. Ancak dikkat sorunlarının tamamı DEHB değildir.\n\n## Temel Farklar\n\n**DEHB Belirtileri:**\n- Birden fazla ortamda (ev, okul) dikkat sorunları\n- Dürtü kontrolünde zorluk\n- Aşırı hareketlilik\n\n**Geçici Dikkat Sorunları:**\n- Yalnızca belirli durumlarda ortaya çıkar\n- Stres veya uyku sorunlarıyla ilişkilidir\n- Kısa sürede düzelir\n\n## Ne Yapmalısınız?\n\nProfesyonel bir değerlendirme olmadan kesin sonuca varmak mümkün değildir. BrainFit Ankara'nın Cog-Map değerlendirmesi her iki durumu da kapsamlı biçimde inceler.`,
      categoryId: catDikkat.id,
      tags: 'DEHB,dikkat eksikliği,değerlendirme',
      published: true,
      publishedAt: new Date('2026-01-22'),
    },
    {
      id: 'post-3',
      title: 'Beyin Egzersizleri Gerçekten İşe Yarıyor mu?',
      slug: 'beyin-egzersizleri-gercekten-ise-yariyor-mu',
      excerpt: 'Nöroplastisite sayesinde beyin her yaşta değişebilir. Ancak doğru egzersiz seçimi kritik öneme sahiptir.',
      content: `## Nöroplastisite Nedir?\n\nBeynin yeni bağlantılar kurma ve kendini yeniden organize etme kapasitesine nöroplastisite denir.\n\n## Bilimsel Kanıtlar Ne Diyor?\n\nAraştırmalar, yapılandırılmış bilişsel egzersizlerin şu alanlarda iyileşme sağladığını göstermektedir:\n\n- Çalışma belleği kapasitesi\n- Dikkat süresi\n- İşlem hızı\n- Görsel-uzamsal beceriler\n\n## Etkili Olmayan Yöntemler\n\nSadece ekran başında yapılan "beyin oyunları" genellikle yeterli değildir. Gerçek gelişim için:\n\n1. Kişiselleştirilmiş program\n2. Düzenli uygulama\n3. İlerlemenin takibi\n4. Ev egzersizleriyle destekleme gerekir.\n\n## BrainFit Yaklaşımı\n\nBrainFit programları, Cog-Map değerlendirmesinden gelen verilerle kişiye özgü tasarlanır.`,
      categoryId: catGelisim.id,
      tags: 'beyin egzersizi,nöroplastisite,bilişsel gelişim',
      published: true,
      publishedAt: new Date('2026-02-01'),
    },
    {
      id: 'post-4',
      title: 'Disleksi Olan Çocuklar Neden Akıllıdır?',
      slug: 'disleksi-olan-cocuklar-neden-akilli',
      excerpt: 'Disleksi bir zeka sorunu değildir. Aksine, disleksili bireyler genellikle olağanüstü yaratıcı ve analitik düşünce becerilerine sahiptir.',
      content: `## Disleksi Hakkında Yanlış Bilinenler\n\nDisleksi, zeka düşüklüğüyle ilgili değildir. Dünya tarihinin en yaratıcı ve başarılı isimleri arasında disleksili bireyler bulunmaktadır.\n\n## Disleksinin Beyin Farklılığı\n\nDisleksili bireyler:\n- Büyük resmi görme konusunda üstündür\n- Yaratıcı problem çözme yeteneğine sahiptir\n- Güçlü sezgisel düşünürler\n\n## Erken Müdahalenin Önemi\n\nOkuma güçlüğü erken yaşta fark edilir ve doğru destekle çalışılırsa, çocuğun akademik başarısı önemli ölçüde artar.\n\n## Değerlendirme Süreci\n\nBrainFit Ankara'da disleksi değerlendirmesi; görsel takip, işitsel ayrım ve fonetik işlemleme testlerini kapsar.`,
      categoryId: catGelisim.id,
      tags: 'disleksi,okuma güçlüğü,öğrenme',
      published: true,
      publishedAt: new Date('2026-02-10'),
    },
    {
      id: 'post-5',
      title: 'Çocuğunuzla Nasıl Ders Çalışmalısınız?',
      slug: 'cocugunuzla-nasil-ders-calismalisiniz',
      excerpt: 'Ebeveynlerin ders çalışma sürecine dahil olma biçimi, çocuğun akademik başarısını doğrudan etkiler.',
      content: `## Doğru Destek Nasıl Olmalı?\n\nBirçok ebeveyn, çocuğunun yanında oturup tüm dersi birlikte çalışmanın en iyi yöntem olduğunu düşünür. Ancak araştırmalar farklı bir tablo ortaya koymaktadır.\n\n## Yapılması Gerekenler\n\n✅ Düzenli bir çalışma ortamı ve saat belirleyin\n✅ Kısa molalar planlayın (25 dakika çalışma + 5 dakika mola)\n✅ Görev listesi yapmasına yardımcı olun\n✅ Başardıklarını fark edin ve ödüllendirin\n\n## Yapılmaması Gerekenler\n\n❌ Her sorunun cevabını hemen vermeyin\n❌ Sürekli yanında oturmaktan kaçının\n❌ Kıyaslamaktan uzak durun\n\n## Profesyonel Destek Ne Zaman?\n\nÇocuğunuz düzenli çalışmasına rağmen sonuç alamıyorsa, altta yatan bilişsel bir neden olabilir.`,
      categoryId: catAile.id,
      tags: 'ders çalışma,aile,akademik başarı',
      published: true,
      publishedAt: new Date('2026-02-18'),
    },
    {
      id: 'post-6',
      title: 'Uyku Çocuğunuzun Beyin Gelişimini Nasıl Etkiler?',
      slug: 'uyku-cocugunuzun-beyin-gelisimini-etkiler',
      excerpt: 'Uyku yalnızca dinlenmek için değil, beynin bilgileri işleyip organize etmesi için kritik bir süreçtir.',
      content: `## Uyku Sırasında Beyinde Neler Olur?\n\nUyku sırasında beyin;\n- Gün boyunca edinilen bilgileri hafızaya aktarır\n- Gereksiz sinirsel bağlantıları temizler\n- Büyüme hormonlarını salgılar\n\n## Yetersiz Uykunun Etkileri\n\n- Dikkat ve konsantrasyon azalır\n- Öğrenme kapasitesi düşer\n- Duygusal denge bozulur\n- Bağışıklık sistemi zayıflar\n\n## Yaşa Göre Önerilen Uyku Süreleri\n\n| Yaş | Önerilen Süre |\n|-----|---------------|\n| 3-5 yaş | 10-13 saat |\n| 6-12 yaş | 9-12 saat |\n| 13-18 yaş | 8-10 saat |\n\n## İpuçları\n\n1. Yatma saatini tutarlı tutun\n2. Ekran süresini uyku öncesi 1 saat azaltın\n3. Uyku ortamını karanlık ve serin tutun`,
      categoryId: catGelisim.id,
      tags: 'uyku,beyin gelişimi,çocuk sağlığı',
      published: true,
      publishedAt: new Date('2026-03-01'),
    },
    {
      id: 'post-7',
      title: 'Okul Kaygısıyla Başa Çıkmak: Ebeveynlere Rehber',
      slug: 'okul-kaygisiyla-basa-cikmak',
      excerpt: 'Okul kaygısı, çocukların akademik performansını ve sosyal gelişimini ciddi biçimde etkileyebilir. Erken fark etmek çok önemlidir.',
      content: `## Okul Kaygısı Nedir?\n\nOkul kaygısı, çocuğun okul ortamıyla ilgili aşırı endişe ve korku hissetmesidir. Hafif sinirlilikten panik ataklara kadar geniş bir yelpazede görülebilir.\n\n## Belirtiler Nelerdir?\n\n- Sabahları karın ağrısı, baş ağrısı gibi fiziksel şikayetler\n- Okula gitmeyi reddetme\n- Ders performansında ani düşüş\n- Arkadaş ilişkilerinden çekilme\n\n## Ebeveynler Ne Yapabilir?\n\n1. **Dinleyin**: Kaygılarını küçümsemeden dinleyin\n2. **Rutinler oluşturun**: Öngörülebilir günlük rutinler güvenlik hissi verir\n3. **Okul ile iletişim kurun**: Öğretmen ve okul rehberiyle görüşün\n4. **Profesyonel yardım alın**: Kaygı kronikleşmeden önce uzman desteği alın`,
      categoryId: catAile.id,
      tags: 'okul kaygısı,aile,psikoloji',
      published: true,
      publishedAt: new Date('2026-03-08'),
    },
    {
      id: 'post-8',
      title: 'Cog-Map Değerlendirmesi Nedir ve Neden Önemlidir?',
      slug: 'cog-map-degerlendirmesi-nedir',
      excerpt: 'Cog-Map, çocuğun tüm bilişsel profilini ortaya çıkaran kapsamlı bir değerlendirme aracıdır. Nasıl çalışır?',
      content: `## Cog-Map Nedir?\n\nCog-Map (Cognitive Mapping), BrainFit Ankara'nın uyguladığı kapsamlı bilişsel değerlendirme protokolüdür. Çocuğun güçlü ve gelişime açık yönlerini bilimsel araçlarla haritalandırır.\n\n## Değerlendirilen Alanlar\n\n- **Dikkat ve Konsantrasyon**: Odaklanma süresi, seçici dikkat\n- **Hafıza**: Kısa ve uzun süreli bellek kapasitesi\n- **Görsel-Uzamsal Beceriler**: Göz takibi, mekânsal algı\n- **İşitsel İşlemleme**: Ses ayrımı, fonetik işlemleme\n- **Psiko-Motor Beceriler**: İnce ve kaba motor koordinasyon\n- **Sosyal-Duygusal Gelişim**: Duygusal farkındalık, sosyal beceriler\n\n## Süreç Nasıl İşliyor?\n\n1. **Ön Görüşme**: Aile ve çocukla tanışma\n2. **Değerlendirme**: 90 dakikalık kapsamlı test\n3. **Rapor**: Detaylı bilişsel profil raporu\n4. **Geri Bildirim**: Aileyle rapor değerlendirmesi\n5. **Program**: Kişiye özel gelişim programı\n\n## Kimler Başvurabilir?\n\n4-18 yaş arası tüm çocuklar Cog-Map değerlendirmesinden yararlanabilir.`,
      categoryId: catGelisim.id,
      tags: 'cog-map,değerlendirme,bilişsel profil',
      published: true,
      publishedAt: new Date('2026-03-15'),
    },
  ]

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: post,
      update: post,
    })
  }

  console.log('Blog posts created.')
  console.log('Seed complete!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
