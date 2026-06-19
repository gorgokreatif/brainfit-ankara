'use client';
import { useState, useRef, useEffect } from 'react';

interface Props { onComplete: (score: number) => void; }

const BTN_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
const BTN_EMOJIS = ['🔴', '🟢', '🔵', '🟡'];
const FREQS = [261.63, 349.23, 392.00, 523.25]; // C4 F4 G4 C5
const ROUNDS = [3, 4, 5]; // sequence lengths per round

function beep(ctx: AudioContext, freq: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.01);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.44);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.5);
}

export default function AuditoryGame({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'showing' | 'input' | 'feedback' | 'done'>('intro');
  const [round, setRound] = useState(0);
  const [seq, setSeq] = useState<number[]>([]);
  const [input, setInput] = useState<number[]>([]);
  const [lit, setLit] = useState(-1);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  const playSeq = (sequence: number[]) => {
    sequence.forEach((btn, i) => {
      setTimeout(() => {
        setLit(btn);
        if (ctxRef.current) beep(ctxRef.current, FREQS[btn]);
        setTimeout(() => setLit(-1), 470);
      }, i * 720 + 300);
    });
    setTimeout(() => setPhase('input'), sequence.length * 720 + 700);
  };

  const beginRound = (r: number) => {
    const len = ROUNDS[r];
    const s = Array.from({ length: len }, () => Math.floor(Math.random() * 4));
    setSeq(s);
    setInput([]);
    setFeedback(null);
    setPhase('showing');
    playSeq(s);
  };

  const handleBtn = (idx: number) => {
    if (phase !== 'input') return;
    if (ctxRef.current) beep(ctxRef.current, FREQS[idx]);
    setLit(idx);
    setTimeout(() => setLit(-1), 280);

    const newInput = [...input, idx];
    setInput(newInput);
    const pos = newInput.length - 1;

    if (newInput[pos] !== seq[pos]) {
      setFeedback('wrong');
      setPhase('feedback');
      advance(false);
      return;
    }
    if (newInput.length === seq.length) {
      setCorrect(c => c + 1);
      setFeedback('correct');
      setPhase('feedback');
      advance(true);
    }
  };

  const advance = (wasCorrect: boolean) => {
    void wasCorrect;
    setTimeout(() => {
      const next = round + 1;
      if (next < ROUNDS.length) { setRound(next); beginRound(next); }
      else setPhase('done');
    }, 900);
  };

  useEffect(() => {
    if (phase !== 'done') return;
    setTimeout(() => onComplete(Math.round((correct / ROUNDS.length) * 100)), 900);
  }, [phase]);

  if (phase === 'intro') return (
    <div className="text-center py-4">
      <div className="text-6xl mb-4">👂</div>
      <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Sırayı Hatırla!</h3>
      <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: 'rgba(22,32,46,0.62)' }}>
        Renkli düğmeler ışıklanacak ve ses çıkaracak. Gördüğün sırayla <strong>tekrar et!</strong> {ROUNDS.length} tur.
      </p>
      <button onClick={() => { ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); setRound(0); beginRound(0); }}
        className="px-7 py-3 rounded-2xl font-bold text-white text-base hover:brightness-110 active:scale-95 transition-all"
        style={{ backgroundColor: 'var(--primary)' }}>
        Başla! 🚀
      </button>
    </div>
  );

  if (phase === 'done') return (
    <div className="text-center py-4">
      <div className="text-5xl mb-3">🎵</div>
      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--ink)' }}>{correct}/{ROUNDS.length} Tur Tamamlandı!</h3>
      <p className="text-sm" style={{ color: 'rgba(22,32,46,0.5)' }}>Hesaplanıyor…</p>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
          Tur {round + 1}/{ROUNDS.length} — {ROUNDS[round]} adım
        </span>
        <span className="text-sm font-semibold" style={{ color: 'rgba(22,32,46,0.55)' }}>
          {phase === 'showing' ? '🔊 Dinle…' : phase === 'input' ? '👆 Sırayla dokun!' : feedback === 'correct' ? '✓ Doğru!' : '✗ Yanlış!'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {BTN_COLORS.map((color, i) => (
          <button key={i} onClick={() => handleBtn(i)} disabled={phase !== 'input'}
            style={{
              height: 88, borderRadius: 20, backgroundColor: color,
              opacity: lit === i ? 1 : 0.5,
              border: 'none', cursor: phase === 'input' ? 'pointer' : 'default',
              transform: lit === i ? 'scale(1.07)' : 'scale(1)',
              transition: 'all 0.13s ease', fontSize: 36,
              boxShadow: lit === i ? `0 0 22px ${color}90` : 'none',
              WebkitTapHighlightColor: 'transparent',
            }}>
            {BTN_EMOJIS[i]}
          </button>
        ))}
      </div>

      {phase === 'input' && (
        <div className="flex justify-center gap-2">
          {seq.map((_, i) => (
            <div key={i} style={{
              width: 13, height: 13, borderRadius: '50%',
              backgroundColor: i < input.length ? 'var(--accent)' : 'rgba(22,32,46,0.15)',
              transition: 'background-color 0.2s',
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
