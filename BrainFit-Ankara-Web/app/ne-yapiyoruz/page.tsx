import Link from 'next/link'
export const metadata = { title: 'Ne Yapıyoruz? | BrainFit Ankara' }
const areas = [
  { name: 'Dikkat & Odaklanma', color: '#00B4E5' },
  { name: 'Görsel Beceriler', color: '#F8AF00' },
  { name: 'İşitsel Beceriler', color: '#CE007F' },
  { name: 'Psiko-Motor Beceriler', color: '#E84F2D' },
  { name: 'Sosyal-Duygusal Beceriler', color: '#61CE70' },
]
const targets = [
  { n:'01', x:'Güçlü ve zayıf alanları görünür kılmak' },
  { n:'02', x:'Çocuğun ihtiyacına uygun egzersiz planlamak' },
  { n:'03', x:'Öğrenme sürecini daha takip edilebilir hale getirmek' },
  { n:'04', x:'Ebeveyni süreç hakkında bilgilendirmek' },
  { n:'05', x:'Çocuğun özgüvenini ve gelişim motivasyonunu desteklemek' },
]
export default function NeYapiyoruzPage() {
  return (
    <div className="bf-reveal">
      <section className="max-w-[1080px] mx-auto px-6 py-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,40px)]">
        <span className="text-[13px] font-semibold text-[#E84F2D] tracking-widest uppercase">Ne Yapıyoruz?</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4 max-w-[820px]">Öğrenmenin önündeki kök nedeni bulmaya odaklanıyoruz.</h1>
        <p className="text-[17px] text-[#6c6c68] leading-7 mt-5 max-w-[800px]">BrainFit Ankara'da çocukların akademik veya davranışsal zorlanmalarını yalnızca görünen sonuçlar üzerinden değerlendirmiyoruz. Dikkat, hafıza, görsel-işitsel beceriler, psiko-motor gelişim ve sosyal-duygusal alanları birlikte ele alarak çocuğun öğrenme altyapısını anlamaya çalışıyoruz.</p>
      </section>
      <section className="bg-white border-t border-b border-[#efe9df]">
        <div className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)]">
          <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-2.5">5 temel alan neden önemli?</h2>
          <p className="text-base text-[#6c6c68] leading-7 max-w-[760px] mb-10">Bu alanlardan biri zorlandığında, çocuk ders çalışırken, okurken, yazarken veya sosyal ilişkilerde kendini ifade ederken güçlük yaşayabilir.</p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {areas.map(a => (
              <div key={a.name} className="bf-tile w-[200px] text-center bg-[#F8F6F2] border border-[#efe9df] rounded-[20px] py-7 px-5">
                <span className="w-[54px] h-[54px] rounded-[16px] block mx-auto mb-4" style={{ background: a.color }} />
                <h3 className="text-base font-semibold leading-snug">{a.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-[1080px] mx-auto px-6 py-[clamp(40px,6vw,72px)] pb-[clamp(56px,7vw,90px)]">
        <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-7">BrainFit neyi hedefler?</h2>
        <div className="flex flex-col">
          {targets.map(t => (
            <div key={t.n} className="flex gap-4 items-center py-5 border-b border-[#ebe6dd]">
              <span className="font-[Sora] text-[15px] font-bold text-[#51AD32] w-8">{t.n}</span>
              <span className="text-[17px] text-[#3a3a38]">{t.x}</span>
            </div>
          ))}
        </div>
        <Link href="/cog-map" className="bf-lift mt-8 bg-[#51AD32] text-white px-6 py-4 rounded-[13px] font-semibold text-base inline-block">Çocuğunuzun gelişim haritasını öğrenin</Link>
      </section>
    </div>
  )
}
