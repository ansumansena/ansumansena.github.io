import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignalField } from '../components/SignalField';

/**
 * 404 styled as an L3 incident ticket — which is genuinely what Ansuman does
 * for a living, so the joke lands rather than being decoration.
 */
const lines = [
  { at: '00:00.02', level: 'INFO', text: 'GET request received' },
  { at: '00:00.04', level: 'WARN', text: 'route not found in manifest' },
  { at: '00:00.09', level: 'ERROR', text: 'HTTP 404: no handler matched' },
  { at: '00:00.11', level: 'INFO', text: 'severity: low · impact: one curious visitor' },
  { at: '00:00.14', level: 'INFO', text: 'suggested fix: return to /' },
];

const levelTone: Record<string, string> = {
  INFO: 'text-faint',
  WARN: 'text-ember',
  ERROR: 'text-red-400',
};

export default function NotFound() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    document.title = 'Page not found · Ansuman Senapati';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      setShown(lines.length);
      return;
    }

    const timer = window.setInterval(() => {
      setShown((n) => {
        if (n >= lines.length) {
          window.clearInterval(timer);
          return n;
        }
        return n + 1;
      });
    }, 320);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-veil pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 opacity-50" aria-hidden="true">
        <SignalField />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-3xl px-5 py-24 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Incident report</p>

        <h1 className="mt-6 font-display text-[clamp(4rem,18vw,10rem)] font-bold leading-none tracking-tight text-fg">
          404
        </h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">
          This route was never deployed. Everything else is fine.
        </p>

        <div
          className="mt-10 overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900/80 backdrop-blur-sm"
          role="log"
          aria-label="Simulated server log"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-ember/70" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-signal/70" />
            <span className="ml-2 font-mono text-[11px] text-faint">application.log</span>
          </div>

          <div className="overflow-x-auto p-4 sm:p-5">
            <pre className="font-mono text-[12px] leading-relaxed sm:text-[13px]">
              {lines.slice(0, shown).map((line) => (
                <div key={line.at} className="whitespace-pre">
                  <span className="text-ink-600">{line.at}</span>{' '}
                  <span className={levelTone[line.level]}>{line.level.padEnd(5)}</span>{' '}
                  <span className="text-muted">{line.text}</span>
                </div>
              ))}
              {shown < lines.length && (
                <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-signal" aria-hidden="true" />
              )}
            </pre>
          </div>
        </div>

        <Link
          to="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink-950 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-signal)_82%,white)]"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">
            &#8592;
          </span>
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
