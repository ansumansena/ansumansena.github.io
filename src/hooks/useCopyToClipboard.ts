import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copy text to the clipboard, with a fallback for browsers or contexts where
 * the async Clipboard API is unavailable (it needs a secure context, so it is
 * missing on plain-http origins).
 *
 * `copied` flips back to false after `resetAfter` ms so callers can show a
 * transient confirmation without managing their own timer.
 */
export function useCopyToClipboard(resetAfter = 2200) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      let ok = false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          ok = true;
        }
      } catch {
        ok = false;
      }

      if (!ok) {
        // Fallback: a hidden textarea plus the legacy copy command.
        try {
          const area = document.createElement('textarea');
          area.value = text;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.top = '-9999px';
          document.body.appendChild(area);
          area.select();
          ok = document.execCommand('copy');
          document.body.removeChild(area);
        } catch {
          ok = false;
        }
      }

      if (ok) {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), resetAfter);
      }

      return ok;
    },
    [resetAfter],
  );

  return { copied, copy };
}
