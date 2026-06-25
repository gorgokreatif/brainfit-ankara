'use client'
import { useState, useRef, useCallback } from 'react'
import type { AgeGroup } from '../../lib/normBands'
import { difficultyConfig } from '../../lib/difficultyConfig'
import type { AuditoryMetrics } from '../../lib/scoring'

interface Props {
  ageGroup: AgeGroup
  onComplete: (m: AuditoryMetrics) => void
}

type Phase = 'instructions' | 'sound_check' | 'disc_instructions' | 'disc' | 'rhythm_instructions' | 'rhythm' | 'done'

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

function semitoneShift(baseFreq: number, semitones: number) {
  return baseFreq * Math.pow(2, semitones / 12)
}

export default function AuditoryTask({ ageGroup, onComplete }: Props) {
  const cfg = difficultyConfig[ageGroup].auditory
  const [phase, setPhase] = useState<Phase>('instructions')
  const [discIdx, setDiscIdx] = useState(0)
  const [rhythmIdx, setRhythmIdx] = useState(0)
  const [discCorrect, setDiscCorrect] = useState(0)
  const [rhythmCorrect, setRhythmCorrect] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [rhythmCount, setRhythmCount] = useState<number | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)

  const semitones = [4, 3, 2, 1.5, 1, 0.5, 0.25]

  function getCtx() {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext()
    }
    return ctxRef.current
  }

  async function playSoundCheck() {
    try {
      const ctx = getCtx()
      if (ctx.state === 'suspended') await ctx.resume()
      playTone(ctx, 440, ctx.currentTime, 0.5)
      setPlaying(true)
      setTimeout(() => setPlaying(false), 700)
    } catch { /* ignore */ }
  }

  const currentSemitone = useCallback((idx: number) => {
    return semitones[Math.min(idx, semitones.length - 1)]
  }, []) // eslint-disable-line

  async function playDiscrimination(idx: number) {
    const ctx = getCtx()
    if (ctx.state === 'suspended') await ctx.resume()
    const baseFreq = 440 + idx * 20
    const diff = currentSemitone(idx)
    const isSame = Math.random() > 0.5

    setPlaying(true)
    const now = ctx.currentTime + 0.05
    playTone(ctx, baseFreq, now, 0.35)
    playTone(ctx, isSame ? baseFreq : semitoneShift(baseFreq, diff), now + 0.6, 0.35)

    return isSame
  }

  const [discIsSame, setDiscIsSame] = useState<boolean | null>(null)

  async function startDisc() {
    const isSame = await playDiscrimination(discIdx)
    setDiscIsSame(isSame)
    setAnswered(false)
    setFeedback(null)
    setTimeout(() => setPlaying(false), 1200)
  }

  function handleDiscAnswer(userSaidSame: boolean) {
    if (answered) return
    setAnswered(true)
    const correct = userSaidSame === discIsSame
    if (correct) setDiscCorrect(c => c + 1)
    setFeedback(correct)
    setTimeout(() => {
      const next = discIdx + 1
      if (next >= cfg.discriminationTrials) {
        setPhase('rhythm_instructions')
      } else {
        setDiscIdx(next)
        setFeedback(null)
        setAnswered(false)
      }
    }, 700)
  }

  const [rhythmBeats, setRhythmBeats] = useState(0)

  async function playRhythm(idx: number) {
    const ctx = getCtx()
    if (ctx.state === 'suspended') await ctx.resume()
    const count = cfg.minBeats + Math.floor(Math.random() * (cfg.maxBeats - cfg.minBeats + 1))
    setRhythmBeats(count)
    setRhythmCount(null)
    setFeedback(null)
    setAnswered(false)
    setPlaying(true)

    const now = ctx.currentTime + 0.1
    for (let i = 0; i < count; i++) {
      playTone(ctx, 600, now + i * 0.45, 0.25, 0.5)
    }
    setTimeout(() => setPlaying(false), count * 450 + 400)
    return count
  }

  const [currentRhythmBeats, setCurrentRhythmBeats] = useState(0)

  async function startRhythm() {
    const count = await playRhythm(rhythmIdx)
    setCurrentRhythmBeats(count)
  }

  function handleRhythmAnswer(n: number) {
    if (answered) return
    setAnswered(true)
    setRhythmCount(n)
    const correct = n === currentRhythmBeats
    if (correct) setRhythmCorrect(c => c + 1)
    setFeedback(correct)
    setTimeout(() => {
      const next = rhythmIdx + 1
      if (next >= cfg.rhythmTrials) {
        setPhase('done')
        onComplete({
          skipped: false,
          discriminationCorrect: discCorrect,
          discriminationTotal: cfg.discriminationTrials,
          rhythmCorrect: rhythmCorrect + (correct ? 1 : 0),
          rhythmTotal: cfg.rhythmTrials,
        })
      } else {
        setRhythmIdx(next)
        setFeedback(null)
        setAnswered(false)
      }
    }, 700)
  }

  // PHASES

  if (phase === 'instructions') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">🎵</div>
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>İşitsel Görev</h2>
        <div className="bg-white border border-[#ece6db] rounded-[18px] p-5 max-w-sm w-full text-left">
          <p className="text-sm text-[#6c6c68] leading-relaxed">
            İki bölüm: önce <b>seslerin aynı mı farklı mı</b> olduğunu söylersin, sonra <b>kaç ses duyduğunu</b> sayarsın.
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
        <p className="text-sm text-[#6c6c68] max-w-xs">Ses açık ve kulaklık takılıysa: Ses Çal butonuna bas ve bir ton duyup duymadığını kontrol et.</p>
        <button onClick={playSoundCheck} disabled={playing}
          className="bg-[#00B4E5] text-white font-semibold px-8 py-3 rounded-[12px] disabled:opacity-60 active:scale-95 transition-transform">
          {playing ? '🔊 Çalıyor...' : '▶ Ses Çal'}
        </button>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button onClick={() => { setPhase('disc_instructions'); startDisc() }}
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

  if (phase === 'disc_instructions' || phase === 'disc') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-5 text-center">
        <p className="text-sm text-[#9a968c]">Soru {discIdx + 1} / {cfg.discriminationTrials}</p>
        <div className="text-5xl">{playing ? '🔊' : '🎵'}</div>
        <p className="text-base font-semibold text-[#23231f]">İki sesi dinle — aynı mı farklı mı?</p>
        {!discIsSame && !answered && (
          <button onClick={() => { setPhase('disc'); startDisc() }}
            disabled={playing}
            className="bg-[#F8AF00] text-white font-bold px-8 py-3 rounded-[14px] disabled:opacity-60">
            {playing ? 'Çalıyor...' : '▶ Dinle'}
          </button>
        )}
        {discIsSame !== null && !playing && !answered && (
          <div className="flex gap-3 w-full max-w-xs">
            <button onClick={() => handleDiscAnswer(true)}
              className="flex-1 bg-[#51AD32] text-white font-bold py-4 rounded-[14px] text-base">
              Aynı
            </button>
            <button onClick={() => handleDiscAnswer(false)}
              className="flex-1 bg-[#E84F2D] text-white font-bold py-4 rounded-[14px] text-base">
              Farklı
            </button>
          </div>
        )}
        {feedback !== null && (
          <div className={`text-sm font-semibold py-2 px-5 rounded-[10px] ${feedback ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {feedback ? '✓ Doğru!' : '✗ Yanlış'}
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
        <p className="text-sm text-[#6c6c68] max-w-xs">Şimdi bir ritim duyacaksın. <b>Kaç vuruş</b> olduğunu say ve cevabı seç.</p>
        <button onClick={() => { setPhase('rhythm'); startRhythm() }}
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
        <p className="text-base font-semibold text-[#23231f]">Kaç vuruş duydun?</p>
        {!answered && !playing && currentRhythmBeats > 0 && (
          <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
            {Array.from({ length: cfg.maxBeats }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => handleRhythmAnswer(n)}
                className="aspect-square bg-white border-2 border-[#ece6db] rounded-[14px] text-xl font-bold text-[#23231f] active:scale-90 transition-transform hover:border-[#51AD32]">
                {n}
              </button>
            ))}
          </div>
        )}
        {playing && <p className="text-sm text-[#51AD32] font-semibold animate-pulse">Dinle...</p>}
        {answered && feedback !== null && (
          <div className="flex flex-col items-center gap-2">
            <div className={`text-sm font-semibold py-2 px-5 rounded-[10px] ${feedback ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {feedback ? `✓ Doğru! ${currentRhythmBeats} vuruştu.` : `✗ ${currentRhythmBeats} vuruştu.`}
            </div>
            {!feedback && rhythmIdx + 1 < cfg.rhythmTrials && (
              <button onClick={() => startRhythm()} className="text-sm text-[#51AD32] font-semibold mt-1">
                ▶ Tekrar dinle
              </button>
            )}
          </div>
        )}
        {!answered && currentRhythmBeats === 0 && (
          <button onClick={startRhythm} disabled={playing}
            className="bg-[#F8AF00] text-white font-bold px-8 py-3 rounded-[14px] disabled:opacity-60">
            {playing ? 'Çalıyor...' : '▶ Dinle'}
          </button>
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
