'use client'
import { useState, useEffect, useRef } from 'react'

interface TeamMember {
  id: string; name: string; role: string; bio: string;
  tags: string; color: string; imageUrl: string | null; order: number;
}

const COLORS = ['#00B4E5','#CE007F','#F8AF00','#E84F2D','#61CE70','#51AD32']
const empty = { name: '', role: '', bio: '', tags: '', color: '#00B4E5', imageUrl: '' }

export default function EkipPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/team')
    if (res.ok) setMembers(await res.json())
  }

  async function save() {
    if (!editing) return
    setLoading(true)
    const method = isNew ? 'POST' : 'PUT'
    const url = isNew ? '/api/admin/team' : `/api/admin/team/${editing.id}`
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setLoading(false)
    setEditing(null)
    load()
  }

  async function del(id: string) {
    if (!confirm('Bu üyeyi silmek istediğinize emin misiniz?')) return
    await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
    load()
  }

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editing) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    const data = await res.json()
    setUploading(false)
    if (data.url) setEditing(ed => ({ ...ed!, imageUrl: data.url }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#23231f]">Ekip Yönetimi</h1>
        <button onClick={() => { setEditing({ ...empty }); setIsNew(true) }} className="bg-[#51AD32] text-white px-4 py-2.5 rounded-[10px] font-semibold text-sm">
          + Ekip Üyesi Ekle
        </button>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3 mb-8">
        {members.length === 0 && <p className="text-[#9a968c] text-sm py-8 text-center bg-white rounded-[14px] border border-[#e3ddd5]">Henüz ekip üyesi yok.</p>}
        {members.map(m => (
          <div key={m.id} className="bg-white border border-[#e3ddd5] rounded-[14px] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-[10px] flex-shrink-0 overflow-hidden" style={{ background: m.color }}>
              {m.imageUrl && <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#23231f] truncate">{m.name || '(İsim girilmedi)'}</p>
              <p className="text-sm text-[#6c6c68] truncate">{m.role}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => { setEditing(m); setIsNew(false) }} className="px-3 py-1.5 text-sm border border-[#e3ddd5] rounded-[8px] text-[#23231f] hover:border-[#51AD32] transition-colors">Düzenle</button>
              <button onClick={() => del(m.id)} className="px-3 py-1.5 text-sm border border-red-200 rounded-[8px] text-red-500 hover:bg-red-50 transition-colors">Sil</button>
            </div>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">{isNew ? 'Yeni Ekip Üyesi' : 'Üyeyi Düzenle'}</h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                Ad Soyad
                <input value={editing.name || ''} onChange={e => setEditing(ed => ({ ...ed!, name: e.target.value }))} className="p-2.5 border border-[#e3ddd5] rounded-[9px] text-sm" />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                Unvan / Rol
                <input value={editing.role || ''} onChange={e => setEditing(ed => ({ ...ed!, role: e.target.value }))} className="p-2.5 border border-[#e3ddd5] rounded-[9px] text-sm" />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                Biyografi
                <textarea rows={3} value={editing.bio || ''} onChange={e => setEditing(ed => ({ ...ed!, bio: e.target.value }))} className="p-2.5 border border-[#e3ddd5] rounded-[9px] text-sm resize-none" />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                Etiketler <span className="font-normal text-[#9a968c]">(virgülle ayırın)</span>
                <input value={editing.tags || ''} onChange={e => setEditing(ed => ({ ...ed!, tags: e.target.value }))} className="p-2.5 border border-[#e3ddd5] rounded-[9px] text-sm" placeholder="Dikkat, Hafıza" />
              </label>
              <div>
                <p className="text-[13px] font-semibold mb-2">Renk</p>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setEditing(ed => ({ ...ed!, color: c }))} className="w-8 h-8 rounded-full border-2 transition-all" style={{ background: c, borderColor: editing.color === c ? '#23231f' : 'transparent' }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold mb-2">Fotoğraf</p>
                {editing.imageUrl && <img src={editing.imageUrl} alt="" className="w-24 h-24 rounded-[10px] object-cover mb-2" />}
                <input ref={fileRef} type="file" accept="image/*" onChange={uploadPhoto} className="hidden" />
                <button onClick={() => fileRef.current?.click()} disabled={uploading} className="px-3 py-2 text-sm border border-[#e3ddd5] rounded-[9px] text-[#23231f] disabled:opacity-60">
                  {uploading ? 'Yükleniyor...' : 'Fotoğraf Seç'}
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} disabled={loading} className="flex-1 bg-[#51AD32] text-white py-2.5 rounded-[10px] font-semibold text-sm disabled:opacity-60">
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-[#e3ddd5] rounded-[10px] text-sm">İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
