'use client'
import { useState } from 'react'
import type { AgeGroup } from '../lib/normBands'

interface Props {
  ageGroup: AgeGroup
  onSaved: (leadId: string) => void
}

export default function QuickForm({ ageGroup, onSaved }: Props) {
  const [adSoyad, setAdSoyad] = useState('')
  const [icin, setIcin] = useState<'Çocuğum' | 'Kendim'>('Çocuğum')
  const [cocukAd, setCocukAd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!adSoyad.trim()) { setError('Adınızı giriniz.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/test-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          veliAdSoyad: adSoyad.trim(),
          testKiminIcin: icin,
          cocukAd: icin === 'Çocuğum' ? cocukAd.trim() : '',
          ageGroup,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Kayıt hatası')
      onSaved(data.id)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Bağlantı hatası, tekrar deneyin.')
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="text-4xl mb-2">👋</div>
          <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>
            Hadi başlayalım!
          </h2>
          <p className="text-[#9a968c] text-sm mt-1">Sadece iki bilgi yeterli, test başlıyor.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#23231f] mb-1.5">
              Adınız Soyadınız
            </label>
            <input
              type="text"
              value={adSoyad}
              onChange={e => setAdSoyad(e.target.value)}
              placeholder="Örn: Ayşe Yılmaz"
              autoComplete="name"
              className="w-full border border-[#ece6db] rounded-[12px] px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#51AD32] focus:ring-2 focus:ring-[#51AD32]/20 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#23231f] mb-2">
              Bu test kimin için?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(['Çocuğum', 'Kendim'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setIcin(opt)}
                  className={`py-3.5 rounded-[12px] text-sm font-semibold border-2 transition-all ${
                    icin === opt
                      ? 'border-[#51AD32] bg-[#e8f7e0] text-[#51AD32]'
                      : 'border-[#ece6db] bg-white text-[#6c6c68] hover:border-[#c5c0b5]'
                  }`}
                >
                  {opt === 'Çocuğum' ? '👧 Çocuğum için' : '🙋 Kendim için'}
                </button>
              ))}
            </div>
          </div>

          {icin === 'Çocuğum' && (
            <div>
              <label className="block text-sm font-semibold text-[#23231f] mb-1.5">
                Çocuğunuzun Adı{' '}
                <span className="text-[#9a968c] font-normal">(isteğe bağlı)</span>
              </label>
              <input
                type="text"
                value={cocukAd}
                onChange={e => setCocukAd(e.target.value)}
                placeholder="Örn: Ali"
                className="w-full border border-[#ece6db] rounded-[12px] px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#51AD32] focus:ring-2 focus:ring-[#51AD32]/20 transition"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading || !adSoyad.trim()}
            className="w-full bg-[#51AD32] text-white font-bold text-base py-4 rounded-[16px] disabled:opacity-50 active:scale-[0.98] transition-transform mt-1"
          >
            {loading ? 'Kaydediliyor...' : 'Teste Geç →'}
          </button>
        </form>
      </div>
    </div>
  )
}
