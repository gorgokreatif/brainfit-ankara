'use client';
import { useState, useEffect } from 'react';

interface Props { onComplete: (score: number) => void; }

interface Round { count: number; normalColor: string; oddColor: string; sizeOdd?: boolean; label: string; }

const ROUNDS: Round[] = [
  { count: 12, normalColor: '#4A90D9', oddColor: '#E74C3C', label: 'Kolay' },
  { count: 16, normalColor: '#27AE60', oddColor: '#E67E22', label: 'Orta' },
  { count: 20, normalColor: '#8E44AD', oddColor: '#F1C40F', label: 'Zor' },
  { count: 24, normalColor: '#1ABC9C', oddColor: '#E74C3C', sizeOdd: true, label: 'Çok Zor' },
];

export default function AttentionGame({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'done'>('intro');
  const [round, setRound] = useState(0);
  const [oddIndex, setOddIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [totalMs, setTotalMs] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const startRound = (r: number) => {
    setOddIndex(Math.floor(Math.random() * ROUNDS[r].count));
    setStartTime(Date.now());
    setFeedback(null);
  };

  const handleClick = (idx: number) => {
    if (phase !== 'playing') return;
    const ms = Date.now() - startTime;
    const isOk = idx === oddIndex;
    if (isOk) {
      setCorrect(c => c + 1);
      setTotalMs(t => t + ms);
      setFeedback('correct');
      const next = round + 1;
      setTimeout(() => {
        if (next < ROUNDS.length) { setRound(next); startRound(next); }
        else setPhase('done');
      }, 450);
    } else {
      setFeedback('wrong');
    }
  };

  useEffect(() => {
    if (phase !== 'done') return;
    const acc = (correct / ROUNDS.length) * 75;
    const avgMs = correct > 0 ? totalMs / correct : 6000;
    const speed = Math.max(0, Math.min(25, 25 - (avgMs - 800) / 300));
    setTimeout(() => onComplete(Math.round(Math.min(100, acc + speed))), 900);
  }, [phase]);

  if (phase === 'intro') return (
    <div className="text-center py-4">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Farklı Olanı Bul!</h3>
      <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: 'rgba(22,32,46,0.62)' }}>
        Renkli noktalar arasındaki farklı renkli noktayı <strong>hızlıca</strong> bul ve dokun. {ROUNDS.length} tur!
      </p>
      <button onClick={() => { setPhase('playing'); startRound(0); }}
        className="px-7 py-3 rounded-2xl font-bold text-white text-base hover:brightness-110 active:scale-95 transition-all"
        style={{ backgroundColor: 'var(--primary)' }}>
        Başla! 🚀
      </button>
    </div>
  );

  if (phase === 'done') return (
    <div className="text-center py-4">
      <div className="text-5xl mb-3">⭐</div>
      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--ink)' }}>{correct}/{ROUNDS.length} Doğru!</h3>
      <p className="text-sm" style={{ color: 'rgba(22,32,46,0.5)' }}>Hesaplanıyor…</p>
    </div>
  );

  const cfg = ROUNDS[round];
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>Tur {round + 1}/{ROUNDS.length} — {cfg.label}</span>
        {feedback && <span className="text-sm font-bold" style={{ color: feedback === 'correct' ? '#16a34a' : '#dc2626' }}>
          {feedback === 'correct' ? '✓ Harika!' : '✗ Devam et!'}
        </span>}
      </div>
      <p className="text-xs text-center mb-3" style={{ color: 'rgba(22,32,46,0.4)' }}>
        {cfg.count} nokta arasından farklı olanı bul!
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', padding: 16, backgroundColor: '#EEF4FF', borderRadius: 20, userSelect: 'none' }}>
        {Array.from({ length: cfg.count }).map((_, i) => (
          <button key={i} onClick={() => handleClick(i)}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              backgroundColor: i === oddIndex ? cfg.oddColor : cfg.normalColor,
              transform: i === oddIndex && cfg.sizeOdd ? 'scale(1.38)' : undefined,
              border: 'none', cursor: 'pointer', flexShrink: 0,
              transition: 'opacity 0.2s',
              WebkitTapHighlightColor: 'transparent',
            }} />
        ))}
      </div>
    </div>
  );
}
