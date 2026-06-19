'use client';

import { useState, useCallback } from 'react';
import Button from './Button';
import Container from './Container';

interface Question {
  id: string;
  area: string;
  text: string;
  type: string;
  options: Array<{ label: string; score: number }>;
}

interface Area {
  id: string;
  label: string;
  color: string;
  description: string;
}

interface AssessmentData {
  intro: { headline: string; description: string; cta: string; note: string };
  questions: Question[];
  areas: Area[];
  optIn: {
    title: string;
    description: string;
    fields: Array<{ id: string; label: string; type: string; required: boolean }>;
    kvkk: string;
    submitLabel: string;
  };
  result: {
    title: string;
    intro: string;
    lowScore: { label: string; description: string };
    midScore: { label: string; description: string };
    highScore: { label: string; description: string };
    cta: { primary: { label: string; href: string }; whatsapp: string };
  };
}

const MAX_SCORES: Record<string, number> = {
  dikkat: 8,
  isitsel: 4,
  gorsel: 8,
  motor: 4,
  'sosyal-duygusal': 4,
};

type Step = 'intro' | 'quiz' | 'optin' | 'result';

export default function Assessment({ data, whatsapp }: { data: AssessmentData; whatsapp: string }) {
  const [step, setStep] = useState<Step>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Form state
  const [form, setForm] = useState({ name: '', phone: '', email: '', childAge: '', website: '' });
  const [kvkk, setKvkk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { intro, questions, areas, optIn, result: resultCfg } = data;

  const computeAreaScores = useCallback((): Record<string, number> => {
    const scores: Record<string, number> = {};
    for (const area of areas) scores[area.id] = 0;
    for (const q of questions) {
      const score = answers[q.id] ?? 0;
      scores[q.area] = (scores[q.area] ?? 0) + score;
    }
    return scores;
  }, [areas, questions, answers]);

  const handleStart = () => {
    setStep('quiz');
    setCurrentQ(0);
    setAnswers({});
    setSelectedOption(null);
  };

  const handleOptionSelect = (score: number, idx: number) => {
    setSelectedOption(idx);
    const q = questions[currentQ];
    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((c) => c + 1);
        setSelectedOption(null);
      } else {
        setStep('optin');
        setSelectedOption(null);
      }
    }, 420);
  };

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkk) { setSubmitError('KVKK onayı gereklidir.'); return; }
    setSubmitting(true);
    setSubmitError('');

    try {
      const areaScores = computeAreaScores();
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          childAge: form.childAge,
          website: form.website, // honeypot
          areaScores,
          answers,
        }),
      });
      const json = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok) {
        setSubmitError(json.error ?? 'Bir hata oluştu. Lütfen tekrar deneyin.');
      } else {
        setStep('result');
      }
    } catch {
      setSubmitError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── INTRO ─────────────────────────────────────────────────────── */
  if (step === 'intro') {
    return (
      <section className="min-h-screen flex items-center" style={{ backgroundColor: 'var(--paper)' }}>
        <Container narrow className="py-20 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-8"
            style={{ backgroundColor: 'rgba(31,111,178,0.1)', color: 'var(--primary)' }}
          >
            Ücretsiz · Anonim · 2 Dakika
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: 'var(--ink)' }}>
            {intro.headline}
          </h1>
          <p className="text-lg font-body mb-10 max-w-xl mx-auto" style={{ color: 'rgba(22,32,46,0.65)' }}>
            {intro.description}
          </p>
          <Button size="lg" onClick={handleStart}>{intro.cta}</Button>
          <p className="mt-6 text-sm font-body" style={{ color: 'rgba(22,32,46,0.45)' }}>{intro.note}</p>

          {/* Area chips preview */}
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            {areas.map((a) => (
              <span
                key={a.id}
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ backgroundColor: a.color + '18', color: a.color }}
              >
                {a.label}
              </span>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  /* ── QUIZ ─────────────────────────────────────────────────────── */
  if (step === 'quiz') {
    const q = questions[currentQ];
    const progress = ((currentQ) / questions.length) * 100;
    const area = areas.find((a) => a.id === q.area);

    return (
      <section className="min-h-screen flex items-center" style={{ backgroundColor: 'var(--paper)' }}>
        <Container narrow className="py-16">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-body" style={{ color: 'rgba(22,32,46,0.5)' }}>
                Soru {currentQ + 1} / {questions.length}
              </span>
              {area && (
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: area.color + '18', color: area.color }}
                >
                  {area.label}
                </span>
              )}
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(22,32,46,0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: 'var(--primary)' }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-8 text-center" style={{ color: 'var(--ink)' }}>
            {q.text}
          </h2>

          {/* Option cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt.score, idx)}
                  disabled={selectedOption !== null}
                  className="text-left p-5 rounded-2xl font-body transition-all duration-200 hover:shadow-md active:scale-98"
                  style={{
                    backgroundColor: isSelected ? 'var(--primary)' : 'white',
                    color: isSelected ? 'white' : 'var(--ink)',
                    border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-subtle)',
                    cursor: selectedOption !== null ? 'default' : 'pointer',
                  }}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--paper)',
                        color: isSelected ? 'white' : 'var(--primary)',
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>
    );
  }

  /* ── OPT-IN FORM ───────────────────────────────────────────────── */
  if (step === 'optin') {
    return (
      <section className="min-h-screen flex items-center" style={{ backgroundColor: 'var(--paper)' }}>
        <Container narrow className="py-16">
          <div
            className="rounded-3xl p-8 md:p-12 shadow-xl bg-white"
            style={{ border: '1px solid var(--border-subtle)' }}
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2" style={{ color: 'var(--ink)' }}>
                {optIn.title}
              </h2>
              <p className="font-body" style={{ color: 'rgba(22,32,46,0.6)' }}>{optIn.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot - hidden from real users */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => handleFormChange('website', e.target.value)}
                tabIndex={-1}
                aria-hidden
                style={{ position: 'absolute', left: '-9999px' }}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                {optIn.fields.map((field) => (
                  <div key={field.id} className={field.id === 'name' ? 'sm:col-span-2' : ''}>
                    <label className="block text-sm font-semibold font-display mb-1.5" style={{ color: 'var(--ink)' }}>
                      {field.label}
                      {field.required && <span style={{ color: 'var(--warm)' }}> *</span>}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => handleFormChange(field.id, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl font-body transition-colors"
                      style={{
                        border: '2px solid var(--border-subtle)',
                        backgroundColor: 'var(--paper)',
                        color: 'var(--ink)',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                    />
                  </div>
                ))}
              </div>

              <label className="flex items-start gap-3 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={kvkk}
                  onChange={(e) => setKvkk(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded"
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span className="text-xs font-body leading-relaxed" style={{ color: 'rgba(22,32,46,0.6)' }}>
                  {optIn.kvkk}{' '}
                  <a href="/kvkk" className="underline hover:opacity-75" style={{ color: 'var(--primary)' }}>
                    Aydınlatma Metni
                  </a>&apos;ni okudum, onaylıyorum.
                </span>
              </label>

              {submitError && (
                <p className="text-sm font-body p-3 rounded-xl" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full mt-2"
              >
                {submitting ? 'Gönderiliyor…' : optIn.submitLabel}
              </Button>
            </form>
          </div>
        </Container>
      </section>
    );
  }

  /* ── RESULT ────────────────────────────────────────────────────── */
  const areaScores = computeAreaScores();
  const waMsg = encodeURIComponent(resultCfg.cta.whatsapp);

  return (
    <section className="min-h-screen" style={{ backgroundColor: 'var(--paper)' }}>
      <Container className="py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3" style={{ color: 'var(--ink)' }}>
              {resultCfg.title}
            </h1>
            <p className="font-body text-sm max-w-lg mx-auto" style={{ color: 'rgba(22,32,46,0.6)' }}>
              {resultCfg.intro}
            </p>
          </div>

          {/* Bar chart */}
          <div
            className="rounded-3xl p-6 md:p-8 mb-8 bg-white shadow-lg"
            style={{ border: '1px solid var(--border-subtle)' }}
          >
            <div className="space-y-5">
              {areas.map((area) => {
                const score = areaScores[area.id] ?? 0;
                const max = MAX_SCORES[area.id] ?? 4;
                const pct = Math.round((score / max) * 100);
                const tag =
                  pct >= 60 ? resultCfg.highScore
                  : pct >= 30 ? resultCfg.midScore
                  : resultCfg.lowScore;
                const barColor = pct >= 60 ? '#e53e3e' : pct >= 30 ? 'var(--warm)' : 'var(--accent)';

                return (
                  <div key={area.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold font-display text-sm" style={{ color: 'var(--ink)' }}>
                          {area.label}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            backgroundColor: barColor + '18',
                            color: barColor,
                          }}
                        >
                          {tag.label}
                        </span>
                      </div>
                      <span className="text-xs font-body" style={{ color: 'rgba(22,32,46,0.45)' }}>
                        %{pct}
                      </span>
                    </div>
                    {/* SVG bar */}
                    <svg width="100%" height="8" className="rounded-full overflow-hidden">
                      <rect x="0" y="0" width="100%" height="8" fill="rgba(22,32,46,0.08)" rx="4"/>
                      <rect
                        x="0" y="0"
                        width={`${pct}%`} height="8"
                        fill={barColor} rx="4"
                        style={{ transition: 'width 1s ease' }}
                      />
                    </svg>
                    <p className="text-xs font-body mt-1" style={{ color: 'rgba(22,32,46,0.55)' }}>
                      {tag.description} — {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA block */}
          <div
            className="rounded-3xl p-6 md:p-8 text-center"
            style={{ backgroundColor: 'var(--primary-deep)', color: 'white' }}
          >
            <h2 className="text-xl md:text-2xl font-display font-bold mb-3 text-white">
              Bir uzmanla bu profili birlikte değerlendirin
            </h2>
            <p className="font-body text-sm mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Ücretsiz değerlendirme görüşmesinde bir uzmanımız sonuçlarınızı açıklar ve sonraki adımları birlikte planlar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href={resultCfg.cta.primary.href} variant="secondary" size="lg">
                {resultCfg.cta.primary.label}
              </Button>
              <Button
                href={`https://wa.me/${whatsapp}?text=${waMsg}`}
                variant="outline"
                size="lg"
                external
                className="border-white/40 text-white hover:bg-white/10"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp ile Ulaş
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
