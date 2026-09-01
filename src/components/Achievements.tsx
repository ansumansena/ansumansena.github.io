import { certifications } from '../data/education';
import { Reveal } from './ui/Reveal';

/** Certifications column. Rendered inside the Background section. */
export function Achievements() {
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        Certifications &amp; programmes
      </h3>

      <ul className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {certifications.map((cert, i) => (
          <Reveal as="li" key={cert.name} delay={i * 0.07}>
            <div className="group flex items-baseline justify-between gap-6 py-4 transition-colors duration-300">
              <p className="text-[15px] leading-snug text-muted transition-colors duration-300 group-hover:text-fg">
                {cert.name}
              </p>
              <span className="shrink-0 font-mono text-xs text-faint">{cert.period}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
