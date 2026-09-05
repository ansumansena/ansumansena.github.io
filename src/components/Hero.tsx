import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { useLocalTime } from '../hooks/useLocalTime';
import { SignalField } from './SignalField';
import { MagneticButton } from './ui/MagneticButton';
import { EmailLink } from './ui/EmailLink';

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.09, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

export function Hero() {
  const time = useLocalTime(profile.timezone);

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <div className="grid-veil pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <SignalField />
      </div>
      {/* Keeps the lattice from competing with the type on the left. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-transparent md:via-ink-950/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={rise}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="text-signal">{profile.status.label}</span>
          </span>
          <span aria-hidden="true" className="hidden text-ink-600 min-[420px]:inline">/</span>
          <span className="hidden min-[420px]:inline">Bhubaneswar, IN</span>
          <span aria-hidden="true" className="text-ink-600">/</span>
          <span>
            <time>{time}</time> {profile.timezoneLabel}
          </span>
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={rise}
          className="mt-7 text-[clamp(2.75rem,10vw,7rem)] font-bold leading-[0.92] tracking-tight"
        >
          <span className="block text-fg">Ansuman</span>
          <span className="block text-fg">Senapati</span>
        </motion.h1>

        <motion.div
          custom={2}
          initial="hidden"
          animate="show"
          variants={rise}
          className="mt-8 max-w-xl"
        >
          {/* The two-track thesis, stated once, plainly. */}
          <div className="flex flex-col gap-2.5 border-l-2 border-ink-700 pl-5">
            <p className="flex items-baseline gap-3 text-sm text-fg sm:text-base">
              <span aria-hidden="true" className="mt-px h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              {profile.tracks.enterprise}
            </p>
            <p className="flex items-baseline gap-3 text-sm text-fg sm:text-base">
              <span aria-hidden="true" className="mt-px h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
              {profile.tracks.product}
            </p>
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </p>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={rise}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="#work">
            View my work
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Let’s connect
          </MagneticButton>
        </motion.div>

        <motion.ul
          custom={4}
          initial="hidden"
          animate="show"
          variants={rise}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          {profile.socials.map((social) =>
            social.href.startsWith('mailto:') ? (
              <li key={social.label}>
                <EmailLink variant="inline" rule className="!text-faint hover:!text-signal" />
              </li>
            ) : (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 font-mono text-xs text-faint transition-colors duration-300 hover:text-signal"
                >
                  <span className="h-px w-4 bg-ink-600 transition-all duration-300 group-hover:w-7 group-hover:bg-signal" aria-hidden="true" />
                  {social.label}
                </a>
              </li>
            ),
          )}
        </motion.ul>
      </div>
    </section>
  );
}
