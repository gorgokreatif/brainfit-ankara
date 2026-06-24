import Link from 'next/link'

export const metadata = { title: 'Biz Kimiz? | BrainFit Ankara' }

const values = [
  { t: 'Bilimsel bakış', color: '#00B4E5' },
  { t: 'Çocuğa özel planlama', color: '#F8AF00' },
  { t: 'Ebeveynle şeffaf iletişim', color: '#CE007F' },
  { t: 'Gelişimi takip etme', color: '#E84F2D' },
  { t: 'Güvenli ve sıcak merkez deneyimi', color: '#61CE70' },
]

export default function BizKimizPage() {
  return (
    <div className="bf-reveal">
      <section className="max-w-[980px] mx-auto px-6 py-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,36px)]">
        <span className="text-[13px] font-semibold text-[#00B4E5] tracking-widest uppercase">Biz Kimiz?</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4 max-w-[880px]">
          Her çocuğun öğrenme yolculuğu farklıdır. Biz o yolculuğu görünür kılmak için buradayız.
        </h1>
        <p className="text-[18px] text-[#6c6c68] leading-[1.7] mt-6 max-w-[760px]">
          BrainFit Ankara, çocukların dikkat, hafıza, öğrenme kapasitesi, problem çözme, psiko-motor ve sosyal-duygusal becerilerini bütünsel bir yaklaşımla destekleyen bir zihin gelişim merkezidir.
        </p>
      </section>
      <section className="bg-white border-t border-b border-[#efe9df]">
        <div className="max-w-[980px] mx-auto px-6 py-[clamp(40px,6vw,72px)]">
          <h2 className="text-[clamp(22px,2.6vw,30px)] font-bold mb-4">Ankara'da BrainFit yaklaşımı</h2>
          <p className="text-[17px] text-[#6c6c68] leading-[1.75] max-w-[760px]">
            Günümüzde çocuklar yalnızca akademik içerikle değil; dikkat dağınıklığı, ekran yoğunluğu, sınav baskısı, motivasyon kaybı ve öğrenme hızındaki farklılıklarla da mücadele ediyor. BrainFit Ankara olarak bu tabloya tek bir davranış üzerinden değil, çocuğun bilişsel altyapısına bütünsel olarak bakıyoruz.
          </p>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)]">
        <h2 className="text-[clamp(22px,2.6vw,32px)] font-bold mb-9">Değerlerimiz</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {values.map(v => (
            <div key={v.t} className="bf-card bg-white rounded-[18px] p-6 border border-[#efe9df]" style={{ borderLeft: `5px solid ${v.color}` }}>
              <span className="w-9 h-9 rounded-[11px] block mb-4 opacity-92" style={{ background: v.color }} />
              <h3 className="text-[17px] font-semibold leading-snug">{v.t}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(40px,6vw,72px)]">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-[#23231f] text-white rounded-[24px] p-[clamp(28px,3.5vw,44px)]">
            <span className="text-[13px] font-semibold text-[#61CE70] tracking-widest uppercase">Misyonumuz</span>
            <p className="text-[19px] leading-relaxed mt-4 text-[#f0ece2]">Çocukların öğrenme potansiyelini görünür kılmak, gelişime açık alanlarını bilimsel değerlendirmelerle belirlemek ve kişiye özel egzersiz programlarıyla onları desteklemek.</p>
          </div>
          <div className="bg-white border border-[#efe9df] rounded-[24px] p-[clamp(28px,3.5vw,44px)]">
            <span className="text-[13px] font-semibold text-[#00B4E5] tracking-widest uppercase">Vizyonumuz</span>
            <p className="text-[19px] leading-relaxed mt-4 text-[#3a3a38]">Ankara'da çocukların öğrenme, dikkat ve bilişsel gelişim süreçlerinde ailelerin güvenle başvurabileceği, ölçülebilir ve bütünsel bir gelişim merkezi olmak.</p>
          </div>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(56px,7vw,90px)]">
        <div className="grid lg:grid-cols-[.6fr_1.4fr] gap-8 items-center bg-[#F1ECE3] border border-[#e6e0d5] rounded-[24px] p-[clamp(28px,4vw,48px)]">
          <div className="w-full aspect-square rounded-[20px] border border-dashed border-[#cdc4b3] flex flex-col items-center justify-center gap-2 text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#efe9df,#e6dfd2)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.4"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-mono text-xs">Kurucu portresi</span>
          </div>
          <div>
            <h3 className="text-[clamp(20px,2.4vw,28px)] font-bold">[Kurucu / Merkez Sorumlusu adı buraya eklenecek]</h3>
            <p className="text-base text-[#6c6c68] leading-7 mt-3.5">Bu bölüme Ankara kurucusunun kişisel hikayesi, uzmanlık alanı ve BrainFit'i Ankara'ya getirme motivasyonu yazılacak.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
