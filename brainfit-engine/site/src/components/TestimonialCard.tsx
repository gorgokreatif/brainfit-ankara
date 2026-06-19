interface Props {
  quote: string;
  name: string;
  location: string;
  program: string;
}

export default function TestimonialCard({ quote, name, location, program }: Props) {
  const initial = name.charAt(0).toUpperCase();
  const colors = ['#1F6FB2', '#1FA8A0', '#E8893B', '#0E4C82', '#8B5CF6'];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-5 h-full transition-shadow hover:shadow-xl"
      style={{ backgroundColor: 'white', border: '1px solid rgba(22,32,46,0.08)', boxShadow: '0 2px 16px rgba(22,32,46,0.06)' }}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="var(--warm)">
            <path d="M8 1l1.85 3.75L14 5.45l-3 2.92.71 4.13L8 10.4l-3.71 2.1.71-4.13L2 5.45l4.15-.7L8 1z"/>
          </svg>
        ))}
      </div>

      {/* Quote mark */}
      <div style={{ color: 'var(--primary)', opacity: 0.25, lineHeight: 1 }}>
        <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
          <path d="M0 24V14.4C0 9.6 1.6 5.733 4.8 2.8 8.267 0 12.267 0 16.8 0v4C13.6 4 11.2 5.067 9.6 7.2 8 9.067 7.2 11.2 7.2 13.6H12V24H0zm16 0V14.4c0-4.8 1.6-8.667 4.8-11.6C24.267 0 28.267 0 32.8 0v4c-3.2 0-5.6 1.067-7.2 3.2-1.6 1.867-2.4 4-2.4 6.4H28V24H16z"/>
        </svg>
      </div>

      <blockquote className="font-body leading-relaxed flex-1" style={{ color: 'var(--ink)', opacity: 0.82 }}>
        {quote}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'rgba(22,32,46,0.06)' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: colors[colorIndex] }}
        >
          {initial}
        </div>
        <div>
          <p className="font-semibold font-display text-sm" style={{ color: 'var(--ink)' }}>{name}</p>
          <p className="text-xs font-body" style={{ color: 'rgba(22,32,46,0.5)' }}>
            {location} · <span style={{ color: 'var(--primary)' }}>{program}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
