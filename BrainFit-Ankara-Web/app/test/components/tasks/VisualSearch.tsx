'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { AgeGroup } from '../../lib/normBands'
import { difficultyConfig } from '../../lib/difficultyConfig'
import type { VisualSearchMetrics } from '../../lib/scoring'

interface Props {
  ageGroup: AgeGroup
  onComplete: (m: VisualSearchMetrics) => void
}

interface Item { id: number; isTarget: boolean; color: string; rotation: number; char: string }

const COLORS_A = ['#00B4E5', '#CE007F', '#51AD32', '#F8AF00', '#E84F2D']
const CHARS_C = ['p', 'q', 'd', 'b']

function buildScreen(type: 'color' | 'rotation' | 'character', count: number, screen: number): Item[] {
  const targetIdx = Math.floor(Math.random() * count)
  return Array.from({ length: count }, (_, i) => {
    const isTarget = i === targetIdx
    if (type === 'color') {
      const majority = COLORS_A[screen % COLORS_A.length]
      const odd = COLORS_A[(screen + 1 + Math.floor(Math.random() * (COLORS_A.length - 1))) % COLORS_A.length]
      return { id: i, isTarget, color: isTarget ? odd : majority, rotation: 0, char: '' }
    }
    if (type === 'rotation') {
      const base = [0, 90, 180, 270][screen % 4]
      return { id: i, isTarget, color: '#51AD32', rotation: isTarget ? (base + 45 + Math.floor(Math.random() * 90)) : base, char: '' }
    }
    // character
    const majority = CHARS_C[screen % CHARS_C.length]
    const odd = CHARS_C[(screen + 1) % CHARS_C.length]
    return { id: i, isTarget, color: '#23231f', rotation: 0, char: isTarget ? odd : majority }
  })
}

export default function VisualSearch({ ageGroup, onComplete }: Props) {
  const cfg = difficultyConfig[ageGroup].visualSearch
  const [started, setStarted] = useState(false)
  const [screenIdx, setScreenIdx] = useState(0)
  const [items, setItems] = useState<Item[]>([])
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [done, setDone] = useState(false)
  const metrics = useRef<VisualSearchMetrics>({ correct: 0, total: 0, rts: [] })
  const screenStart = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadScreen = useCallback((idx: number) => {
    const count = cfg.getItemCount(idx)
    setItems(buildScreen(cfg.type, count, idx))
    setFeedback(null)
    screenStart.current = performance.now()
    if (cfg.timeLimitMs > 0) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        metrics.current.total++
        nextScreen(idx)
      }, cfg.timeLimitMs)
    }
  }, [cfg])

  useEffect(() => {
    if (started) loadScreen(0)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [started, loadScreen])

  function nextScreen(idx: number) {
    const next = idx + 1
    if (next >= cfg.screens) {
      setDone(true)
      onComplete(metrics.current)
      return
    }
    setScreenIdx(next)
    loadScreen(next)
  }

  function handleTap(item: Item) {
    if (feedback !== null) return
    if (timerRef.current) clearTimeout(timerRef.current)
    const rt = performance.now() - screenStart.current
    metrics.current.total++
    metrics.current.rts.push(rt)
    if (item.isTarget) {
      metrics.current.correct++
      setFeedback(true)
    } else {
      setFeedback(false)
    }
    setTimeout(() => nextScreen(screenIdx), 600)
  }

  if (!started) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">👁️</div>
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>
          Görsel Arama
        </h2>
        <div className="bg-white border border-[#ece6db] rounded-[18px] p-5 max-w-sm w-full text-center">
          <p className="text-sm text-[#6c6c68]">
            {cfg.type === 'color' && 'Diğerlerinden farklı renkli olanı bul ve dokun.'}
            {cfg.type === 'rotation' && 'Diğerlerinden farklı yönde olan şekli bul ve dokun.'}
            {cfg.type === 'character' && `Diğerlerinden farklı karakteri bul ve dokun.${cfg.timeLimitMs > 0 ? ` Her ekran ${cfg.timeLimitMs/1000} saniye.` : ''}`}
          </p>
        </div>
        <button onClick={() => setStarted(true)}
          className="w-full max-w-sm bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] active:scale-95 transition-transform">
          Hazırım!
        </button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="text-6xl">✅</div>
        <p className="text-xl font-bold text-[#23231f]">Görsel görev tamam!</p>
      </div>
    )
  }

  const cols = Math.ceil(Math.sqrt(items.length))

  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[#23231f]">Farklı olanı bul!</p>
        <p className="text-xs text-[#9a968c]">{screenIdx + 1} / {cfg.screens}</p>
      </div>

      {feedback !== null && (
        <div className={`text-center py-2 mb-3 rounded-[12px] font-semibold text-sm ${feedback ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {feedback ? '✓ Doğru!' : '✗ Bu değildi'}
        </div>
      )}

      <div
        className="flex-1 grid gap-3 content-center justify-center"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: 400, margin: '0 auto', width: '100%' }}
      >
        {items.map(item => (
          <button
            key={item.id}
            onPointerDown={() => handleTap(item)}
            className="aspect-square flex items-center justify-center rounded-[12px] bg-white border border-[#ece6db] active:scale-90 transition-transform"
            style={{ minHeight: 52, minWidth: 52 }}
          >
            {cfg.type === 'color' && (
              <div className="w-10 h-10 rounded-full" style={{ background: item.color }} />
            )}
            {cfg.type === 'rotation' && (
              <div style={{
                width: 0, height: 0,
                borderLeft: '18px solid transparent',
                borderRight: '18px solid transparent',
                borderBottom: `32px solid ${item.color}`,
                transform: `rotate(${item.rotation}deg)`,
              }} />
            )}
            {cfg.type === 'character' && (
              <span style={{ fontSize: 28, fontFamily: 'Georgia, serif', fontWeight: 700, color: item.color }}>
                {item.char}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
