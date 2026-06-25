'use client'
import { useState, useRef } from 'react'
import type { AgeGroup } from '../../lib/normBands'
import { difficultyConfig } from '../../lib/difficultyConfig'
import type { AuditoryMetrics } from '../../lib/scoring'

interface Props {
  ageGroup: AgeGroup
  onComplete: (m: AuditoryMetrics) => void
}

type Phase = 'instructions' | 'sound_check' | 'disc' | 'rhythm_instructions' | 'rhythm' | 'done'

function playTone(ctx: AudioContext, freq: number, startTime: number, duration = 0.3, gain = 0.4) {
  const osc = ctx.createOscillator()
  const vol = ctx.createGain()
  osc.connect(vol)
  vol.connect(ctx.destination)
  osc.frequency.value = freq
  osc.type = 'sine'
  vol.gain.setValueAtTime(0, startTime)
  vol.gain.linearRampToValueAtTime(gain, startTime + 0.02)
  vol.gain.linearRampToValueAtTime(0, startTime + duration - 0.02)
  osc.start(startTime)
  osc.stop(startTime + duration)
}

function semitoneShift(base: number, st: number) {
  return base * Math.pow(2, st / 12)
}

const SEMITONES = [4, 3, 2, 1.5, 1, 0.5, 0.25]

export default function AuditoryTask({ ageGroup, onComplete }: Props) {
  const cfg = difficultyConfig[ageGroup].auditory
  const [phase, setPhase] = useState<Phase>('instructions')
  const [discIdx, setDiscIdx] = useState(0)
  const [rhythmIdx, setRhythmIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [currentBeats, setCurrentBeats] = useState(0)

  // Refs to avoid stale closures
  const ctxRef = useRef<AudioContext | null>(null)
  const discIsSameRef = useRef<boolean | null>(null)
  const currentBeatsRef = useRef(0)
  const discCorrectRef = useRef(0)
  const rhythmCorrectRef = useRef(0)

  // Track state copies for rendering that depend on refs
  const [discAnswerReady, setDiscAnswerReady] = useState(false)

  function getCtx() {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext()
    }
    return ctxRef.current
  }

  async function playDiscSound(idx: number) {
    try {
      const ctx = getCtx()
      if (ctx.state === 'suspended') await ctx.resume()
      const baseFreq = 440 + idx * 20
      const diff = SEMITONES[Math.min(idx, SEMITONES.length - 1)]
      const isSame = Math.random() > 0.5

      discIsSameRef.current = isSame
      setAnswered(false)
      setFeedback(null)
      setDiscAnswerReady(false)
      setPlaying(true)

      const now = ctx.currentTime + 0.05
      playTone(ctx, baseFreq, now, 0.35)
      playTone(ctx, isSame ? baseFreq : semitoneShift(baseFreq, diff), now + 0.6, 0.35)

      setTimeout(() => {
        setPlaying(false)
        setDiscAnswerReady(true)
      }, 1300)
    } catch { /* audio not available */ }
  }

  async function playRhythmSound(idx: number) {
    try {
      const ctx = getCtx()
      if (ctx.state === 'suspended') await ctx.resume()
      const count = cfg.minBeats + Math.floor(Math.random() * (cfg.maxBeats - cfg.minBeats + 1))
      currentBeatsRef.current = count
      setCurrentBeats(count)
      setAnswered(false)
      setFeedback(null)
      setPlaying(true)

      const now = ctx.currentTime + 0.1
      for (let i = 0; i < count; i++) {
        playTone(ctx, 600, now + i * 0.45, 0.25, 0.5)
      }
      setTimeout(() => setPlaying(false), count * 450 + 500)
    } catch { /* audio not available */ }
  }

  async function playSoundCheck() {
    try {
      const ctx = getCtx()
      if (ctx.state === 'suspended') await ctx.resume()
      playTone(ctx, 440, ctx.currentTime + 0.05, 0.5)
      setPlaying(true)
      setTimeout(() => setPlaying(false), 700)
    } catch { /* ignore */ }
  }

  function handleDiscAnswer(userSaidSame: boolean) {
    if (answered || playing || !discAnswerReady) return
    setAnswered(true)
    setDiscAnswerReady(false)
    const correct = userSaidSame === discIsSameRef.current
    if (correct) discCorrectRef.current++
    setFeedback(correct)
    discIsSameRef.current = null

    setTimeout(() => {
      const next = discIdx + 1
      if (next >= cfg.discriminationTrials) {
        setAnswered(false)
        setFeedback(null)
        setPhase('rhythm_instructions')
      } else {
        setDiscIdx(next)
        setFeedback(null)
        setAnswered(false)
        // Auto-play next sound
        playDiscSound(next)
      }
    }, 700)
  }

  function handleRhythmAnswer(n: number) {
    if (answered) return
    setAnswered(true)
    const correct = n === currentBeatsRef.current
    if (correct) rhythmCorrectRef.current++
    setFeedback(correct)

    setTimeout(() => {
      const next = rhythmIdx + 1
      if (next >= cfg.rhythmTrials) {
        setPhase('done')
        onComplete({
          skipped: false,
          discriminationCorrect: discCorrectRef.current,
          discriminationTotal:   cfg.discriminationTrials,
          rhythmCorrect:         rhythmCorrectRef.current,
          rhythmTotal:           cfg.rhythmTrials,
        })
      } else {
        setRhythmIdx(next)
        setFeedback(null)
        setAnswered(false)
        setCurrentBeats(0)
        currentBeatsRef.current = 0
        // Auto-play next rhythm
        setTimeout(() => playRhythmSound(next), 400)
      }
    }, 700)
  }

  // ── PHASES ────────────────────────────────────────────────

  if (phase === 'instructions') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">🎵</div>
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>İşitsel Görev</h2>
        <div className="bg-white border border-[#ece6db] rounded-[18px] p-5 max-w-sm w-full text-left">
          <p className="text-sm text-[#6c6c68] leading-relaxed">
            İki bölüm: önce <b>iki sesin aynı mı farklı mı</b> olduğunu söylersin, sonra <b>kaç vuruş duyduğunu</b> sayarsın.
            Kulaklık ya da açık ses önerilir.
          </p>
        </div>
        <button onClick={() => setPhase('sound_check')}
          className="w-full max-w-sm bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] active:scale-95 transition-transform">
          Devam
        </button>
      </div>
    )
  }

  if (phase === 'sound_check') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">🔊</div>
        <h2 className="text-xl font-bold text-[#23231f]">Ses Kontrolü</h2>
        <p className="text-sm text-[#6c6c68] max-w-xs">Ses açık mı? Aşağıdaki butona bas ve bir ton duyup duymadığını kontrol et.</p>
        <button onClick={playSoundCheck} disabled={playing}
          className="bg-[#00B4E5] text-white font-semibold px-8 py-3 rounded-[12px] disabled:opacity-60 active:scale-95 transition-transform">
          {playing ? '🔊 Çalıyor...' : '▶ Ses Çal'}
        </button>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => { setPhase('disc'); playDiscSound(0) }}
            className="w-full bg-[#51AD32] text-white font-bold py-3 rounded-[14px]">
            Evet, duydum → Devam
          </button>
          <button onClick={() => onComplete({ skipped: true })}
            className="w-full bg-white border border-[#ece6db] text-[#9a968c] font-semibold py-3 rounded-[14px] text-sm">
            Ses çıkmıyor → Bu görevi atla
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'disc') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-5 text-center">
        <p className="text-sm text-[#9a968c]">Soru {discIdx + 1} / {cfg.discriminationTrials}</p>
        <div className="text-5xl">{playing ? '🔊' : discAnswerReady ? '🎵' : '⏳'}</div>
        <p className="text-base font-semibold text-[#23231f]">
          {playing ? 'Dinle...' : discAnswerReady ? 'İki sesi duydun — aynı mı farklı mı?' : 'Hazırlanıyor...'}
        </p>
        {discAnswerReady && !answered && (
          <div className="flex gap-3 w-full max-w-xs">
            <button onClick={() => handleDiscAnswer(true)}
              className="flex-1 bg-[#51AD32] text-white font-bold py-4 rounded-[14px] text-base active:scale-95 transition-transform">
              Aynı
            </button>
            <button onClick={() => handleDiscAnswer(false)}
              className="flex-1 bg-[#E84F2D] text-white font-bold py-4 rounded-[14px] text-base active:scale-95 transition-transform">
              Farklı
            </button>
          </div>
        )}
      </div>
    )
  }

  if (phase === 'rhythm_instructions') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">🥁</div>
        <h2 className="text-xl font-bold text-[#23231f]">Ritim Sayma</h2>
        <p className="text-sm text-[#6c6c68] max-w-xs">
          Şimdi kısa bir ritim duyacaksın. <b>Kaç vuruş</b> olduğunu say ve cevabı seç.
        </p>
        <button onClick={() => { setPhase('rhythm'); playRhythmSound(0) }}
          className="w-full max-w-sm bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] active:scale-95 transition-transform">
          Hazırım!
        </button>
      </div>
    )
  }

  if (phase === 'rhythm') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-5 text-center">
        <p className="text-sm text-[#9a968c]">Soru {rhythmIdx + 1} / {cfg.rhythmTrials}</p>
        <div className="text-5xl">{playing ? '🥁' : '🎵'}</div>
        <p className="text-base font-semibold text-[#23231f]">
          {playing ? 'Dinle ve say...' : currentBeats > 0 ? 'Kaç vuruş duydun?' : 'Hazırlanıyor...'}
        </p>
        {!playing && currentBeats > 0 && !answered && (
          <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
            {Array.from({ length: cfg.maxBeats }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => handleRhythmAnswer(n)}
                className="aspect-square bg-white border-2 border-[#ece6db] rounded-[14px] text-xl font-bold text-[#23231f] active:scale-90 transition-transform hover:border-[#51AD32]">
                {n}
              </button>
            ))}
          </div>
        )}
        {playing && (
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#51AD32] animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
      <div className="text-6xl">✅</div>
      <p className="text-xl font-bold text-[#23231f]">İşitsel görev tamam!</p>
    </div>
  )
}
