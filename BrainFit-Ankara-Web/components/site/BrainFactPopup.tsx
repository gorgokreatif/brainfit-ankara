'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const FACTS = [
  { emoji: '⚡', fact: 'Beyin 0–7 yaş arasında en hızlı gelişim dönemindedir. Bu pencerede kurulan sinaptik bağlar ömür boyu sürer.', source: 'Shonkoff & Phillips, 2000' },
  { emoji: '😴', fact: '7–12 yaş arası çocuklar 9–11 saat uyuduğunda bellek pekiştirme %30 artar — öğrenilen bilgiler daha kalıcı hale gelir.', source: 'Walker, 2017' },
  { emoji: '🏃', fact: 'Günde yalnızca 20 dakika fiziksel aktivite, dikkat süresini %34 oranında artırıyor.', source: 'Hillman et al., 2008' },
  { emoji: '🎵', fact: 'Müzik eğitimi alan çocuklarda uzamsal hafıza (Corsi Blok) skoru, almayanlara göre ortalama 1.5 blok daha yüksek.', source: 'Schellenberg, 2004' },
  { emoji: '👁️', fact: 'Çocukların %20\'si fark edilmeden görsel işleme güçlüğü yaşıyor. Bu oran, akademik geride kalmayla doğrudan ilişkili.', source: 'Stein & Walsh, 1997' },
  { emoji: '🔢', fact: 'Çalışma belleği kapasitesi, IQ testlerinden bağımsız olarak akademik başarının en güçlü yordayıcısıdır.', source: 'Alloway & Alloway, 2010' },
  { emoji: '😊', fact: 'Duygu tanıma becerisi yüksek çocuklar, sosyal çatışma çözme testlerinde %60 daha başarılı sonuç alıyor.', source: 'Izard et al., 2001' },
  { emoji: '🧩', fact: 'Puzzle ve blok yapı oyunları, 4–7 yaş arasında uzamsal zekayı kritik ölçüde destekler.', source: 'Levine et al., 2012' },
  { emoji: '🧠', fact: 'DEHB\'li çocukların %70\'i erken müdahale ile akademik ve sosyal becerilerde anlamlı ilerleme kaydeder.', source: 'Sonuga-Barke et al., 2013' },
  { emoji: '📖', fact: 'Disleksi bir zeka sorunu değil; beyin hemisferleri arası iletişim farkıdır. Erken müdahaleyle %80\'i telafi edilebilir.', source: 'Shaywitz, 2003' },
  { emoji: '💡', fact: 'Tepki süresi 250ms olan çocuklar, 600ms olanlara kıyasla okuma hızında %40 daha iyi performans gösteriyor.', source: 'Kail, 2007' },
  { emoji: '🎯', fact: 'Go/No-Go görevinde inhibitör kontrol skoru, 6 yaşta ölçülünce 10 yıl sonraki akademik başarıyı tahmin edebiliyor.', source: 'Duckworth & Seligman, 2005' },
  { emoji: '🌱', fact: 'Nöroplastisite yalnızca çocuklara özgü değil; yetişkin beyin de doğru egzersizlerle yeni bağlantılar kurmaya devam eder.', source: 'Draganski et al., 2006' },
  { emoji: '🎮', fact: 'Günde 1 saatle sınırlı strateji oyunları, yürütücü işlev becerilerini olumlu yönde etkiliyor.', source: 'Green & Bavelier, 2003' },
  { emoji: '🤝', fact: 'Sosyal-duygusal öğrenme programları akademik başarıyı %11 artırıyor ve kaygıyı %9 azaltıyor.', source: 'Durlak et al., 2011' },
]

const INTERVAL_MS = 3 * 60 * 1000
const STORAGE_KEY = 'bf_popup_last'

export default function BrainFactPopup() {
  const [visible, setVisible] = useState(false)
  const [factIdx, setFactIdx] = useState(0)

  useEffect(() => {
    function tryShow() {
      const last = Number(localStorage.getItem(STORAGE_KEY) || '0')
      if (Date.now() - last < INTERVAL_MS) return
      setFactIdx(Math.floor(Math.random() * FACTS.length))
      setVisible(true)
    }

    const t = setTimeout(tryShow, 22000)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  }

  const f = FACTS[factIdx]

  return (
    <div
      className={`fixed bottom-5 left-4 z-50 max-w-[320px] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
    >
      <div className="bg-white border border-[#ece6db] rounded-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Üst bar */}
        <div className="bg-[#23231f] px-4 py-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#F8AF00] tracking-wide uppercase">🧠 Biliyor muydun?</span>
          <button onClick={dismiss} className="text-white/50 hover:text-white text-lg leading-none transition-colors">✕</button>
        </div>

        {/* İçerik */}
        <div className="px-4 py-4">
          <div className="flex gap-3 items-start">
            <span className="text-3xl flex-shrink-0">{f.emoji}</span>
            <p className="text-[13px] text-[#23231f] leading-relaxed font-medium">{f.fact}</p>
          </div>
          <p className="text-[10px] text-[#9a968c] italic mt-2 ml-10">— {f.source}</p>
        </div>

        {/* Alt CTA */}
        <div className="border-t border-[#ece6db] px-4 py-3 flex items-center justify-between bg-[#fafaf8]">
          <Link href="/test" onClick={dismiss}
            className="text-[12px] font-bold text-[#51AD32] hover:underline">
            Ücretsiz testi dene →
          </Link>
          <button onClick={dismiss} className="text-[11px] text-[#9a968c] hover:text-[#6c6c68]">
            Kapat
          </button>
        </div>
      </div>
    </div>
  )
}
