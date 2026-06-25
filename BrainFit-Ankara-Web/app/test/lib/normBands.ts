export type AgeGroup = 'A' | 'B' | 'C'

export const normBands = {
  A: {
    simpleRT:    { slow: 1000, fast: 450 },
    corsiSpan:   { min: 2,    max: 4    },
    maxTargetPx: 80,
  },
  B: {
    simpleRT:    { slow: 600,  fast: 260 },
    corsiSpan:   { min: 3,    max: 6    },
    maxTargetPx: 60,
  },
  C: {
    simpleRT:    { slow: 450,  fast: 200 },
    corsiSpan:   { min: 4,    max: 7    },
    maxTargetPx: 40,
  },
}

export function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

export function normalizeRT(rt: number, group: AgeGroup): number {
  const { slow, fast } = normBands[group].simpleRT
  return clamp((slow - rt) / (slow - fast), 0, 1)
}

export function normalizeSpan(span: number, group: AgeGroup): number {
  const { min, max } = normBands[group].corsiSpan
  return clamp((span - min) / (max - min), 0, 1)
}

export function normalizeTargetError(avgErrorPx: number, group: AgeGroup): number {
  return clamp(avgErrorPx / normBands[group].maxTargetPx, 0, 1)
}

export function rtCV(rts: number[]): number {
  if (rts.length < 2) return 0
  const m = rts.reduce((a, b) => a + b, 0) / rts.length
  if (m === 0) return 0
  const variance = rts.reduce((s, v) => s + (v - m) ** 2, 0) / rts.length
  return Math.sqrt(variance) / m
}
