import { Suspense } from 'react';
import AdminLoginForm from './AdminLoginForm';

export const metadata = { title: 'Admin Girişi — BrainFit' };

export default function AdminLoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 20px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#38bdf8', marginBottom: 8, textAlign: 'center' }}>BrainFit Admin</h1>
        <p style={{ fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 32 }}>Panele erişmek için şifrenizi girin.</p>
        <Suspense fallback={<div style={{ height: 160 }} />}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
