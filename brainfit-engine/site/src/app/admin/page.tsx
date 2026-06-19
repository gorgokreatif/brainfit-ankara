import Link from 'next/link';

export const metadata = { title: 'Admin Panel — BrainFit' };

const sections = [
  { href: '/admin/site', title: 'Site Bilgileri', desc: 'Telefon, adres, e-posta, sosyal medya, footer metinleri.', icon: '⚙️' },
  { href: '/admin/team', title: 'Ekibimiz', desc: 'Ekip üyelerini ekle, düzenle veya sil.', icon: '👥' },
  { href: '/admin/blog', title: 'Blog', desc: 'Yazıları yönet, yeni yazı oluştur.', icon: '📝' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Yönetim Paneli</h1>
        <p style={{ fontSize: 14, color: '#64748b' }}>
          Değişiklikleri yaptıktan sonra terminalde <code style={{ backgroundColor: '#1e293b', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>git add -A && git commit -m &quot;içerik güncellendi&quot; && git push</code> çalıştırın — Vercel otomatik yayınlar.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{ padding: 24, borderRadius: 14, backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'border-color 0.15s' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>{s.title}</h2>
              <p style={{ fontSize: 13, color: '#64748b' }}>{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 40, padding: 20, borderRadius: 12, backgroundColor: '#1e293b', border: '1px solid rgba(56,189,248,0.2)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#38bdf8', marginBottom: 8 }}>Yayınlama İş Akışı (Option A)</h3>
        <ol style={{ fontSize: 13, color: '#94a3b8', paddingLeft: 20, lineHeight: 1.8 }}>
          <li>Bu panelden içerik dosyalarını düzenleyin ve kaydedin.</li>
          <li>Terminalde: <code style={{ backgroundColor: '#0f172a', padding: '1px 5px', borderRadius: 4 }}>git add -A && git commit -m &quot;içerik güncellendi&quot; && git push</code></li>
          <li>Vercel otomatik deploy başlar ve ~1 dakikada yayınlanır.</li>
        </ol>
      </div>
    </div>
  );
}
