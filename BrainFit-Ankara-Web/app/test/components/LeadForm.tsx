'use client'
import { useState } from 'react'
import type { AgeGroup } from '../lib/normBands'

interface Props {
  ageGroup: AgeGroup
  onSaved: (leadId: string, ageGroup: AgeGroup) => void
}

export default function LeadForm({ ageGroup, onSaved }: Props) {
  const [form, setForm] = useState({
    veliAdSoyad: '', telefon: '', email: '',
    testKiminIcin: 'Çocuğum', cocukAd: '', cocukYas: '',
    sehir: '', kvkkOnay: false, veliOnay18Alti: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isChild = form.testKiminIcin !== 'Kendim'
  const yas = parseInt(form.cocukYas)
  const needsParentConsent = isChild && !isNaN(yas) && yas < 18

  function set(key: string, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function formatTel(v: string) {
    const digits = v.replace(/\D/g, '')
    if (!digits.startsWith('90') && digits.length > 0) {
      return '90' + digits.slice(0, 10)
    }
    return digits.slice(0, 12)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.kvkkOnay) { setError('KVKK onayı zorunludur.'); return }
    if (needsParentConsent && !form.veliOnay18Alti) { setError('18 yaş altı için veli onayı zorunludur.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/test-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ageGroup, kaynak: 'mini-test' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onSaved(data.id, ageGroup)
    } catch {
      setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.')
      setLoading(false)
    }
  }

  const inp = 'w-full px-4 py-3 border border-[#ece6db] rounded-[12px] text-sm bg-white focus:outline-none focus:border-[#51AD32] transition-colors'
  const lbl = 'block text-[13px] font-semibold text-[#23231f] mb-1.5'

  return (
    <div className="flex-1 flex flex-col px-5 py-6 max-w-lg mx-auto w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-[#23231f]" style={{ fontFamily: 'Sora, sans-serif' }}>
          Sonuçları nereye gönderelim?
        </h2>
        <p className="text-[#9a968c] text-sm mt-2">Bilgileriniz yalnızca ön görüşme için kullanılır.</p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className={lbl}>Ad Soyad *</label>
          <input required className={inp} value={form.veliAdSoyad}
            onChange={e => set('veliAdSoyad', e.target.value)} placeholder="Veli / kişi adı soyadı" />
        </div>

        <div>
          <label className={lbl}>Telefon *</label>
          <input required type="tel" className={inp}
            value={form.telefon ? '+' + form.telefon : ''}
            onChange={e => set('telefon', formatTel(e.target.value.replace('+', '')))}
            placeholder="+90 5XX XXX XX XX" />
        </div>

        <div>
          <label className={lbl}>E-posta *</label>
          <input required type="email" className={inp} value={form.email}
            onChange={e => set('email', e.target.value)} placeholder="ornek@email.com" />
        </div>

        <div>
          <label className={lbl}>Test kimin için?</label>
          <select className={inp} value={form.testKiminIcin}
            onChange={e => set('testKiminIcin', e.target.value)}>
            <option>Çocuğum</option>
            <option>Kendim</option>
            <option>Öğrencim/Danışanım</option>
          </select>
        </div>

        {isChild && (
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={lbl}>Çocuk Adı</label>
              <input className={inp} value={form.cocukAd}
                onChange={e => set('cocukAd', e.target.value)} placeholder="(opsiyonel)" />
            </div>
            <div className="w-28">
              <label className={lbl}>Yaşı *</label>
              <input required type="number" min={3} max={18} className={inp} value={form.cocukYas}
                onChange={e => set('cocukYas', e.target.value)} placeholder="8" />
            </div>
          </div>
        )}

        <div>
          <label className={lbl}>Şehir <span className="font-normal text-[#9a968c]">(opsiyonel)</span></label>
          <input className={inp} value={form.sehir}
            onChange={e => set('sehir', e.target.value)} placeholder="Ankara" />
        </div>

        {needsParentConsent && (
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.veliOnay18Alti}
              onChange={e => set('veliOnay18Alti', e.target.checked)}
              className="w-5 h-5 rounded border-[#ece6db] accent-[#51AD32] mt-0.5 flex-shrink-0" />
            <span className="text-[13px] text-[#6c6c68]">
              18 yaş altı çocuk için <b>ebeveyn/veli olarak</b> bu testi doldurduğumu onaylıyorum.
            </span>
          </label>
        )}

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.kvkkOnay}
            onChange={e => set('kvkkOnay', e.target.checked)}
            className="w-5 h-5 rounded border-[#ece6db] accent-[#51AD32] mt-0.5 flex-shrink-0" />
          <span className="text-[13px] text-[#6c6c68]">
            <a href="/kvkk" target="_blank" className="underline text-[#51AD32]">KVKK Aydınlatma Metni</a>&apos;ni okudum, verilerimin yalnızca ön görüşme amacıyla işlenmesine onay veriyorum. *
          </span>
        </label>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit" disabled={loading}
          className="w-full bg-[#51AD32] text-white font-bold text-base py-4 rounded-[16px] disabled:opacity-60 active:scale-[0.98] transition-transform mt-2"
        >
          {loading ? 'Kaydediliyor...' : 'Testi Başlat →'}
        </button>
      </form>
    </div>
  )
}
