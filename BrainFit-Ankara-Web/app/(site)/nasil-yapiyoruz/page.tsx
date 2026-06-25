import Link from 'next/link'
import Image from 'next/image'
import { getPageImages } from '@/lib/pageImages'
import TestPromo from '@/components/site/TestPromo'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Nasıl Yapıyoruz? | BrainFit Ankara' }

const timeline = [
  { n: '01', t: 'Ön Görüşme', d: 'Ailenin gözlemleri, çocuğun yaşadığı zorlanmalar ve beklentiler dinlenir.' },
  { n: '02', t: 'Cog-Map Zihin Check-Up', d: 'Yaşa uygun bilimsel envanterlerle bilişsel alanlar değerlendirilir.' },
  { n: '03', t: 'Raporlama', d: 'Sonuçlar detaylı rapor halinde hazırlanır.' },
  { n: '04', t: 'Geri Bildirim', d: 'Uzman ekip raporu aileyle paylaşır ve ihtiyaç alanlarını açıklar.' },
  { n: '05', t: 'Kişiye Özel Program', d: 'Seans planı, egzersizler ve hedef alanlar belirlenir.' },
  { n: '06', t: 'Seanslar & Ev Egzersizleri', d: 'Kurum içi bireysel uygulamalar ve ev destek çalışmalarıyla süreç devam eder.' },
  { n: '07', t: 'Takip', d: 'Gelişim düzenli gözlenir, aileye geri bildirim verilir.' },
]

const experience = [
  { t: 'Kurumda bireysel egzersizler', color: '#00B4E5' },
  { t: 'Evde destek çalışmaları', color: '#F8AF00' },
  { t: 'Aile bilgilendirmesi', color: '#CE007F' },
  { t: 'Düzenli takip', color: '#E84F2D' },
  { t: 'Motivasyonu koruyan yapı', color: '#61CE70' },
]

export default async function NasilYapiyoruzPage() {
  const imgs = await getPageImages(['hero_nasil_yapiyoruz', 'section_nasil_seans', 'section_nasil_aile'])

  return (
    <div className="bf-reveal">
      {/* Hero — metin sol, görsel sağ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(40px,6vw,80px)]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-[clamp(32px,5vw,64px)] items-center">
          <div>
            <span className="text-[13px] font-semibold text-[#F8AF00] tracking-widest uppercase">Nasıl Yapıyoruz?</span>
            <h1 className="text-[clamp(28px,3.8vw,48px)] font-extrabold tracking-tight leading-[1.1] mt-4">
              Önce ölçüm, sonra kişiye özel gelişim.
            </h1>
            <p className="text-[17px] text-[#6c6c68] leading-7 mt-5">
              Her çocuk için süreci sıfırdan planlıyoruz. Standart bir program değil, gerçek ihtiyaca özel bir yol haritası.
            </p>
            <Link href="/iletisim" className="bf-lift mt-7 inline-block bg-[#F8AF00] px-6 py-3.5 rounded-[12px] font-semibold text-[15px]" style={{ color: '#23231f' }}>
              Süreci Birlikte Planlayalım →
            </Link>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[#e3ded5] shadow-[0_20px_50px_rgba(0,0,0,.08)]">
            {imgs['hero_nasil_yapiyoruz'] ? (
              <Image src={imgs['hero_nasil_yapiyoruz']} alt="BrainFit Süreç" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg,#fff8e6,#fdefc8)' }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#d4940a" strokeWidth="1.2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span className="text-xs font-mono text-[#d4940a]">Süreç fotoğrafı</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline + seans görseli */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-[clamp(40px,5vw,56px)]">
        <div className="grid lg:grid-cols-[1fr_.85fr] gap-[clamp(32px,5vw,56px)] items-start">
          {/* Timeline */}
          <div className="relative pl-2">
            {timeline.map((t, i) => (
              <div key={t.n} className="relative flex gap-6 pb-5">
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="w-[46px] h-[46px] rounded-full bg-[#23231f] font-[Sora] font-bold text-[15px] flex items-center justify-center z-10" style={{ color: '#fff' }}>
                    {t.n}
                  </span>
                  {i < timeline.length - 1 && <span className="flex-1 w-0.5 bg-[#e3ded5] mt-1.5" />}
                </div>
                <div className="bg-white border border-[#efe9df] rounded-[18px] p-5 flex-1 mb-1">
                  <h3 className="text-[18px] font-bold mb-1.5">{t.t}</h3>
                  <p className="text-[14.5px] text-[#6c6c68] leading-relaxed">{t.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Yan görseller */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden border border-[#e3ded5] shadow-[0_16px_40px_rgba(0,0,0,.07)]">
              {imgs['section_nasil_seans'] ? (
                <Image src={imgs['section_nasil_seans']} alt="BrainFit seansı" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#efe9df,#e6dfd2)' }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="10" r="3"/><path d="M7 20c0-2.76 2.24-5 5-5s5 2.24 5 5"/></svg>
                  <span className="text-xs font-mono">Bireysel seans fotoğrafı</span>
                </div>
              )}
            </div>
            <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden border border-[#e3ded5]">
              {imgs['section_nasil_aile'] ? (
                <Image src={imgs['section_nasil_aile']} alt="Aile bilgilendirmesi" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#f0ece2,#e8e0d4)' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <span className="text-xs font-mono">Aile görüşmesi fotoğrafı</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Program Deneyimi */}
      <section className="bg-white border-t border-[#efe9df]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(40px,6vw,72px)] pb-[clamp(56px,7vw,90px)]">
          <h2 className="text-[clamp(22px,2.8vw,32px)] font-bold mb-7">Program deneyimi</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-10">
            {experience.map(e => (
              <div key={e.t} className="bg-[#F8F6F2] border border-[#efe9df] rounded-[16px] p-5">
                <span className="w-8 h-8 rounded-[10px] block mb-3.5" style={{ background: e.color }} />
                <h3 className="text-[15.5px] font-semibold leading-snug">{e.t}</h3>
              </div>
            ))}
          </div>
          <Link href="/iletisim" className="bf-lift bg-[#51AD32] px-6 py-4 rounded-[13px] font-semibold text-base inline-block" style={{ color: '#fff' }}>
            Nasıl ilerleyeceğimizi birlikte planlayalım
          </Link>
        </div>
      </section>
      <TestPromo />
    </div>
  )
}
