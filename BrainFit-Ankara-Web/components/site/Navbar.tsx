'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Biz Kimiz?', href: '/biz-kimiz' },
  { label: 'Ekibimiz', href: '/ekibimiz' },
  { label: 'Programlar', href: '/programlar' },
  { label: 'Ne Yapıyoruz?', href: '/ne-yapiyoruz' },
  { label: 'Nasıl Yapıyoruz?', href: '/nasil-yapiyoruz' },
  { label: 'Cog-Map', href: '/cog-map' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#eae6df]" style={{ background: 'rgba(248,246,242,.88)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-3 flex items-center gap-3">
        {/* Logo — mobile'da küçük, desktop'ta normal */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="BrainFit Ankara"
            width={340}
            height={30}
            className="h-[22px] lg:h-[28px] w-auto"
            priority
          />
        </Link>

        {/* Desktop sağ butonlar */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto">
          <Link href="/iletisim" className="bf-lift bg-[#51AD32] text-white px-4 py-2.5 rounded-[10px] text-sm font-semibold whitespace-nowrap shadow-[0_6px_16px_rgba(81,173,50,.28)]" style={{ color: '#fff' }}>
            Ücretsiz Ön Görüşme
          </Link>
          <a href="https://wa.me/" target="_blank" className="bf-lift bg-[#25D366] w-10 h-10 rounded-[10px] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2 0 .4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l2 1c.3.1.4.2.5.3.1.2.1.6-.1 1.3Z"/></svg>
          </a>
        </div>

        {/* Mobile: Ön Görüşme butonu + hamburger */}
        <div className="lg:hidden ml-auto flex items-center gap-2">
          <Link
            href="/iletisim"
            className="bg-[#51AD32] px-3.5 py-2 rounded-[9px] text-xs font-bold whitespace-nowrap"
            style={{ color: '#fff' }}
          >
            Ön Görüşme
          </Link>
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menü"
            className="bg-white border-[1.5px] border-[#e3ded5] w-12 h-12 rounded-[11px] flex items-center justify-center flex-col gap-[5px] flex-shrink-0"
          >
            <span className="w-5 h-0.5 bg-[#3a3a38] rounded block" />
            <span className="w-5 h-0.5 bg-[#3a3a38] rounded block" />
            <span className="w-5 h-0.5 bg-[#3a3a38] rounded block" />
          </button>
        </div>
      </div>

      {/* Desktop nav bar */}
      <nav className="hidden lg:flex items-center justify-center gap-1 bg-[#C8401C] px-6 py-[5px]">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{ color: '#fff', fontSize: 15 }}
            className="px-[15px] py-[11px] font-semibold tracking-[.005em] transition-opacity hover:opacity-80"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#eae6df] bg-[#F8F6F2] px-4 py-3 flex flex-col gap-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-left py-3 px-3 text-base font-medium rounded-lg ${pathname === item.href ? 'text-[#C8401C] bg-white' : 'text-[#3a3a38]'}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-[#eae6df] flex gap-2">
            <Link
              href="/iletisim"
              onClick={() => setMenuOpen(false)}
              className="flex-1 bg-[#51AD32] py-3 rounded-[10px] text-center text-sm font-bold"
              style={{ color: '#fff' }}
            >
              Ücretsiz Ön Görüşme
            </Link>
            <a
              href="https://wa.me/"
              target="_blank"
              className="bg-[#25D366] w-12 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2 0 .4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l2 1c.3.1.4.2.5.3.1.2.1.6-.1 1.3Z"/></svg>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
