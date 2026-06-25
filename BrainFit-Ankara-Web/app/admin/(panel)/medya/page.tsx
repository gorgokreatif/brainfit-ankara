'use client'
import { useState, useEffect, useRef } from 'react'

interface MediaFile { id: string; url: string; filename: string; size: number; mimeType: string; createdAt: string }

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function MedyaPage() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/media')
      if (res.ok) setFiles(await res.json())
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Yükleme başarısız')
      await load()
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Yükleme başarısız')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function deleteFile(id: string) {
    if (!confirm('Bu görseli kütüphaneden kaldır? (Blob depolama alanından silinmez, yalnızca kayıttan kaldırılır.)')) return
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(url)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#23231f]">Medya Kütüphanesi</h1>
          <p className="text-sm text-[#9a968c] mt-1">
            {loading ? '...' : `${files.length} görsel yüklü`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="bg-[#51AD32] text-white px-4 py-2.5 rounded-[10px] font-semibold text-sm disabled:opacity-60 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            {uploading ? 'Yükleniyor...' : 'Görsel Yükle'}
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-[10px] mb-4">
          {uploadError}
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-[#e3ddd5] rounded-[16px] p-12 text-center text-[#9a968c] text-sm">
          Yükleniyor...
        </div>
      ) : files.length === 0 ? (
        <div className="bg-white border border-[#e3ddd5] rounded-[16px] p-16 flex flex-col items-center gap-4 text-[#9a968c]">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="3" y="4" width="18" height="16" rx="2.5"/>
            <circle cx="8.5" cy="9.5" r="1.7"/>
            <path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-sm">Henüz görsel yüklenmedi.</p>
          <button onClick={() => fileRef.current?.click()} className="text-sm text-[#51AD32] font-semibold">
            İlk görselinizi yükleyin →
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map(f => (
            <div key={f.id} className="bg-white border border-[#e3ddd5] rounded-[14px] overflow-hidden group">
              <div className="relative aspect-square bg-[#F4F2EE]">
                <img src={f.url} alt={f.filename} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-[#23231f] truncate" title={f.filename}>{f.filename}</p>
                <p className="text-[11px] text-[#9a968c] mt-0.5">{fmtSize(f.size)} · {fmtDate(f.createdAt)}</p>
                <div className="flex gap-1.5 mt-2.5">
                  <button
                    onClick={() => copyUrl(f.url)}
                    className={`flex-1 py-1.5 text-[11px] font-semibold rounded-[7px] border transition-colors ${copied === f.url ? 'bg-[#51AD32] text-white border-[#51AD32]' : 'border-[#e3ddd5] text-[#23231f] hover:border-[#51AD32]'}`}
                  >
                    {copied === f.url ? '✓ Kopyalandı' : 'URL Kopyala'}
                  </button>
                  <button
                    onClick={() => deleteFile(f.id)}
                    className="py-1.5 px-2.5 text-[11px] border border-red-200 text-red-500 rounded-[7px] hover:bg-red-50 transition-colors"
                    title="Sil"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
