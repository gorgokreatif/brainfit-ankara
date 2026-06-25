import type { AgeGroup } from './normBands'

export interface GoNoGoConfig {
  trials: number
  targetRatio: number
  stimulusDurationMs: number
  isiMs: number
  targetEmoji: string
  distractorEmojis: string[]
  targetLabel: string
  distractorLabels: string[]
  stimulusType: 'emoji' | 'circle' | 'letter'
}

export interface VisualSearchConfig {
  screens: number
  getItemCount: (screen: number) => number
  timeLimitMs: number
  type: 'color' | 'rotation' | 'character'
}

export interface CorsiConfig {
  gridSize: 3 | 4
  startSpan: number
  flashMs: number
  isiMs: number
  backwardRound: boolean
}

export interface AuditoryConfig {
  discriminationTrials: number
  rhythmTrials: number
  minBeats: number
  maxBeats: number
}

export interface MotorConfig {
  simpleRTTrials: number
  targetCount: number
  targetSizePx: number
  targetDurationMs: number
}

export interface EmotionConfig {
  emotions: string[]
  trials: number
  surveyLabels: string[]
  surveyFor: 'parent' | 'self'
}

export interface DifficultyConfig {
  gonogo: GoNoGoConfig
  visualSearch: VisualSearchConfig
  corsi: CorsiConfig
  auditory: AuditoryConfig
  motor: MotorConfig
  emotion: EmotionConfig
}

const SURVEY_LABELS_PARENT = [
  'Yeni ortamlara (okul, arkadaş grubu) uyum sağlayabilir',
  'Hayal kırıklığında kısa sürede sakinleşebilir',
  'Akranlarıyla ilişki kurmaktan keyif alır',
]

const SURVEY_LABELS_SELF = [
  'Yeni ortamlara kolayca uyum sağlarım',
  'Hayal kırıklığında kısa sürede sakinleşirim',
  'Sosyal ortamlarda kendimi rahat hissederim',
]

export const difficultyConfig: Record<AgeGroup, DifficultyConfig> = {
  A: {
    gonogo: {
      trials: 12,
      targetRatio: 0.67,
      stimulusDurationMs: 1500,
      isiMs: 700,
      targetEmoji: '🐰',
      distractorEmojis: ['🦁'],
      targetLabel: 'Tavşan',
      distractorLabels: ['Aslan'],
      stimulusType: 'emoji',
    },
    visualSearch: {
      screens: 4,
      getItemCount: () => 4,
      timeLimitMs: 0,
      type: 'color',
    },
    corsi: { gridSize: 3, startSpan: 2, flashMs: 900, isiMs: 400, backwardRound: false },
    auditory: { discriminationTrials: 4, rhythmTrials: 3, minBeats: 1, maxBeats: 3 },
    motor: { simpleRTTrials: 4, targetCount: 4, targetSizePx: 110, targetDurationMs: 2200 },
    emotion: { emotions: ['mutlu', 'üzgün', 'kızgın'], trials: 3, surveyLabels: SURVEY_LABELS_PARENT, surveyFor: 'parent' },
  },

  B: {
    gonogo: {
      trials: 20,
      targetRatio: 0.65,
      stimulusDurationMs: 1000,
      isiMs: 500,
      targetEmoji: '🟢',
      distractorEmojis: ['🔴', '🔵'],
      targetLabel: 'Yeşil',
      distractorLabels: ['Kırmızı', 'Mavi'],
      stimulusType: 'circle',
    },
    visualSearch: {
      screens: 6,
      getItemCount: (s) => [6, 7, 8, 6, 9, 8][s] ?? 8,
      timeLimitMs: 0,
      type: 'rotation',
    },
    corsi: { gridSize: 3, startSpan: 3, flashMs: 650, isiMs: 350, backwardRound: false },
    auditory: { discriminationTrials: 6, rhythmTrials: 4, minBeats: 2, maxBeats: 5 },
    motor: { simpleRTTrials: 5, targetCount: 8, targetSizePx: 80, targetDurationMs: 1500 },
    emotion: { emotions: ['mutlu', 'üzgün', 'kızgın', 'korkmuş', 'şaşkın'], trials: 5, surveyLabels: SURVEY_LABELS_PARENT, surveyFor: 'parent' },
  },

  C: {
    gonogo: {
      trials: 24,
      targetRatio: 0.42,
      stimulusDurationMs: 900,
      isiMs: 400,
      targetEmoji: 'X',
      distractorEmojis: ['O', 'P', 'M', 'H'],
      targetLabel: 'X',
      distractorLabels: ['O', 'P', 'M', 'H'],
      stimulusType: 'letter',
    },
    visualSearch: {
      screens: 8,
      getItemCount: (s) => [12, 12, 14, 14, 16, 16, 18, 18][s] ?? 16,
      timeLimitMs: 6000,
      type: 'character',
    },
    corsi: { gridSize: 4, startSpan: 4, flashMs: 500, isiMs: 300, backwardRound: true },
    auditory: { discriminationTrials: 6, rhythmTrials: 4, minBeats: 2, maxBeats: 6 },
    motor: { simpleRTTrials: 5, targetCount: 8, targetSizePx: 52, targetDurationMs: 1200 },
    emotion: { emotions: ['mutlu', 'üzgün', 'kızgın', 'korkmuş', 'şaşkın', 'iğrenme'], trials: 6, surveyLabels: SURVEY_LABELS_SELF, surveyFor: 'self' },
  },
}
