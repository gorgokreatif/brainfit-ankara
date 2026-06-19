'use client';

import { useState } from 'react';
import { TeamMember } from '@/lib/content';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 11px', borderRadius: 7,
  backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
  color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600, color: '#94a3b8',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4,
};

export default function TeamEditor({ initial }: { initial: TeamMember[] }) {
  const [members, setMembers] = useState<TeamMember[]>(initial);
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const update = (idx: number, field: keyof TeamMember, value: string | number) => {
    setMembers((prev) => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };

  const addMember = () => {
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: 'Yeni Üye',
      title: 'Unvan',
      bio: '',
      image: '/images/team-placeholder.jpg',
      order: members.length + 1,
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const removeMember = (idx: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setStatus('saving');
    const res = await fetch('/api/admin/save-json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: 'team.json', data: { members } }),
    });
    const json = await res.json() as { ok?: boolean; error?: string };
    if (!res.ok) { setStatus('error'); setMsg(json.error ?? 'Hata'); }
    else { setStatus('done'); setMsg('Kaydedildi!'); setTimeout(() => setStatus('idle'), 3000); }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
        {members.map((m, i) => (
          <div key={m.id} style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Üye #{i + 1}</span>
              <button onClick={() => removeMember(i)} style={{ padding: '4px 12px', borderRadius: 6, backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: 12 }}>
                Sil
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Ad Soyad', field: 'name' as const },
                { label: 'Unvan', field: 'title' as const },
                { label: 'Görsel Yolu', field: 'image' as const },
                { label: 'Sıra (order)', field: 'order' as const, type: 'number' },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type={type ?? 'text'}
                    value={m[field]}
                    onChange={(e) => update(i, field, type === 'number' ? parseInt(e.target.value) || 1 : e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Kısa Biyografi</label>
                <textarea
                  value={m.bio}
                  onChange={(e) => update(i, 'bio', e.target.value)}
                  rows={2}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={addMember} style={{ padding: '9px 20px', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: 13 }}>
          + Yeni Üye Ekle
        </button>
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          style={{ padding: '9px 20px', borderRadius: 8, backgroundColor: '#0ea5e9', color: 'white', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', opacity: status === 'saving' ? 0.7 : 1 }}
        >
          {status === 'saving' ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
        {msg && <span style={{ fontSize: 13, color: status === 'error' ? '#f87171' : '#4ade80' }}>{msg}</span>}
      </div>
    </div>
  );
}
