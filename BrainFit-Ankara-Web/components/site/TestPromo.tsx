import Link from 'next/link'

export default function TestPromo() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(32px,4vw,52px)]">
      <div className="rounded-[24px] border border-[#00B4E5]/25 bg-gradient-to-br from-[#f0fbff] to-[#e8f7ff] px-[clamp(24px,4vw,52px)] py-[clamp(28px,4vw,44px)] flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold text-[#00B4E5] uppercase tracking-widest mb-3">
            <span className="w-5 h-[2px] bg-[#00B4E5] rounded inline-block" />
            Ücretsiz · 5 dakika · Sonuç anında
          </span>
          <h3 className="text-[clamp(19px,2.4vw,28px)] font-bold text-[#23231f] tracking-tight leading-snug">
            Çocuğunuzun bilişsel profilini<br className="hidden sm:block" /> hemen görün.
          </h3>
          <p className="text-[14.5px] text-[#6c6c68] mt-2 max-w-[420px] leading-relaxed">
            6 mini görev, 5 bilişsel alan, radar grafik profil. Tanı koymaz — güçlü ve desteklenebilir alanları gösterir.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-[13px] text-[#6c6c68] font-medium">
            {['⏱ ~5 dk', '📱 Mobil uyumlu', '🔒 KVKK uyumlu', '🆓 Tamamen ücretsiz'].map(f => (
              <span key={f}>{f}</span>
            ))}
          </div>
        </div>
        <Link
          href="/test"
          className="bf-lift flex-shrink-0 bg-[#00B4E5] text-white px-7 py-4 rounded-[14px] font-bold text-[15px] shadow-[0_10px_28px_rgba(0,180,229,.32)] whitespace-nowrap active:scale-[0.97] transition-transform"
        >
          Testi Başlat →
        </Link>
      </div>
    </section>
  )
}
