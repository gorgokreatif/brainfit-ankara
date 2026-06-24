import Link from 'next/link'
export const metadata = { title: 'Nasıl Yapıyoruz? | BrainFit Ankara' }
const timeline = [
  { n:'01', t:'Ön Görüşme', d:'Ailenin gözlemleri, çocuğun yaşadığı zorlanmalar ve beklentiler dinlenir.' },
  { n:'02', t:'Cog-Map Zihin Check-Up', d:'Yaşa uygun bilimsel envanterlerle bilişsel alanlar değerlendirilir.' },
  { n:'03', t:'Raporlama', d:'Sonuçlar detaylı rapor halinde hazırlanır.' },
  { n:'04', t:'Geri Bildirim', d:'Uzman ekip raporu aileyle paylaşır ve ihtiyaç alanlarını açıklar.' },
  { n:'05', t:'Kişiye Özel Program', d:'Seans planı, egzersizler ve hedef alanlar belirlenir.' },
  { n:'06', t:'Seanslar & Ev Egzersizleri', d:'Kurum içi bireysel uygulamalar ve ev destek çalışmalarıyla süreç devam eder.' },
  { n:'07', t:'Takip', d:'Gelişim düzenli gözlenir, aileye geri bildirim verilir.' },
]
const experience = [
  { t:'Kurumda bireysel egzersizler', color:'#00B4E5' },
  { t:'Evde destek çalışmaları', color:'#F8AF00' },
  { t:'Aile bilgilendirmesi', color:'#CE007F' },
  { t:'Düzenli takip', color:'#E84F2D' },
  { t:'Motivasyonu koruyan yapı', color:'#61CE70' },
]
export default function NasilYapiyoruzPage() {
  return (
    <div className="bf-reveal">
      <section className="max-w-[1080px] mx-auto px-6 py-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,40px)]">
        <span className="text-[13px] font-semibold text-[#F8AF00] tracking-widest uppercase">Nasıl Yapıyoruz?</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4 max-w-[720px]">Önce ölçüm, sonra kişiye özel gelişim.</h1>
      </section>
      <section className="max-w-[880px] mx-auto px-6 pb-[clamp(40px,5vw,56px)]">
        <div className="relative pl-2">
          {timeline.map((t, i) => (
            <div key={t.n} className="relative flex gap-6 pb-7">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="w-[46px] h-[46px] rounded-full bg-[#23231f] text-white font-[Sora] font-bold text-[15px] flex items-center justify-center z-10">{t.n}</span>
                {i < timeline.length - 1 && <span className="flex-1 w-0.5 bg-[#e3ded5] mt-1.5" />}
              </div>
              <div className="bg-white border border-[#efe9df] rounded-[18px] p-6 flex-1 mb-1">
                <h3 className="text-[19px] font-bold mb-2">{t.t}</h3>
                <p className="text-[15px] text-[#6c6c68] leading-relaxed">{t.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white border-t border-[#efe9df]">
        <div className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)] pb-[clamp(56px,7vw,90px)]">
          <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-7">Program deneyimi</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-10">
            {experience.map(e => (
              <div key={e.t} className="bg-[#F8F6F2] border border-[#efe9df] rounded-[16px] p-5">
                <span className="w-8 h-8 rounded-[10px] block mb-3.5" style={{ background: e.color }} />
                <h3 className="text-[15.5px] font-semibold leading-snug">{e.t}</h3>
              </div>
            ))}
          </div>
          <Link href="/iletisim" className="bf-lift bg-[#51AD32] text-white px-6 py-4 rounded-[13px] font-semibold text-base inline-block">Nasıl ilerleyeceğimizi birlikte planlayalım</Link>
        </div>
      </section>
    </div>
  )
}
