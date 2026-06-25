'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const PAGE_SLOTS = [
  // ─── Hero Bölümleri ───
  { key: 'hero_home',               label: 'Anasayfa — Hero',           hint: '1200×800' },
  { key: 'hero_biz_kimiz',          label: 'Biz Kimiz — Hero',          hint: '960×720' },
  { key: 'hero_ne_yapiyoruz',       label: 'Ne Yapıyoruz — Hero',       hint: '960×720' },
  { key: 'hero_nasil_yapiyoruz',    label: 'Nasıl Yapıyoruz — Hero',    hint: '960×720' },
  { key: 'hero_cogmap',             label: 'Cog-Map — Hero',            hint: '960×720' },
  // ─── Program Kartları ───
  { key: 'card_junior',             label: 'BrainFit Junior — Kart',    hint: '800×500' },
  { key: 'card_scholar',            label: 'BrainFit Scholar — Kart',   hint: '800×500' },
  { key: 'card_dehb',               label: 'DEHB — Kart',               hint: '800×500' },
  { key: 'card_disleksi',           label: 'Disleksi — Kart',           hint: '800×500' },
  // ─── Program Detay Hero ───
  { key: 'hero_junior',             label: 'BrainFit Junior — Detay',   hint: '960×720' },
  { key: 'hero_scholar',            label: 'BrainFit Scholar — Detay',  hint: '960×720' },
  { key: 'hero_dehb',               label: 'DEHB — Detay',              hint: '960×720' },
  { key: 'hero_disleksi',           label: 'Disleksi — Detay',          hint: '960×720' },
  // ─── Biz Kimiz ───
  { key: 'section_biz_kimiz_merkez',  label: 'Biz Kimiz — Merkez İçi',   hint: '960×720' },
  { key: 'section_biz_kimiz_kurucu',  label: 'Biz Kimiz — Kurucu',       hint: '600×600' },
  // ─── Ne Yapıyoruz ───
  { key: 'section_ne_yapiyoruz_egzersiz', label: 'Ne Yapıyoruz — Egzersiz', hint: '800×1000' },
  { key: 'area_dikkat',             label: 'Dikkat & Odaklanma Alanı',  hint: '600×450' },
  { key: 'area_gorsel',             label: 'Görsel Beceriler Alanı',     hint: '600×450' },
  { key: 'area_isitsel',            label: 'İşitsel Beceriler Alanı',    hint: '600×450' },
  { key: 'area_psikomotor',         label: 'Psiko-Motor Beceriler',      hint: '600×450' },
  { key: 'area_sosyal',             label: 'Sosyal-Duygusal Beceriler',  hint: '600×450' },
  // ─── Nasıl Yapıyoruz ───
  { key: 'section_nasil_seans',     label: 'Nasıl Yapıyoruz — Seans',   hint: '960×720' },
  { key: 'section_nasil_aile',      label: 'Nasıl Yapıyoruz — Aile',    hint: '960×540' },
  // ─── Cog-Map ───
  { key: 'cogmap_rapor',            label: 'Cog-Map — Rapor Görseli',   hint: '600×800' },
  { key: 'cogmap_seans',            label: 'Cog-Map — Seans Fotoğrafı', hint: '960×720' },
]

interface PageImg { key: string; url: string; altText: string }

export default function GorsellerPage() {
  const [images, setImages] = useState<PageImg[]>([])
  const [editing, setEditing] = useState<{ key: string; url: string; altText: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/page-images')
    if (res.ok) setImages(await res.json())
  }

  function getImg(key: string): PageImg {
    return images.find(i => i.key === key) || { key, url: '', altText: '' }
  }

  function openEdit(key: string) {
    setEditing({ ...getImg(key) })
    setMsg('')
  }

  async function persist(data: { key: string; url: string; altText: string }) {
    const res = await fetch('/api/admin/page-images', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.ok
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editing) return
    setUploading(true)
    setMsg('')
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Yükleme başarısız')
      const updated = { ...editing, url: data.url }
      setEditing(updated)
      setSaving(true)
      const ok = await persist(updated)
      if (ok) {
        setMsg('Görsel yüklendi ve kaydedildi!')
        await load()
      } else {
        setMsg('Görsel yüklendi ama kaydedilemedi. Kaydet butonunu deneyin.')
      }
      setSaving(false)
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Görsel yüklenemedi. Dosya formatını (JPG/PNG/WEBP, max 10 MB) kontrol edin.')
    } finally {
      setUploading(false)
    }
  }

  async function save() {
    if (!editing) return
    setSaving(true)
    const ok = await persist(editing)
    if (ok) {
      setMsg('Kaydedildi!')
      await load()
      setEditing(null)
    } else {
      setMsg('Hata oluştu.')
    }
    setSaving(false)
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#23231f]">Sayfa Görselleri</h1>
        <p className="text-sm text-[#9a968c] mt-1">Hero bölümleri ve sayfa görsellerini buradan yönetebilirsiniz.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {PAGE_SLOTS.map(slot => {
          const img = getImg(slot.key)
          return (
            <div key={slot.key} className="bg-white border border-[#e3ddd5] rounded-[16px] overflow-hidden">
              <div className="relative aspect-[4/3] bg-[#ece6db]">
                {img.url ? (
                  <Image src={img.url} alt={img.altText || slot.label} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#bcb4a3]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-xs font-mono">Görsel yok</span>
                  </div>
                )}
              </div>
              <div className="p-3.5">
                <p className="text-sm font-semibold text-[#23231f]">{slot.label}</p>
                <p className="text-xs text-[#9a968c] mt-0.5">{slot.hint}</p>
                <button
                  onClick={() => openEdit(slot.key)}
                  className="mt-3 w-full bg-[#F4F2EE] border border-[#e3ddd5] text-[13px] font-semibold text-[#23231f] py-2 rounded-[8px]"
                >
                  {img.url ? 'Güncelle' : 'Görsel Ekle'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] p-7 w-full max-w-md">
            <h2 className="text-lg font-bold mb-5">
              {PAGE_SLOTS.find(s => s.key === editing.key)?.label}
            </h2>

            {/* Preview */}
            {editing.url && (
              <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden mb-5 border border-[#e3ddd5]">
                <Image src={editing.url} alt="önizleme" fill className="object-cover" />
              </div>
            )}

            {/* URL input */}
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold mb-4">
              Görsel URL
              <input
                value={editing.url}
                onChange={e => setEditing(ed => ed ? { ...ed, url: e.target.value } : ed)}
                placeholder="https://..."
                className="p-2.5 border border-[#e3ddd5] rounded-[9px] text-sm font-normal"
              />
            </label>

            {/* File upload */}
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold mb-4">
              Dosya Yükle
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                disabled={uploading}
                className="text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-[7px] file:border-0 file:bg-[#F4F2EE] file:text-[13px] file:font-medium file:cursor-pointer"
              />
              {uploading && <span className="text-xs text-[#9a968c]">Yükleniyor...</span>}
            </label>

            {/* Alt text */}
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold mb-5">
              Alt Metin (SEO)
              <input
                value={editing.altText}
                onChange={e => setEditing(ed => ed ? { ...ed, altText: e.target.value } : ed)}
                placeholder="Görsel açıklaması..."
                className="p-2.5 border border-[#e3ddd5] rounded-[9px] text-sm font-normal"
              />
            </label>

            {msg && <p className={`text-sm mb-4 ${msg.includes('Hata') || msg.includes('başarısız') ? 'text-red-500' : 'text-[#51AD32]'}`}>{msg}</p>}

            <div className="flex gap-3">
              <button
                onClick={save}
                disabled={saving || uploading}
                className="flex-1 bg-[#51AD32] text-white py-2.5 rounded-[10px] font-semibold text-sm disabled:opacity-60"
                style={{ color: '#fff' }}
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button onClick={() => setEditing(null)} className="px-4 py-2.5 border border-[#e3ddd5] rounded-[10px] text-sm">
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
