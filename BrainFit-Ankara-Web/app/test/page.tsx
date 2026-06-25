'use client'
import { useReducer, useCallback } from 'react'
import Image from 'next/image'
import AgeSelect from './components/AgeSelect'
import LeadForm from './components/LeadForm'
import GoNoGo from './components/tasks/GoNoGo'
import VisualSearch from './components/tasks/VisualSearch'
import CorsiSpan from './components/tasks/CorsiSpan'
import AuditoryTask from './components/tasks/AuditoryTask'
import MotorTask from './components/tasks/MotorTask'
import EmotionTask from './components/tasks/EmotionTask'
import ResultScreen from './components/ResultScreen'
import type { AgeGroup } from './lib/normBands'
import { calculateScores, AllMetrics } from './lib/scoring'

type Step = 'intro' | 'age' | 'form' | 'task' | 'result'

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
  | { type: 'LEAD_SAVED'; leadId: string }
  | { type: 'TASK_DONE'; key: keyof AllMetrics; metrics: AllMetrics[keyof AllMetrics] }
  | { type: 'SHOW_RESULT'; scores: ReturnType<typeof calculateScores> }

const TASK_KEYS: (keyof AllMetrics)[] = ['gonogo', 'visualSearch', 'corsi', 'auditory', 'motor', 'emotion']

const TASK_LABELS = ['Dikkat', 'Görsel', 'Hafıza', 'İşitsel', 'Motor', 'Sosyal']

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GO_AGE':
      return { ...state, step: 'age' }
    case 'SELECT_AGE':
      return { ...state, ageGroup: action.ageGroup, step: 'form' }
    case 'LEAD_SAVED':
      return { ...state, leadId: action.leadId, step: 'task', taskIndex: 0 }
    case 'TASK_DONE': {
      const newMetrics = { ...state.allMetrics, [action.key]: action.metrics }
      const nextIndex = state.taskIndex + 1
      if (nextIndex >= TASK_KEYS.length) {
        const scores = calculateScores(newMetrics, state.ageGroup!)
        return { ...state, allMetrics: newMetrics, step: 'result', scores }
      }
      return { ...state, allMetrics: newMetrics, taskIndex: nextIndex }
    }
    case 'SHOW_RESULT':
      return { ...state, step: 'result', scores: action.scores }
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

function ProgressBar({ step, taskIndex }: { step: Step; taskIndex: number }) {
  const totalSteps = 2 + TASK_KEYS.length + 1 // form + tasks + result
  let current = 0
  if (step === 'form') current = 1
  else if (step === 'task') current = 2 + taskIndex
  else if (step === 'result') current = totalSteps

  const pct = Math.round((current / totalSteps) * 100)

  return (
    <div className="w-full bg-[#ece6db] rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full bg-[#51AD32] transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function TestPage() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleTaskDone = useCallback((key: keyof AllMetrics, metrics: AllMetrics[keyof AllMetrics]) => {
    dispatch({ type: 'TASK_DONE', key, metrics })
  }, [])

  const handleLeadSaved = useCallback(async (leadId: string, ageGroup: AgeGroup) => {
    dispatch({ type: 'LEAD_SAVED', leadId })
  }, [])

  async function patchLead(scores: ReturnType<typeof calculateScores>) {
    if (!state.leadId) return
    try {
      await fetch(`/api/test-lead?id=${state.leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores, rawMetrics: state.allMetrics }),
      })
    } catch (e) {
      console.error('[patchLead]', e)
    }
  }

  const showHeader = state.step !== 'intro'

  return (
    <div className="flex flex-col min-h-screen" style={{ touchAction: 'manipulation' }}>
      {/* Header */}
      {showHeader && (
        <header className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#ece6db] flex-shrink-0">
          <Image src="/images/logo.png" alt="BrainFit" width={100} height={24} style={{ height: 24, width: 'auto' }} />
          <div className="flex-1 px-3">
            <ProgressBar step={state.step} taskIndex={state.taskIndex} />
          </div>
          {state.step === 'task' && (
            <span className="text-xs text-[#9a968c] flex-shrink-0">
              {state.taskIndex + 1}/{TASK_KEYS.length} — {TASK_LABELS[state.taskIndex]}
            </span>
          )}
        </header>
      )}

      {/* Content */}
      <main className="flex-1 flex flex-col">
        {state.step === 'intro' && (
          <IntroScreen onStart={() => dispatch({ type: 'GO_AGE' })} />
        )}

        {state.step === 'age' && (
          <AgeSelect onSelect={(ag) => dispatch({ type: 'SELECT_AGE', ageGroup: ag })} />
        )}

        {state.step === 'form' && state.ageGroup && (
          <LeadForm ageGroup={state.ageGroup} onSaved={handleLeadSaved} />
        )}

        {state.step === 'task' && state.ageGroup && (
          <>
            {state.taskIndex === 0 && (
              <GoNoGo ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('gonogo', m)} />
            )}
            {state.taskIndex === 1 && (
              <VisualSearch ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('visualSearch', m)} />
            )}
            {state.taskIndex === 2 && (
              <CorsiSpan ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('corsi', m)} />
            )}
            {state.taskIndex === 3 && (
              <AuditoryTask ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('auditory', m)} />
            )}
            {state.taskIndex === 4 && (
              <MotorTask ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('motor', m)} />
            )}
            {state.taskIndex === 5 && (
              <EmotionTask ageGroup={state.ageGroup} onComplete={(m) => handleTaskDone('emotion', m)} />
            )}
          </>
        )}

        {state.step === 'result' && state.scores && state.ageGroup && (
          <ResultScreen
            scores={state.scores}
            ageGroup={state.ageGroup}
            onMount={() => patchLead(state.scores!)}
          />
        )}
      </main>
    </div>
  )
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center gap-8">
      <Image src="/images/logo.png" alt="BrainFit Ankara" width={160} height={38} style={{ height: 38, width: 'auto' }} />

      <div className="max-w-sm">
        <h1 className="text-3xl font-bold text-[#23231f] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
          Zihin Check-Up Mini
        </h1>
        <p className="text-[#6c6c68] text-base leading-relaxed">
          5 dakikada 6 mini görev. Bilişsel profil puanı. Ücretsiz.
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

      <button
        onClick={onStart}
        className="w-full max-w-xs bg-[#51AD32] text-white font-bold text-lg py-4 rounded-[16px] shadow-sm active:scale-95 transition-transform"
      >
        Başla →
      </button>
    </div>
  )
}
