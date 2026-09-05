import { profile } from '../data/profile';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { ResumeButton } from './ui/ResumeButton';

const tracks = [
  {
    key: 'enterprise',
    kicker: 'Track 01 · Day',
    title: 'Systems that cannot fail',
    body: 'At TCS I work on Nordea’s cash-pooling platform out of the L3 Cashpool team. That means Java, WebLogic and Ant, Jenkins and JFrog pipelines, and production issue analysis where the answer has to be found rather than guessed. Security patches, configuration fixes, AppDynamics traces, and documentation good enough for the next person on call.',
    marks: ['Production L3 analysis', 'CI/CD ownership', 'Security patching', 'Performance monitoring'],
    accent: 'signal' as const,
  },
  {
    key: 'product',
    kicker: 'Track 02 · Night',
    title: 'Products built end to end',
    body: 'The other half is product work. React and Next.js, TypeScript, Postgres and Drizzle, auth and payments, taken from an empty repository to something deployed. Youstad’s website and ERP platform went live in production and is still serving users; alongside it sit a realtime chat app, a full e-commerce stack with Stripe, and an interview-prep platform on Next.js 15.',
    marks: ['Full-stack ownership', 'Schema to interface', 'Modern React', 'Shipped and deployed'],
    accent: 'ember' as const,
  },
];

export function About() {
  return (
    <Section
      id="about"
      index="01"
      title="Two tracks, one engineer"
      lead={profile.statement}
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {tracks.map((track, i) => {
          const isSignal = track.accent === 'signal';
          return (
            <Reveal key={track.key} delay={i * 0.12}>
              <article
                className={`group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900/60 p-7 transition-colors duration-500 sm:p-9 ${
                  isSignal ? 'hover:border-signal/30' : 'hover:border-ember/30'
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent ${
                    isSignal ? 'from-signal/60' : 'from-ember/60'
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 ${
                    isSignal ? 'bg-signal/12' : 'bg-ember/12'
                  }`}
                />

                <p className={`font-mono text-[11px] tracking-wide ${isSignal ? 'text-signal' : 'text-ember'}`}>
                  {track.kicker}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-fg">{track.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{track.body}</p>

                <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {track.marks.map((mark) => (
                    <li key={mark} className="flex items-center gap-2.5 font-mono text-[11px] text-faint">
                      <span
                        aria-hidden="true"
                        className={`h-1 w-1 shrink-0 rounded-full ${isSignal ? 'bg-signal' : 'bg-ember'}`}
                      />
                      {mark}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Identity card. The portrait is a 200px source, so it is deliberately
          rendered small - large enough to read a face, never large enough to
          look soft. It also carries the resume download. */}
      <Reveal delay={0.16}>
        <div className="group/id mt-6 flex flex-col gap-6 rounded-2xl border border-white/[0.07] bg-ink-900/60 p-6 transition-colors duration-500 hover:border-signal/25 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <img
                src={profile.photo}
                alt={profile.photoAlt}
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/10 saturate-[0.85] brightness-[0.88] transition-[filter] duration-500 group-hover/id:saturate-100 group-hover/id:brightness-100"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-ink-900 bg-ink-850"
              >
                <span className="h-2 w-2 rounded-full bg-signal" />
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-lg font-medium text-fg">{profile.name}</p>
              <p className="mt-1 text-sm text-muted">{profile.role}</p>
              <p className="mt-1 font-mono text-[11px] text-faint">{profile.location}</p>
            </div>
          </div>

          <ResumeButton className="shrink-0 self-start sm:self-auto" />
        </div>
      </Reveal>
    </Section>
  );
}
