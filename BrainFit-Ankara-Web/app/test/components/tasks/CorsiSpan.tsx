'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { AgeGroup } from '../../lib/normBands'
import { difficultyConfig } from '../../lib/difficultyConfig'
import type { CorsiMetrics } from '../../lib/scoring'

interface Props {
  ageGroup: AgeGroup
  onComplete: (m: CorsiMetrics) => void
}

type Phase = 'instructions' | 'showing' | 'tapping' | 'feedback' | 'backward_intro' | 'done'

export default function CorsiSpan({ ageGroup, onComplete }: Props) {
  const cfg = difficultyConfig[ageGroup].corsi
  const gridN = cfg.gridSize
  const totalCells = gridN * gridN

  const [started, setStarted] = useState(false)
  const [phase, setPhase] = useState<Phase>('instructions')
  const [span, setSpan] = useState(cfg.startSpan)
  const [sequence, setSequence] = useState<number[]>([])
  const [highlighted, setHighlighted] = useState<number | null>(null)
  const [userInput, setUserInput] = useState<number[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [errors, setErrors] = useState(0)
  const [isBackward, setIsBackward] = useState(false)
  const [maxSpan, setMaxSpan] = useState(0)
  const [backwardSpan, setBackwardSpan] = useState<number | undefined>()

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function newSequence(length: number): number[] {
    const seq: number[] = []
    while (seq.length < length) {
      const cell = Math.floor(Math.random() * totalCells)
      if (!seq.includes(cell)) seq.push(cell)
    }
    return seq
  }

  const showSequence = useCallback((seq: number[]) => {
    setPhase('showing')
    setHighlighted(null)
    let step = 0

    function flash() {
      if (step < seq.length) {
        setHighlighted(seq[step])
        timerRef.current = setTimeout(() => {
          setHighlighted(null)
          step++
          timerRef.current = setTimeout(flash, cfg.isiMs)
        }, cfg.flashMs)
      } else {
        setHighlighted(null)
        setPhase('tapping')
      }
    }

    timerRef.current = setTimeout(flash, 400)
  }, [cfg.flashMs, cfg.isiMs])

  function startLevel(sp: number) {
    const seq = newSequence(sp)
    setSequence(seq)
    setUserInput([])
    setFeedback(null)
    showSequence(seq)
  }

  useEffect(() => {
    if (started) startLevel(span)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [started]) // eslint-disable-line

  function handleCellTap(idx: number) {
    if (phase !== 'tapping') return

    const newInput = [...userInput, idx]
    setUserInput(newInput)

    // Check early mismatch
    const expected = isBackward ? [...sequence].reverse() : sequence
    if (newInput[newInput.length - 1] !== expected[newInput.length - 1]) {
      // Wrong
      setFeedback('wrong')
      setPhase('feedback')
      const newErrors = errors + 1
      setErrors(newErrors)

      if (newErrors >= 2) {
        // End this direction
        if (!isBackward && cfg.backwardRound) {
          setIsBackward(true)
          setErrors(0)
          const bSpan = cfg.startSpan
          setSpan(bSpan)
          setMaxSpan(span - 1)
          timerRef.current = setTimeout(() => { setPhase('backward_intro') }, 800)
        } else {
          if (isBackward) setBackwardSpan(span - 1)
          else setMaxSpan(span - 1)
          timerRef.current = setTimeout(() => { setPhase('done') }, 800)
        }
        return
      }

      timerRef.current = setTimeout(() => {
        setUserInput([])
        setFeedback(null)
        startLevel(span)
      }, 800)
      return
    }

    if (newInput.length === sequence.length) {
      // Correct
      setFeedback('correct')
      setPhase('feedback')
      setErrors(0)
      const achieved = isBackward ? span : span
      if (!isBackward) setMaxSpan(Math.max(maxSpan, span))
      else setBackwardSpan(Math.max(backwardSpan ?? 0, span))

      const nextSpan = span + 1
      if (nextSpan > totalCells) {
        if (!isBackward && cfg.backwardRound) {
          setIsBackward(true)
          setSpan(cfg.startSpan)
          timerRef.current = setTimeout(() => setPhase('backward_intro'), 800)
        } else {
          timerRef.current = setTimeout(() => setPhase('done'), 800)
        }
        return
      }
      setSpan(nextSpan)
      timerRef.current = setTimeout(() => {
        setUserInput([])
        setFeedback(null)
        startLevel(nextSpan)
      }, 800)
    }
  }

  useEffect(() => {
    if (phase === 'done') {
      onComplete({ maxSpan, backwardSpan })
    }
  }, [phase, maxSpan, backwardSpan, onComplete])

  if (!started) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">🧩</div>
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>
          Hafıza Görevi
        </h2>
        <div className="bg-white border border-[#ece6db] rounded-[18px] p-5 max-w-sm w-full text-left">
          <p className="text-sm text-[#6c6c68] leading-relaxed">
            Kareler sırayla yanacak. Söndükten sonra <b>aynı sırayla</b> kutulara dokun.
            Doğru gidersen uzayan zincir!
          </p>
        </div>
        <button onClick={() => setStarted(true)}
          className="w-full max-w-sm bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] active:scale-95 transition-transform">
          Hazırım!
        </button>
      </div>
    )
  }

  if (phase === 'backward_intro') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">🔄</div>
        <h2 className="text-xl font-bold text-[#23231f]">Şimdi ters sıra!</h2>
        <p className="text-[#6c6c68] text-sm max-w-sm">
          Bu sefer kareler yandıktan sonra <b>ters sırayla</b> dokun. Son gördüğünden başla!
        </p>
        <button onClick={() => { setUserInput([]); setFeedback(null); startLevel(span) }}
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
        <p className="text-xl font-bold text-[#23231f]">Hafıza görevi tamam!</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#23231f]">
        <span>{isBackward ? '🔄 Ters sıra' : '▶ Sırayı izle'}</span>
        <span className="text-[#9a968c]">Uzunluk: {span}</span>
      </div>

      {feedback && (
        <div className={`text-center py-2 px-6 rounded-[12px] font-semibold text-sm ${feedback === 'correct' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {feedback === 'correct' ? '✓ Doğru!' : '✗ Yanlış — tekrar deneyelim'}
        </div>
      )}

      {phase === 'showing' && (
        <p className="text-sm text-[#9a968c]">Sırayı izle...</p>
      )}
      {phase === 'tapping' && (
        <p className="text-sm font-semibold text-[#51AD32]">
          {isBackward ? 'Ters sırayla dokun!' : 'Aynı sırayla dokun!'}
          {' '}({userInput.length}/{sequence.length})
        </p>
      )}

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${gridN}, minmax(0,1fr))`, maxWidth: 320, width: '100%' }}
      >
        {Array.from({ length: totalCells }, (_, i) => {
          const isLit = highlighted === i
          const isTapped = userInput.includes(i)
          return (
            <button
              key={i}
              onPointerDown={() => handleCellTap(i)}
              disabled={phase !== 'tapping'}
              className="aspect-square rounded-[14px] border-2 transition-all duration-150 active:scale-90"
              style={{
                background: isLit ? '#51AD32' : isTapped ? '#00B4E5' : 'white',
                borderColor: isLit ? '#3d8f24' : isTapped ? '#007daa' : '#ece6db',
                boxShadow: isLit ? '0 0 16px rgba(81,173,50,0.5)' : 'none',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
