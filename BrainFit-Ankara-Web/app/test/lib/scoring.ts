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

// ── Metric breakdown for results page ─────────────────────────────────────

export interface MetricDetail {
  label: string
  value: string
  note: string
  color: string
}

type RatingLevel = 'strong' | 'ok' | 'develop'
function rc(l: RatingLevel) {
  return l === 'strong' ? '#51AD32' : l === 'ok' ? '#F8AF00' : '#00B4E5'
}
function pct(n: number) { return `%${n}` }
function avg(arr: number[]) { return arr.reduce((a, b) => a + b, 0) / arr.length }

export function getDikkatDetails(m: GoNoGoMetrics): MetricDetail[] {
  const hitRate = m.totalTargets > 0 ? Math.round(m.hits / m.totalTargets * 100) : 0
  const faRate  = m.totalDistractors > 0 ? Math.round(m.falseAlarms / m.totalDistractors * 100) : 0
  const valid   = m.hitRTs.filter(rt => rt > 80 && rt < 3000)
  const meanRT  = valid.length > 0 ? Math.round(avg(valid)) : null
  const cv      = valid.length > 1 ? rtCV(valid) : null
  const out: MetricDetail[] = [
    { label: 'Hedef isabeti',   value: pct(hitRate), note: hitRate >= 85 ? 'Güçlü' : hitRate >= 65 ? 'Ortalama' : 'Gelişim alanı', color: rc(hitRate >= 85 ? 'strong' : hitRate >= 65 ? 'ok' : 'develop') },
    { label: 'Hatalı tepki',    value: pct(faRate),  note: faRate  <= 10 ? 'Kontrollü' : faRate  <= 25 ? 'Ortalama' : 'Yüksek',    color: rc(faRate  <= 10 ? 'strong' : faRate  <= 25 ? 'ok' : 'develop') },
  ]
  if (meanRT) out.push({ label: 'Ort. tepki hızı', value: `${meanRT}ms`, note: meanRT < 350 ? 'Hızlı' : meanRT < 550 ? 'Ortalama' : 'Yavaş', color: rc(meanRT < 350 ? 'strong' : meanRT < 550 ? 'ok' : 'develop') })
  if (cv !== null) out.push({ label: 'Tepki tutarlılığı', value: cv < 0.2 ? 'Yüksek' : cv < 0.4 ? 'Orta' : 'Değişken', note: cv < 0.2 ? 'Sabit dikkat' : cv < 0.4 ? 'Normal dalgalanma' : 'Dalgalanıyor', color: rc(cv < 0.2 ? 'strong' : cv < 0.4 ? 'ok' : 'develop') })
  return out
}

export function getGorselDetails(vs: VisualSearchMetrics, corsi: CorsiMetrics): MetricDetail[] {
  const acc     = vs.total > 0 ? Math.round(vs.correct / vs.total * 100) : 0
  const validRT = vs.rts.filter(rt => rt > 0)
  const meanRT  = validRT.length > 0 ? Math.round(avg(validRT)) : null
  const out: MetricDetail[] = [
    { label: 'Görsel arama',   value: pct(acc),              note: acc >= 85 ? 'Güçlü' : acc >= 65 ? 'Ortalama' : 'Gelişim alanı',         color: rc(acc >= 85 ? 'strong' : acc >= 65 ? 'ok' : 'develop') },
    { label: 'Hafıza aralığı', value: `${corsi.maxSpan} blok`, note: corsi.maxSpan >= 5 ? 'Güçlü' : corsi.maxSpan >= 3 ? 'Ortalama' : 'Gelişim alanı', color: rc(corsi.maxSpan >= 5 ? 'strong' : corsi.maxSpan >= 3 ? 'ok' : 'develop') },
  ]
  if (corsi.backwardSpan !== undefined) out.push({ label: 'Ters hafıza', value: `${corsi.backwardSpan} blok`, note: corsi.backwardSpan >= 4 ? 'Güçlü' : corsi.backwardSpan >= 2 ? 'Ortalama' : 'Gelişim alanı', color: rc(corsi.backwardSpan >= 4 ? 'strong' : corsi.backwardSpan >= 2 ? 'ok' : 'develop') })
  if (meanRT) out.push({ label: 'Arama hızı', value: `${meanRT}ms`, note: meanRT < 2000 ? 'Hızlı' : meanRT < 4500 ? 'Ortalama' : 'Yavaş', color: rc(meanRT < 2000 ? 'strong' : meanRT < 4500 ? 'ok' : 'develop') })
  return out
}

export function getIsitselDetails(m: AuditoryMetrics): MetricDetail[] {
  if (m.skipped) return []
  const discT = m.discriminationTotal ?? 0
  const disc  = discT > 0 ? Math.round((m.discriminationCorrect ?? 0) / discT * 100) : null
  const rhmT  = m.rhythmTotal ?? 0
  const rhm   = rhmT  > 0 ? Math.round((m.rhythmCorrect  ?? 0) / rhmT  * 100) : null
  const out: MetricDetail[] = []
  if (disc !== null) out.push({ label: 'Ses ayrımı',   value: pct(disc), note: disc >= 80 ? 'Güçlü' : disc >= 60 ? 'Ortalama' : 'Gelişim alanı', color: rc(disc >= 80 ? 'strong' : disc >= 60 ? 'ok' : 'develop') })
  if (rhm  !== null) out.push({ label: 'Ritim sayma',  value: pct(rhm),  note: rhm  >= 80 ? 'Güçlü' : rhm  >= 60 ? 'Ortalama' : 'Gelişim alanı', color: rc(rhm  >= 80 ? 'strong' : rhm  >= 60 ? 'ok' : 'develop') })
  return out
}

export function getMotorDetails(m: MotorMetrics): MetricDetail[] {
  const valid  = m.simpleRTs.filter(rt => rt > 80 && rt < 3000)
  const meanRT = valid.length > 0 ? Math.round(avg(valid)) : null
  const cv     = valid.length > 1 ? rtCV(valid) : null
  const total  = m.targetErrors.length + m.missedTargets
  const hitR   = total > 0 ? Math.round(m.targetErrors.length / total * 100) : 0
  const meanE  = m.targetErrors.length > 0 ? Math.round(avg(m.targetErrors)) : null
  const out: MetricDetail[] = []
  if (meanRT) out.push({ label: 'Ort. tepki hızı',     value: `${meanRT}ms`,  note: meanRT < 250 ? 'Çok hızlı' : meanRT < 400 ? 'Hızlı' : meanRT < 600 ? 'Ortalama' : 'Yavaş', color: rc(meanRT < 400 ? 'strong' : meanRT < 600 ? 'ok' : 'develop') })
  if (total > 0) out.push({ label: 'Hedef isabet',    value: pct(hitR),      note: hitR >= 80 ? 'Yüksek' : hitR >= 60 ? 'Ortalama' : 'Gelişim alanı', color: rc(hitR >= 80 ? 'strong' : hitR >= 60 ? 'ok' : 'develop') })
  if (meanE !== null) out.push({ label: 'İsabet hassasiyeti', value: `${meanE}px`, note: meanE < 20 ? 'Yüksek' : meanE < 45 ? 'Ortalama' : 'Gelişim alanı', color: rc(meanE < 20 ? 'strong' : meanE < 45 ? 'ok' : 'develop') })
  if (cv !== null) out.push({ label: 'Tepki tutarlılığı', value: cv < 0.2 ? 'Yüksek' : cv < 0.4 ? 'Orta' : 'Değişken', note: cv < 0.2 ? 'Çok tutarlı' : cv < 0.4 ? 'Normal aralık' : 'Değişkenlik yüksek', color: rc(cv < 0.2 ? 'strong' : cv < 0.4 ? 'ok' : 'develop') })
  return out
}

export function getSosyalDetails(m: EmotionMetrics): MetricDetail[] {
  const eRate = m.emotionTotal > 0 ? Math.round(m.emotionCorrect / m.emotionTotal * 100) : 0
  const sAvg  = m.surveyAnswers.length > 0 ? avg(m.surveyAnswers) : 3
  return [
    { label: 'Duygu tanıma',  value: pct(eRate),                                       note: eRate >= 80 ? 'Güçlü' : eRate >= 60 ? 'Ortalama' : 'Gelişim alanı', color: rc(eRate >= 80 ? 'strong' : eRate >= 60 ? 'ok' : 'develop') },
    { label: 'Sosyal uyum',   value: sAvg >= 4 ? 'Yüksek' : sAvg >= 3 ? 'Ortalama' : 'Düşük', note: sAvg >= 4 ? 'Güçlü beceri' : sAvg >= 3 ? 'Yaşa uygun' : 'Desteklenebilir',    color: rc(sAvg >= 4 ? 'strong' : sAvg >= 3 ? 'ok' : 'develop') },
  ]
}

export function getAreaDetails(area: keyof Scores, metrics: AllMetrics): MetricDetail[] {
  switch (area) {
    case 'dikkat':         return metrics.gonogo       ? getDikkatDetails(metrics.gonogo) : []
    case 'gorsel':         return metrics.visualSearch && metrics.corsi ? getGorselDetails(metrics.visualSearch, metrics.corsi) : []
    case 'isitsel':        return metrics.auditory     ? getIsitselDetails(metrics.auditory) : []
    case 'motor':          return metrics.motor        ? getMotorDetails(metrics.motor) : []
    case 'sosyalDuygusal': return metrics.emotion      ? getSosyalDetails(metrics.emotion) : []
    default:               return []
  }
}
