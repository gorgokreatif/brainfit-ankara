import Link from 'next/link'
import { notFound } from 'next/navigation'

const programs: Record<string, {
  color: string; tag: string; name: string; headline: string; sub: string;
  introTitle: string; introDesc: string;
  supportTitle: string; support: string[];
  forTitle: string; forWhom: string[];
  cta: string;
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
  },
}

export default async function ProgramDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pd = programs[slug]
  if (!pd) notFound()

  return (
    <div className="bf-reveal">
      <section style={{ background: pd.color }}>
        <div className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,80px)]">
          <Link href="/programlar" className="inline-block bg-white/25 text-white font-semibold text-[13.5px] px-3.5 py-2 rounded-full mb-5">← Programlar</Link>
          <span className="block text-[13px] font-bold text-white tracking-widest uppercase opacity-90">{pd.tag} · {pd.name}</span>
          <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mt-3.5 max-w-[900px] text-white">{pd.headline}</h1>
          <p className="text-[17.5px] text-white/92 leading-relaxed mt-5 max-w-[820px]">{pd.sub}</p>
        </div>
      </section>
      <section className="max-w-[1080px] mx-auto px-6 py-[clamp(40px,6vw,72px)]">
        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-center">
          <div>
            <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold max-w-[760px]">{pd.introTitle}</h2>
            <p className="text-[17px] text-[#6c6c68] leading-[1.75] mt-4">{pd.introDesc}</p>
          </div>
          <div className="w-full aspect-[4/3] rounded-[20px] border border-dashed border-[#cdc4b3] flex items-center justify-center text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#efe9df,#e6dfd2)' }}>
            <span className="font-mono text-xs">Görsel alanı</span>
          </div>
        </div>
      </section>
      <section className="bg-white border-t border-b border-[#efe9df]">
        <div className="max-w-[1080px] mx-auto px-6 py-[clamp(40px,6vw,72px)] grid sm:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[21px] font-bold mb-5">{pd.supportTitle}</h3>
            <div className="flex flex-col gap-3">
              {pd.support.map(s => (
                <div key={s} className="flex gap-3 items-center">
                  <span className="flex-shrink-0 w-6 h-6 rounded-[7px] flex items-center justify-center opacity-16" style={{ background: pd.color }}>
                    <span className="w-2 h-2 rounded-[2px]" style={{ background: pd.color }} />
                  </span>
                  <span className="text-[15.5px] text-[#3a3a38]">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[21px] font-bold mb-5">{pd.forTitle}</h3>
            <div className="flex flex-col gap-3">
              {pd.forWhom.map(f => (
                <div key={f} className="flex gap-3 px-4 py-3.5 bg-[#F8F6F2] border border-[#efe9df] rounded-[12px]">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ background: pd.color }} />
                  <span className="text-[15px] text-[#3a3a38] leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-[1080px] mx-auto px-6 py-[clamp(40px,6vw,72px)] pb-[clamp(56px,7vw,90px)]">
        <div className="bg-[#23231f] rounded-[24px] px-[clamp(32px,4vw,52px)] py-[clamp(32px,4vw,52px)] text-center">
          <h2 className="text-[clamp(22px,2.6vw,30px)] font-bold text-white max-w-[560px] mx-auto">Çocuğunuz için ilk adımı birlikte atalım.</h2>
          <Link href="/iletisim" className="bf-lift mt-6 inline-block text-white px-7 py-4 rounded-[13px] font-bold text-base" style={{ background: pd.color }}>{pd.cta}</Link>
        </div>
      </section>
    </div>
  )
}
