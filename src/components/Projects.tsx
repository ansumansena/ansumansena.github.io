import { useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Tag } from './ui/Tag';

const statusTone: Record<NonNullable<Project['status']>, string> = {
  Live: 'border-signal/30 bg-signal/8 text-signal',
  Archived: 'border-ink-600 bg-ink-800 text-faint',
};

/** Competition placement. Deliberately louder than the status badge. */
function AwardBadge({ award }: { award?: string }) {
  if (!award) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ember">
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3" fill="currentColor">
        <path d="M8 1.5 9.9 5.4l4.3.6-3.1 3 .7 4.3L8 11.3 4.2 13.3l.7-4.3-3.1-3 4.3-.6z" />
      </svg>
      {award}
    </span>
  );
}

/** Renders nothing when a project carries no status, so no claim is implied. */
function StatusBadge({ status }: { status?: Project['status'] }) {
  if (!status) return null;
  return (
    <span className={`rounded-full border px-3 py-1 font-mono text-[10px] ${statusTone[status]}`}>
      {status}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className={`group/link inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-300 ${
            link.kind === 'demo'
              ? 'border-signal/40 text-signal hover:bg-signal hover:text-ink-950'
              : 'border-ink-600 text-muted hover:border-fg/40 hover:text-fg'
          }`}
        >
          {link.label}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/link:translate-x-0.5"
          >
            &#8599;
          </span>
        </a>
      ))}
    </div>
  );
}

/** Card that leans a couple of degrees toward the cursor. Pointer-only, capped low. */
function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const reduce = useReducedMotion();

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 4, ry: px * 4 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <TiltCard className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-ink-900 via-ink-900 to-ink-850">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember/10 blur-3xl transition-colors duration-700 group-hover:bg-ember/[0.16]"
        />
        <div className="grid-veil pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:p-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-ember/30 bg-ember/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ember">
                Featured
              </span>
              <AwardBadge award={project.award} />
              <StatusBadge status={project.status} />
              <span className="font-mono text-xs text-faint">{project.year}</span>
            </div>

            <h3 className="mt-6 text-3xl font-semibold leading-tight text-fg sm:text-4xl lg:text-[2.75rem]">
              {project.name}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-fg/80">{project.blurb}</p>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">{project.description}</p>

            <div className="mt-7 border-l-2 border-ember/40 pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                My contribution
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.contribution}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <ProjectLinks project={project} />
              {project.note && (
                <span className="font-mono text-[11px] text-faint">{project.note}</span>
              )}
            </div>
          </div>

          <div className="lg:border-l lg:border-white/[0.07] lg:pl-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              Inside the build
            </p>
            <ul className="mt-5 space-y-4">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3.5 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" />
                  {highlight}
                </li>
              ))}
            </ul>

            <p className="mt-9 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech} tone="ember">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/**
 * Compact vertical flow for a project's architecture. Numbered stages with a
 * connecting spine, so the shape of the system reads at a glance without
 * needing a full diagram.
 */
function Pipeline({ pipeline }: { pipeline: NonNullable<Project['pipeline']> }) {
  return (
    <div className="relative mt-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Architecture</p>

      <ol className="relative mt-4 space-y-0">
        <li className="flex items-center gap-3 pb-3 font-mono text-[11px] text-muted">
          <span
            aria-hidden="true"
            className="grid h-5 w-5 shrink-0 place-items-center rounded border border-ink-600 bg-ink-850 text-[9px] text-faint"
          >
            in
          </span>
          {pipeline.from}
        </li>

        {pipeline.stages.map((stage, i) => (
          <li key={stage} className="relative flex gap-3 pb-3">
            <span
              aria-hidden="true"
              className="absolute left-[9px] top-0 h-full w-px bg-gradient-to-b from-ember/40 to-ember/15"
            />
            <span className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full border border-ember/40 bg-ink-900 font-mono text-[9px] text-ember">
              {i + 1}
            </span>
            <span className="pt-0.5 text-[13px] leading-snug text-muted">{stage}</span>
          </li>
        ))}

        <li className="flex items-center gap-3 font-mono text-[11px] text-ember">
          <span
            aria-hidden="true"
            className="grid h-5 w-5 shrink-0 place-items-center rounded border border-ember/40 bg-ember/10 text-[9px]"
          >
            out
          </span>
          {pipeline.to}
        </li>
      </ol>
    </div>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard className="group h-full">
        <article
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-ink-900/70 p-7 transition-colors duration-500 sm:p-8 ${
            project.award
              ? 'border-ember/20 hover:border-ember/40'
              : 'border-white/[0.07] hover:border-signal/25'
          }`}
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 ${
              project.award ? 'bg-ember/[0.09]' : 'bg-signal/[0.07]'
            }`}
          />

          <div className="relative flex flex-wrap items-center gap-3">
            <AwardBadge award={project.award} />
            <StatusBadge status={project.status} />
            <span className="font-mono text-xs text-faint">{project.year}</span>
          </div>

          <h3 className="relative mt-5 text-2xl font-semibold text-fg">{project.name}</h3>
          <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>

          <ul className="relative mt-5 space-y-2.5">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted/85">
                <span
                  aria-hidden="true"
                  className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                    project.award ? 'bg-ember/80' : 'bg-signal/70'
                  }`}
                />
                {highlight}
              </li>
            ))}
          </ul>

          {project.pipeline && <Pipeline pipeline={project.pipeline} />}

          <div
            className={`relative mt-5 border-l-2 pl-4 ${
              project.award ? 'border-ember/40' : 'border-signal/30'
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Contribution</p>
            <p className="mt-1.5 text-sm text-muted">{project.contribution}</p>
          </div>

          <div className="relative mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          {/* Pinned to the bottom so cards align regardless of copy length. */}
          <div className="relative mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-7">
            <ProjectLinks project={project} />
            {project.note && <span className="font-mono text-[11px] text-faint">{project.note}</span>}
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      index="04"
      title="Selected work"
      lead="One platform shipped to production for a client, and three built from an empty repository. Every link goes to a live deployment or real source."
    >
      {featured && <FeaturedProject project={featured} />}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((project, i) => (
          <div
            key={project.id}
            // An odd number of secondary cards would leave a hole in the last
            // row, so the final card widens to fill it.
            className={i === rest.length - 1 && rest.length % 2 === 1 ? 'md:col-span-2' : undefined}
          >
            <ProjectCard project={project} delay={i * 0.1} />
          </div>
        ))}
      </div>
    </Section>
  );
}
