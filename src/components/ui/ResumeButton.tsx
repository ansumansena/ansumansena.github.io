import { profile } from '../../data/profile';

interface ResumeButtonProps {
  variant?: 'solid' | 'outline' | 'quiet';
  label?: string;
  className?: string;
  onClick?: () => void;
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v8" />
      <path d="M4.5 7 8 10.5 11.5 7" />
      <path d="M2.5 13h11" />
    </svg>
  );
}

/**
 * Single source of truth for the resume download. `download` makes the browser
 * save the PDF rather than open a viewer tab, which is what a recruiter
 * collecting candidates actually wants.
 */
export function ResumeButton({
  variant = 'outline',
  label = 'Download resume',
  className = '',
  onClick,
}: ResumeButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-300';

  const styles = {
    solid: 'bg-signal px-5 py-2.5 text-sm font-medium text-ink-950 hover:bg-[color-mix(in_srgb,var(--color-signal)_82%,white)]',
    outline:
      'border border-ink-600 px-5 py-2.5 text-sm text-fg hover:border-signal/60 hover:text-signal',
    quiet: 'font-mono text-xs text-muted hover:text-signal',
  } as const;

  return (
    <a
      href={profile.resume}
      download={profile.resumeFileName}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {label}
      <DownloadIcon />
    </a>
  );
}
