import { motion, useReducedMotion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="stack"
      index="02"
      title="What I work with"
      lead="Grouped by what it is actually for. Teal marks the enterprise and operations side, amber the product side — most weeks I am in both."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const isSignal = group.track === 'enterprise';
          const isLast = gi === skillGroups.length - 1;
          // Stops a ragged final row from exposing the container background.
          const fill = [
            isLast && skillGroups.length % 2 === 1 ? 'sm:col-span-2' : '',
            isLast && skillGroups.length % 3 === 1 ? 'lg:col-span-3' : '',
            isLast && skillGroups.length % 3 === 2 ? 'lg:col-span-2' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <Reveal key={group.id} delay={gi * 0.06} className={fill}>
              <div className="group h-full bg-ink-900 p-6 transition-colors duration-500 hover:bg-ink-850 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${isSignal ? 'bg-signal' : 'bg-ember'}`}
                  />
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {group.label}
                  </h3>
                </div>

                {group.note && (
                  <p className="mt-2.5 font-mono text-[10px] leading-relaxed text-faint">
                    {group.note}
                  </p>
                )}

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.03, ease: [0.25, 1, 0.5, 1] }}
                      className={`cursor-default rounded-md border border-ink-700 bg-ink-850 px-2.5 py-1.5 text-[13px] text-muted transition-colors duration-300 ${
                        isSignal
                          ? 'hover:border-signal/40 hover:text-signal'
                          : 'hover:border-ember/40 hover:text-ember'
                      }`}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
