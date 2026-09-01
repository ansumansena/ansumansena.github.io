import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view.
 * Uses a top-biased rootMargin so a section registers as "active" once its
 * heading reaches the upper third of the viewport, which matches how people
 * read rather than where the geometric centre happens to be.
 */
export function useScrollSpy(ids: string[], offset = 96): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
