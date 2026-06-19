import Link from 'next/link';
import Container from './Container';

interface Props {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  dark?: boolean;
}

export default function CtaBlock({ title, body, ctaLabel, ctaHref, dark = false }: Props) {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: dark
          ? 'linear-gradient(135deg, var(--primary-deep) 0%, #0a3660 100%)'
          : 'linear-gradient(135deg, var(--warm) 0%, #d4762a 100%)',
      }}
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctaDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.08)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaDots)"/>
        </svg>
      </div>

      <Container narrow className="relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            🎯 Ücretsiz · Anonim · 5 Dakika
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-5 text-white leading-tight">
            {title}
          </h2>
          <p className="text-lg mb-10 font-body max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.88)' }}>
            {body}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:brightness-105 hover:shadow-xl active:scale-95"
            style={{
              backgroundColor: 'white',
              color: dark ? 'var(--primary-deep)' : 'var(--warm)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
