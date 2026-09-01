import { profile } from '../data/profile';
import { useLocalTime } from '../hooks/useLocalTime';
import { ResumeButton } from './ui/ResumeButton';
import { EmailLink } from './ui/EmailLink';

export function Footer() {
  const time = useLocalTime(profile.timezone);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] bg-ink-950">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a
              href="#top"
              className="group inline-flex items-center gap-2.5 font-display text-base font-semibold text-fg"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-ink-600 bg-ink-850 font-mono text-[11px] text-signal transition-colors duration-300 group-hover:border-signal/50">
                {profile.initials}
              </span>
              {profile.name}
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-faint">
              {profile.tracks.enterprise}. {profile.tracks.product}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {profile.socials.map((social) =>
                social.href.startsWith('mailto:') ? (
                  <li key={social.label}>
                    <EmailLink variant="inline" />
                  </li>
                ) : (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-mono text-xs text-muted transition-colors duration-300 hover:text-signal"
                    >
                      {social.label}
                    </a>
                  </li>
                ),
              )}
              <li>
                <ResumeButton variant="quiet" label="Resume" />
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-faint">
            &copy; {year} {profile.name}. Built with React, Vite and Tailwind.
          </p>
          <p className="font-mono text-[11px] text-faint">
            Bhubaneswar &middot; <time>{time}</time> {profile.timezoneLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}
