'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LeadActions({ id, completed }: { id: string; completed: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function toggleStatus() {
    setLoading(true)
    await fetch(`/api/test-lead?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminToggle: true, completed: !completed }),
    })
    router.refresh()
    setLoading(false)
  }

  async function deleteLead() {
    if (!confirm('Bu kaydı silmek istediğinizden emin misiniz?')) return
    setLoading(true)
    await fetch(`/api/test-lead?id=${id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={toggleStatus}
        disabled={loading}
        title={completed ? 'Devam olarak işaretle' : 'Tamamlandı olarak işaretle'}
        className="p-1.5 rounded-[8px] hover:bg-[#F4F2EE] text-[#9a968c] hover:text-[#51AD32] transition-colors disabled:opacity-40"
      >
        {completed ? '↩' : '✓'}
      </button>
      <button
        onClick={deleteLead}
        disabled={loading}
        title="Kaydı sil"
        className="p-1.5 rounded-[8px] hover:bg-red-50 text-[#9a968c] hover:text-red-500 transition-colors disabled:opacity-40"
      >
        🗑
      </button>
    </div>
  )
}
