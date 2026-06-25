import { AgeGroup, normalizeRT, normalizeSpan, normalizeTargetError, rtCV, clamp } from './normBands'

export interface GoNoGoMetrics {
  hits: number
  totalTargets: number
  falseAlarms: number
  totalDistractors: number
  hitRTs: number[]
}

export interface VisualSearchMetrics {
  correct: number
  total: number
  rts: number[]
}

export interface CorsiMetrics {
  maxSpan: number
  backwardSpan?: number
}

export interface AuditoryMetrics {
  skipped: boolean
  discriminationCorrect?: number
  discriminationTotal?: number
  rhythmCorrect?: number
  rhythmTotal?: number
}

export interface MotorMetrics {
  simpleRTs: number[]
  targetErrors: number[]
  missedTargets: number
}

export interface EmotionMetrics {
  emotionCorrect: number
  emotionTotal: number
  surveyAnswers: number[]
}

export interface AllMetrics {
  gonogo?: GoNoGoMetrics
  visualSearch?: VisualSearchMetrics
  corsi?: CorsiMetrics
  auditory?: AuditoryMetrics
  motor?: MotorMetrics
  emotion?: EmotionMetrics
}

export interface Scores {
  dikkat: number
  gorsel: number
  isitsel: number | null
  motor: number
  sosyalDuygusal: number
}

export interface BandInfo {
  emoji: string
  label: string
  color: string
  desc: string
}

const BANDS: BandInfo[] = [
  { emoji: '💪', label: 'Güçlü Alan',      color: '#51AD32', desc: 'Bu alan yaşına göre güçlü görünüyor.' },
  { emoji: '🌱', label: 'Gelişmekte',       color: '#F8AF00', desc: 'Yaşına uygun, destekle daha da gelişir.' },
  { emoji: '🎯', label: 'Desteklenebilir',  color: '#00B4E5', desc: 'Bu alanda küçük desteklerle hızlı ilerleme mümkün.' },
]

export function getBand(score: number): BandInfo {
  if (score >= 70) return BANDS[0]
  if (score >= 40) return BANDS[1]
  return BANDS[2]
}

function scoreDikkat(m: GoNoGoMetrics, group: AgeGroup): number {
  if (!m || m.totalTargets === 0) return 50
  const accuracy = m.hits / m.totalTargets
  const commissionRate = m.totalDistractors > 0 ? m.falseAlarms / m.totalDistractors : 0
  const cvVal = m.hitRTs.length > 1 ? clamp(rtCV(m.hitRTs) / 0.5, 0, 1) : 0.3
  return Math.round(100 * (0.4 * accuracy + 0.3 * (1 - commissionRate) + 0.3 * (1 - cvVal)))
}

function scoreGorsel(vs: VisualSearchMetrics, corsi: CorsiMetrics, group: AgeGroup): number {
  const vsAccuracy = vs.total > 0 ? vs.correct / vs.total : 0.5
  const spanNorm = normalizeSpan(corsi.maxSpan, group)
  return Math.round(100 * (0.5 * vsAccuracy + 0.5 * spanNorm))
}

function scoreIsitsel(m: AuditoryMetrics): number | null {
  if (m.skipped) return null
  const disc = (m.discriminationTotal ?? 0) > 0
    ? (m.discriminationCorrect ?? 0) / m.discriminationTotal!
    : 0.5
  const rhythm = (m.rhythmTotal ?? 0) > 0
    ? (m.rhythmCorrect ?? 0) / m.rhythmTotal!
    : 0.5
  return Math.round(100 * (0.6 * disc + 0.4 * rhythm))
}

function scoreMotor(m: MotorMetrics, group: AgeGroup): number {
  if (!m) return 50
  const validRTs = m.simpleRTs.filter(rt => rt > 80 && rt < 3000)
  const rtNorm = validRTs.length > 0
    ? validRTs.reduce((s, rt) => s + normalizeRT(rt, group), 0) / validRTs.length
    : 0.5
  const cvVal = validRTs.length > 1 ? clamp(rtCV(validRTs) / 0.5, 0, 1) : 0.3
  const totalTargets = m.targetErrors.length + m.missedTargets
  const hitAccuracy = totalTargets > 0 ? m.targetErrors.length / totalTargets : 0.5
  const avgError = m.targetErrors.length > 0
    ? m.targetErrors.reduce((a, b) => a + b, 0) / m.targetErrors.length
    : 999
  const errNorm = normalizeTargetError(avgError, group)
  return Math.round(100 * (0.4 * rtNorm + 0.3 * hitAccuracy + 0.2 * (1 - errNorm) + 0.1 * (1 - cvVal)))
}

function scoreSosyal(m: EmotionMetrics): number {
  if (!m) return 50
  const emotionAcc = m.emotionTotal > 0 ? m.emotionCorrect / m.emotionTotal : 0.5
  const surveyAvg = m.surveyAnswers.length > 0
    ? m.surveyAnswers.reduce((a, b) => a + b, 0) / m.surveyAnswers.length
    : 3
  return Math.round(100 * (0.5 * emotionAcc + 0.5 * (surveyAvg / 5)))
}

export function calculateScores(metrics: AllMetrics, group: AgeGroup): Scores {
  return {
    dikkat:          metrics.gonogo && metrics.gonogo.totalTargets > 0
                       ? scoreDikkat(metrics.gonogo, group) : 55,
    gorsel:          metrics.visualSearch && metrics.corsi
                       ? scoreGorsel(metrics.visualSearch, metrics.corsi, group) : 55,
    isitsel:         metrics.auditory ? scoreIsitsel(metrics.auditory) : null,
    motor:           metrics.motor ? scoreMotor(metrics.motor, group) : 55,
    sosyalDuygusal:  metrics.emotion ? scoreSosyal(metrics.emotion) : 55,
  }
}

export const AREA_LABELS: Record<keyof Scores, string> = {
  dikkat:         'Dikkat & Odaklanma',
  gorsel:         'Görsel Beceriler',
  isitsel:        'İşitsel Beceriler',
  motor:          'Motor Gelişim',
  sosyalDuygusal: 'Sosyal-Duygusal',
}

export const AREA_DESC: Record<keyof Scores, string> = {
  dikkat:         'Odaklanma süresi, dürtü kontrolü ve dikkat tutarlılığı.',
  gorsel:         'Görsel ayrım, uzamsal hafıza ve işleme hızı.',
  isitsel:        'Ses ayrımı, ritim algısı ve işitsel işleme.',
  motor:          'Tepki hızı, el-göz koordinasyonu ve motor tutarlılık.',
  sosyalDuygusal: 'Duygu tanıma, empati ve sosyal uyum.',
}
