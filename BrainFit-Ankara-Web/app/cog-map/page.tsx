import Link from 'next/link'

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

export default function CogMapPage() {
  return (
    <div className="bf-reveal">
      <section style={{ background: 'linear-gradient(135deg,#00B4E5,#0a93bd)' }}>
        <div className="max-w-[1280px] mx-auto px-6 py-[clamp(44px,6vw,84px)]">
          <span className="text-[13px] font-bold text-white tracking-widest uppercase opacity-90">Cog-Map Zihin Check-Up</span>
          <h1 className="text-[clamp(30px,4.4vw,52px)] font-extrabold tracking-tight leading-[1.08] mt-3.5 max-w-[800px] text-white">Çocuğunuzun bilişsel gelişim haritasını görün.</h1>
          <p className="text-[18px] text-white/92 leading-relaxed mt-5 max-w-[780px]">Cog-Map Zihin Check-Up; dikkat, görsel, işitsel, psiko-motor ve sosyal-duygusal beceri alanlarını değerlendirmeye yardımcı olan kapsamlı bir bilişsel ölçüm sürecidir.</p>
          <Link href="/iletisim" className="bf-lift mt-7 bg-white text-[#0a93bd] px-7 py-4 rounded-[13px] font-bold text-base inline-block">Cog-Map Randevusu Al</Link>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)]">
        <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-4">Zihnin hangi alanlarını ölçümlüyoruz?</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mt-9">
          {areas.map(a => (
            <div key={a.name} className="bf-tile bg-[#F8F6F2] border border-[#efe9df] rounded-[18px] p-6" style={{ borderBottom: `5px solid ${a.color}` }}>
              <span className="w-10 h-10 rounded-[12px] block mb-4" style={{ background: a.color }} />
              <h3 className="text-base font-semibold leading-snug mb-2">{a.name}</h3>
              <p className="text-[13px] text-[#8a8578] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(40px,5vw,56px)]">
        <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-9">Cog-Map süreci</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {cogProcess.map(c => (
            <div key={c.n} className="bf-card bg-white border border-[#efe9df] rounded-[20px] p-7">
              <span className="font-[Sora] text-[40px] font-extrabold" style={{ color: c.color }}>{c.n}</span>
              <h3 className="text-[19px] font-bold mt-1.5 mb-2.5">{c.t}</h3>
              <p className="text-sm text-[#6c6c68] leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(56px,7vw,90px)]">
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
          <p className="text-[18px] text-[#23231f] font-semibold mt-8 max-w-[620px]">Çocuğunuzun gelişim haritasını çıkarmak için ilk adımı atın.</p>
          <Link href="/iletisim" className="bf-lift mt-4 bg-[#51AD32] text-white px-6 py-4 rounded-[13px] font-semibold text-base inline-block">Cog-Map Randevusu Al</Link>
        </div>
      </section>
    </div>
  )
}
