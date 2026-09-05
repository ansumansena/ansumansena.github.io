import { certifications } from '../data/education';
import { Reveal } from './ui/Reveal';

/** Certifications column. Rendered inside the Background section. */
export function Achievements() {
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        Awards &amp; certifications
      </h3>

      <ul className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {certifications.map((cert, i) => (
          <Reveal as="li" key={cert.name} delay={i * 0.07}>
            <div className="group flex items-baseline justify-between gap-6 py-4 transition-colors duration-300">
              <p
                className={`flex items-baseline gap-2.5 text-[15px] leading-snug transition-colors duration-300 ${
                  cert.award ? 'text-fg' : 'text-muted group-hover:text-fg'
                }`}
              >
                {cert.award && (
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                )}
                {cert.name}
              </p>
              <span
                className={`shrink-0 font-mono text-xs ${cert.award ? 'text-ember' : 'text-faint'}`}
              >
                {cert.period}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
