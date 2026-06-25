'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { AgeGroup } from '../../lib/normBands'
import { difficultyConfig } from '../../lib/difficultyConfig'
import type { MotorMetrics } from '../../lib/scoring'

interface Props {
  ageGroup: AgeGroup
  onComplete: (m: MotorMetrics) => void
}

type Phase = 'instructions' | 'rt_wait' | 'rt_go' | 'rt_early' | 'rt_done' | 'target_instructions' | 'target' | 'done'

interface TargetPos { x: number; y: number }

export default function MotorTask({ ageGroup, onComplete }: Props) {
  const cfg = difficultyConfig[ageGroup].motor
  const [phase, setPhase] = useState<Phase>('instructions')
  const [rtIdx, setRtIdx] = useState(0)
  const [targetIdx, setTargetIdx] = useState(0)
  const [simpleRTs, setSimpleRTs] = useState<number[]>([])
  const [targetErrors, setTargetErrors] = useState<number[]>([])
  const [missedTargets, setMissedTargets] = useState(0)
  const [targetPos, setTargetPos] = useState<TargetPos>({ x: 50, y: 50 })
  const [targetVisible, setTargetVisible] = useState(false)
  const areaRef = useRef<HTMLDivElement>(null)
  const onsetRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function randomDelay() { return 600 + Math.random() * 1000 }

  function startRT() {
    setPhase('rt_wait')
    timerRef.current = setTimeout(() => {
      onsetRef.current = performance.now()
      setPhase('rt_go')
      timerRef.current = setTimeout(() => {
        // Too slow / missed
        nextRT()
      }, 3000)
    }, randomDelay())
  }

  function nextRT() {
    const next = rtIdx + 1
    if (next >= cfg.simpleRTTrials) {
      setRtIdx(next)
      setPhase('target_instructions')
    } else {
      setRtIdx(next)
      setTimeout(startRT, 500)
    }
  }

  function handleRTTap() {
    if (phase === 'rt_wait') {
      if (timerRef.current) clearTimeout(timerRef.current)
      setPhase('rt_early')
      timerRef.current = setTimeout(() => startRT(), 1200)
      return
    }
    if (phase === 'rt_go') {
      const rt = performance.now() - onsetRef.current
      if (timerRef.current) clearTimeout(timerRef.current)
      setSimpleRTs(prev => [...prev, rt])
      nextRT()
    }
  }

  function randomTarget(): TargetPos {
    const pad = cfg.targetSizePx + 20
    const area = areaRef.current
    const w = area?.clientWidth ?? 360
    const h = area?.clientHeight ?? 500
    return {
      x: pad + Math.random() * (w - 2 * pad),
      y: pad + Math.random() * (h - 2 * pad),
    }
  }

  const showTarget = useCallback(() => {
    const pos = randomTarget()
    setTargetPos(pos)
    setTargetVisible(true)
    onsetRef.current = performance.now()
    timerRef.current = setTimeout(() => {
      // Missed target
      setTargetVisible(false)
      setMissedTargets(m => m + 1)
      const next = targetIdx + 1
      if (next >= cfg.targetCount) {
        setPhase('done')
      } else {
        setTargetIdx(next)
        setTimeout(showTarget, 400)
      }
    }, cfg.targetDurationMs)
  }, [targetIdx, cfg.targetCount, cfg.targetDurationMs]) // eslint-disable-line

  function handleTargetTap(e: React.PointerEvent<HTMLDivElement>) {
    if (!targetVisible || phase !== 'target') return
    if (timerRef.current) clearTimeout(timerRef.current)
    const rect = areaRef.current?.getBoundingClientRect()
    if (!rect) return
    const tapX = e.clientX - rect.left
    const tapY = e.clientY - rect.top
    const err = Math.hypot(tapX - targetPos.x, tapY - targetPos.y)
    setTargetErrors(prev => [...prev, err])
    setTargetVisible(false)
    const next = targetIdx + 1
    if (next >= cfg.targetCount) {
      setPhase('done')
    } else {
      setTargetIdx(next)
      setTimeout(showTarget, 300)
    }
  }

  useEffect(() => {
    if (phase === 'done') {
      onComplete({ simpleRTs, targetErrors, missedTargets })
    }
  }, [phase, simpleRTs, targetErrors, missedTargets, onComplete])

  useEffect(() => {
    if (phase === 'target') {
      setTimeout(showTarget, 500)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phase]) // eslint-disable-line

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  if (phase === 'instructions') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">⚡</div>
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>Motor Görev</h2>
        <div className="bg-white border border-[#ece6db] rounded-[18px] p-5 max-w-sm w-full text-left">
          <p className="text-sm text-[#6c6c68] leading-relaxed">
            <b>Bölüm 1:</b> Ekran yeşile döndüğünde <b>olabildiğince hızlı dokun</b>.<br /><br />
            <b>Bölüm 2:</b> Ekranda beliren <b>noktaya dokun</b>, kaybolmadan önce!
          </p>
        </div>
        <button onClick={() => startRT()}
          className="w-full max-w-sm bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] active:scale-95 transition-transform">
          Hazırım!
        </button>
      </div>
    )
  }

  if (phase === 'target_instructions') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">🎯</div>
        <h2 className="text-xl font-bold text-[#23231f]">Şimdi hedefleri vur!</h2>
        <p className="text-sm text-[#6c6c68] max-w-xs">Ekranda beliren noktaya mümkün olduğunca hızlı ve isabetli dokun. Kaybolmadan önce yakala!</p>
        <button onClick={() => setPhase('target')}
          className="w-full max-w-sm bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] active:scale-95 transition-transform">
          Hazırım!
        </button>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="text-6xl">✅</div>
        <p className="text-xl font-bold text-[#23231f]">Motor görev tamam!</p>
      </div>
    )
  }

  // Simple RT screen
  if (phase === 'rt_wait' || phase === 'rt_go' || phase === 'rt_early') {
    const isGo = phase === 'rt_go'
    const isEarly = phase === 'rt_early'
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center select-none transition-colors duration-150"
        style={{ background: isGo ? '#51AD32' : isEarly ? '#F8AF00' : '#F8F6F2' }}
        onPointerDown={handleRTTap}
      >
        <div className="flex flex-col items-center gap-5">
          {/* Animated circle */}
          <div
            className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-150 ${
              phase === 'rt_wait' ? 'animate-pulse' : ''
            }`}
            style={{
              background: isGo ? 'rgba(255,255,255,0.25)' : isEarly ? 'rgba(255,255,255,0.25)' : 'white',
              border: `3px solid ${isGo ? 'rgba(255,255,255,0.5)' : isEarly ? 'rgba(255,255,255,0.5)' : '#d4cfc7'}`,
              boxShadow: isGo ? '0 0 40px rgba(255,255,255,0.3)' : 'none',
            }}
          >
            <span className="text-5xl">
              {isGo ? '👆' : isEarly ? '⚠️' : '⏳'}
            </span>
          </div>

          <p className="font-bold text-xl" style={{ color: isGo ? 'white' : '#23231f' }}>
            {isGo ? 'DOKUN!' : isEarly ? 'Çok erken!' : 'Hazır ol...'}
          </p>

          {/* Pulsing dots during wait */}
          {phase === 'rt_wait' && (
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#c5c0b5] animate-bounce"
                  style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          )}
          {!phase.startsWith('rt_wait') && (
            <p className="text-sm" style={{ color: isGo ? 'rgba(255,255,255,0.8)' : '#9a968c' }}>
              {isEarly ? 'Bekle, sonra tekrar...' : ''}
            </p>
          )}

          <p className="text-xs" style={{ color: isGo ? 'rgba(255,255,255,0.7)' : '#9a968c' }}>
            Deneme {rtIdx + 1} / {cfg.simpleRTTrials}
            {phase === 'rt_wait' && <span className="ml-2">· Ekran yeşile dönecek</span>}
          </p>
        </div>
      </div>
    )
  }

  // Target hitting screen
  return (
    <div
      ref={areaRef}
      className="flex-1 relative bg-[#F8F6F2] select-none overflow-hidden"
      onPointerDown={handleTargetTap}
    >
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <p className="text-xs text-[#9a968c] font-semibold bg-white/80 px-3 py-1 rounded-full">
          Hedef {targetIdx + 1} / {cfg.targetCount}
        </p>
      </div>
      {targetVisible && (
        <div
          className="absolute rounded-full flex items-center justify-center transition-all"
          style={{
            width: cfg.targetSizePx,
            height: cfg.targetSizePx,
            left: targetPos.x - cfg.targetSizePx / 2,
            top: targetPos.y - cfg.targetSizePx / 2,
            background: '#E84F2D',
            border: '3px solid #cc3d1e',
            boxShadow: '0 4px 20px rgba(232,79,45,0.4)',
          }}
        >
          <span className="text-white font-black text-2xl">✕</span>
        </div>
      )}
    </div>
  )
}
