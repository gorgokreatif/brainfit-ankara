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
    <>
      {/* Top bar */}
      <div className="hidden md:block text-xs font-body py-2" style={{ backgroundColor: 'var(--primary-deep)', color: 'rgba(255,255,255,0.85)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between">
          <span>🧠 Türkiye&apos;nin En Kapsamlı Zihin Gelişim Programı</span>
          <div className="flex items-center gap-4">
            <a href="tel:+905001234567" className="hover:text-white transition-colors flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.1 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09A16 16 0 0016.9 17.08l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              0500 123 45 67
            </a>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className="sticky top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled ? '0 2px 32px rgba(22,32,46,0.1)' : '0 1px 0 rgba(22,32,46,0.07)',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/brainfit-ankara-logo.png"
              alt="BrainFit Ankara"
              width={156}
              height={46}
              priority
              style={{ height: 'auto' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-black/5"
                style={{ color: 'var(--ink)', fontFamily: 'var(--font-body)' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/degerlendirme"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-105 hover:shadow-lg active:scale-95"
            style={{ backgroundColor: 'var(--warm)', boxShadow: '0 2px 12px rgba(232,137,59,0.35)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
            Ücretsiz Değerlendirme
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-black/5"
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
          <div className="lg:hidden border-t" style={{ borderColor: 'rgba(22,32,46,0.08)', backgroundColor: 'rgba(255,255,255,0.99)' }}>
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
                className="mt-2 w-full text-center px-5 py-3 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: 'var(--warm)' }}
                onClick={() => setMenuOpen(false)}
              >
                Ücretsiz Değerlendirme
              </Link>
              {/* Mobile social */}
              <div className="flex items-center gap-4 px-3 pt-3 border-t mt-2" style={{ borderColor: 'rgba(22,32,46,0.08)' }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(22,32,46,0.55)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Instagram
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(22,32,46,0.55)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                  YouTube
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
