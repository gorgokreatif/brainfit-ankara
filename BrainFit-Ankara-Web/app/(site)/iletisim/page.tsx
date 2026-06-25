'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import TestPromo from '@/components/site/TestPromo'

interface SiteSettings {
  phone: string
  whatsapp: string
  email: string
  address: string
  hours: string
  mapsEmbed: string
}

export default function IletisimPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', childAge: '', interest: 'BrainFit Junior', message: '', kvkk: false })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    fetch('/api/public/settings').then(r => r.json()).then(setSettings).catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.kvkk) return alert('KVKK onayı gereklidir.')
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <div className="bf-reveal">
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)] pb-[clamp(24px,3vw,36px)]">
        <span className="text-[13px] font-semibold text-[#51AD32] tracking-widest uppercase">İletişim</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4">BrainFit Ankara ile tanışın.</h1>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(40px,5vw,56px)]">
        <div className="grid lg:grid-cols-[1.3fr_.9fr] gap-7 items-start">
          {/* FORM */}
          {status === 'sent' ? (
            <div className="bg-white border border-[#efe9df] rounded-[24px] p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#51AD32] flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Talebiniz alındı!</h2>
              <p className="text-[#6c6c68]">En kısa sürede sizinle iletişime geçeceğiz.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#efe9df] rounded-[24px] p-[clamp(26px,3.5vw,40px)] flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-[#3a3a38]">
                  Ad Soyad
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="text-base p-3 border-[1.5px] border-[#e3ded5] rounded-[11px] bg-[#F8F6F2] font-normal outline-none focus:border-[#51AD32]" />
                </label>
                <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-[#3a3a38]">
                  Telefon
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="text-base p-3 border-[1.5px] border-[#e3ded5] rounded-[11px] bg-[#F8F6F2] font-normal outline-none focus:border-[#51AD32]" />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-[#3a3a38]">
                  E-posta
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className="text-base p-3 border-[1.5px] border-[#e3ded5] rounded-[11px] bg-[#F8F6F2] font-normal outline-none focus:border-[#51AD32]" />
                </label>
                <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-[#3a3a38]">
                  Çocuğun Yaşı
                  <input type="text" value={form.childAge} onChange={e => setForm(f => ({ ...f, childAge: e.target.value }))} className="text-base p-3 border-[1.5px] border-[#e3ded5] rounded-[11px] bg-[#F8F6F2] font-normal outline-none focus:border-[#51AD32]" />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-[#3a3a38]">
                İlgilendiğiniz Alan
                <select value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))} className="text-base p-3 border-[1.5px] border-[#e3ded5] rounded-[11px] bg-[#F8F6F2] font-normal outline-none focus:border-[#51AD32]">
                  <option>BrainFit Junior</option>
                  <option>BrainFit Scholar / Akademik Başarı</option>
                  <option>DEHB</option>
                  <option>Disleksi</option>
                  <option>Cog-Map Zihin Check-Up</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-[#3a3a38]">
                Mesajınız
                <textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="text-base p-3 border-[1.5px] border-[#e3ded5] rounded-[11px] bg-[#F8F6F2] font-normal outline-none focus:border-[#51AD32] resize-vertical" />
              </label>
              <label className="flex gap-3 items-start text-[13px] text-[#6c6c68] leading-relaxed">
                <input type="checkbox" checked={form.kvkk} onChange={e => setForm(f => ({ ...f, kvkk: e.target.checked }))} className="mt-0.5 w-4 h-4 accent-[#51AD32]" />
                KVKK kapsamında kişisel verilerimin işlenmesini onaylıyorum.
              </label>
              {status === 'error' && <p className="text-sm text-red-500">Gönderim başarısız. Lütfen tekrar deneyin.</p>}
              <button type="submit" disabled={status === 'sending'} className="bf-lift bg-[#51AD32] text-white py-4 rounded-[13px] font-semibold text-base mt-1 disabled:opacity-60">
                {status === 'sending' ? 'Gönderiliyor...' : 'Ön Görüşme Talep Et'}
              </button>
            </form>
          )}

          {/* INFO */}
          <div className="flex flex-col gap-3.5">
            <div className="bg-[#23231f] rounded-[20px] p-7 text-white">
              <div className="flex flex-col gap-4 text-[14.5px]">
                {settings?.phone ? (
                  <div><span className="block text-xs text-[#86826f] mb-1">Telefon</span>{settings.phone}</div>
                ) : <div className="text-[#686560] text-sm">Telefon henüz eklenmedi</div>}
                {settings?.whatsapp && <div><span className="block text-xs text-[#86826f] mb-1">WhatsApp</span>{settings.whatsapp}</div>}
                {settings?.email && <div><span className="block text-xs text-[#86826f] mb-1">E-posta</span>{settings.email}</div>}
                {settings?.address && <div><span className="block text-xs text-[#86826f] mb-1">Adres</span>{settings.address}</div>}
                {settings?.hours && <div><span className="block text-xs text-[#86826f] mb-1">Çalışma Saatleri</span>{settings.hours}</div>}
              </div>
            </div>
            <div className="aspect-[4/3] rounded-[20px] overflow-hidden border border-[#e3ded5] bg-[#e7e0d4] flex items-center justify-center">
              {settings?.mapsEmbed ? (
                <iframe src={settings.mapsEmbed} width="100%" height="100%" className="w-full h-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <span className="font-mono text-xs text-[#8a8578] bg-white px-3 py-1.5 rounded-lg">Google Maps alanı buraya eklenecek</span>
              )}
            </div>
          </div>
        </div>
      </section>
      <TestPromo />
    </div>
  )
}
