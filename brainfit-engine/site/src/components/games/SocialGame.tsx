'use client';
import { useState, useEffect } from 'react';

interface Props { onComplete: (score: number) => void; }

const QS = [
  { scene: '👦 🎂 🎉', text: "Ali bugün doğum günü. Arkadaşları sürpriz parti yaptı.", q: "Ali nasıl hisseder?", ok: 0, opts: ['Mutlu 😊','Üzgün 😢','Kızgın 😠','Korkmuş 😨'] },
  { scene: '👧 📚 😰', text: "Ayşe sınavına çalışmadı, yarın sınav var.", q: "Ayşe nasıl hisseder?", ok: 3, opts: ['Mutlu 😊','Heyecanlı 🤩','Kızgın 😠','Endişeli 😰'] },
  { scene: '👦 🏆 ⚽', text: "Takımı maçı kazandı. Herkes Ahmet'i kutluyor.", q: "Ahmet nasıl hisseder?", ok: 2, opts: ['Üzgün 😢','Korkmuş 😨','Gururlu 🤩','Sinirli 😠'] },
  { scene: '👧 🎨 😟', text: "Zeynep çizdiği resmi gösterdi ama sınıf güldü.", q: "Zeynep nasıl hisseder?", ok: 1, opts: ['Heyecanlı 🤩','Üzgün 😢','Mutlu 😊','Şaşkın 😲'] },
  { scene: '👦 🐶 🏡', text: "Okuldan dönen Ali, köpeğinin kaybolduğunu öğrendi.", q: "Ali nasıl hisseder?", ok: 0, opts: ['Üzgün 😢','Mutlu 😊','Kızgın 😠','Sakin 😐'] },
];

export default function SocialGame({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'done'>('intro');
  const [qi, setQi] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const ok = i === QS[qi].ok;
    if (ok) setCorrect(c => c + 1);
    setFeedback(ok ? 'correct' : 'wrong');
    setTimeout(() => {
      if (qi + 1 < QS.length) { setQi(q => q + 1); setSelected(null); setFeedback(null); }
      else setPhase('done');
    }, 850);
  };

  useEffect(() => {
    if (phase === 'done') {
      setTimeout(() => onComplete(Math.round((correct / QS.length) * 100)), 900);
    }
  }, [phase]);

  if (phase === 'intro') return (
    <div className="text-center py-4">
      <div className="text-6xl mb-4">🤝</div>
      <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Nasıl Hisseder?</h3>
      <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: 'rgba(22,32,46,0.62)' }}>
        Kısa bir hikaye okuyacaksın. Karakterin nasıl hissetttiğini tahmin et! {QS.length} soru.
      </p>
      <button onClick={() => setPhase('playing')}
        className="px-7 py-3 rounded-2xl font-bold text-white text-base hover:brightness-110 active:scale-95 transition-all"
        style={{ backgroundColor: 'var(--primary)' }}>
        Başla! 🚀
      </button>
    </div>
  );

  if (phase === 'done') return (
    <div className="text-center py-4">
      <div className="text-5xl mb-3">🤝</div>
      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--ink)' }}>{correct}/{QS.length} Doğru!</h3>
      <p className="text-sm" style={{ color: 'rgba(22,32,46,0.5)' }}>Hesaplanıyor…</p>
    </div>
  );

  const q = QS[qi];
  return (
    <div key={qi} className="quiz-enter">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{qi + 1}/{QS.length}</span>
        <span className="text-sm" style={{ color: 'rgba(22,32,46,0.5)' }}>{correct} ✓</span>
      </div>

      <div className="rounded-2xl p-5 mb-4 text-center" style={{ background: 'linear-gradient(135deg,#EEF4FF,#F0FFF4)', border: '1px solid rgba(31,111,178,0.15)' }}>
        <div className="text-4xl mb-3 tracking-widest">{q.scene}</div>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--ink)' }}>{q.text}</p>
        <p className="text-xs font-bold" style={{ color: 'var(--primary)' }}>{q.q}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {q.opts.map((opt, i) => {
          let bg = 'white';
          let border = 'var(--border-subtle)';
          if (selected !== null) {
            if (i === q.ok) { bg = '#dcfce7'; border = '#34d399'; }
            else if (i === selected && feedback === 'wrong') { bg = '#fee2e2'; border = '#f87171'; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
              style={{
                padding: '12px 8px', borderRadius: 14, backgroundColor: bg,
                border: `2px solid ${border}`, cursor: selected !== null ? 'default' : 'pointer',
                fontSize: 14, fontWeight: 600, color: 'var(--ink)', transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
              }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
