'use client'
import { useState, useEffect } from 'react'

interface Smtp {
  host: string; port: number; user: string; password: string; fromName: string; toEmail: string;
}
const empty: Smtp = { host: 'smtp.gmail.com', port: 587, user: '', password: '', fromName: 'BrainFit Ankara', toEmail: '' }

export default function SmtpPage() {
  const [data, setData] = useState<Smtp>(empty)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null)

  useEffect(() => {
    fetch('/api/admin/smtp').then(r => r.json()).then(d => setData({ ...empty, ...d })).catch(() => {})
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/admin/smtp', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function testMail() {
    setTesting(true)
    setTestResult(null)
    const res = await fetch('/api/admin/smtp/test', { method: 'POST' })
    const d = await res.json()
    setTesting(false)
    setTestResult(res.ok ? { ok: true, msg: 'Test maili başarıyla gönderildi!' } : { ok: false, msg: d.error || 'Gönderilemedi.' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#23231f]">SMTP Ayarları</h1>
          <p className="text-sm text-[#9a968c] mt-1">İletişim formu bu ayarlar üzerinden e-posta gönderir.</p>
        </div>
        {saved && <span className="text-sm text-[#51AD32] font-semibold bg-[#51AD32]/10 px-3 py-1.5 rounded-[8px]">✓ Kaydedildi</span>}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-[14px] p-5 mb-6 max-w-2xl">
        <p className="text-sm font-semibold text-amber-800 mb-1">Gmail için App Password gereklidir</p>
        <p className="text-sm text-amber-700">Google hesabınızda 2 adımlı doğrulama açık olmalı. Google Hesabı → Güvenlik → Uygulama Şifreleri bölümünden şifre oluşturun.</p>
      </div>

      <form onSubmit={save} className="bg-white border border-[#e3ddd5] rounded-[20px] p-8 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
            SMTP Sunucusu
            <input value={data.host} onChange={e => setData(d => ({ ...d, host: e.target.value }))} className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32]" />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
            Port
            <input type="number" value={data.port} onChange={e => setData(d => ({ ...d, port: Number(e.target.value) }))} className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32]" />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
            Gmail Adresi
            <input type="email" value={data.user} onChange={e => setData(d => ({ ...d, user: e.target.value }))} placeholder="ornek@gmail.com" className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32]" />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
            App Password
            <input type="password" value={data.password} onChange={e => setData(d => ({ ...d, password: e.target.value }))} placeholder="xxxx xxxx xxxx xxxx" className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32]" />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
            Gönderen Adı
            <input value={data.fromName} onChange={e => setData(d => ({ ...d, fromName: e.target.value }))} className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32]" />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-[#3a3a38]">
            Formlar Nereye Gelsin?
            <input type="email" value={data.toEmail} onChange={e => setData(d => ({ ...d, toEmail: e.target.value }))} placeholder="info@brainfitankara.com" className="p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32]" />
          </label>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading} className="bg-[#51AD32] text-white px-6 py-3 rounded-[10px] font-semibold text-sm disabled:opacity-60">
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          <button type="button" onClick={testMail} disabled={testing} className="border border-[#e3ddd5] px-5 py-3 rounded-[10px] text-sm font-semibold text-[#23231f] disabled:opacity-60">
            {testing ? 'Gönderiliyor...' : '✉️ Test Maili Gönder'}
          </button>
        </div>
        {testResult && (
          <p className={`mt-3 text-sm font-medium ${testResult.ok ? 'text-[#51AD32]' : 'text-red-500'}`}>
            {testResult.msg}
          </p>
        )}
      </form>
    </div>
  )
}
