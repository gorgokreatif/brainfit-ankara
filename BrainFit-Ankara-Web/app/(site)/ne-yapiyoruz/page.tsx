import Link from 'next/link'
import Image from 'next/image'
import { getPageImages } from '@/lib/pageImages'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Ne Yapıyoruz? | BrainFit Ankara' }

const areas = [
  { name: 'Dikkat & Odaklanma', color: '#00B4E5', desc: 'Dikkati başlatma, sürdürme ve yönerge takibi.', imgKey: 'area_dikkat' },
  { name: 'Görsel Beceriler', color: '#F8AF00', desc: 'Görsel algı, göz takibi ve mekânsal işleme.', imgKey: 'area_gorsel' },
  { name: 'İşitsel Beceriler', color: '#CE007F', desc: 'İşitsel ayrım, fonetik işlem ve işitsel dikkat.', imgKey: 'area_isitsel' },
  { name: 'Psiko-Motor Beceriler', color: '#E84F2D', desc: 'El-göz koordinasyonu, denge ve ince motor.', imgKey: 'area_psikomotor' },
  { name: 'Sosyal-Duygusal Beceriler', color: '#61CE70', desc: 'Özgüven, dayanıklılık ve duygu düzenleme.', imgKey: 'area_sosyal' },
]

const targets = [
  { n: '01', x: 'Güçlü ve zayıf alanları görünür kılmak' },
  { n: '02', x: 'Çocuğun ihtiyacına uygun egzersiz planlamak' },
  { n: '03', x: 'Öğrenme sürecini daha takip edilebilir hale getirmek' },
  { n: '04', x: 'Ebeveyni süreç hakkında bilgilendirmek' },
  { n: '05', x: 'Çocuğun özgüvenini ve gelişim motivasyonunu desteklemek' },
]

export default async function NeYapiyoruzPage() {
  const imgs = await getPageImages(['hero_ne_yapiyoruz', 'section_ne_yapiyoruz_egzersiz', ...areas.map(a => a.imgKey)])

  return (
    <div className="bf-reveal">
      {/* Hero — metin sol, görsel sağ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(40px,6vw,80px)]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-[clamp(32px,5vw,64px)] items-center">
          <div>
            <span className="text-[13px] font-semibold text-[#E84F2D] tracking-widest uppercase">Ne Yapıyoruz?</span>
            <h1 className="text-[clamp(28px,3.8vw,48px)] font-extrabold tracking-tight leading-[1.1] mt-4 max-w-[560px]">
              Öğrenmenin önündeki kök nedeni bulmaya odaklanıyoruz.
            </h1>
            <p className="text-[17px] text-[#6c6c68] leading-7 mt-5">
              Dikkat, hafıza, görsel-işitsel beceriler, psiko-motor gelişim ve sosyal-duygusal alanları birlikte ele alarak çocuğun öğrenme altyapısını anlamaya çalışıyoruz.
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[#e3ded5] shadow-[0_20px_50px_rgba(0,0,0,.07)]">
            {imgs['hero_ne_yapiyoruz'] ? (
              <Image src={imgs['hero_ne_yapiyoruz']} alt="Ne Yapıyoruz" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg,#fde8df,#f9d4c8)' }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e4846a" strokeWidth="1.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg>
                <span className="text-xs font-mono text-[#e4846a]">Seans fotoğrafı</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5 Temel Alan — görsel kartlar */}
      <section className="bg-white border-t border-b border-[#efe9df]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,6vw,72px)]">
          <div className="max-w-[760px] mb-10">
            <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-3">5 temel alan neden önemli?</h2>
            <p className="text-base text-[#6c6c68] leading-7">Bu alanlardan biri zorlandığında çocuk ders çalışırken, okurken, yazarken veya sosyal ilişkilerde kendini ifade ederken güçlük yaşayabilir.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {areas.map(a => {
              const imgUrl = imgs[a.imgKey]
              return (
                <div key={a.name} className="bf-tile bg-[#F8F6F2] border border-[#efe9df] rounded-[20px] overflow-hidden flex flex-col">
                  {/* Alan görseli */}
                  <div className="relative w-full aspect-[4/3]">
                    {imgUrl ? (
                      <Image src={imgUrl} alt={a.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: a.color + '18' }}>
                        <span className="w-12 h-12 rounded-[16px]" style={{ background: a.color + '55' }} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="w-8 h-8 rounded-[10px] mb-3" style={{ background: a.color }} />
                    <h3 className="text-base font-semibold leading-snug mb-1.5">{a.name}</h3>
                    <p className="text-[13px] text-[#8a8578] leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Hedefler + egzersiz görseli */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(40px,6vw,72px)]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-[clamp(32px,5vw,56px)] items-start">
          <div>
            <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-7">BrainFit neyi hedefler?</h2>
            <div className="flex flex-col">
              {targets.map(t => (
                <div key={t.n} className="flex gap-4 items-center py-4 border-b border-[#ebe6dd]">
                  <span className="font-[Sora] text-[15px] font-bold text-[#51AD32] w-8 flex-shrink-0">{t.n}</span>
                  <span className="text-[17px] text-[#3a3a38]">{t.x}</span>
                </div>
              ))}
            </div>
            <Link href="/cog-map" className="bf-lift mt-8 bg-[#51AD32] px-6 py-4 rounded-[13px] font-semibold text-base inline-block" style={{ color: '#fff' }}>
              Çocuğunuzun gelişim haritasını öğrenin
            </Link>
          </div>
          {/* Egzersiz görseli */}
          <div className="relative w-full aspect-[4/5] rounded-[22px] overflow-hidden border border-[#e3ded5] shadow-[0_16px_40px_rgba(0,0,0,.07)] lg:sticky lg:top-24">
            {imgs['section_ne_yapiyoruz_egzersiz'] ? (
              <Image src={imgs['section_ne_yapiyoruz_egzersiz']} alt="BrainFit egzersiz seansı" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#efe9df,#e6dfd2)' }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <span className="text-xs font-mono">Egzersiz / seans fotoğrafı</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
