import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])

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
            const scores = a.scores as Record<string, number | null> | null
            return (
              <div key={a.id} className="bg-white border border-[#ece6db] rounded-[16px] p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-bold text-[#23231f]">{a.name}</p>
                    <p className="text-sm text-[#6c6c68]">{a.email} {a.phone ? `· ${a.phone}` : ''}</p>
                    {a.childAge && <p className="text-sm text-[#9a968c]">Çocuk yaşı: {a.childAge}</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-[#51AD32] text-sm">📅 {a.preferredDate} — {a.preferredTime}</p>
                    <p className="text-xs text-[#9a968c] mt-0.5">
                      {new Date(a.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1 ${a.status === 'confirmed' ? 'bg-[#e8f7e0] text-[#51AD32]' : a.status === 'cancelled' ? 'bg-[#ffeaea] text-[#E84F2D]' : 'bg-[#fffbe8] text-[#F8AF00]'}`}>
                      {a.status === 'confirmed' ? 'Onaylandı' : a.status === 'cancelled' ? 'İptal' : 'Bekliyor'}
                    </span>
                  </div>
                </div>

                {a.note && (
                  <p className="text-sm text-[#6c6c68] mt-3 pt-3 border-t border-[#ece6db]">
                    💬 {a.note}
                  </p>
                )}

                {scores && (
                  <div className="mt-3 pt-3 border-t border-[#ece6db]">
                    <p className="text-xs font-semibold text-[#9a968c] mb-1.5">Test Skorları</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(scores).map(([k, v]) => (
                        <span key={k} className="text-xs bg-[#F4F2EE] text-[#23231f] px-2 py-1 rounded-full">
                          {k}: <b>{v !== null ? v : '—'}</b>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
