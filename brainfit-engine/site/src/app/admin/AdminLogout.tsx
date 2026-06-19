'use client';

export default function AdminLogout() {
  const handleLogout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    window.location.href = '/admin/login';
  };

  return (
    <button
      onClick={handleLogout}
      style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
    >
      Çıkış
    </button>
  );
}
