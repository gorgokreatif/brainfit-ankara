'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Props { onComplete: (score: number) => void; }

interface Balloon { id: number; x: number; y: number; color: string; active: boolean; }

const TOTAL = 12;
const LIFETIME = 1350;
const COLORS = ['#FF6B6B','#4ECDC4','#45B7D1','#FFA07A','#BB8FCE','#82E0AA','#F7DC6F','#FF9FF3'];

export default function MotorGame({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'done'>('intro');
  const [balloon, setBalloon] = useState<Balloon | null>(null);
  const [hits, setHits] = useState(0);
  const [spawned, setSpawned] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hitsRef = useRef(0);
  const spawnedRef = useRef(0);

  const spawn = useCallback((idx: number) => {
    if (idx >= TOTAL) { setTimeout(() => setPhase('done'), 500); return; }
    spawnedRef.current = idx + 1;
    setSpawned(idx + 1);
    setBalloon({
      id: idx,
      x: 10 + Math.random() * 72,
      y: 8 + Math.random() * 70,
      color: COLORS[idx % COLORS.length],
      active: true,
    });
    timerRef.current = setTimeout(() => {
      setBalloon(null);
      setTimeout(() => spawn(idx + 1), 180);
    }, LIFETIME);
  }, []);

  const pop = (id: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBalloon(null);
    hitsRef.current += 1;
    setHits(h => h + 1);
    setTimeout(() => spawn(id + 1), 130);
  };

  useEffect(() => {
    if (phase === 'done') {
      setTimeout(() => onComplete(Math.round((hitsRef.current / TOTAL) * 100)), 800);
    }
  }, [phase]);

  if (phase === 'intro') return (
    <div className="text-center py-4">
      <div className="text-6xl mb-4 float-loop inline-block">🎈</div>
      <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Balonları Patlat!</h3>
      <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: 'rgba(22,32,46,0.62)' }}>
        Ekranda beliren balonlara <strong>hızlıca</strong> dokun veya tıkla! Kaybolmadan önce yakala. {TOTAL} balon gelecek.
      </p>
      <button onClick={() => { setPhase('playing'); setTimeout(() => spawn(0), 350); }}
        className="px-7 py-3 rounded-2xl font-bold text-white text-base hover:brightness-110 active:scale-95 transition-all"
        style={{ backgroundColor: 'var(--primary)' }}>
        Başla! 🚀
      </button>
    </div>
  );

  if (phase === 'done') return (
    <div className="text-center py-4">
      <div className="text-5xl mb-3">🎯</div>
      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--ink)' }}>{hitsRef.current}/{TOTAL} Balon Patlatıldı!</h3>
      <p className="text-sm" style={{ color: 'rgba(22,32,46,0.5)' }}>Hesaplanıyor…</p>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>🎈 {hits} patlatıldı</span>
        <span className="text-sm" style={{ color: 'rgba(22,32,46,0.5)' }}>{spawned}/{TOTAL}</span>
      </div>
      <div style={{
        position: 'relative', height: 300,
        background: 'linear-gradient(160deg,#EEF6FF 0%,#F0FFF4 100%)',
        borderRadius: 20, border: '2px dashed rgba(31,111,178,0.22)',
        overflow: 'hidden', userSelect: 'none',
      }}>
        {/* progress dots */}
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: i < hits ? 'var(--accent)' : 'rgba(22,32,46,0.15)', transition: 'background-color 0.2s' }} />
          ))}
        </div>

        {balloon && (
          <button onClick={() => pop(balloon.id)} className="pop-in"
            style={{
              position: 'absolute', left: `${balloon.x}%`, top: `${balloon.y}%`,
              transform: 'translate(-50%,-50%)',
              width: 64, height: 64, borderRadius: '50%',
              backgroundColor: balloon.color, border: 'none', cursor: 'pointer',
              fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 24px ${balloon.color}70`,
              WebkitTapHighlightColor: 'transparent',
            }}>
            🎈
          </button>
        )}
      </div>
    </div>
  );
}
