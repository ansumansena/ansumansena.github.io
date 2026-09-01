import { profile } from '../../data/profile';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

type Variant = 'inline' | 'display' | 'button';

interface EmailLinkProps {
  variant?: Variant;
  label?: string;
  className?: string;
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8.5 3.5 3.5L13 5" />
    </svg>
  );
}

/**
 * Email action that always does something visible.
 *
 * The anchor stays a real `mailto:` so it opens the mail client for anyone who
 * has one, and so right-click / middle-click behave normally. But a large share
 * of visitors - work machines with no mail client registered, webmail-only
 * users - get nothing at all from `mailto:`, and a dead click on the contact
 * link is a lost conversation. So the click also copies the address and
 * confirms it, which works everywhere.
 */
export function EmailLink({ variant = 'inline', label, className = '' }: EmailLinkProps) {
  const { copied, copy } = useCopyToClipboard();

  const handleClick = () => {
    void copy(profile.email);
  };

  const shared =
    'group inline-flex items-center transition-colors duration-300 focus-visible:outline-2';

  if (variant === 'display') {
    return (
      <>
        <a
          href={`mailto:${profile.email}`}
          onClick={handleClick}
          title="Opens your mail app, and copies the address either way"
          className={`${shared} max-w-full gap-4 border-b border-ink-600 pb-3 hover:border-signal ${className}`}
        >
          <span className="truncate font-display text-xl font-medium text-fg transition-colors duration-300 group-hover:text-signal sm:text-3xl">
            {profile.email}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-xl transition-all duration-300 ${
              copied
                ? 'text-signal'
                : 'text-faint group-hover:translate-x-1 group-hover:text-signal'
            }`}
          >
            {copied ? '✓' : '↗'}
          </span>
        </a>
        <p
          aria-live="polite"
          className={`mt-3 font-mono text-xs transition-opacity duration-300 ${
            copied ? 'text-signal opacity-100' : 'text-faint opacity-70'
          }`}
        >
          {copied ? 'Address copied to your clipboard' : 'Click to copy the address'}
        </p>
      </>
    );
  }

  if (variant === 'button') {
    return (
      <a
        href={`mailto:${profile.email}`}
        onClick={handleClick}
        className={`${shared} justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink-950 hover:bg-[color-mix(in_srgb,var(--color-signal)_82%,white)] ${className}`}
      >
        {copied ? (
          <>
            Address copied
            <CheckIcon />
          </>
        ) : (
          <>
            {label ?? 'Send an email'}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </>
        )}
      </a>
    );
  }

  // inline - the small mono links in the hero and footer
  return (
    <a
      href={`mailto:${profile.email}`}
      onClick={handleClick}
      className={`${shared} gap-2 font-mono text-xs ${
        copied ? 'text-signal' : 'text-muted hover:text-signal'
      } ${className}`}
    >
      {copied ? 'Copied' : (label ?? 'Email')}
      {copied && <CheckIcon />}
    </a>
  );
}
