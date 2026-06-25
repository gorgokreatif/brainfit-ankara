'use client'
import type { AgeGroup } from '../lib/normBands'

const groups: { id: AgeGroup; range: string; label: string; emoji: string; note: string }[] = [
  { id: 'A', range: '4–6 yaş', label: 'Okul Öncesi', emoji: '🌟', note: 'Ebeveyn eşliğinde yapılır' },
  { id: 'B', range: '7–14 yaş', label: 'Okul Çağı',  emoji: '🚀', note: 'Çocuk tek yapabilir' },
  { id: 'C', range: '15+ yaş', label: 'Genç & Yetişkin', emoji: '⚡', note: 'Daha hızlı tempolu' },
]

export default function AgeSelect({ onSelect }: { onSelect: (ag: AgeGroup) => void }) {
  return (
    <div className="flex-1 flex flex-col px-5 py-8 gap-6 max-w-lg mx-auto w-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>
          Kim için yapıyorsunuz?
        </h2>
        <p className="text-[#9a968c] text-sm mt-2">Yaş grubunu seçin — görev zorluğu buna göre ayarlanır.</p>
      </div>

      <div className="flex flex-col gap-3">
        {groups.map(g => (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            className="flex items-center gap-4 bg-white border-2 border-[#ece6db] rounded-[18px] p-5 text-left active:scale-[0.98] transition-transform hover:border-[#51AD32]"
          >
            <span className="text-4xl flex-shrink-0">{g.emoji}</span>
            <div className="flex-1">
              <p className="font-bold text-[#23231f] text-base">{g.label}</p>
              <p className="text-[#51AD32] font-semibold text-sm">{g.range}</p>
              <p className="text-[#9a968c] text-xs mt-0.5">{g.note}</p>
            </div>
            <span className="text-[#9a968c] text-xl">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
