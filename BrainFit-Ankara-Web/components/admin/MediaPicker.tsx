'use client'
import { useState, useEffect, useRef } from 'react'

interface MediaFile { id: string; url: string; filename: string; size: number; mimeType: string; createdAt: string }

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaPicker({ onSelect, onClose }: { onSelect: (url: string) => void; onClose: () => void }) {
  const [tab, setTab] = useState<'library' | 'upload'>('library')
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadFiles() }, [])

  async function loadFiles() {
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
      onSelect(data.url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Yükleme başarısız')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function deleteFile(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    if (!confirm('Bu görseli kütüphaneden kaldır?')) return
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-[20px] w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e3ddd5] flex-shrink-0">
          <h2 className="font-bold text-[#23231f]">Medya Kütüphanesi</h2>
          <button onClick={onClose} className="text-[#9a968c] hover:text-[#23231f] text-2xl leading-none w-8 h-8 flex items-center justify-center">&times;</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e3ddd5] px-6 flex-shrink-0">
          <button
            onClick={() => setTab('library')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${tab === 'library' ? 'border-[#51AD32] text-[#51AD32]' : 'border-transparent text-[#9a968c] hover:text-[#23231f]'}`}
          >
            Kütüphane
          </button>
          <button
            onClick={() => setTab('upload')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${tab === 'upload' ? 'border-[#51AD32] text-[#51AD32]' : 'border-transparent text-[#9a968c] hover:text-[#23231f]'}`}
          >
            Yeni Yükle
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'library' ? (
            loading ? (
              <p className="text-sm text-center text-[#9a968c] py-16">Yükleniyor...</p>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-[#9a968c]">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/>
                  <path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-sm text-center">Henüz görsel yüklenmedi.</p>
                <button onClick={() => setTab('upload')} className="text-sm text-[#51AD32] font-semibold">Yeni Görsel Yükle →</button>
              </div>
            ) : (
              <>
                <p className="text-xs text-[#9a968c] mb-4">{files.length} görsel — seçmek için üzerine tıklayın</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {files.map(f => (
                    <div
                      key={f.id}
                      className="group relative cursor-pointer"
                      onClick={() => onSelect(f.url)}
                      title={f.filename}
                    >
                      <div className="aspect-square rounded-[10px] overflow-hidden border-2 border-transparent group-hover:border-[#51AD32] transition-all">
                        <img src={f.url} alt={f.filename} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <p className="text-[10px] text-[#6c6c68] mt-1 truncate leading-tight">{f.filename}</p>
                      <p className="text-[10px] text-[#bcb4a3] leading-tight">{fmtSize(f.size)}</p>
                      <button
                        onClick={(e) => deleteFile(f.id, e)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-[11px] hidden group-hover:flex items-center justify-center shadow-sm"
                        title="Sil"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-20 h-20 rounded-full bg-[#F4F2EE] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#51AD32" strokeWidth="1.8">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#23231f]">Görsel yükleyin</p>
                <p className="text-xs text-[#9a968c] mt-1">JPG, PNG veya WEBP · maksimum 10 MB</p>
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="bg-[#51AD32] text-white px-6 py-2.5 rounded-[10px] font-semibold text-sm disabled:opacity-60"
              >
                {uploading ? 'Yükleniyor...' : 'Dosya Seç'}
              </button>
              {uploadError && <p className="text-sm text-red-500 text-center max-w-xs">{uploadError}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
