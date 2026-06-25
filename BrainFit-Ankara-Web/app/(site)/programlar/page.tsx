import Link from 'next/link'
import Image from 'next/image'
import { getPageImages } from '@/lib/pageImages'
import TestPromo from '@/components/site/TestPromo'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Programlar | BrainFit Ankara' }

const programs = [
  { slug: 'junior', name: 'BrainFit Junior', tag: '4–6 yaş', color: '#F8AF00', imgKey: 'card_junior',
    desc: '4–6 yaş okul öncesi çocukların zihinsel hazırlık, dikkat, görsel algı, fonetik işlem ve psiko-motor becerilerini destekler.' },
  { slug: 'scholar', name: 'BrainFit Scholar', tag: '6–18 yaş', color: '#00B4E5', imgKey: 'card_scholar',
    desc: '6–18 yaş öğrencilerin dikkat, hafıza, okuma-anlama, sınav performansı, özgüven ve akademik becerilerini desteklemeye odaklanır.' },
  { slug: 'dehb', name: 'DEHB', tag: 'Dikkat & Dürtü', color: '#E84F2D', imgKey: 'card_dehb',
    desc: 'Dikkat, dürtü kontrolü, odakta kalma ve yönerge takibi gibi alanlarda bireysel ihtiyaçlara göre yapılandırılmış egzersiz programları sunar.' },
  { slug: 'disleksi', name: 'Disleksi', tag: 'Okuma & Yazma', color: '#CE007F', imgKey: 'card_disleksi',
    desc: 'Okuma, yazma, işitsel-görsel işlemleme ve psiko-motor beceri temellerini destekleyen kişiye özel bir gelişim yaklaşımıdır.' },
]

export default async function ProgramlarPage() {
  const imgs = await getPageImages(programs.map(p => p.imgKey))

  return (
    <div className="bf-reveal">
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,40px)]">
        <span className="text-[13px] font-semibold text-[#51AD32] tracking-widest uppercase">Programlar</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4 max-w-[780px]">
          Her çocuğun ihtiyacı farklı. Programı da öyle olmalı.
        </h1>
        <p className="text-[17px] text-[#6c6c68] leading-7 mt-5 max-w-[780px]">
          BrainFit Ankara programları, Cog-Map Zihin Check-Up ile elde edilen bilişsel profil doğrultusunda kişiye özel olarak planlanır.
        </p>
      </section>

      {/* Program kartları — görsel alanlı */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-[clamp(40px,5vw,56px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {programs.map(pr => {
            const imgUrl = imgs[pr.imgKey]
            return (
              <Link
                key={pr.slug}
                href={`/programlar/${pr.slug}`}
                className="bf-card bg-white rounded-[22px] border border-[#efe9df] overflow-hidden flex flex-col"
              >
                {/* Görsel alan */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  {imgUrl ? (
                    <Image src={imgUrl} alt={pr.name} fill className="object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{ background: `linear-gradient(135deg,${pr.color}22,${pr.color}44)` }}
                    >
                      <span className="w-14 h-14 rounded-[18px] opacity-60" style={{ background: pr.color }} />
                      <span className="text-xs font-semibold tracking-wide" style={{ color: pr.color }}>
                        {pr.name}
                      </span>
                    </div>
                  )}
                  <span
                    className="absolute top-3.5 left-3.5 text-xs font-bold text-white px-2.5 py-1.5 rounded-full"
                    style={{ background: pr.color }}
                  >
                    {pr.tag}
                  </span>
                </div>

                {/* İçerik */}
                <div className="p-7 flex flex-col flex-1 border-t-[4px]" style={{ borderColor: pr.color }}>
                  <h3 className="text-[21px] font-bold mb-3">{pr.name}</h3>
                  <p className="text-[14.5px] text-[#6c6c68] leading-relaxed flex-1">{pr.desc}</p>
                  <span className="font-semibold text-[14.5px] mt-5 inline-flex items-center gap-1" style={{ color: pr.color }}>
                    Programı İncele →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Karşılaştırma tablosu */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-[clamp(56px,7vw,90px)]">
        <h2 className="text-[clamp(20px,2.4vw,28px)] font-bold mb-6">Programları karşılaştırın</h2>
        <div className="overflow-x-auto bg-white border border-[#efe9df] rounded-[20px]">
          <table className="w-full border-collapse min-w-[680px] text-[14.5px]">
            <thead>
              <tr className="bg-[#F1ECE3] text-left">
                <th className="px-5 py-4 font-[Sora] font-semibold text-[#23231f]">Program</th>
                <th className="px-5 py-4 font-[Sora] font-semibold text-[#23231f]">Yaş / Odak</th>
                <th className="px-5 py-4 font-[Sora] font-semibold text-[#23231f]">Kimler için?</th>
                <th className="px-5 py-4 font-[Sora] font-semibold text-[#23231f]">Ana hedef</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody>
              {[
                { slug:'junior', color:'#F8AF00', name:'BrainFit Junior', age:'4–6 yaş · Okul öncesi', for:'Okula hazırlanan çocuklar', goal:'Öğrenme altyapısı' },
                { slug:'scholar', color:'#00B4E5', name:'BrainFit Scholar', age:'6–18 yaş · Akademik', for:'Sonuç alamayan öğrenciler', goal:'Akademik performans' },
                { slug:'dehb', color:'#E84F2D', name:'DEHB', age:'Dikkat & dürtü', for:'Dikkat-dürtü zorlananlar', goal:'Odak & dürtü kontrolü' },
                { slug:'disleksi', color:'#CE007F', name:'Disleksi', age:'Okuma & yazma', for:'Öğrenme güçlüğü yaşayanlar', goal:'Okuma-yazma altyapısı' },
              ].map(r => (
                <tr key={r.slug} className="border-t border-[#efe9df]">
                  <td className="px-5 py-4 font-semibold">
                    <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ background: r.color }} />
                    {r.name}
                  </td>
                  <td className="px-5 py-4 text-[#6c6c68]">{r.age}</td>
                  <td className="px-5 py-4 text-[#6c6c68]">{r.for}</td>
                  <td className="px-5 py-4 text-[#6c6c68]">{r.goal}</td>
                  <td className="px-5 py-4">
                    <Link href={`/programlar/${r.slug}`} className="text-[#51AD32] font-semibold">İncele →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <TestPromo />
    </div>
  )
}
