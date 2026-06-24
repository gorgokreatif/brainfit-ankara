import Link from 'next/link'

export default function AdminDashboard() {
  const cards = [
    { href: '/admin/ekip', title: 'Ekip Yönetimi', desc: 'Ekip üyelerini ekle, düzenle, sil', icon: '👥', color: '#00B4E5' },
    { href: '/admin/iletisim', title: 'İletişim Bilgileri', desc: 'Telefon, adres, çalışma saatleri', icon: '📍', color: '#51AD32' },
    { href: '/admin/blog', title: 'Blog Yazıları', desc: 'Yazı ekle, düzenle, yayınla', icon: '📝', color: '#CE007F' },
    { href: '/admin/kategoriler', title: 'Kategoriler', desc: 'Blog kategorilerini yönet', icon: '🏷', color: '#F8AF00' },
    { href: '/admin/smtp', title: 'SMTP Ayarları', desc: 'Gmail üzerinden mail gönderimi', icon: '✉️', color: '#E84F2D' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#23231f] mb-2">Dashboard</h1>
      <p className="text-[#6c6c68] mb-8">BrainFit Ankara admin paneline hoş geldiniz.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <Link key={c.href} href={c.href} className="bg-white border border-[#e3ddd5] rounded-[16px] p-6 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl mb-4" style={{ background: `${c.color}18` }}>
              {c.icon}
            </div>
            <h3 className="font-bold text-[#23231f] mb-1 group-hover:text-[#51AD32] transition-colors">{c.title}</h3>
            <p className="text-sm text-[#9a968c]">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
