'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/ekip', label: 'Ekip Yönetimi', icon: '👥' },
  { href: '/admin/iletisim', label: 'İletişim Bilgileri', icon: '📍' },
  { href: '/admin/blog', label: 'Blog Yazıları', icon: '📝' },
  { href: '/admin/kategoriler', label: 'Kategoriler', icon: '🏷' },
  { href: '/admin/gorseller', label: 'Sayfa Görselleri', icon: '🖼' },
  { href: '/admin/medya', label: 'Medya Kütüphanesi', icon: '🗂' },
  { href: '/admin/leads', label: 'Test Sonuçları', icon: '📊' },
  { href: '/admin/appointments', label: 'Randevular', icon: '📅' },
  { href: '/admin/smtp', label: 'SMTP Ayarları', icon: '✉️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#23231f] flex flex-col min-h-screen flex-shrink-0">
      <div className="px-6 py-5 border-b border-[#36352f]">
        <Image src="/images/logo.png" alt="BrainFit Ankara" width={120} height={30} style={{ filter: 'brightness(1.2)', height: 28, width: 'auto' }} />
        <p className="text-xs text-[#86826f] mt-1">Admin Paneli</p>
      </div>
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
        {nav.map(item => {
          const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${active ? 'bg-[#51AD32] text-white' : 'text-[#cfcabf] hover:bg-[#2c2b26] hover:text-white'}`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-4 py-4 border-t border-[#36352f]">
        <Link href="/" target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm text-[#86826f] hover:text-white rounded-[10px] hover:bg-[#2c2b26] transition-colors mb-1">
          <span>↗</span> Siteyi Görüntüle
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#86826f] hover:text-red-400 rounded-[10px] hover:bg-[#2c2b26] transition-colors">
          <span>→</span> Çıkış Yap
        </button>
      </div>
    </aside>
  )
}
