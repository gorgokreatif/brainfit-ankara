'use client';

import { useState } from 'react';

interface FaqItem { q: string; a: string }

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between py-4 text-left font-display font-semibold hover:opacity-75 transition-opacity"
            style={{ color: 'var(--ink)' }}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="pr-4">{item.q}</span>
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform"
              style={{
                backgroundColor: 'var(--primary)',
                transform: open === i ? 'rotate(45deg)' : 'none',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          {open === i && (
            <p className="pb-4 font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.72)' }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
