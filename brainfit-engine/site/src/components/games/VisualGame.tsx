'use client';
import { useState, useEffect, useRef } from 'react';

interface Props { onComplete: (score: number) => void; }

const SETS = [
  ['🐶','🐱','🐭','🐹','🐰','🦊'],
  ['🍎','🍊','🍋','🍇','🍓','🍑'],
  ['😊','😂','😍','🤔','😎','🥳'],
  ['🚀','🌈','⚡','🌟','🎯','🎮'],
  ['🐬','🦁','🐸','🦋','🐢','🦄'],
  ['🎸','🎺','🥁','🎹','🎻','🎷'],
];

const SHOW_MS = [3800, 3200, 2600, 2200];

type CardPhase = 'show' | 'hide' | 'guess' | 'feedback';

export default function VisualGame({ onComplete }: Props) {
  const [gamePhase, setGamePhase] = useState<'intro' | CardPhase | 'done'>('intro');
  const [round, setRound] = useState(0);
  const [original, setOriginal] = useState<string[]>([]);
  const [modified, setModified] = useState<string[]>([]);
  const [changedIdx, setChangedIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startRound = (r: number) => {
    const setA = SETS[r % SETS.length];
    const setB = SETS[(r + 2) % SETS.length];
    const orig = [...setA].slice(0, 6);
    const ci = Math.floor(Math.random() * 6);
    const mod = [...orig];
    mod[ci] = setB.find(e => !orig.includes(e)) ?? setB[0];
    setOriginal(orig);
    setModified(mod);
    setChangedIdx(ci);
    setFeedback(null);
    setGamePhase('show');
    timerRef.current = setTimeout(() => {
      setGamePhase('hide');
      timerRef.current = setTimeout(() => setGamePhase('guess'), 700);
    }, SHOW_MS[Math.min(r, SHOW_MS.length - 1)]);
  };

  const handlePick = (idx: number) => {
    if (gamePhase !== 'guess') return;
    const ok = idx === changedIdx;
    if (ok) setCorrect(c => c + 1);
    setFeedback(ok ? 'correct' : 'wrong');
    setGamePhase('feedback');
    timerRef.current = setTimeout(() => {
      const next = round + 1;
      if (next < 4) { setRound(next); startRound(next); }
      else setGamePhase('done');
    }, 850);
  };

  // cleanup on unmount only — do NOT clear on every gamePhase change
  // (clearing on phase change cancels the very timer that drives the next transition)
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    if (gamePhase === 'done') {
      const t = setTimeout(() => onComplete(Math.round((correct / 4) * 100)), 900);
      return () => clearTimeout(t);
    }
  }, [gamePhase, correct, onComplete]);

  if (gamePhase === 'intro') return (
    <div className="text-center py-4">
      <div className="text-6xl mb-4">👁️</div>
      <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Ne Değişti?</h3>
      <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: 'rgba(22,32,46,0.62)' }}>
        Kartlara iyi bak! Gizlenecekler, sonra bir tanesi değişecek. <strong>Hangisi değişti?</strong>
      </p>
      <button onClick={() => { setRound(0); startRound(0); }}
        className="px-7 py-3 rounded-2xl font-bold text-white text-base hover:brightness-110 active:scale-95 transition-all"
        style={{ backgroundColor: 'var(--primary)' }}>
        Başla! 🚀
      </button>
    </div>
  );

  if (gamePhase === 'done') return (
    <div className="text-center py-4">
      <div className="text-5xl mb-3">👁️</div>
      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--ink)' }}>{correct}/4 Doğru!</h3>
      <p className="text-sm" style={{ color: 'rgba(22,32,46,0.5)' }}>Hesaplanıyor…</p>
    </div>
  );

  const cards = gamePhase === 'show' ? original : gamePhase === 'hide' ? original.map(() => '❓') : modified;
  const canClick = gamePhase === 'guess';

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>Tur {round + 1}/4</span>
        <span className="text-sm font-semibold" style={{ color: 'rgba(22,32,46,0.55)' }}>
          {gamePhase === 'show' ? '👀 İyi bak!' : gamePhase === 'hide' ? '🙈 Gizleniyor…' : gamePhase === 'guess' ? '🤔 Hangisi değişti?' : feedback === 'correct' ? '✓ Doğru!' : '✗ Yanlış!'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {cards.map((emoji, i) => {
          let bg = 'white';
          if (gamePhase === 'feedback') {
            if (i === changedIdx) bg = feedback === 'correct' ? '#dcfce7' : '#fee2e2';
          }
          return (
            <button key={i} onClick={() => handlePick(i)} disabled={!canClick}
              style={{
                height: 82, borderRadius: 16, backgroundColor: bg,
                border: `2px solid ${canClick ? 'rgba(31,111,178,0.22)' : 'var(--border-subtle)'}`,
                cursor: canClick ? 'pointer' : 'default', fontSize: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s',
                transform: canClick ? undefined : 'scale(1)',
                WebkitTapHighlightColor: 'transparent',
              }}>
              {emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}
