'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostDraft {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover: string;
  tags: string;
  content: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 11px', borderRadius: 7,
  backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
  color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600, color: '#94a3b8',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4,
};

export default function BlogPostEditor({ initial, isNew }: { initial: PostDraft; isNew: boolean }) {
  const [draft, setDraft] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'saving' | 'deleting' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const set = (field: keyof PostDraft, value: string) => setDraft((d) => ({ ...d, [field]: value }));

  const handleSave = async () => {
    setStatus('saving');
    setMsg('');
    const res = await fetch('/api/admin/save-md', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    });
    const json = await res.json() as { ok?: boolean; slug?: string; error?: string };
    if (!res.ok) {
      setStatus('error');
      setMsg(json.error ?? 'Hata oluştu.');
    } else {
      setStatus('done');
      setMsg('Kaydedildi!');
      if (isNew && json.slug) router.push(`/admin/blog/${json.slug}`);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`"${draft.title}" yazısını silmek istediğinizden emin misiniz?`)) return;
    setStatus('deleting');
    const res = await fetch('/api/admin/delete-md', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: draft.slug }),
    });
    const json = await res.json() as { ok?: boolean; error?: string };
    if (!res.ok) {
      setStatus('error');
      setMsg(json.error ?? 'Silinemedi.');
    } else {
      router.push('/admin/blog');
    }
  };

  const fields: Array<{ label: string; field: keyof PostDraft; type?: string; placeholder?: string }> = [
    { label: 'Slug (URL)', field: 'slug', placeholder: 'ornek-yazi-basligi' },
    { label: 'Başlık', field: 'title' },
    { label: 'Kısa Açıklama (SEO)', field: 'description' },
    { label: 'Yayın Tarihi (YYYY-AA-GG)', field: 'date', type: 'date' },
    { label: 'Kapak Görseli Yolu', field: 'cover', placeholder: '/images/blog-01.jpg' },
    { label: 'Etiketler (virgülle ayırın)', field: 'tags', placeholder: 'disleksi, ebeveyn rehberi' },
  ];

  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 20 }}>
          {fields.map(({ label, field, type, placeholder }) => (
            <div key={field} style={{ marginBottom: 14 }}>
              <label style={labelStyle}>{label}</label>
              <input
                type={type ?? 'text'}
                value={draft[field]}
                onChange={(e) => set(field, e.target.value)}
                style={inputStyle}
                placeholder={placeholder}
                disabled={!isNew && field === 'slug'}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: '2 1 480px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 20, flex: 1 }}>
          <label style={labelStyle}>İçerik (Markdown)</label>
          <textarea
            value={draft.content}
            onChange={(e) => set('content', e.target.value)}
            rows={28}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', lineHeight: 1.6 }}
            placeholder="## Giriş&#10;&#10;Yazı içeriğinizi buraya Markdown formatında yazın..."
          />
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4 }}>
        <button
          onClick={handleSave}
          disabled={status === 'saving' || status === 'deleting'}
          style={{ padding: '9px 24px', borderRadius: 8, backgroundColor: '#0ea5e9', color: 'white', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', opacity: status === 'saving' ? 0.7 : 1 }}
        >
          {status === 'saving' ? 'Kaydediliyor…' : isNew ? 'Oluştur' : 'Güncelle'}
        </button>
        {!isNew && (
          <button
            onClick={handleDelete}
            disabled={status === 'saving' || status === 'deleting'}
            style={{ padding: '9px 20px', borderRadius: 8, backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', fontSize: 13 }}
          >
            {status === 'deleting' ? 'Siliniyor…' : 'Sil'}
          </button>
        )}
        {msg && <span style={{ fontSize: 13, color: status === 'error' ? '#f87171' : '#4ade80' }}>{msg}</span>}
      </div>
    </div>
  );
}
