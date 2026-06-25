import Link from 'next/link'
import Image from 'next/image'
import { getPageImages } from '@/lib/pageImages'
import TestPromo from '@/components/site/TestPromo'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Cog-Map Zihin Check-Up | BrainFit Ankara' }

const areas = [
  { name: 'Dikkat & Odaklanma', color: '#00B4E5', desc: 'Dikkati başlatma, sürdürme ve yönerge takibi.' },
  { name: 'Görsel Beceriler', color: '#F8AF00', desc: 'Görsel algı, göz takibi ve mekânsal işleme.' },
  { name: 'İşitsel Beceriler', color: '#CE007F', desc: 'İşitsel ayrım, fonetik işlem ve işitsel dikkat.' },
  { name: 'Psiko-Motor Beceriler', color: '#E84F2D', desc: 'El-göz koordinasyonu, denge ve ince motor.' },
  { name: 'Sosyal-Duygusal Beceriler', color: '#61CE70', desc: 'Özgüven, dayanıklılık ve duygu düzenleme.' },
]
const cogProcess = [
  { n: '01', t: 'Değerlendirme', d: 'Kapsamlı testlerle mevcut durumun görülmesi', color: '#00B4E5' },
  { n: '02', t: 'Ölçme', d: 'Temel bilişsel alanların detaylı incelenmesi', color: '#F8AF00' },
  { n: '03', t: 'Raporlama', d: '18 sayfalık kapsamlı rapor hazırlanması', color: '#CE007F' },
  { n: '04', t: 'Geri Bildirim', d: 'Uzman ekip tarafından raporun aileye açıklanması', color: '#61CE70' },
]
const benefits = ['Genel bilişsel görünüm','Güçlü ve gelişime açık alanların fark edilmesi','Stratejik rehberlik','Erken farkındalık','Kişiye özel gelişim planı için başlangıç','Aileye daha net yol haritası']

export default async function CogMapPage() {
  const imgs = await getPageImages(['hero_cogmap', 'cogmap_rapor', 'cogmap_seans'])

  return (
    <div className="bf-reveal">
      {/* Hero — gradient sol metin, sağ görsel */}
      <section style={{ background: 'linear-gradient(135deg,#00B4E5,#0a93bd)' }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(44px,6vw,84px)]">
          <div className="grid lg:grid-cols-[1fr_.9fr] gap-[clamp(32px,5vw,56px)] items-center">
            <div>
              <span className="text-[13px] font-bold tracking-widest uppercase opacity-90" style={{ color: '#fff' }}>Cog-Map Zihin Check-Up</span>
              <h1 className="text-[clamp(28px,4vw,50px)] font-extrabold tracking-tight leading-[1.08] mt-3.5 max-w-[720px]" style={{ color: '#fff' }}>
                Çocuğunuzun bilişsel gelişim haritasını görün.
              </h1>
              <p className="text-[17.5px] leading-relaxed mt-5 max-w-[600px]" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Cog-Map Zihin Check-Up; dikkat, görsel, işitsel, psiko-motor ve sosyal-duygusal beceri alanlarını değerlendirmeye yardımcı olan kapsamlı bir bilişsel ölçüm sürecidir.
              </p>
              <Link href="/iletisim" className="bf-lift mt-7 bg-white text-[#0a93bd] px-7 py-4 rounded-[13px] font-bold text-base inline-block">
                Cog-Map Randevusu Al
              </Link>
            </div>
            {/* Hero görsel */}
            <div className="relative w-full aspect-[4/3] rounded-[22px] overflow-hidden border border-white/20 shadow-[0_24px_56px_rgba(0,0,0,.22)]">
              {imgs['hero_cogmap'] ? (
                <Image src={imgs['hero_cogmap']} alt="Cog-Map Zihin Check-Up" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
                  <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>Cog-Map seans fotoğrafı</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5 Alan */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,6vw,72px)]">
        <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-3">Zihnin hangi alanlarını ölçümlüyoruz?</h2>
        <p className="text-base text-[#6c6c68] mb-9 max-w-[640px]">Her alan bağımsız değil, birbirleriyle bağlantılı şekilde değerlendirilir.</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {areas.map(a => (
            <div key={a.name} className="bf-tile bg-[#F8F6F2] border border-[#efe9df] rounded-[18px] p-6" style={{ borderBottom: `5px solid ${a.color}` }}>
              <span className="w-10 h-10 rounded-[12px] block mb-4" style={{ background: a.color }} />
              <h3 className="text-base font-semibold leading-snug mb-2">{a.name}</h3>
              <p className="text-[13px] text-[#8a8578] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Süreç + rapor görseli */}
      <section className="bg-white border-t border-b border-[#efe9df]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,6vw,72px)]">
          <div className="grid lg:grid-cols-[1fr_.8fr] gap-[clamp(32px,5vw,56px)] items-start">
            <div>
              <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-9">Cog-Map süreci</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {cogProcess.map(c => (
                  <div key={c.n} className="bf-card bg-[#F8F6F2] border border-[#efe9df] rounded-[20px] p-6">
                    <span className="font-[Sora] text-[36px] font-extrabold" style={{ color: c.color }}>{c.n}</span>
                    <h3 className="text-[18px] font-bold mt-1.5 mb-2">{c.t}</h3>
                    <p className="text-sm text-[#6c6c68] leading-relaxed">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Rapor / seans görseli */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden border border-[#e3ded5] shadow-[0_16px_40px_rgba(0,0,0,.08)]">
                {imgs['cogmap_rapor'] ? (
                  <Image src={imgs['cogmap_rapor']} alt="Cog-Map raporu" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#e8f7fc,#d4eff8)' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8ecfe3" strokeWidth="1.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    <span className="text-xs font-mono text-[#8ecfe3]">18 sayfalık rapor</span>
                  </div>
                )}
              </div>
              <div className="bg-[#00B4E5] rounded-[16px] px-5 py-4 text-center" style={{ color: '#fff' }}>
                <span className="font-[Sora] text-[40px] font-extrabold leading-none">18</span>
                <p className="text-[13px] mt-1 opacity-90">sayfalık detaylı bilişsel rapor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ne Kazandırır */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,6vw,72px)] pb-[clamp(64px,8vw,96px)]">
        <div className="bg-[#F1ECE3] border border-[#e6e0d5] rounded-[24px] p-[clamp(32px,4vw,52px)]">
          <h2 className="text-[clamp(22px,2.8vw,30px)] font-bold mb-7">Cog-Map ne kazandırır?</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3.5">
            {benefits.map(b => (
              <div key={b} className="flex gap-3 items-center bg-white border border-[#efe9df] rounded-[13px] px-4 py-4">
                <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[#51AD32]" />
                <span className="text-[15px] text-[#3a3a38]">{b}</span>
              </div>
            ))}
          </div>
          <p className="text-[18px] text-[#23231f] font-semibold mt-8 max-w-[620px]">
            Çocuğunuzun gelişim haritasını çıkarmak için ilk adımı atın.
          </p>
          <Link href="/iletisim" className="bf-lift mt-4 bg-[#51AD32] px-6 py-4 rounded-[13px] font-semibold text-base inline-block" style={{ color: '#fff' }}>
            Cog-Map Randevusu Al
          </Link>
        </div>
      </section>
      <TestPromo />
    </div>
  )
}
