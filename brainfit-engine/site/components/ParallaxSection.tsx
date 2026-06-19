'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  imageSrc: string;
  className?: string;
  overlayOpacity?: number;
}

export default function ParallaxSection({
  children,
  imageSrc,
  className = '',
  overlayOpacity = 0.65,
}: Props) {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onScroll = () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;
      const rect = section.getBoundingClientRect();
      const offset = rect.top / window.innerHeight;
      bg.style.transform = `translateY(${offset * 28}px) scale(1.08)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(14,27,42,${overlayOpacity})` }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
