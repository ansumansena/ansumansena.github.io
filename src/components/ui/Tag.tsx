interface TagProps {
  children: string;
  tone?: 'signal' | 'ember' | 'neutral';
}

export function Tag({ children, tone = 'neutral' }: TagProps) {
  const tones = {
    signal: 'border-signal/25 bg-signal/8 text-signal',
    ember: 'border-ember/25 bg-ember/8 text-ember',
    neutral: 'border-ink-600 bg-ink-800/60 text-muted',
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] leading-none tracking-tight ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
