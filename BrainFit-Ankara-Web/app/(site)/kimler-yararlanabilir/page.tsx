import Link from 'next/link'
import TestPromo from '@/components/site/TestPromo'
export const metadata = { title: 'Kimler Yararlanabilir? | BrainFit Ankara' }
const audience = [
  'Dikkat ve odaklanma problemi yaşayanlar','DEHB tanısı olan veya dikkat-dürtü kontrolünde zorlanan çocuklar',
  'Disleksi ve öğrenme güçlüğü yaşayanlar','Okuma problemi yaşayanlar','Yazma problemi yaşayanlar',
  'Sınav performansını artırmak isteyen öğrenciler','Akademik performansını desteklemek isteyenler',
  'Sosyal-duygusal becerilerde desteğe ihtiyaç duyanlar','Spor veya sanat alanlarında koordinasyonunu geliştirmek isteyenler',
]
const symptoms = ['Aslında zeki ama derslere yansıtamıyor.','Çalışıyor ama sınavda yapamıyor.','Okuyor ama anlamıyor.',
  'Bir türlü odaklanamıyor.','Çok çabuk unutuyor.','Yazı yazarken çok yoruluyor.','Söylediklerimi duymuyor gibi.','Özgüveni giderek düşüyor.']
export default function KimlerPage() {
  return (
    <div className="bf-reveal">
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,40px)]">
        <span className="text-[13px] font-semibold text-[#61CE70] tracking-widest uppercase">Kimler Yararlanabilir?</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4 max-w-[720px]">BrainFit Ankara kimler için uygun?</h1>
        <p className="text-[17px] text-[#6c6c68] leading-7 mt-5 max-w-[820px]">BrainFit Ankara; dikkat, öğrenme, okuma-yazma, sınav performansı, psiko-motor beceriler ve sosyal-duygusal gelişim alanlarında desteğe ihtiyaç duyan çocuklar, gençler ve aileler için yapılandırılmış bir gelişim süreci sunar.</p>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(40px,5vw,56px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {audience.map(a => (
            <div key={a} className="bf-card flex gap-4 bg-white border border-[#efe9df] rounded-[16px] p-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-[9px] bg-[#61CE70] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded bg-white" />
              </span>
              <span className="text-[15px] text-[#3a3a38] leading-relaxed">{a}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white border-t border-[#efe9df]">
        <div className="max-w-[1080px] mx-auto px-6 py-[clamp(40px,6vw,72px)] pb-[clamp(56px,7vw,90px)]">
          <h2 className="text-[clamp(22px,2.8vw,30px)] font-bold mb-2">Belirtiler</h2>
          <p className="text-base text-[#6c6c68] mb-7">Şunları sık duyuyorsanız değerlendirme faydalı olabilir:</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3.5">
            {symptoms.map(s => (
              <div key={s} className="bg-[#F8F6F2] border border-[#efe9df] rounded-[14px] px-5 py-4 text-base text-[#3a3a38] italic">"{s}"</div>
            ))}
          </div>
          <div className="mt-10 text-center bg-[#F1ECE3] border border-[#e6e0d5] rounded-[20px] px-6 py-[clamp(28px,4vw,44px)]">
            <h3 className="text-[clamp(20px,2.4vw,26px)] font-bold max-w-[520px] mx-auto">Çocuğunuz için uygun programı birlikte belirleyelim.</h3>
            <Link href="/iletisim" className="bf-lift mt-5 bg-[#51AD32] text-white px-6 py-4 rounded-[13px] font-semibold text-base inline-block">Ön Görüşme Al</Link>
          </div>
        </div>
      </section>
      <TestPromo />
    </div>
  )
}
