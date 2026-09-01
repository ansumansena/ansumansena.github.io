import { experience } from '../data/experience';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Tag } from './ui/Tag';

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      title="Experience"
      lead="Two roles so far — one enterprise, one product. Both shipped to real users."
    >
      <ol className="relative">
        {/* The spine of the timeline. */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-signal/40 via-ink-700 to-transparent sm:block"
        />

        {experience.map((role, i) => {
          const isSignal = role.track === 'enterprise';
          return (
            <li key={role.id} className="relative sm:pl-12">
              <Reveal delay={i * 0.1}>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-2 hidden h-[15px] w-[15px] items-center justify-center rounded-full border-2 bg-ink-950 sm:flex ${
                    isSignal ? 'border-signal' : 'border-ember'
                  }`}
                >
                  {role.current && <span className="h-1.5 w-1.5 rounded-full bg-signal" />}
                </span>

                <article className="pb-14">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs">
                    <span className={isSignal ? 'text-signal' : 'text-ember'}>
                      {role.start} — {role.end}
                    </span>
                    {role.current && (
                      <span className="rounded-full border border-signal/30 bg-signal/8 px-2 py-0.5 text-[10px] uppercase tracking-wider text-signal">
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-2xl font-semibold text-fg sm:text-3xl">{role.title}</h3>
                  <p className="mt-1.5 text-base text-muted">
                    {role.company}
                    {role.project && (
                      <>
                        <span aria-hidden="true" className="mx-2 text-ink-600">·</span>
                        <span className="text-fg">{role.project}</span>
                      </>
                    )}
                    {role.team && <span className="text-faint"> — {role.team}</span>}
                  </p>

                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{role.summary}</p>

                  <ul className="mt-6 max-w-2xl space-y-3">
                    {role.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3.5 text-[15px] leading-relaxed text-muted">
                        <span
                          aria-hidden="true"
                          className={`mt-2.5 h-px w-3.5 shrink-0 ${isSignal ? 'bg-signal/50' : 'bg-ember/50'}`}
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {role.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>

                  {role.link && (
                    <a
                      href={role.link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-ember transition-opacity duration-300 hover:opacity-70"
                    >
                      {role.link.label} ↗
                    </a>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
