'use client'
import { useState } from 'react'
import type { Scores } from '../lib/scoring'

interface Props {
  scores: Scores
}

const TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

function getNextWeekdays(n: number): string[] {
  const days: string[] = []
  const d = new Date()
  while (days.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      days.push(d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.'))
    }
  }
  return days
}

export default function AppointmentModal({ scores }: Props) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'done'>('form')
  const [calLink, setCalLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [childAge, setChildAge] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [note, setNote] = useState('')

  const days = getNextWeekdays(5)

  async function handleSubmit() {
    if (!name || !email || !selectedDate || !selectedTime) {
      setError('Ad, e-posta, tarih ve saat seçimi zorunludur.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, childAge, preferredDate: selectedDate, preferredTime: selectedTime, note, scores, source: 'result-page' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Hata')
      setCalLink(data.calendarLink)
      setStep('done')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <div className="bg-gradient-to-br from-[#51AD32] to-[#3d8f24] rounded-[20px] p-5 text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🎯</span>
          <div className="flex-1">
            <p className="font-extrabold text-[17px] leading-snug">Raporu Uzmanla Değerlendir</p>
            <p className="text-white/80 text-[13px] mt-1 leading-relaxed">
              15 dakikalık ücretsiz görüşmede uzmanımız test sonuçlarınızı sizinle birlikte incelesin.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="mt-3 bg-white text-[#23231f] font-bold text-sm px-5 py-2.5 rounded-[11px] hover:bg-white/90 transition-colors active:scale-95"
            >
              Randevu Al →
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'done') {
    return (
      <div className="bg-white border border-[#ece6db] rounded-[20px] p-6 text-center flex flex-col items-center gap-4">
        <div className="text-5xl">✅</div>
        <h3 className="text-xl font-bold text-[#23231f]">Randevu Talebiniz Alındı!</h3>
        <p className="text-[#6c6c68] text-sm leading-relaxed">
          Ekibimiz en kısa sürede sizinle iletişime geçecek. Onay e-postası gönderildi.
        </p>
        <a
          href={calLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#51AD32] text-white font-bold text-sm px-5 py-3 rounded-[12px] hover:bg-[#3d8f24] transition-colors"
        >
          📅 Google Takvimine Ekle
        </a>
        <button onClick={() => setOpen(false)} className="text-xs text-[#9a968c] hover:underline">
          Kapat
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#ece6db] rounded-[20px] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#51AD32] to-[#3d8f24] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="font-extrabold text-white text-base">Rapor Değerlendirme Randevusu</p>
          <p className="text-white/75 text-xs mt-0.5">Ücretsiz · 15 dakika · Uzman görüşmesi</p>
        </div>
        <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none">✕</button>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* İsim + Email */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#6c6c68]">Ad Soyad *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Ayşe Yılmaz"
              className="border border-[#ece6db] rounded-[10px] px-3 py-2.5 text-sm text-[#23231f] outline-none focus:border-[#51AD32]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#6c6c68]">E-posta *</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="ornek@mail.com"
              className="border border-[#ece6db] rounded-[10px] px-3 py-2.5 text-sm text-[#23231f] outline-none focus:border-[#51AD32]" />
          </div>
        </div>

        {/* Telefon + Yaş */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#6c6c68]">Telefon</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="05XX XXX XX XX"
              className="border border-[#ece6db] rounded-[10px] px-3 py-2.5 text-sm text-[#23231f] outline-none focus:border-[#51AD32]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#6c6c68]">Çocuğun Yaşı</label>
            <input value={childAge} onChange={e => setChildAge(e.target.value)} placeholder="ör. 8"
              className="border border-[#ece6db] rounded-[10px] px-3 py-2.5 text-sm text-[#23231f] outline-none focus:border-[#51AD32]" />
          </div>
        </div>

        {/* Tarih seçimi */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#6c6c68]">Tercih Ettiğiniz Gün *</label>
          <div className="grid grid-cols-5 gap-1.5">
            {days.map(d => (
              <button key={d} onClick={() => setSelectedDate(d)}
                className={`py-2 rounded-[10px] text-xs font-bold border transition-colors ${selectedDate === d ? 'bg-[#51AD32] text-white border-[#51AD32]' : 'bg-white text-[#23231f] border-[#ece6db] hover:border-[#51AD32]'}`}>
                {d.slice(0, 5)}
              </button>
            ))}
          </div>
        </div>

        {/* Saat seçimi */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#6c6c68]">Tercih Ettiğiniz Saat *</label>
          <div className="grid grid-cols-6 gap-1.5">
            {TIMES.map(t => (
              <button key={t} onClick={() => setSelectedTime(t)}
                className={`py-2 rounded-[10px] text-xs font-bold border transition-colors ${selectedTime === t ? 'bg-[#51AD32] text-white border-[#51AD32]' : 'bg-white text-[#23231f] border-[#ece6db] hover:border-[#51AD32]'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Not */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#6c6c68]">Eklemek İstediğiniz Not</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Varsa özel durumunuzu belirtin..."
            className="border border-[#ece6db] rounded-[10px] px-3 py-2.5 text-sm text-[#23231f] outline-none focus:border-[#51AD32] resize-none" />
        </div>

        {error && <p className="text-xs text-[#E84F2D] font-semibold">{error}</p>}

        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-[#51AD32] text-white font-bold py-3.5 rounded-[14px] text-sm active:scale-[0.98] transition-transform disabled:opacity-60">
          {loading ? 'Gönderiliyor...' : 'Randevu Talebini Gönder →'}
        </button>

        <p className="text-[10px] text-[#9a968c] text-center">
          Talebinizi aldıktan sonra ekibimiz sizi arayarak randevuyu onaylayacak.
        </p>
      </div>
    </div>
  )
}
