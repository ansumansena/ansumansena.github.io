import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { navItems } from '../data/navigation';
import { profile } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { ResumeButton } from './ui/ResumeButton';

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  // Read progress, drawn as a telemetry line under the nav. Springing the
  // value keeps it from twitching on trackpad scroll.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and let Escape close it.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <a href="#main" className="skip-link rounded-full bg-signal px-4 py-2 text-sm font-medium text-ink-950">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-ink-950/72 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[var(--nav-h)] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-fg"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-ink-600 bg-ink-850 font-mono text-[11px] text-signal transition-colors duration-300 group-hover:border-signal/50">
              {profile.initials}
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                    active === item.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ResumeButton
              variant="outline"
              label="Resume"
              className="hidden !px-4 !py-2 !font-mono !text-xs !text-muted hover:!text-signal sm:inline-flex"
            />
            <a
              href="#contact"
              className="hidden rounded-full bg-signal px-4 py-2 text-sm font-medium text-ink-950 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-signal)_82%,white)] md:inline-flex"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-lg border border-ink-600 text-fg lg:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-opacity duration-200 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className={`h-px origin-left bg-gradient-to-r from-signal via-signal to-ember transition-opacity duration-500 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-5 pb-10 pt-[calc(var(--nav-h)+2rem)] sm:px-8">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 border-b border-white/[0.06] py-4 text-2xl font-medium text-fg"
                    >
                      <span className="font-mono text-xs text-signal/60">{item.index}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <ResumeButton variant="outline" className="w-full !py-3" />
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-signal px-5 py-3 text-center text-sm font-medium text-ink-950"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
