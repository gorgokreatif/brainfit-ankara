import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { prisma } from '@/lib/db'
import TestPromo from '@/components/site/TestPromo'

export const dynamic = 'force-dynamic'

const programs: Record<string, {
  color: string; tag: string; name: string; headline: string; sub: string;
  introTitle: string; introDesc: string;
  supportTitle: string; support: string[];
  forTitle: string; forWhom: string[];
  cta: string; imageKey: string;
}> = {
  junior: {
    color: '#F8AF00', tag: '4–6 yaş', name: 'BrainFit Junior',
    headline: 'Okul öncesi dönemde güçlü bir öğrenme altyapısı.',
    sub: 'BrainFit Junior, 4–6 yaş aralığındaki çocukların okul öncesi zihinsel gelişimini; dikkat, görsel algı, fonetik işlem, göz takip hızı ve psiko-motor beceriler üzerinden desteklemeye odaklanır.',
    introTitle: 'Neden okul öncesi dönem önemli?',
    introDesc: 'İlkokula hazırlık yalnızca harfleri veya sayıları bilmek değildir. Çocuğun dikkatini sürdürebilmesi, yönerge takip edebilmesi, görsel-işitsel bilgiyi işleyebilmesi öğrenme sürecinin temelini oluşturur.',
    supportTitle: 'Junior programında desteklenen alanlar',
    support: ['Dikkat süresi','Göz takip becerisi','Fonetik işlem','Görsel-mekânsal algı','İnce/kaba motor beceriler','Yönerge takip becerisi','Okula hazırlık özgüveni'],
    forTitle: 'Kimler için uygun?',
    forWhom: ['Okula başlamaya hazırlanan çocuklar','Dikkati kısa sürede dağılan çocuklar','Yönergeleri takip etmekte zorlanan çocuklar','Kalem tutma, kesme çalışmalarında zorlanan çocuklar'],
    cta: 'Junior için ön görüşme alın',
    imageKey: 'hero_junior',
  },
  scholar: {
    color: '#00B4E5', tag: '6–18 yaş', name: 'BrainFit Scholar / Akademik Başarı',
    headline: 'Akademik başarı, yalnızca daha çok çalışmakla ilgili değildir.',
    sub: 'BrainFit Scholar, 6–18 yaş öğrencilerin dikkat, hafıza, okuma-anlama, sınav performansı, özgüven ve psiko-motor becerilerini desteklemeye odaklanan gelişim programıdır.',
    introTitle: 'Öğrenmenin altyapısını güçlendirmek',
    introDesc: 'Bir öğrenci çok çalıştığı halde karşılığını alamıyorsa, sorun yalnızca çalışma süresi olmayabilir. Dikkat, hafıza, görsel-işitsel beceriler öğrenme performansını doğrudan etkileyebilir.',
    supportTitle: 'Programda desteklenen kazanımlar',
    support: ['Dikkat ve odaklanma','Kısa ve uzun süreli hafıza','Okuduğunu anlama','Görsel ve işitsel işlemleme','Sınav kaygısı yönetimine destek','Özgüven ve bağımsız çalışma'],
    forTitle: 'Kimler için?',
    forWhom: ['Ders çalışıyor ama sonuç alamayan öğrenciler','Sınavlarda bildiğini gösteremeyen öğrenciler','Okuma-anlama problemi yaşayanlar','Dikkati dağılan veya yönerge takibi zorlananlar'],
    cta: 'Akademik gelişim için değerlendirme al',
    imageKey: 'hero_scholar',
  },
  dehb: {
    color: '#E84F2D', tag: 'Dikkat & Dürtü', name: 'DEHB',
    headline: 'Dikkat, hareket ve dürtü kontrolüne bütünsel bakış.',
    sub: 'DEHB tanısı olan veya dikkat-dürtü kontrolü alanlarında zorlanan çocuklarda, öncelikle hangi bilişsel beceri alanlarının desteğe ihtiyaç duyduğu anlaşılır.',
    introTitle: 'Tek bir davranışa değil, beceri altyapısına bakıyoruz.',
    introDesc: "Çocuğun yerinde duramaması, yönergeyi kaçırması veya dürtüsel davranması farklı bilişsel alanlarla ilişkili olabilir. BrainFit Ankara'da süreç, gözlem ve değerlendirme ile başlar.",
    supportTitle: 'Desteklenen alanlar',
    support: ['Dikkat süresi','Odakta kalma','Dürtü kontrolü','Yönerge takibi','İşitsel dikkat','Psiko-motor düzenleme','Duygusal dayanıklılık'],
    forTitle: 'Süreç nasıl ilerler?',
    forWhom: ['Ön görüşme','Cog-Map değerlendirme','Rapor geri bildirimi','Kişiye özel program','Seans ve ev egzersizi takibi'],
    cta: 'DEHB için ön görüşme planla',
    imageKey: 'hero_dehb',
  },
  disleksi: {
    color: '#CE007F', tag: 'Okuma & Yazma', name: 'Disleksi',
    headline: 'Okuma ve yazma güçlüklerinin arkasındaki beceri alanlarını birlikte anlayalım.',
    sub: 'Disleksi ve öğrenme güçlüğü yaşayan çocuklarda okuma, yazma, görsel-işitsel işlemleme ve dikkat alanları birlikte değerlendirilir.',
    introTitle: 'Okuma yalnızca harfleri tanımak değildir.',
    introDesc: 'Okuma süreci; görsel takip, işitsel ayrım, dikkat, hafıza ve motor planlama gibi birçok becerinin birlikte çalışmasını gerektirir.',
    supportTitle: 'Desteklenen alanlar',
    support: ['Okuma akıcılığına altyapı','Okuduğunu anlama','İşitsel ayrım','Görsel takip','Harf-ses eşleştirme','İnce motor beceriler'],
    forTitle: 'Kimler için?',
    forWhom: ['Harfleri karıştıran çocuklar','Heceleri birleştirmekte zorlananlar','Yavaş okuyanlar','Yazısı düzensiz veya yavaş olanlar'],
    cta: 'Disleksi destek süreci için görüşme al',
    imageKey: 'hero_disleksi',
  },
}

async function getHeroImage(key: string): Promise<string | null> {
  noStore()
  try {
    const img = await prisma.pageImage.findUnique({ where: { key } })
    return img?.url || null
  } catch {
    return null
  }
}

export default async function ProgramDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pd = programs[slug]
  if (!pd) notFound()

  const heroUrl = await getHeroImage(pd.imageKey)

  return (
    <div className="bf-reveal">
      {/* Hero */}
      <section style={{ background: pd.color }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(40px,6vw,80px)]">
          <Link href="/programlar" className="inline-block bg-white/25 font-semibold text-[13.5px] px-3.5 py-2 rounded-full mb-5" style={{ color: '#fff' }}>← Programlar</Link>
          <span className="block text-[13px] font-bold tracking-widest uppercase opacity-90" style={{ color: '#fff' }}>{pd.tag} · {pd.name}</span>
          <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mt-3.5 max-w-[900px]" style={{ color: '#fff' }}>{pd.headline}</h1>
          <p className="text-[17.5px] leading-relaxed mt-5 max-w-[820px]" style={{ color: 'rgba(255,255,255,0.92)' }}>{pd.sub}</p>
        </div>
      </section>

      {/* Intro + Hero Görsel */}
      <section className="max-w-[1080px] mx-auto px-4 sm:px-6 py-[clamp(48px,6vw,80px)]">
        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-center">
          <div>
            <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold max-w-[760px]">{pd.introTitle}</h2>
            <p className="text-[17px] text-[#6c6c68] leading-[1.75] mt-5">{pd.introDesc}</p>
          </div>
          <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden border border-[#e3ded5] relative">
            {heroUrl ? (
              <Image src={heroUrl} alt={pd.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#efe9df,#e6dfd2)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.2"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="font-mono text-xs tracking-wide">Admin panelinden görsel ekleyin</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Desteklenen Alanlar */}
      <section className="bg-white border-t border-b border-[#efe9df]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-[clamp(48px,6vw,72px)] grid sm:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[21px] font-bold mb-6">{pd.supportTitle}</h3>
            <div className="flex flex-col gap-3.5">
              {pd.support.map(s => (
                <div key={s} className="flex gap-3.5 items-center">
                  <span className="flex-shrink-0 w-7 h-7 rounded-[8px] flex items-center justify-center" style={{ background: pd.color + '22' }}>
                    <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: pd.color }} />
                  </span>
                  <span className="text-[15.5px] text-[#3a3a38]">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[21px] font-bold mb-6">{pd.forTitle}</h3>
            <div className="flex flex-col gap-3">
              {pd.forWhom.map(f => (
                <div key={f} className="flex gap-3.5 px-5 py-4 bg-[#F8F6F2] border border-[#efe9df] rounded-[14px]">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ background: pd.color }} />
                  <span className="text-[15px] text-[#3a3a38] leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1080px] mx-auto px-4 sm:px-6 py-[clamp(48px,6vw,72px)] pb-[clamp(64px,8vw,96px)]">
        <div className="bg-[#23231f] rounded-[28px] px-[clamp(32px,5vw,60px)] py-[clamp(40px,5vw,60px)] text-center">
          <h2 className="text-[clamp(22px,2.6vw,32px)] font-bold max-w-[580px] mx-auto" style={{ color: '#fff' }}>
            Çocuğunuz için ilk adımı birlikte atalım.
          </h2>
          <p className="text-[15px] mt-3 max-w-[460px] mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Ücretsiz ön görüşmede çocuğunuzun ihtiyaçlarını birlikte değerlendiririz.
          </p>
          <Link
            href="/iletisim"
            className="bf-lift mt-7 inline-block px-8 py-4 rounded-[14px] font-bold text-base"
            style={{ background: pd.color, color: '#fff' }}
          >
            {pd.cta}
          </Link>
        </div>
      </section>
      <TestPromo />
    </div>
  )
}
