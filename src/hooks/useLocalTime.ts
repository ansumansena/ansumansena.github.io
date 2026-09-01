import { useEffect, useState } from 'react';

/** Live clock in a given IANA timezone. Ticks once a minute, not once a second. */
export function useLocalTime(timeZone: string): string {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const tick = () => setTime(format());
    // Align the first tick to the top of the next minute.
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    let interval: number;
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, msToNextMinute);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}
