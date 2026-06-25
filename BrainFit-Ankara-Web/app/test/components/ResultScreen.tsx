'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import type { Scores } from '../lib/scoring'
import { getBand, AREA_LABELS, AREA_DESC } from '../lib/scoring'
import type { AgeGroup } from '../lib/normBands'

interface Props {
  scores: Scores
  ageGroup: AgeGroup
  onMount: () => void
}

const AREA_ORDER: (keyof Scores)[] = ['dikkat', 'gorsel', 'isitsel', 'motor', 'sosyalDuygusal']

const AREA_PROGRAM: Record<keyof Scores, { link: string; text: string }> = {
  dikkat:         { link: '/programlar/brainfit-scholar', text: 'BrainFit Scholar programımıza bakın.' },
  gorsel:         { link: '/programlar/brainfit-junior', text: 'BrainFit Junior programımıza bakın.' },
  isitsel:        { link: '/cog-map', text: 'Cog-Map değerlendirmesine bakın.' },
  motor:          { link: '/programlar/brainfit-junior', text: 'BrainFit Junior programımıza bakın.' },
  sosyalDuygusal: { link: '/programlar/brainfit-scholar', text: 'BrainFit Scholar programımıza bakın.' },
}

function RadarChart({ scores }: { scores: Scores }) {
  const size = 280
  const cx = size / 2, cy = size / 2
  const r = 105
  const areas = AREA_ORDER
  const n = areas.length
  const angles = areas.map((_, i) => ((i / n) * 2 * Math.PI) - Math.PI / 2)

  function pt(val: number, idx: number) {
    const v = (val / 100) * r
    return { x: cx + v * Math.cos(angles[idx]), y: cy + v * Math.sin(angles[idx]) }
  }

  function ptLabel(idx: number) {
    const v = r + 30
    return { x: cx + v * Math.cos(angles[idx]), y: cy + v * Math.sin(angles[idx]) }
  }

  const shortLabels = ['Dikkat', 'Görsel', 'İşitsel', 'Motor', 'Sosyal']

  const scoreVals = areas.map(a => scores[a] ?? 50)
  const polygon = scoreVals.map((v, i) => {
    const p = pt(v, i)
    return `${p.x},${p.y}`
  }).join(' ')

  // Background rings at 25, 50, 75, 100
  const ringLevels = [25, 50, 75, 100]

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {/* Background rings */}
      {ringLevels.map(lvl => {
        const pts = areas.map((_, i) => {
          const p = pt(lvl, i)
          return `${p.x},${p.y}`
        }).join(' ')
        return (
          <polygon key={lvl} points={pts}
            fill="none" stroke="#ece6db" strokeWidth={lvl === 50 ? 1.5 : 1} />
        )
      })}

      {/* Axis lines */}
      {areas.map((_, i) => {
        const end = pt(100, i)
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#ece6db" strokeWidth={1} />
      })}

      {/* Score polygon */}
      <polygon points={polygon}
        fill="rgba(81,173,50,0.18)" stroke="#51AD32" strokeWidth={2.5} strokeLinejoin="round" />

      {/* Score dots */}
      {scoreVals.map((v, i) => {
        const p = pt(v, i)
        const isNull = scores[areas[i]] === null
        return (
          <circle key={i} cx={p.x} cy={p.y} r={isNull ? 0 : 5}
            fill="#51AD32" stroke="white" strokeWidth={2} />
        )
      })}

      {/* Labels */}
      {areas.map((_, i) => {
        const p = ptLabel(i)
        const score = scores[areas[i]]
        const band = score !== null && score !== undefined ? getBand(score) : null
        return (
          <g key={i}>
            <text x={p.x} y={p.y - 7} textAnchor="middle"
              fontSize={10} fontWeight={700} fill="#23231f" fontFamily="Inter,sans-serif">
              {shortLabels[i]}
            </text>
            {band && (
              <text x={p.x} y={p.y + 8} textAnchor="middle"
                fontSize={9} fill={band.color} fontFamily="Inter,sans-serif">
                {score !== null ? `${score}` : '—'}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default function ResultScreen({ scores, ageGroup, onMount }: Props) {
  useEffect(() => { onMount() }, []) // eslint-disable-line

  const bestArea = AREA_ORDER
    .filter(a => scores[a] !== null)
    .sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))[0]

  const supportArea = AREA_ORDER
    .filter(a => scores[a] !== null)
    .sort((a, b) => (scores[a] ?? 100) - (scores[b] ?? 100))[0]

  return (
    <div className="flex-1 flex flex-col px-5 py-8 gap-6 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-2">🎉</div>
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>
          Bilişsel Profiliniz
        </h2>
        <p className="text-[#9a968c] text-sm mt-1">
          {ageGroup === 'A' ? '4–6 yaş' : ageGroup === 'B' ? '7–14 yaş' : '15+ yaş'} grubu sonuçları
        </p>
      </div>

      {/* Best area highlight */}
      {bestArea && (
        <div className="bg-[#e8f7e0] border border-[#51AD32]/30 rounded-[16px] p-4 flex items-start gap-3">
          <span className="text-2xl">💪</span>
          <div>
            <p className="font-bold text-[#23231f] text-sm">En Güçlü Alanınız</p>
            <p className="text-[#51AD32] font-semibold text-sm">{AREA_LABELS[bestArea]}</p>
            <p className="text-[#6c6c68] text-xs mt-0.5">{AREA_DESC[bestArea]}</p>
          </div>
        </div>
      )}

      {/* Radar */}
      <div className="bg-white border border-[#ece6db] rounded-[20px] p-5">
        <RadarChart scores={scores} />
      </div>

      {/* Area cards */}
      <div className="flex flex-col gap-2.5">
        {AREA_ORDER.map(area => {
          const score = scores[area]
          if (score === null) {
            return (
              <div key={area} className="bg-white border border-[#ece6db] rounded-[14px] p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#F4F2EE] flex items-center justify-center text-lg flex-shrink-0">🎧</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#23231f] text-sm">{AREA_LABELS[area]}</p>
                  <p className="text-xs text-[#9a968c] mt-0.5">Merkezde ölçümlenir</p>
                </div>
                <span className="text-xs bg-[#F4F2EE] text-[#9a968c] px-2 py-1 rounded-full flex-shrink-0">—</span>
              </div>
            )
          }
          const band = getBand(score)
          return (
            <div key={area} className="bg-white border border-[#ece6db] rounded-[14px] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: band.color + '22' }}>
                {band.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#23231f] text-sm">{AREA_LABELS[area]}</p>
                <p className="text-xs mt-0.5" style={{ color: band.color }}>{band.label}</p>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-xl font-bold" style={{ color: band.color }}>{score}</span>
                <span className="text-[10px] text-[#9a968c]">/100</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Support area CTA */}
      {supportArea && scores[supportArea] !== null && scores[supportArea]! < 70 && (
        <div className="bg-[#fffbe8] border border-[#F8AF00]/40 rounded-[16px] p-4">
          <p className="text-sm font-semibold text-[#23231f] mb-1">🎯 Desteklenebilir Alan</p>
          <p className="text-xs text-[#6c6c68] leading-relaxed mb-2">
            <b>{AREA_LABELS[supportArea]}</b> alanında küçük desteklerle hızlı ilerleme mümkün.{' '}
            <Link href={AREA_PROGRAM[supportArea].link} className="text-[#51AD32] underline">
              {AREA_PROGRAM[supportArea].text}
            </Link>
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-white border border-[#ece6db] rounded-[14px] p-4">
        <p className="text-xs text-[#9a968c] leading-relaxed">
          ⚠️ <b>Önemli hatırlatma:</b> Bu mini test bir farkındalık aracıdır; herhangi bir tanı koymaz.
          Çocuğunuzun tam profilini 5 alanda detaylı ölçen <b>Cog-Map Zihin Check-Up</b> için randevu alın.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 pb-6">
        <Link
          href="/iletisim"
          className="w-full bg-[#51AD32] text-white font-bold text-base py-4 rounded-[16px] text-center block active:scale-[0.98] transition-transform"
        >
          Ücretsiz Ön Görüşme Planla →
        </Link>
        <Link
          href="/cog-map"
          className="w-full bg-white border-2 border-[#51AD32] text-[#51AD32] font-bold text-base py-4 rounded-[16px] text-center block active:scale-[0.98] transition-transform"
        >
          18 Sayfalık Cog-Map&apos;i İncele
        </Link>
      </div>
    </div>
  )
}
