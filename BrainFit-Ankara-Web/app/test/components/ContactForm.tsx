'use client'
import { useState } from 'react'

interface Props {
  leadId: string
  onSaved: () => void
}

export default function ContactForm({ leadId, onSaved }: Props) {
  const [telefon, setTelefon] = useState('+90')
  const [email, setEmail] = useState('')
  const [kvkk, setKvkk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value.replace(/[^0-9+]/g, '')
    if (!v.startsWith('+90')) v = '+90' + v.replace(/^\+?90?/, '')
    if (v.length > 13) v = v.slice(0, 13)
    setTelefon(v)
  }

  const phoneOk = telefon.length === 13
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!kvkk) { setError('KVKK onayı gereklidir.'); return }
    if (!phoneOk) { setError('Geçerli bir telefon giriniz (+90XXXXXXXXXX).'); return }
    if (!emailOk) { setError('Geçerli bir e-posta giriniz.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/test-lead?id=${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: true, telefon, email, kvkkOnay: true }),
      })
      if (!res.ok) throw new Error('Güncelleme başarısız.')
      onSaved()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu, tekrar deneyin.')
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>
            Raporunuz hazır!
          </h2>
          <p className="text-[#6c6c68] text-sm mt-2 leading-relaxed">
            Bilişsel profilinizi görmek ve{' '}
            <b>raporu e-postanıza almak</b> için iletişim bilgilerinizi girin.
          </p>
        </div>

        <div className="bg-[#e8f7e0] border border-[#51AD32]/30 rounded-[14px] p-3.5 mb-5 flex items-start gap-2.5">
          <span className="text-xl flex-shrink-0 mt-0.5">📧</span>
          <p className="text-xs text-[#23231f] leading-relaxed">
            Raporunuz bu e-posta adresine gönderilecektir. Sonuçlar yalnızca sizinle paylaşılır.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#23231f] mb-1.5">
              Telefon Numarası
            </label>
            <input
              type="tel"
              value={telefon}
              onChange={handlePhone}
              placeholder="+905XXXXXXXXX"
              inputMode="numeric"
              className="w-full border border-[#ece6db] rounded-[12px] px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#51AD32] focus:ring-2 focus:ring-[#51AD32]/20 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#23231f] mb-1.5">
              E-posta Adresi
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              autoComplete="email"
              className="w-full border border-[#ece6db] rounded-[12px] px-4 py-3.5 text-sm bg-white focus:outline-none focus:border-[#51AD32] focus:ring-2 focus:ring-[#51AD32]/20 transition"
              required
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={kvkk}
              onChange={e => setKvkk(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#51AD32] flex-shrink-0"
            />
            <span className="text-xs text-[#6c6c68] leading-relaxed">
              Kişisel verilerimin BrainFit Ankara tarafından işlenmesine,{' '}
              <a href="/kvkk" target="_blank" className="text-[#51AD32] underline">
                KVKK aydınlatma metni
              </a>{' '}
              kapsamında onay veriyorum.
            </span>
          </label>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading || !kvkk || !emailOk || !phoneOk}
            className="w-full bg-[#51AD32] text-white font-bold text-base py-4 rounded-[16px] disabled:opacity-50 active:scale-[0.98] transition-transform"
          >
            {loading ? 'Kaydediliyor...' : 'Sonuçlarımı Gör →'}
          </button>
        </form>
      </div>
    </div>
  )
}
