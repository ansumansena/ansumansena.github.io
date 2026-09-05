import { education } from '../data/education';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Achievements } from './Achievements';

export function Education() {
  return (
    <Section
      id="background"
      index="05"
      title="Background"
      lead="Four years of information technology at OUTR, finished on a merit scholarship, plus what I have won and studied since."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Education</h3>

            <div className="mt-6 rounded-2xl border border-white/[0.07] bg-ink-900/60 p-7 sm:p-8">
              <p className="font-mono text-xs text-signal">
                {education.start} - {education.end}
              </p>
              <h4 className="mt-3 text-2xl font-semibold leading-tight text-fg">{education.degree}</h4>
              <p className="mt-2 text-base text-muted">{education.institution}</p>

              <div className="mt-8 flex flex-wrap items-end gap-8 border-t border-white/[0.07] pt-7">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    {education.scoreLabel}
                  </p>
                  <p className="mt-1.5 font-display text-4xl font-semibold leading-none text-fg">
                    {education.score}
                    <span className="ml-1 text-lg font-normal text-faint">/ {education.scoreOutOf}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2.5 rounded-full border border-ember/25 bg-ember/8 px-4 py-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember" />
                  <p className="font-mono text-[11px] text-ember">{education.honour}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Achievements />
      </div>
    </Section>
  );
}
