'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const json = await res.json() as { ok?: boolean; error?: string };
    setLoading(false);

    if (!res.ok) {
      setError(json.error ?? 'Hatalı şifre.');
    } else {
      router.push(params.get('from') ?? '/admin');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
    color: '#e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 28, border: '1px solid rgba(255,255,255,0.08)' }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
        Şifre
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
        placeholder="••••••••"
        autoFocus
      />
      {error && (
        <p style={{ marginTop: 10, fontSize: 13, color: '#f87171', backgroundColor: 'rgba(248,113,113,0.1)', padding: '8px 12px', borderRadius: 8 }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{ marginTop: 16, width: '100%', padding: '12px 0', borderRadius: 10, backgroundColor: '#0ea5e9', color: 'white', fontWeight: 600, fontSize: 14, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
      </button>
    </form>
  );
}
