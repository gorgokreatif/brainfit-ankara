'use client';

import { useState } from 'react';
import Button from './Button';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', website: '' });
  const [kvkk, setKvkk] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkk) { setErrorMsg('KVKK onayı gereklidir.'); return; }
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(json.error ?? 'Bir hata oluştu. Lütfen tekrar deneyin.');
      } else {
        setStatus('done');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: 'rgba(31,168,160,0.06)', border: '1px solid rgba(31,168,160,0.2)' }}>
        <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--accent)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--ink)' }}>Mesajınız alındı!</h3>
        <p className="font-body" style={{ color: 'rgba(22,32,46,0.65)' }}>
          En kısa sürede sizi arayacağız. Acil durumlarda WhatsApp&apos;tan da ulaşabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="website" value={form.website} onChange={(e) => setForm(f => ({...f, website: e.target.value}))} tabIndex={-1} aria-hidden style={{ position: 'absolute', left: '-9999px' }} autoComplete="off"/>

      {[
        { id: 'name', label: 'Adınız Soyadınız', type: 'text', required: true },
        { id: 'phone', label: 'Telefon', type: 'tel', required: true },
        { id: 'email', label: 'E-posta (isteğe bağlı)', type: 'email', required: false },
      ].map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-semibold font-display mb-1.5" style={{ color: 'var(--ink)' }}>
            {field.label}{field.required && <span style={{ color: 'var(--warm)' }}> *</span>}
          </label>
          <input
            type={field.type}
            required={field.required}
            value={form[field.id as keyof typeof form]}
            onChange={(e) => setForm(f => ({ ...f, [field.id]: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl font-body transition-colors"
            style={{ border: '2px solid var(--border-subtle)', backgroundColor: 'var(--paper)', color: 'var(--ink)', outline: 'none' }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-semibold font-display mb-1.5" style={{ color: 'var(--ink)' }}>Mesajınız</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl font-body resize-none transition-colors"
          style={{ border: '2px solid var(--border-subtle)', backgroundColor: 'var(--paper)', color: 'var(--ink)', outline: 'none' }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
          placeholder="Çocuğunuz veya kendiniz hakkında kısaca bilgi verebilirsiniz…"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="mt-1 w-4 h-4 rounded" style={{ accentColor: 'var(--primary)' }}/>
        <span className="text-xs font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.6)' }}>
          Kişisel verilerimin iletişim amacıyla kullanılmasına izin veriyorum.{' '}
          <a href="/kvkk" className="underline hover:opacity-75" style={{ color: 'var(--primary)' }}>KVKK Metni</a>
        </span>
      </label>

      {(status === 'error' || errorMsg) && (
        <p className="text-sm p-3 rounded-xl" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>{errorMsg}</p>
      )}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full">
        {status === 'sending' ? 'Gönderiliyor…' : 'Mesaj Gönder'}
      </Button>
    </form>
  );
}
