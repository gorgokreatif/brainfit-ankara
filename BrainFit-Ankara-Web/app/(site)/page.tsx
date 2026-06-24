import Link from 'next/link'

const concerns = [
  { q: 'Ödevin başında duramıyor mu?', color: '#00B4E5' },
  { q: 'Dikkati çok çabuk dağılıyor mu?', color: '#F8AF00' },
  { q: 'Okuyor ama anlamakta zorlanıyor mu?', color: '#CE007F' },
  { q: 'Yazısı yavaş, düzensiz veya yorucu mu?', color: '#E84F2D' },
  { q: 'Sınavlarda bildiğini gösteremiyor mu?', color: '#61CE70' },
]
const steps = [
  { n: '01', t: 'Analiz', d: 'Cog-Map Zihin Check-Up ile güçlü ve gelişime açık alanları ölçümleriz.', color: '#00B4E5' },
  { n: '02', t: 'Yol Haritası', d: 'Sonuçlara göre çocuğa özel gelişim programı planlarız.', color: '#F8AF00' },
  { n: '03', t: 'Gelişim & Takip', d: 'Seanslar, ev egzersizleri ve düzenli geri bildirimlerle süreci takip ederiz.', color: '#61CE70' },
]
const areas = [
  { name: 'Dikkat & Odaklanma', color: '#00B4E5', desc: 'Dikkati başlatma, sürdürme ve yönerge takibi.' },
  { name: 'Görsel Beceriler', color: '#F8AF00', desc: 'Görsel algı, göz takibi ve mekânsal işleme.' },
  { name: 'İşitsel Beceriler', color: '#CE007F', desc: 'İşitsel ayrım, fonetik işlem ve işitsel dikkat.' },
  { name: 'Psiko-Motor Beceriler', color: '#E84F2D', desc: 'El-göz koordinasyonu, denge ve ince motor.' },
  { name: 'Sosyal-Duygusal Beceriler', color: '#61CE70', desc: 'Özgüven, dayanıklılık ve duygu düzenleme.' },
]
const programs = [
  { slug: 'junior', name: 'BrainFit Junior', tag: '4–6 yaş', color: '#F8AF00', desc: '4–6 yaş okul öncesi çocukların zihinsel hazırlık, dikkat, görsel algı ve psiko-motor becerilerini destekler.' },
  { slug: 'scholar', name: 'BrainFit Scholar', tag: '6–18 yaş', color: '#00B4E5', desc: '6–18 yaş öğrencilerin dikkat, hafıza, okuma-anlama, sınav performansını desteklemeye odaklanır.' },
  { slug: 'dehb', name: 'DEHB', tag: 'Dikkat & Dürtü', color: '#E84F2D', desc: 'Dikkat, dürtü kontrolü, odakta kalma alanlarında bireysel ihtiyaçlara göre yapılandırılmış egzersiz programları.' },
  { slug: 'disleksi', name: 'Disleksi', tag: 'Okuma & Yazma', color: '#CE007F', desc: 'Okuma, yazma, işitsel-görsel işlemleme ve psiko-motor beceri temellerini destekleyen kişiye özel yaklaşım.' },
]
const trust = ['Cog-Map Zihin Check-Up', '5 temel gelişim alanı', '18 sayfalık detaylı rapor', 'Kişiye özel egzersiz programı', "Ankara'da yüz yüze takip"]
const whyPoints = [
  { t: 'Bilimsel değerlendirme temelli başlangıç', d: 'Süreç gözlemle değil, ölçümle başlar.' },
  { t: 'Kişiye özel program', d: 'Her çocuğun profili farklı; programı da öyle.' },
  { t: 'Hareket temelli egzersiz yaklaşımı', d: 'Bilişsel gelişim bedenle birlikte desteklenir.' },
  { t: 'Ebeveyn geri bildirimleri', d: 'Aile süreçten düzenli olarak haberdar edilir.' },
  { t: 'Bütünsel bakış', d: 'Akademik, sosyal ve duygusal gelişim birlikte ele alınır.' },
]

export default function HomePage() {
  return (
    <div className="bf-reveal">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <span className="absolute -top-[120px] -right-[80px] w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(0,180,229,.12),transparent 70%)' }} />
        <span className="absolute -bottom-[160px] -left-[100px] w-[460px] h-[460px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(248,175,0,.12),transparent 70%)' }} />
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(32px,5vw,68px)] grid lg:grid-cols-2 gap-[clamp(28px,5vw,72px)] items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border border-[#eae6df] px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#51AD32] mb-6 shadow-[0_4px_14px_rgba(0,0,0,.04)]">
              <span className="w-2 h-2 rounded-full bg-[#51AD32]" />
              Cog-Map Zihin Check-Up · Ankara
            </span>
            <h1 className="text-[clamp(28px,4.7vw,56px)] font-extrabold tracking-tight leading-[1.08]">
              Çocuğunuzun öğrenmesinin önündeki <span className="text-[#51AD32]">kök nedeni</span> birlikte keşfedelim.
            </h1>
            <p className="text-[clamp(15px,1.4vw,18px)] leading-relaxed text-[#6c6c68] mt-4 max-w-[520px]">
              Dikkat, hafıza, görsel-işitsel beceriler, psiko-motor gelişim ve sosyal-duygusal alanları analiz ediyor; çocuğunuza özel bir gelişim programı oluşturuyoruz.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link href="/iletisim" className="bf-lift bg-[#51AD32] text-white px-5 py-3.5 rounded-[13px] text-[15px] font-semibold shadow-[0_12px_26px_rgba(81,173,50,.3)]">
                Ücretsiz Ön Görüşme Planla
              </Link>
              <Link href="/cog-map" className="bf-lift bg-white border-[1.5px] border-[#e3ded5] text-[#23231f] px-5 py-3.5 rounded-[13px] text-[15px] font-semibold">
                Cog-Map'i İncele
              </Link>
            </div>
            <p className="text-[13px] text-[#9a968c] mt-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#E84F2D] inline-block" />
              Önce ölçüyoruz, sonra kişiye özel yol haritası oluşturuyoruz.
            </p>
          </div>
          {/* Visual area */}
          <div className="relative px-2 py-2">
            <div className="absolute top-8 bottom-8 -left-0.5 w-[7px] rounded-[6px] opacity-85 hidden lg:block" style={{ background: 'linear-gradient(#00B4E5,#F8AF00,#CE007F,#E84F2D,#61CE70)' }} />
            <div className="relative rounded-[26px] overflow-hidden shadow-[0_30px_60px_rgba(35,35,31,.14)] border border-[#e3ded5]">
              <div className="h-[7px]" style={{ background: 'linear-gradient(90deg,#00B4E5,#F8AF00,#CE007F,#E84F2D,#61CE70)' }} />
              <div className="aspect-[4/3] lg:aspect-[4/4.2] flex flex-col items-center justify-center gap-3 text-[#a8a08f]" style={{ background: 'linear-gradient(160deg,#efe9df,#e4ddce)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.4"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="font-mono text-[12.5px] tracking-wide">çocuk · öğrenme ortamı</span>
              </div>
            </div>
            {/* Floating cards — only on larger screens */}
            <div className="hidden md:block absolute -left-4 bottom-16 bg-white rounded-2xl px-4 py-4 shadow-[0_16px_36px_rgba(35,35,31,.16)] border border-[#efe9df]" style={{ animation: 'bfFloat 7s ease-in-out infinite' }}>
              <span className="text-[11.5px] font-semibold text-[#9a968c] tracking-widest uppercase">5 temel alan</span>
              <div className="flex gap-1.5 mt-2">
                {['#00B4E5','#F8AF00','#CE007F','#E84F2D','#61CE70'].map(c => (
                  <span key={c} className="w-[18px] h-[18px] rounded-[6px]" style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="hidden md:block absolute -right-1 top-10 bg-[#23231f] rounded-2xl px-4 py-3.5 shadow-[0_16px_36px_rgba(35,35,31,.22)]" style={{ animation: 'bfFloat 7s ease-in-out infinite 1.2s' }}>
              <span className="block font-[Sora] text-[30px] font-extrabold text-[#61CE70] leading-none">18</span>
              <span className="text-xs text-[#cfcabf]">sayfalık detaylı rapor</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#23231f]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5 flex flex-wrap gap-4 justify-center items-center">
          {trust.map(t => (
            <span key={t} className="flex items-center gap-2.5 text-[#e8e3d8] text-[14.5px] font-medium">
              <span className="w-[7px] h-[7px] rounded-full bg-[#61CE70]" />{t}
            </span>
          ))}
        </div>
      </section>

      {/* CONCERNS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,7vw,84px)]">
        <div className="max-w-[660px] mb-10">
          <h2 className="text-[clamp(26px,3.4vw,40px)] font-bold tracking-tight">Çocuğunuz zorlanıyor olabilir. Peki neden?</h2>
          <p className="text-[17px] text-[#6c6c68] mt-3.5 leading-relaxed">Bir davranışın arkasında çoğu zaman birden fazla beceri alanı vardır. Önce hangi alanın desteğe ihtiyaç duyduğunu anlamaya çalışırız.</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {concerns.map(c => (
            <div key={c.q} className="bf-card bg-white rounded-[18px] p-6 border border-[#efe9df] shadow-[0_4px_18px_rgba(0,0,0,.03)]">
              <span className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-4" style={{ background: c.color }}>
                <span className="w-3.5 h-3.5 rounded bg-white" />
              </span>
              <h3 className="text-[18px] font-semibold leading-snug mb-3">{c.q}</h3>
              <p className="text-[13.5px] text-[#8a8578] leading-relaxed">Bu davranışın arkasında dikkat, görsel, işitsel, motor veya duygusal bir alan olabilir.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 STEPS */}
      <section className="bg-white border-t border-b border-[#efe9df]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,7vw,84px)]">
          <h2 className="text-[clamp(26px,3.4vw,40px)] font-bold tracking-tight mb-11">BrainFit Ankara'da yaklaşımımız</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {steps.map(s => (
              <div key={s.n} className="relative p-7 rounded-[20px] bg-[#F8F6F2] border border-[#efe9df]">
                <span className="font-[Sora] text-[46px] font-extrabold opacity-90" style={{ color: s.color }}>{s.n}</span>
                <h3 className="text-[21px] font-bold mt-2 mb-3">{s.t}</h3>
                <p className="text-[15px] text-[#6c6c68] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 AREAS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,7vw,84px)]">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
          <h2 className="text-[clamp(26px,3.4vw,40px)] font-bold tracking-tight max-w-[520px]">5 temel gelişim alanı</h2>
          <Link href="/ne-yapiyoruz" className="text-[#51AD32] font-semibold text-[15px]">Detaylı incele →</Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {areas.map(a => (
            <div key={a.name} className="bf-tile bg-white rounded-[20px] p-6 border border-[#efe9df] overflow-hidden relative">
              <span className="absolute -top-8 -right-8 w-[90px] h-[90px] rounded-full opacity-10" style={{ background: a.color }} />
              <span className="w-11 h-11 rounded-[13px] block mb-4" style={{ background: a.color }} />
              <h3 className="text-[18px] font-semibold leading-snug mb-2.5">{a.name}</h3>
              <p className="text-[13.5px] text-[#8a8578] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="bg-[#23231f] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,7vw,84px)]">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-bold tracking-tight text-white">Programlar</h2>
            <Link href="/programlar" className="text-[#61CE70] font-semibold text-[15px]">Tüm programlar →</Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            {programs.map(pr => (
              <Link key={pr.slug} href={`/programlar/${pr.slug}`} className="bf-card text-left bg-[#2c2b26] rounded-[20px] p-7 border border-[#38362f] flex flex-col h-full">
                <span className="self-start text-xs font-semibold text-[#23231f] px-2.5 py-1.5 rounded-full mb-4" style={{ background: pr.color }}>{pr.tag}</span>
                <h3 className="text-xl font-bold text-white mb-3">{pr.name}</h3>
                <p className="text-sm text-[#b3aea2] leading-relaxed flex-1">{pr.desc}</p>
                <span className="font-semibold text-sm mt-4" style={{ color: pr.color }}>İncele →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(48px,7vw,84px)]">
        <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-[clamp(32px,5vw,64px)] items-start">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-bold tracking-tight">Neden BrainFit Ankara?</h2>
            <p className="text-base text-[#6c6c68] mt-4 leading-relaxed">Çocuğunuzu etiketlemeden anlamaya çalışan, bilimsel ama sıcak bir yaklaşım.</p>
            <Link href="/biz-kimiz" className="bf-lift mt-6 bg-[#23231f] text-white px-5 py-3.5 rounded-[12px] font-semibold text-[15px] inline-block">Bizi tanıyın</Link>
          </div>
          <div className="flex flex-col gap-0">
            {whyPoints.map(w => (
              <div key={w.t} className="flex gap-4 py-5 border-b border-[#ebe6dd]">
                <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[#51AD32] mt-2" />
                <div>
                  <h3 className="text-[18.5px] font-semibold mb-1.5">{w.t}</h3>
                  <p className="text-[15px] text-[#7c7c76] leading-relaxed">{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-[clamp(56px,7vw,90px)]">
        <div className="rounded-[28px] px-[clamp(36px,5vw,64px)] py-[clamp(36px,5vw,64px)] relative overflow-hidden" style={{ background: 'linear-gradient(120deg,#51AD32,#61CE70)' }}>
          <span className="absolute -top-12 -right-8 w-48 h-48 rounded-full bg-white/10" />
          <span className="absolute -bottom-16 left-[30%] w-40 h-40 rounded-full bg-white/8" />
          <div className="relative max-w-[680px]">
            <h2 className="text-[clamp(24px,3vw,38px)] font-bold text-white tracking-tight">Çocuğunuzun yaşadığı zorlanmanın arkasında hangi beceri alanları olabilir?</h2>
            <p className="text-lg text-white/90 mt-3.5">İlk adımı birlikte atalım.</p>
            <Link href="/iletisim" className="bf-lift mt-7 bg-white text-[#23231f] px-7 py-4 rounded-[13px] font-bold text-base inline-block">Randevu Talep Et</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
