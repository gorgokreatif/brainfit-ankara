'use client'
import { useEffect, useState } from 'react'

interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  childName: string
  childAge: string
  preferredDate: string
  preferredTime: string
  note: string
  status: string
  scores: Record<string, number | null> | null
  createdAt: string
}

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  pending:   { label: 'Bekliyor',   bg: 'bg-[#fffbe8]', color: 'text-[#F8AF00]' },
  called:    { label: 'Arandı',     bg: 'bg-[#e8f0ff]', color: 'text-[#3b7fef]' },
  confirmed: { label: 'Tamamlandı', bg: 'bg-[#e8f7e0]', color: 'text-[#51AD32]' },
  cancelled: { label: 'İptal',      bg: 'bg-[#ffeaea]', color: 'text-[#E84F2D]' },
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/appointments').then(r => r.json()).then(d => {
      setAppointments(d.appointments || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/appointment/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    }
  }

  async function deleteAppointment(id: string) {
    if (!confirm('Bu randevuyu silmek istediğinizden emin misiniz?')) return
    const res = await fetch(`/api/appointment/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setAppointments(prev => prev.filter(a => a.id !== id))
    }
  }

  if (loading) return <div className="p-8 text-[#9a968c]">Yükleniyor...</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#23231f]">Randevular</h1>
        <span className="text-sm text-[#9a968c] bg-[#F4F2EE] px-3 py-1 rounded-full">{appointments.length} kayıt</span>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white border border-[#ece6db] rounded-[16px] p-10 text-center text-[#9a968c]">
          Henüz randevu talebi bulunmuyor.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {appointments.map((a) => {
            const s = STATUS_LABELS[a.status] || STATUS_LABELS.pending
            return (
              <div key={a.id} className="bg-white border border-[#ece6db] rounded-[16px] p-5">
                {/* Üst satır: kişi bilgileri + tarih/saat */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-bold text-[#23231f]">{a.name}</p>
                    <p className="text-sm text-[#6c6c68]">{a.email} {a.phone ? `· ${a.phone}` : ''}</p>
                    {a.childName && (
                      <p className="text-sm text-[#51AD32] font-semibold mt-0.5">👦 Çocuk: {a.childName}{a.childAge ? ` (${a.childAge} yaş)` : ''}</p>
                    )}
                    {!a.childName && a.childAge && (
                      <p className="text-sm text-[#9a968c]">Yaş: {a.childAge}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-[#51AD32] text-sm">📅 {a.preferredDate} — {a.preferredTime}</p>
                    <p className="text-xs text-[#9a968c] mt-0.5">
                      {new Date(a.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1 ${s.bg} ${s.color}`}>
                      {s.label}
                    </span>
                  </div>
                </div>

                {a.note && (
                  <p className="text-sm text-[#6c6c68] mt-3 pt-3 border-t border-[#ece6db]">
                    💬 {a.note}
                  </p>
                )}

                {a.scores && (
                  <div className="mt-3 pt-3 border-t border-[#ece6db]">
                    <p className="text-xs font-semibold text-[#9a968c] mb-1.5">Test Skorları</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(a.scores).map(([k, v]) => (
                        <span key={k} className="text-xs bg-[#F4F2EE] text-[#23231f] px-2 py-1 rounded-full">
                          {k}: <b>{v !== null ? v : '—'}</b>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Aksiyonlar */}
                <div className="mt-4 pt-3 border-t border-[#ece6db] flex items-center gap-2 flex-wrap">
                  {a.status !== 'called' && (
                    <button onClick={() => updateStatus(a.id, 'called')}
                      className="text-xs font-bold px-3 py-1.5 rounded-[8px] bg-[#e8f0ff] text-[#3b7fef] hover:bg-[#d0e4ff] transition-colors">
                      📞 Arandı
                    </button>
                  )}
                  {a.status !== 'confirmed' && (
                    <button onClick={() => updateStatus(a.id, 'confirmed')}
                      className="text-xs font-bold px-3 py-1.5 rounded-[8px] bg-[#e8f7e0] text-[#51AD32] hover:bg-[#d0eecc] transition-colors">
                      ✓ Tamamlandı
                    </button>
                  )}
                  {a.status !== 'cancelled' && (
                    <button onClick={() => updateStatus(a.id, 'cancelled')}
                      className="text-xs font-bold px-3 py-1.5 rounded-[8px] bg-[#fffbe8] text-[#F8AF00] hover:bg-[#fff3c4] transition-colors">
                      ✕ İptal
                    </button>
                  )}
                  {a.status !== 'pending' && (
                    <button onClick={() => updateStatus(a.id, 'pending')}
                      className="text-xs font-bold px-3 py-1.5 rounded-[8px] bg-[#F4F2EE] text-[#6c6c68] hover:bg-[#e8e5df] transition-colors">
                      ↩ Bekliyor
                    </button>
                  )}
                  <button onClick={() => deleteAppointment(a.id)}
                    className="text-xs font-bold px-3 py-1.5 rounded-[8px] bg-[#ffeaea] text-[#E84F2D] hover:bg-[#ffd5d5] transition-colors ml-auto">
                    🗑 Sil
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
