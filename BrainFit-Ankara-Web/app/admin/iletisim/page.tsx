'use client'
import { useState, useEffect } from 'react'

interface Settings {
  phone: string; whatsapp: string; email: string;
  address: string; hours: string; mapsEmbed: string;
}
const empty: Settings = { phone: '', whatsapp: '', email: '', address: '', hours: '', mapsEmbed: '' }

export default function IletisimAdminPage() {
  const [data, setData] = useState<Settings>(empty)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(d => setData(d || empty)).catch(() => {})
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/admin/settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const field = (label: string, key: keyof Settings, type = 'text', placeholder = '') => (
    <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
      {label}
      <input
        type={type}
        value={data[key]}
        onChange={e => setData(d => ({ ...d, [key]: e.target.value }))}
        placeholder={placeholder}
        className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32] bg-white"
      />
    </label>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#23231f]">İletişim Bilgileri</h1>
          <p className="text-sm text-[#9a968c] mt-1">Buradaki bilgiler footer ve iletişim sayfasında otomatik güncellenir.</p>
        </div>
        {saved && <span className="text-sm text-[#51AD32] font-semibold bg-[#51AD32]/10 px-3 py-1.5 rounded-[8px]">✓ Kaydedildi</span>}
      </div>
      <form onSubmit={save} className="bg-white border border-[#e3ddd5] rounded-[20px] p-8 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-5">
          {field('Telefon', 'phone', 'tel', '+90 312 000 00 00')}
          {field('WhatsApp Numarası', 'whatsapp', 'tel', '+90 5XX XXX XX XX')}
          {field('E-posta Adresi', 'email', 'email', 'info@brainfitankara.com')}
          {field('Çalışma Saatleri', 'hours', 'text', 'Pzt–Cum: 09:00–18:00')}
        </div>
        <div className="mt-5">
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
            Adres
            <textarea
              value={data.address}
              onChange={e => setData(d => ({ ...d, address: e.target.value }))}
              rows={2}
              placeholder="Kızılay Mah. ... Cad. No:XX, Çankaya / Ankara"
              className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32] bg-white resize-none"
            />
          </label>
        </div>
        <div className="mt-5">
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
            Google Maps Embed URL
            <input
              type="url"
              value={data.mapsEmbed}
              onChange={e => setData(d => ({ ...d, mapsEmbed: e.target.value }))}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32] bg-white"
            />
            <span className="text-xs text-[#9a968c] font-normal">Google Maps → Paylaş → Haritayı Yerleştir → iframe src değerini yapıştırın</span>
          </label>
        </div>
        <button type="submit" disabled={loading} className="mt-6 bg-[#51AD32] text-white px-6 py-3 rounded-[10px] font-semibold text-sm disabled:opacity-60">
          {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </form>
    </div>
  )
}
