'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { AgeGroup } from '../../lib/normBands'
import { difficultyConfig } from '../../lib/difficultyConfig'
import type { GoNoGoMetrics } from '../../lib/scoring'

interface Props {
  ageGroup: AgeGroup
  onComplete: (m: GoNoGoMetrics) => void
}

type Phase = 'instructions' | 'isi' | 'stimulus' | 'done'

interface Trial { isTarget: boolean; stimulus: string }

function buildTrials(cfg: (typeof difficultyConfig)['A']['gonogo']): Trial[] {
  const n = cfg.trials
  const nTargets = Math.round(n * cfg.targetRatio)
  const nDist = n - nTargets
  const arr: Trial[] = [
    ...Array(nTargets).fill(null).map(() => ({ isTarget: true, stimulus: cfg.targetEmoji })),
    ...Array(nDist).fill(null).map((_, i) => ({
      isTarget: false,
      stimulus: cfg.distractorEmojis[i % cfg.distractorEmojis.length],
    })),
  ]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function GoNoGo({ ageGroup, onComplete }: Props) {
  const cfg = difficultyConfig[ageGroup].gonogo
  const [phase, setPhase] = useState<Phase>('instructions')
  const [trials] = useState<Trial[]>(() => buildTrials(cfg))
  const [trialIdx, setTrialIdx] = useState(0)
  const [tapped, setTapped] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'error' | null>(null)

  const metrics = useRef<GoNoGoMetrics>({
    hits: 0, totalTargets: 0,
    falseAlarms: 0, totalDistractors: 0,
    hitRTs: [],
  })
  const stimulusOnset = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    setTrialIdx(i => {
      const next = i + 1
      if (next >= trials.length) {
        setPhase('done')
        return i
      }
      setPhase('isi')
      return next
    })
  }, [trials.length])

  // ISI → stimulus transition
  useEffect(() => {
    if (phase !== 'isi') return
    timerRef.current = setTimeout(() => {
      setTapped(false)
      setFeedback(null)
      stimulusOnset.current = performance.now()
      setPhase('stimulus')
    }, cfg.isiMs)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phase, cfg.isiMs, trialIdx])

  // Auto-advance after stimulus duration
  useEffect(() => {
    if (phase !== 'stimulus') return
    const trial = trials[trialIdx]
    timerRef.current = setTimeout(() => {
      if (!tapped) {
        if (trial.isTarget) {
          // omission
          metrics.current.totalTargets++
        } else {
          metrics.current.totalDistractors++
        }
      }
      advance()
    }, cfg.stimulusDurationMs)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phase, trialIdx, tapped, trials, cfg.stimulusDurationMs, advance])

  // End
  useEffect(() => {
    if (phase === 'done') {
      onComplete(metrics.current)
    }
  }, [phase, onComplete])

  function handleTap() {
    if (phase !== 'stimulus' || tapped) return
    const rt = performance.now() - stimulusOnset.current
    const trial = trials[trialIdx]
    setTapped(true)
    if (timerRef.current) clearTimeout(timerRef.current)

    if (trial.isTarget) {
      metrics.current.hits++
      metrics.current.totalTargets++
      metrics.current.hitRTs.push(rt)
      setFeedback('correct')
    } else {
      metrics.current.falseAlarms++
      metrics.current.totalDistractors++
      setFeedback('error')
    }
    setTimeout(advance, 300)
  }

  if (phase === 'instructions') {
    const isEmoji = cfg.stimulusType === 'emoji'
    const isCircle = cfg.stimulusType === 'circle'
    const isLetter = cfg.stimulusType === 'letter'
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">🎯</div>
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>
          Dikkat Görevi
        </h2>
        <div className="bg-white border border-[#ece6db] rounded-[18px] p-6 max-w-sm w-full text-left">
          <p className="text-sm font-semibold text-[#23231f] mb-3">Kurallar:</p>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 bg-green-50 rounded-[12px] p-3">
              <span className={isLetter ? 'text-2xl font-black font-mono' : 'text-2xl'}>{cfg.targetEmoji}</span>
              <p className="text-sm text-[#23231f]"><b>{cfg.targetLabel}</b> gördüğünde <b>DOKUN ✓</b></p>
            </div>
            <div className="bg-red-50 rounded-[12px] p-3">
              <p className="text-sm text-[#23231f] font-semibold mb-2">Bunları görünce <b>DOKUNMA ✗</b></p>
              <div className="flex flex-wrap gap-2">
                {cfg.distractorEmojis.map((d, i) => (
                  <span key={i} className={`inline-flex items-center gap-1 bg-white border border-red-100 rounded-[8px] px-2.5 py-1.5 text-sm font-semibold ${isLetter ? 'font-mono text-lg' : ''}`}>
                    <span className={isLetter ? 'text-xl font-black' : 'text-xl'}>{d}</span>
                    {!isLetter && <span className="text-[#6c6c68]">{cfg.distractorLabels[i]}</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => { setPhase('isi') }}
          className="w-full max-w-sm bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] active:scale-95 transition-transform"
        >
          Hazırım!
        </button>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="text-6xl">✅</div>
        <p className="text-xl font-bold text-[#23231f]">Harika! Dikkat görevi tamam.</p>
      </div>
    )
  }

  const trial = trials[trialIdx]
  const isEmoji = cfg.stimulusType === 'emoji'
  const isLetter = cfg.stimulusType === 'letter'

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center select-none"
      style={{ userSelect: 'none' }}
      onPointerDown={handleTap}
    >
      {/* Progress dots */}
      <div className="flex gap-1.5 mb-8">
        {trials.map((t, i) => (
          <div key={i} className={`rounded-full transition-all ${
            i < trialIdx ? 'w-2 h-2 bg-[#51AD32]' :
            i === trialIdx ? 'w-3 h-3 bg-[#51AD32]' : 'w-2 h-2 bg-[#ece6db]'
          }`} />
        ))}
      </div>

      {/* Stimulus */}
      <div className={`flex items-center justify-center rounded-[24px] transition-all duration-100 ${
        phase === 'isi' ? 'opacity-0' : 'opacity-100'
      } ${feedback === 'correct' ? 'scale-105' : feedback === 'error' ? 'scale-95' : ''}`}
        style={{
          width: 180, height: 180,
          background: feedback === 'correct' ? '#e8f7e0' : feedback === 'error' ? '#fef2f2' : 'white',
          border: `3px solid ${feedback === 'correct' ? '#51AD32' : feedback === 'error' ? '#ef4444' : '#ece6db'}`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {phase === 'stimulus' && (
          isEmoji || !isLetter ? (
            <span style={{ fontSize: isEmoji ? 80 : 60 }}>{trial.stimulus}</span>
          ) : (
            <span style={{
              fontSize: 96, fontFamily: 'monospace', fontWeight: 900, color: '#23231f',
              lineHeight: 1,
            }}>
              {trial.stimulus}
            </span>
          )
        )}
      </div>

      <p className="mt-10 text-[#9a968c] text-sm">Ekranın herhangi bir yerine dokunabilirsiniz</p>
    </div>
  )
}
