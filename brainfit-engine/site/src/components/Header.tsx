'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'Programlar', href: '/programlar' },
  { label: 'Zihin Check-Up', href: '/zihin-check-up' },
  { label: 'Değerlendirme', href: '/degerlendirme' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-shadow"
      style={{
        backgroundColor: 'rgba(244,247,251,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 1px 24px rgba(22,32,46,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo.svg" alt="BrainFit Ankara" width={140} height={36} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-body font-medium rounded-lg transition-colors hover:bg-black/5"
              style={{ color: 'var(--ink)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/degerlendirme"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Ücretsiz Değerlendirme
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg"
          aria-label="Menüyü aç/kapat"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
            {menuOpen
              ? <><path d="M3 3l16 16M3 19L19 3"/></>
              : <><path d="M3 5h16M3 11h16M3 17h16"/></>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'rgba(244,247,251,0.98)' }}>
          <nav className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-black/5 transition-colors"
                style={{ color: 'var(--ink)' }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/degerlendirme"
              className="mt-2 w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--primary)' }}
              onClick={() => setMenuOpen(false)}
            >
              Ücretsiz Değerlendirme
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
