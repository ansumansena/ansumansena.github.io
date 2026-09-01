import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, index, title, lead, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 md:py-32 ${className}`}
    >
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span aria-hidden="true" className="font-mono text-xs text-signal/70">
            {index}
          </span>
          <div className="rule flex-1" />
        </div>
        <h2
          id={`${id}-heading`}
          className="mt-5 text-3xl font-semibold text-fg sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
      </Reveal>

      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  );
}
