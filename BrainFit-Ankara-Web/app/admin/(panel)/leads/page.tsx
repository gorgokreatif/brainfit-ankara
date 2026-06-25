import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

const AGE_LABEL: Record<string, string> = { A: '4-6 yaş', B: '7-14 yaş', C: '15+' }
function ScoreBadge({ value }: { value: number | null }) {
  if (value === null) return <span className="text-[#9a968c] text-xs">—</span>
  const color = value >= 70 ? '#51AD32' : value >= 40 ? '#F8AF00' : '#00B4E5'
  return (
    <span className="inline-block px-1.5 py-0.5 rounded text-xs font-bold text-white"
      style={{ background: color }}>
      {value}
    </span>
  )
}

export default async function LeadsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const leads = await db.testLead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#23231f]">Test Sonuçları</h1>
          <p className="text-sm text-[#9a968c] mt-0.5">Zihin Check-Up Mini başvuruları</p>
        </div>
        <span className="text-sm bg-[#F4F2EE] text-[#6c6c68] px-3 py-1.5 rounded-[10px] font-semibold">
          {leads.length} kayıt
        </span>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white border border-[#ece6db] rounded-[16px] p-12 text-center text-[#9a968c]">
          <p className="text-4xl mb-3">📊</p>
          <p className="font-semibold">Henüz test başvurusu yok.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#ece6db] rounded-[16px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#ece6db] bg-[#F8F6F2] text-left">
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Veli / Kişi</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Telefon</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Çocuk / Kişi</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Yaş Grubu</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Dikkat</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Görsel</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Motor</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Sosyal</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Durum</th>
                  <th className="px-4 py-3 font-semibold text-[#6c6c68]">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => {
                  const scores = lead.scores as Record<string, number | null> | null
                  return (
                    <tr key={lead.id}
                      className={`border-b border-[#ece6db] hover:bg-[#F8F6F2] transition-colors ${i % 2 === 0 ? '' : 'bg-[#fafaf8]'}`}>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#23231f]">{lead.veliAdSoyad}</div>
                        <div className="text-xs text-[#9a968c]">{lead.email}</div>
                      </td>
                      <td className="px-4 py-3 text-[#23231f]">
                        <a href={`tel:${lead.telefon}`} className="hover:text-[#51AD32] transition-colors">
                          {lead.telefon}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        {lead.cocukAd ? (
                          <div>
                            <div className="font-medium text-[#23231f]">{lead.cocukAd}</div>
                            {lead.cocukYas && <div className="text-xs text-[#9a968c]">{lead.cocukYas} yaş</div>}
                          </div>
                        ) : (
                          <span className="text-[#9a968c]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-[#F4F2EE] text-[#6c6c68] px-2 py-0.5 rounded text-xs font-semibold">
                          {AGE_LABEL[lead.ageGroup] ?? lead.ageGroup}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ScoreBadge value={scores?.dikkat ?? null} />
                      </td>
                      <td className="px-4 py-3">
                        <ScoreBadge value={scores?.gorsel ?? null} />
                      </td>
                      <td className="px-4 py-3">
                        <ScoreBadge value={scores?.motor ?? null} />
                      </td>
                      <td className="px-4 py-3">
                        <ScoreBadge value={scores?.sosyalDuygusal ?? null} />
                      </td>
                      <td className="px-4 py-3">
                        {lead.completed ? (
                          <span className="bg-[#e8f7e0] text-[#51AD32] px-2 py-0.5 rounded-full text-xs font-semibold">
                            ✓ Tamamlandı
                          </span>
                        ) : (
                          <span className="bg-[#fffbe8] text-[#F8AF00] px-2 py-0.5 rounded-full text-xs font-semibold">
                            ⏳ Devam
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#9a968c] text-xs whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString('tr-TR', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
