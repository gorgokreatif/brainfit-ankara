'use client'
import { useReducer, useCallback } from 'react'
import QuickForm from './components/QuickForm'
import ContactForm from './components/ContactForm'
import AgeSelect from './components/AgeSelect'
import GoNoGo from './components/tasks/GoNoGo'
import VisualSearch from './components/tasks/VisualSearch'
import CorsiSpan from './components/tasks/CorsiSpan'
import AuditoryTask from './components/tasks/AuditoryTask'
import MotorTask from './components/tasks/MotorTask'
import EmotionTask from './components/tasks/EmotionTask'
import ResultScreen from './components/ResultScreen'
import type { AgeGroup } from './lib/normBands'
import { calculateScores, AllMetrics } from './lib/scoring'
import Link from 'next/link'

type Step = 'intro' | 'age' | 'quick_form' | 'task' | 'contact' | 'result'

interface State {
  step: Step
  ageGroup: AgeGroup | null
  leadId: string | null
  taskIndex: number
  allMetrics: AllMetrics
  scores: ReturnType<typeof calculateScores> | null
}

type Action =
  | { type: 'GO_AGE' }
  | { type: 'SELECT_AGE'; ageGroup: AgeGroup }
  | { type: 'QUICK_SAVED'; leadId: string }
  | { type: 'TASK_DONE'; key: keyof AllMetrics; metrics: AllMetrics[keyof AllMetrics] }
  | { type: 'CONTACT_SAVED' }

const TASK_KEYS: (keyof AllMetrics)[] = ['gonogo', 'visualSearch', 'corsi', 'auditory', 'motor', 'emotion']
const TASK_LABELS = ['Dikkat', 'Görsel', 'Hafıza', 'İşitsel', 'Motor', 'Sosyal']

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GO_AGE':
      return { ...state, step: 'age' }
    case 'SELECT_AGE':
      return { ...state, ageGroup: action.ageGroup, step: 'quick_form' }
    case 'QUICK_SAVED':
      return { ...state, leadId: action.leadId, step: 'task', taskIndex: 0 }
    case 'TASK_DONE': {
      const newMetrics = { ...state.allMetrics, [action.key]: action.metrics }
      const nextIndex = state.taskIndex + 1
      if (nextIndex >= TASK_KEYS.length) {
        const scores = calculateScores(newMetrics, state.ageGroup!)
        return { ...state, allMetrics: newMetrics, step: 'contact', scores }
      }
      return { ...state, allMetrics: newMetrics, taskIndex: nextIndex }
    }
    case 'CONTACT_SAVED':
      return { ...state, step: 'result' }
    default:
      return state
  }
}

const initialState: State = {
  step: 'intro',
  ageGroup: null,
  leadId: null,
  taskIndex: 0,
  allMetrics: {},
  scores: null,
}

function ProgressBar({ taskIndex }: { taskIndex: number }) {
  const pct = Math.round(((taskIndex + 1) / TASK_KEYS.length) * 100)
  return (
    <div className="w-full bg-[#ece6db] rounded-full h-1.5 overflow-hidden">
      <div className="h-full bg-[#51AD32] transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function TestPage() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleTaskDone = useCallback((key: keyof AllMetrics, metrics: AllMetrics[keyof AllMetrics]) => {
    dispatch({ type: 'TASK_DONE', key, metrics })
  }, [])

  async function patchScores(scores: ReturnType<typeof calculateScores>) {
    if (!state.leadId) return
    try {
      await fetch(`/api/test-lead?id=${state.leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores, rawMetrics: state.allMetrics }),
      })
    } catch (e) {
      console.error('[patchScores]', e)
    }
  }

  return (
    <div className="flex flex-col flex-1" style={{ touchAction: 'manipulation' }}>
      {/* Task progress bar */}
      {state.step === 'task' && (
        <div className="px-4 py-2.5 bg-white border-b border-[#ece6db] flex items-center gap-3 flex-shrink-0">
          <div className="flex-1">
            <ProgressBar taskIndex={state.taskIndex} />
          </div>
          <span className="text-xs text-[#9a968c] flex-shrink-0 font-medium">
            {state.taskIndex + 1}/{TASK_KEYS.length} · {TASK_LABELS[state.taskIndex]}
          </span>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex flex-col">
        {state.step === 'intro' && (
          <IntroScreen onStart={() => dispatch({ type: 'GO_AGE' })} />
        )}

        {state.step === 'age' && (
          <AgeSelect onSelect={(ag) => dispatch({ type: 'SELECT_AGE', ageGroup: ag })} />
        )}

        {state.step === 'quick_form' && state.ageGroup && (
          <QuickForm
            ageGroup={state.ageGroup}
            onSaved={(id) => dispatch({ type: 'QUICK_SAVED', leadId: id })}
          />
        )}

        {state.step === 'task' && state.ageGroup && (
          <>
            {state.taskIndex === 0 && <GoNoGo ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('gonogo', m)} />}
            {state.taskIndex === 1 && <VisualSearch ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('visualSearch', m)} />}
            {state.taskIndex === 2 && <CorsiSpan ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('corsi', m)} />}
            {state.taskIndex === 3 && <AuditoryTask ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('auditory', m)} />}
            {state.taskIndex === 4 && <MotorTask ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('motor', m)} />}
            {state.taskIndex === 5 && <EmotionTask ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('emotion', m)} />}
          </>
        )}

        {state.step === 'contact' && state.leadId && (
          <ContactForm
            leadId={state.leadId}
            onSaved={() => dispatch({ type: 'CONTACT_SAVED' })}
          />
        )}

        {state.step === 'result' && state.scores && state.ageGroup && (
          <ResultScreen
            scores={state.scores}
            ageGroup={state.ageGroup}
            onMount={() => patchScores(state.scores!)}
          />
        )}
      </main>
    </div>
  )
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center gap-7">
      <div className="max-w-sm">
        <div className="text-5xl mb-3">🧠</div>
        <h1 className="text-3xl font-bold text-[#23231f] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
          Zihin Check-Up Mini
        </h1>
        <p className="text-[#6c6c68] text-base leading-relaxed">
          6 mini görev, 5 bilişsel alan, radar grafik profil. Tamamen ücretsiz.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-xs text-center">
        {[
          { icon: '⏱', label: '~5 dk' },
          { icon: '📱', label: 'Mobil uyumlu' },
          { icon: '🔒', label: 'KVKK uyumlu' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-[14px] border border-[#ece6db] py-4 flex flex-col items-center gap-1">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[11px] font-semibold text-[#6c6c68]">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-xs bg-[#fffbe8] border border-[#F8AF00]/40 rounded-[14px] p-4 text-left">
        <p className="text-[12px] text-[#6c6c68] leading-relaxed">
          ⚠️ <b>Önemli:</b> Bu test bir tarama aracıdır; tanı koymaz. Profesyonel değerlendirme için Cog-Map Zihin Check-Up randevusu alınız.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onStart}
          className="w-full bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] shadow-sm active:scale-95 transition-transform"
        >
          Başla →
        </button>
        <Link href="/" className="text-sm text-[#9a968c] text-center hover:text-[#51AD32] transition-colors">
          ← Anasayfaya dön
        </Link>
      </div>
    </div>
  )
}
