import Link from 'next/link'
import Image from 'next/image'
import { getPageImages } from '@/lib/pageImages'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Biz Kimiz? | BrainFit Ankara' }

const values = [
  { t: 'Bilimsel bakış', color: '#00B4E5' },
  { t: 'Çocuğa özel planlama', color: '#F8AF00' },
  { t: 'Ebeveynle şeffaf iletişim', color: '#CE007F' },
  { t: 'Gelişimi takip etme', color: '#E84F2D' },
  { t: 'Güvenli ve sıcak merkez deneyimi', color: '#61CE70' },
]

export default async function BizKimizPage() {
  const imgs = await getPageImages(['hero_biz_kimiz', 'section_biz_kimiz_kurucu', 'section_biz_kimiz_merkez'])

  return (
    <div className="bf-reveal">
      {/* Hero — metin sol, görsel sağ */}
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,80px)]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-[clamp(32px,5vw,64px)] items-center">
          <div>
            <span className="text-[13px] font-semibold text-[#00B4E5] tracking-widest uppercase">Biz Kimiz?</span>
            <h1 className="text-[clamp(28px,3.8vw,48px)] font-extrabold tracking-tight leading-[1.1] mt-4">
              Her çocuğun öğrenme yolculuğu farklıdır. Biz o yolculuğu görünür kılmak için buradayız.
            </h1>
            <p className="text-[17px] text-[#6c6c68] leading-[1.7] mt-5">
              BrainFit Ankara, çocukların dikkat, hafıza, öğrenme kapasitesi, problem çözme, psiko-motor ve sosyal-duygusal becerilerini bütünsel bir yaklaşımla destekleyen bir zihin gelişim merkezidir.
            </p>
            <Link href="/iletisim" className="bf-lift mt-7 inline-block bg-[#00B4E5] px-6 py-3.5 rounded-[12px] font-semibold text-[15px]" style={{ color: '#fff' }}>
              Tanışalım →
            </Link>
          </div>
          {/* Hero Görsel */}
          <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[#e3ded5] shadow-[0_20px_50px_rgba(0,0,0,.08)]">
            {imgs['hero_biz_kimiz'] ? (
              <Image src={imgs['hero_biz_kimiz']} alt="BrainFit Ankara Merkez" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#a8a08f]" style={{ background: 'linear-gradient(135deg,#e8f7fc,#d4eff8)' }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#8ecfe3" strokeWidth="1.2"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-xs font-mono text-[#8ecfe3]">Merkez fotoğrafı</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ankara'da BrainFit + merkez görseli */}
      <section className="bg-white border-t border-b border-[#efe9df]">
        <div className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-[clamp(32px,5vw,64px)] items-center">
            {/* Merkez iç görsel */}
            <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden border border-[#e3ded5] order-last lg:order-first">
              {imgs['section_biz_kimiz_merkez'] ? (
                <Image src={imgs['section_biz_kimiz_merkez']} alt="BrainFit Ankara içi" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#a8a08f]" style={{ background: 'linear-gradient(135deg,#f0ece2,#e6dfd2)' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <span className="text-xs font-mono">Merkez iç görünüm</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-[clamp(22px,2.6vw,30px)] font-bold mb-4">Ankara'da BrainFit yaklaşımı</h2>
              <p className="text-[17px] text-[#6c6c68] leading-[1.75]">
                Günümüzde çocuklar yalnızca akademik içerikle değil; dikkat dağınıklığı, ekran yoğunluğu, sınav baskısı, motivasyon kaybı ve öğrenme hızındaki farklılıklarla da mücadele ediyor. BrainFit Ankara olarak bu tabloya tek bir davranış üzerinden değil, çocuğun bilişsel altyapısına bütünsel olarak bakıyoruz.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Bilimsel değerlendirme', 'Kişiye özel program', 'Bütünsel yaklaşım', 'Aile iletişimi'].map(t => (
                  <span key={t} className="text-[13px] font-medium text-[#3a3a38] bg-[#F8F6F2] border border-[#e3ded5] px-3.5 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)]">
        <h2 className="text-[clamp(22px,2.6vw,32px)] font-bold mb-8">Değerlerimiz</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {values.map(v => (
            <div key={v.t} className="bf-card bg-white rounded-[18px] p-6 border border-[#efe9df]" style={{ borderLeft: `5px solid ${v.color}` }}>
              <span className="w-9 h-9 rounded-[11px] block mb-4" style={{ background: v.color }} />
              <h3 className="text-[17px] font-semibold leading-snug">{v.t}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Misyon / Vizyon */}
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(40px,6vw,72px)]">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-[#23231f] text-white rounded-[24px] p-[clamp(28px,3.5vw,44px)]">
            <span className="text-[13px] font-semibold text-[#61CE70] tracking-widest uppercase">Misyonumuz</span>
            <p className="text-[18px] leading-relaxed mt-4" style={{ color: '#f0ece2' }}>
              Çocukların öğrenme potansiyelini görünür kılmak, gelişime açık alanlarını bilimsel değerlendirmelerle belirlemek ve kişiye özel egzersiz programlarıyla onları desteklemek.
            </p>
          </div>
          <div className="bg-white border border-[#efe9df] rounded-[24px] p-[clamp(28px,3.5vw,44px)]">
            <span className="text-[13px] font-semibold text-[#00B4E5] tracking-widest uppercase">Vizyonumuz</span>
            <p className="text-[18px] leading-relaxed mt-4 text-[#3a3a38]">
              Ankara'da çocukların öğrenme, dikkat ve bilişsel gelişim süreçlerinde ailelerin güvenle başvurabileceği, ölçülebilir ve bütünsel bir gelişim merkezi olmak.
            </p>
          </div>
        </div>
      </section>

      {/* Kurucu bölümü */}
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(56px,7vw,90px)]">
        <div className="grid lg:grid-cols-[.55fr_1.45fr] gap-8 items-center bg-[#F1ECE3] border border-[#e6e0d5] rounded-[24px] p-[clamp(28px,4vw,48px)]">
          <div className="relative w-full aspect-square rounded-[20px] overflow-hidden border border-[#ddd8ce]">
            {imgs['section_biz_kimiz_kurucu'] ? (
              <Image src={imgs['section_biz_kimiz_kurucu']} alt="Kurucu / Merkez Sorumlusu" fill className="object-cover object-top" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#efe9df,#e6dfd2)' }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <span className="font-mono text-xs">Kurucu portresi</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-[clamp(20px,2.4vw,28px)] font-bold">[Kurucu / Merkez Sorumlusu adı buraya eklenecek]</h3>
            <p className="text-base text-[#6c6c68] leading-7 mt-3.5">
              Bu bölüme Ankara kurucusunun kişisel hikayesi, uzmanlık alanı ve BrainFit'i Ankara'ya getirme motivasyonu yazılacak.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
