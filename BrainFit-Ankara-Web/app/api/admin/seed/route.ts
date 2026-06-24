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
    { id: 'post-1', title: 'Çocuğunuzun Dikkat Süresi Neden Bu Kadar Kısa?', slug: 'cocugunuzun-dikkat-suresi', excerpt: 'Dikkat süresi yaşa göre değişir. Peki çocuğunuzun dikkat süresi yaşına uygun mu?', content: '## Dikkat Süresi Nedir?\n\nDikkat süresi, bir görevde kalabilme kapasitesidir. Yaşa göre 5-45 dakika arasında değişir.\n\n## BrainFit Değerlendirmesi\n\nCog-Map ile çocuğunuzun dikkat profili detaylı incelenir.', categoryId: catDikkat.id, tags: 'dikkat,odaklanma', published: true, publishedAt: new Date('2026-01-15') },
    { id: 'post-2', title: 'DEHB mi, Dikkat Dağınıklığı mı?', slug: 'dehb-mi-dikkat-daginikligi-mi', excerpt: 'Her dikkat sorunu DEHB değildir. Ancak her iki durumda da erken müdahale büyük fark yaratır.', content: '## DEHB Nedir?\n\nDEHB nörogelişimsel bir durumdur. Profesyonel değerlendirme olmadan kesin tanı konamaz.', categoryId: catDikkat.id, tags: 'DEHB,dikkat eksikliği', published: true, publishedAt: new Date('2026-01-22') },
    { id: 'post-3', title: 'Beyin Egzersizleri Gerçekten İşe Yarıyor mu?', slug: 'beyin-egzersizleri-ise-yariyor-mu', excerpt: 'Nöroplastisite sayesinde beyin her yaşta değişebilir. Ancak doğru egzersiz seçimi kritiktir.', content: '## Nöroplastisite\n\nBeynin kendini yeniden düzenleme kapasitesi çocukluk döneminde en yüksek seviyededir.', categoryId: catGelisim.id, tags: 'beyin egzersizi,nöroplastisite', published: true, publishedAt: new Date('2026-02-01') },
    { id: 'post-4', title: 'Disleksi Olan Çocuklar Neden Akıllıdır?', slug: 'disleksi-olan-cocuklar-neden-akilli', excerpt: 'Disleksi bir zeka sorunu değildir. Disleksili bireyler genellikle olağanüstü yaratıcı düşünürlerdir.', content: '## Disleksi Hakkında\n\nDisleksi, zeka düşüklüğüyle ilişkili değildir. Erken müdahaleyle büyük ilerleme sağlanır.', categoryId: catGelisim.id, tags: 'disleksi,okuma güçlüğü', published: true, publishedAt: new Date('2026-02-10') },
    { id: 'post-5', title: 'Çocuğunuzla Nasıl Ders Çalışmalısınız?', slug: 'cocugunuzla-nasil-ders-calismalisiniz', excerpt: 'Ebeveynlerin ders sürecine dahil olma biçimi, akademik başarıyı doğrudan etkiler.', content: '## Doğru Destek\n\nÇocuğunuzun yanında oturmak yerine bağımsız çalışma alışkanlığı kazandırmak daha etkilidir.', categoryId: catAile.id, tags: 'ders çalışma,aile', published: true, publishedAt: new Date('2026-02-18') },
    { id: 'post-6', title: 'Uyku Çocuğunuzun Beyin Gelişimini Nasıl Etkiler?', slug: 'uyku-beyin-gelisimi', excerpt: 'Uyku yalnızca dinlenmek için değil, beynin bilgileri işleyip organize etmesi için kritiktir.', content: '## Uyku ve Beyin\n\n6-12 yaş için günlük 9-12 saat uyku önerilir. Yetersiz uyku dikkat ve öğrenmeyi olumsuz etkiler.', categoryId: catGelisim.id, tags: 'uyku,beyin gelişimi', published: true, publishedAt: new Date('2026-03-01') },
    { id: 'post-7', title: 'Okul Kaygısıyla Başa Çıkmak', slug: 'okul-kaygisiyla-basa-cikmak', excerpt: 'Okul kaygısı, çocukların akademik performansını ciddi biçimde etkileyebilir.', content: '## Okul Kaygısı\n\nSabah karın ağrısı, okula gitmeyi reddetme okul kaygısının erken belirtileri olabilir.', categoryId: catAile.id, tags: 'okul kaygısı,aile', published: true, publishedAt: new Date('2026-03-08') },
    { id: 'post-8', title: 'Cog-Map Değerlendirmesi Nedir?', slug: 'cog-map-degerlendirmesi-nedir', excerpt: 'Cog-Map, çocuğun tüm bilişsel profilini ortaya çıkaran kapsamlı bir değerlendirme aracıdır.', content: '## Cog-Map Nedir?\n\nDikkat, hafıza, görsel-uzamsal beceriler ve psiko-motor gelişimi kapsayan bilişsel haritalama protokolüdür.', categoryId: catGelisim.id, tags: 'cog-map,değerlendirme', published: true, publishedAt: new Date('2026-03-15') },
  ]

  for (const p of posts) {
    await prisma.blogPost.upsert({ where: { slug: p.slug }, create: p, update: p })
  }

  return NextResponse.json({ ok: true, message: 'Seed tamamlandı: 3 kategori, 4 ekip üyesi, 8 blog yazısı eklendi.' })
}
