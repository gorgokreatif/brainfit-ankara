interface Props {
  quote: string;
  name: string;
  location: string;
  program: string;
}

export default function TestimonialCard({ quote, name, location, program }: Props) {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-4"
      style={{ backgroundColor: 'white', border: '1px solid var(--border-subtle)' }}
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="var(--warm)">
            <path d="M8 1l1.85 3.75L14 5.45l-3 2.92.71 4.13L8 10.4l-3.71 2.1.71-4.13L2 5.45l4.15-.7L8 1z"/>
          </svg>
        ))}
      </div>
      <blockquote className="font-body leading-relaxed italic" style={{ color: 'var(--ink)' }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-auto">
        <p className="font-semibold font-display text-sm" style={{ color: 'var(--ink)' }}>{name}</p>
        <p className="text-xs font-body" style={{ color: 'rgba(22,32,46,0.55)' }}>
          {location} · {program}
        </p>
      </div>
    </div>
  );
}
