'use client';

import { useState } from 'react';
import { SiteData } from '@/lib/content';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: 8,
  backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
  color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600, color: '#94a3b8',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5,
};
const fieldset: React.CSSProperties = {
  border: 'none', padding: '20px 24px', backgroundColor: '#1e293b',
  borderRadius: 12, borderTop: '2px solid rgba(56,189,248,0.2)',
};

export default function SiteEditor({ initial }: { initial: SiteData }) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const set = (path: string[], value: string) => {
    setData((prev) => {
      const next = structuredClone(prev);
      let obj: Record<string, unknown> = next as unknown as Record<string, unknown>;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
      obj[path[path.length - 1]] = value;
      return next;
    });
  };

  const handleSave = async () => {
    setStatus('saving');
    const res = await fetch('/api/admin/save-json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: 'site.json', data }),
    });
    const json = await res.json() as { ok?: boolean; error?: string };
    if (!res.ok) { setStatus('error'); setMsg(json.error ?? 'Hata'); }
    else { setStatus('done'); setMsg('Kaydedildi!'); setTimeout(() => setStatus('idle'), 3000); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <fieldset style={fieldset}>
        <legend style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', padding: '0 6px', marginBottom: 16 }}>İletişim</legend>
        {[
          { label: 'Marka Adı', path: ['brand'] },
          { label: 'Slogan', path: ['tagline'] },
          { label: 'Telefon', path: ['phone'] },
          { label: 'WhatsApp Numarası (ülke koduyla, sadece rakam)', path: ['whatsapp'] },
          { label: 'E-posta', path: ['email'] },
          { label: 'Adres', path: ['address'] },
          { label: 'Çalışma Saatleri', path: ['openHours'] },
        ].map(({ label, path }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{label}</label>
            <input
              type="text"
              value={(path.reduce((o: unknown, k) => (o as Record<string, unknown>)[k], data) as string) ?? ''}
              onChange={(e) => set(path, e.target.value)}
              style={inputStyle}
            />
          </div>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', padding: '0 6px', marginBottom: 16 }}>Sosyal Medya</legend>
        {[
          { label: 'Instagram URL', path: ['social', 'instagram'] },
          { label: 'Facebook URL', path: ['social', 'facebook'] },
          { label: 'YouTube URL', path: ['social', 'youtube'] },
        ].map(({ label, path }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{label}</label>
            <input
              type="text"
              value={(path.reduce((o: unknown, k) => (o as Record<string, unknown>)[k], data) as string) ?? ''}
              onChange={(e) => set(path, e.target.value)}
              style={inputStyle}
            />
          </div>
        ))}
      </fieldset>

      <fieldset style={fieldset}>
        <legend style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', padding: '0 6px', marginBottom: 16 }}>Footer</legend>
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Footer Açıklama</label>
          <textarea
            value={data.footer.about}
            onChange={(e) => set(['footer', 'about'], e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
      </fieldset>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          style={{ padding: '10px 24px', borderRadius: 8, backgroundColor: '#0ea5e9', color: 'white', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', opacity: status === 'saving' ? 0.7 : 1 }}
        >
          {status === 'saving' ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
        {msg && <span style={{ fontSize: 13, color: status === 'error' ? '#f87171' : '#4ade80' }}>{msg}</span>}
      </div>
    </div>
  );
}
