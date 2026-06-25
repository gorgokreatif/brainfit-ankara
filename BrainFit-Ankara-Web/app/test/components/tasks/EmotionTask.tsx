'use client'
import { useState } from 'react'
import type { AgeGroup } from '../../lib/normBands'
import { difficultyConfig } from '../../lib/difficultyConfig'
import type { EmotionMetrics } from '../../lib/scoring'

interface Props {
  ageGroup: AgeGroup
  onComplete: (m: EmotionMetrics) => void
}

type EmotionKey = 'mutlu' | 'üzgün' | 'kızgın' | 'korkmuş' | 'şaşkın' | 'iğrenme'

const EMOTION_DATA: Record<EmotionKey, { label: string; face: React.ReactNode }> = {
  mutlu: {
    label: 'Mutlu',
    face: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#F8AF00" stroke="#e09a00" strokeWidth="2"/>
        <circle cx="35" cy="41" r="5" fill="#23231f"/>
        <circle cx="65" cy="41" r="5" fill="#23231f"/>
        <path d="M 30 62 Q 50 78 70 62" stroke="#23231f" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  üzgün: {
    label: 'Üzgün',
    face: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#00B4E5" stroke="#009bca" strokeWidth="2"/>
        <circle cx="35" cy="41" r="5" fill="#23231f"/>
        <circle cx="65" cy="41" r="5" fill="#23231f"/>
        <path d="M 30 72 Q 50 58 70 72" stroke="#23231f" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <circle cx="40" cy="58" r="3" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),
  },
  kızgın: {
    label: 'Kızgın',
    face: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#E84F2D" stroke="#cc3d1e" strokeWidth="2"/>
        <path d="M 25 32 L 44 43" stroke="#23231f" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 75 32 L 56 43" stroke="#23231f" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="35" cy="49" r="5" fill="#23231f"/>
        <circle cx="65" cy="49" r="5" fill="#23231f"/>
        <path d="M 35 72 Q 50 62 65 72" stroke="#23231f" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  korkmuş: {
    label: 'Korkmuş',
    face: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#CE007F" stroke="#a80066" strokeWidth="2"/>
        <ellipse cx="35" cy="42" rx="7" ry="8" fill="#23231f"/>
        <ellipse cx="65" cy="42" rx="7" ry="8" fill="#23231f"/>
        <ellipse cx="35" cy="40" rx="3" ry="4" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="65" cy="40" rx="3" ry="4" fill="rgba(255,255,255,0.4)"/>
        <ellipse cx="50" cy="70" rx="11" ry="8" fill="#23231f"/>
        <ellipse cx="50" cy="70" rx="7" ry="4" fill="rgba(255,255,255,0.15)"/>
      </svg>
    ),
  },
  şaşkın: {
    label: 'Şaşkın',
    face: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#51AD32" stroke="#3d8f24" strokeWidth="2"/>
        <path d="M 27 30 L 42 38" stroke="#23231f" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 73 30 L 58 38" stroke="#23231f" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="35" cy="46" rx="6" ry="7" fill="#23231f"/>
        <ellipse cx="65" cy="46" rx="6" ry="7" fill="#23231f"/>
        <ellipse cx="50" cy="70" rx="12" ry="9" fill="#23231f"/>
        <ellipse cx="50" cy="69" rx="8" ry="5" fill="rgba(255,255,255,0.1)"/>
      </svg>
    ),
  },
  iğrenme: {
    label: 'İğrenme',
    face: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#bcb4a3" stroke="#a5a090" strokeWidth="2"/>
        <path d="M 26 33 Q 35 28 42 37" stroke="#23231f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 74 33 Q 65 28 58 37" stroke="#23231f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="35" cy="48" r="4.5" fill="#23231f"/>
        <circle cx="65" cy="48" r="4.5" fill="#23231f"/>
        <path d="M 33 69 Q 42 63 50 68 Q 58 63 67 69" stroke="#23231f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
}

const SURVEY_SCORES: Record<string, number> = { 'Hiçbir zaman': 1, 'Nadiren': 2, 'Bazen': 3, 'Çoğunlukla': 4, 'Her zaman': 5 }
const SURVEY_OPTIONS = ['Hiçbir zaman', 'Nadiren', 'Bazen', 'Çoğunlukla', 'Her zaman']

export default function EmotionTask({ ageGroup, onComplete }: Props) {
  const cfg = difficultyConfig[ageGroup].emotion
  const [started, setStarted] = useState(false)
  const [phase, setPhase] = useState<'recognition' | 'survey'>('recognition')
  const [trialIdx, setTrialIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [surveyIdx, setSurveyIdx] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState<number[]>([])
  const [feedback, setFeedback] = useState<boolean | null>(null)
  const [answered, setAnswered] = useState(false)

  // Build randomized trial list
  const [trials] = useState<EmotionKey[]>(() => {
    const available = cfg.emotions as EmotionKey[]
    const shuffled = [...available].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, cfg.trials)
  })

  const [options] = useState<EmotionKey[][]>(() => {
    return trials.map(target => {
      const others = (cfg.emotions as EmotionKey[]).filter(e => e !== target)
      const shuffledOthers = others.sort(() => Math.random() - 0.5).slice(0, 3)
      const opts = [...shuffledOthers, target].sort(() => Math.random() - 0.5) as EmotionKey[]
      return opts
    })
  })

  function handleAnswer(answer: EmotionKey) {
    if (answered) return
    setAnswered(true)
    const isCorrect = answer === trials[trialIdx]
    if (isCorrect) setCorrect(c => c + 1)
    setFeedback(isCorrect)
    setTimeout(() => {
      const next = trialIdx + 1
      if (next >= trials.length) {
        setPhase('survey')
      } else {
        setTrialIdx(next)
        setAnswered(false)
        setFeedback(null)
      }
    }, 700)
  }

  function handleSurveyAnswer(label: string) {
    const score = SURVEY_SCORES[label]
    const newAnswers = [...surveyAnswers, score]
    setSurveyAnswers(newAnswers)
    if (surveyIdx + 1 >= cfg.surveyLabels.length) {
      onComplete({ emotionCorrect: correct, emotionTotal: trials.length, surveyAnswers: newAnswers })
    } else {
      setSurveyIdx(i => i + 1)
    }
  }

  if (!started) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6 text-center">
        <div className="text-5xl">😊</div>
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>Duygu Tanıma</h2>
        <div className="bg-white border border-[#ece6db] rounded-[18px] p-5 max-w-sm w-full text-left">
          <p className="text-sm text-[#6c6c68] leading-relaxed">
            Yüz ifadesini gör, <b>hangi duyguyu</b> yansıttığını seç. Ardından birkaç kısa soru.
          </p>
        </div>
        <button onClick={() => setStarted(true)}
          className="w-full max-w-sm bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] active:scale-95 transition-transform">
          Hazırım!
        </button>
      </div>
    )
  }

  if (phase === 'recognition') {
    const trial = trials[trialIdx]
    const opts = options[trialIdx] ?? []
    return (
      <div className="flex-1 flex flex-col px-5 py-5 gap-5 max-w-sm mx-auto w-full">
        <p className="text-xs text-[#9a968c] text-center font-semibold">
          Yüz {trialIdx + 1} / {trials.length} — Bu yüz ne hissediyor?
        </p>
        <div className="flex justify-center">
          <div className="w-36 h-36">
            {EMOTION_DATA[trial]?.face}
          </div>
        </div>
        {feedback !== null && (
          <div className={`text-center py-2 rounded-[10px] text-sm font-semibold ${feedback ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {feedback ? `✓ Evet, ${EMOTION_DATA[trial]?.label}!` : `✗ ${EMOTION_DATA[trial]?.label} ifadesiydi`}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          {opts.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={answered}
              className="py-4 rounded-[14px] border-2 border-[#ece6db] bg-white text-[#23231f] font-semibold text-sm active:scale-95 transition-transform disabled:opacity-60 hover:border-[#51AD32]"
            >
              {EMOTION_DATA[opt]?.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'survey') {
    if (surveyIdx >= cfg.surveyLabels.length) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
          <div className="text-6xl">✅</div>
          <p className="text-xl font-bold text-[#23231f]">Harika! Son görev tamam.</p>
        </div>
      )
    }
    const q = cfg.surveyLabels[surveyIdx]
    const prefix = cfg.surveyFor === 'parent' ? '👨‍👩‍👧 ' : '🙋 '
    return (
      <div className="flex-1 flex flex-col px-5 py-8 gap-6 max-w-sm mx-auto w-full">
        <p className="text-xs text-[#9a968c] text-center font-semibold">
          Soru {surveyIdx + 1} / {cfg.surveyLabels.length}
        </p>
        <div className="bg-white border border-[#ece6db] rounded-[18px] p-5 text-center">
          <p className="text-base font-semibold text-[#23231f] leading-snug">
            {prefix}{q}
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          {SURVEY_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => handleSurveyAnswer(opt)}
              className="w-full py-3.5 rounded-[14px] border-2 border-[#ece6db] bg-white text-[#23231f] font-semibold text-sm active:scale-[0.98] transition-transform hover:border-[#51AD32]"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return null
}
