import { useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'ghost';
  external?: boolean;
  download?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Button that leans very slightly toward the cursor. The pull is capped at a
 * few pixels — enough to feel responsive, never enough to make it a moving
 * target. Disabled entirely for reduced-motion and on touch (no hover there).
 */
export function MagneticButton({
  children,
  href,
  variant = 'primary',
  external,
  download,
  className = '',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    setOffset({ x: Math.max(-6, Math.min(6, x)), y: Math.max(-4, Math.min(4, y)) });
  };

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 will-change-transform';

  const styles =
    variant === 'primary'
      ? 'bg-signal text-ink-950 hover:bg-[color-mix(in_srgb,var(--color-signal)_82%,white)]'
      : 'border border-ink-600 text-fg hover:border-signal/60 hover:text-signal';

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.4 }}
      className={`${base} ${styles} ${className}`}
      {...(download ? { download: '' } : {})}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
    </motion.a>
  );
}
