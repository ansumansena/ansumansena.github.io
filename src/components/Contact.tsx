import { profile } from '../data/profile';
import { Reveal } from './ui/Reveal';
import { ResumeButton } from './ui/ResumeButton';
import { EmailLink } from './ui/EmailLink';

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-white/[0.07]"
    >
      <div className="grid-veil pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-28 sm:px-8 md:py-36">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span aria-hidden="true" className="font-mono text-xs text-signal/70">
              06
            </span>
            <div className="rule flex-1" />
          </div>

          <h2
            id="contact-heading"
            className="mt-8 max-w-3xl text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-fg"
          >
            Building something that needs both halves?
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Enterprise reliability or a product from scratch. I am happy to talk about either. The
            fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <EmailLink variant="display" className="mt-12" />
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <EmailLink variant="button" />
            <ResumeButton variant="outline" className="!px-6 !py-3" />
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-20 overflow-hidden rounded-2xl border border-white/[0.07]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-ink-900/60 px-6 py-4">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                {profile.status.label}
              </h3>
            </div>

            <dl className="grid gap-px bg-white/[0.06] sm:grid-cols-2">
              {[
                { term: 'Looking for', value: profile.openTo.roles, accent: true },
                { term: 'Working with', value: profile.openTo.stack },
                { term: 'Experience', value: profile.openTo.experience },
                { term: 'Based in', value: profile.openTo.location },
              ].map((item) => (
                <div key={item.term} className="bg-ink-900 px-6 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    {item.term}
                  </dt>
                  <dd
                    className={`mt-2 text-[15px] leading-relaxed ${
                      item.accent ? 'text-signal' : 'text-fg'
                    }`}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
