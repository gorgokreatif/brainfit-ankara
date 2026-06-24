'use client'
import { useState, useEffect } from 'react'

interface Cat { id: string; name: string; color: string }
const COLORS = ['#00B4E5','#CE007F','#F8AF00','#E84F2D','#61CE70','#51AD32','#9333ea','#f97316']

export default function KategorilerPage() {
  const [cats, setCats] = useState<Cat[]>([])
  const [editing, setEditing] = useState<Partial<Cat> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/categories')
    if (res.ok) setCats(await res.json())
  }

  async function save() {
    if (!editing?.name) return
    setLoading(true)
    const method = isNew ? 'POST' : 'PUT'
    const url = isNew ? '/api/admin/categories' : `/api/admin/categories/${editing.id}`
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setLoading(false)
    setEditing(null)
    load()
  }

  async function del(id: string) {
    if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz? İçindeki yazılar etkilenebilir.')) return
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#23231f]">Blog Kategorileri</h1>
        <button onClick={() => { setEditing({ name: '', color: '#00B4E5' }); setIsNew(true) }} className="bg-[#51AD32] text-white px-4 py-2.5 rounded-[10px] font-semibold text-sm">
          + Kategori Ekle
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cats.length === 0 && <p className="col-span-3 text-[#9a968c] text-sm py-8 text-center bg-white rounded-[14px] border border-[#e3ddd5]">Henüz kategori yok.</p>}
        {cats.map(c => (
          <div key={c.id} className="bg-white border border-[#e3ddd5] rounded-[14px] p-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: c.color }} />
            <span className="font-semibold text-[#23231f] flex-1 text-sm">{c.name}</span>
            <button onClick={() => { setEditing(c); setIsNew(false) }} className="text-xs px-2.5 py-1 border border-[#e3ddd5] rounded-[7px]">Düzenle</button>
            <button onClick={() => del(c.id)} className="text-xs px-2.5 py-1 border border-red-200 text-red-500 rounded-[7px]">Sil</button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] p-8 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-5">{isNew ? 'Yeni Kategori' : 'Kategoriyi Düzenle'}</h2>
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold mb-4">
              Kategori Adı
              <input value={editing.name || ''} onChange={e => setEditing(ed => ({ ...ed!, name: e.target.value }))} className="p-2.5 border border-[#e3ddd5] rounded-[9px] text-sm" />
            </label>
            <div className="mb-5">
              <p className="text-[13px] font-semibold mb-2">Renk</p>
              <div className="flex flex-wrap gap-2">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setEditing(ed => ({ ...ed!, color: c }))} className="w-8 h-8 rounded-full border-2 transition-all" style={{ background: c, borderColor: editing.color === c ? '#23231f' : 'transparent' }} />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={save} disabled={loading} className="flex-1 bg-[#51AD32] text-white py-2.5 rounded-[10px] font-semibold text-sm disabled:opacity-60">Kaydet</button>
              <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-[#e3ddd5] rounded-[10px] text-sm">İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
