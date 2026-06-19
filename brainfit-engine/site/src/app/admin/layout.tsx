import Link from 'next/link';
import AdminLogout from './AdminLogout';

const navLinks = [
  { label: 'Panel', href: '/admin' },
  { label: 'Site Bilgileri', href: '/admin/site' },
  { label: 'Ekip', href: '/admin/team' },
  { label: 'Blog', href: '/admin/blog' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0' }}>
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#1e293b' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#38bdf8', marginRight: 24 }}>BrainFit Admin</span>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 14, color: '#94a3b8', textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
          </div>
          <AdminLogout />
        </div>
      </nav>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>
        {children}
      </main>
    </div>
  );
}
