import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ember: boolean;
}

const SIGNAL = '79, 224, 200';
const EMBER = '255, 169, 92';
const LINK_DIST = 152;
const CURSOR_RADIUS = 170;

/**
 * The hero's interactive element: a drifting node lattice that brightens and
 * leans toward the cursor. Reads as a monitoring topology rather than a
 * particle toy — which is the point, given what Ansuman works on.
 *
 * Performance notes:
 *  - node count scales with viewport area and hard-caps at 70
 *  - pauses entirely when scrolled out of view (IntersectionObserver)
 *  - renders one static frame and stops under prefers-reduced-motion
 */
export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density is tuned per-area so a 1440px hero is as populated as a phone.
      const count = Math.min(110, Math.max(28, Math.round((width * height) / 8200)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 1.25,
        ember: i % 8 === 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      // Links between nearby nodes.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DIST) continue;

          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const nearCursor = Math.hypot(midX - pointer.x, midY - pointer.y) < CURSOR_RADIUS;

          const strength = 1 - dist / LINK_DIST;
          ctx.strokeStyle = `rgba(${SIGNAL}, ${strength * (nearCursor ? 0.5 : 0.2)})`;
          ctx.lineWidth = nearCursor ? 0.9 : 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes on top of their links.
      for (const n of nodes) {
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        const near = Math.max(0, 1 - d / CURSOR_RADIUS);
        const colour = n.ember ? EMBER : SIGNAL;

        if (near > 0.15) {
          ctx.fillStyle = `rgba(${colour}, ${near * 0.1})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + near * 9, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${colour}, ${0.55 + near * 0.45})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduceMotion) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduceMotion) draw();
      }, 150);
    };

    // Stop burning frames when the hero is off screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduceMotion) frame = requestAnimationFrame(draw);
        else cancelAnimationFrame(frame);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    build();
    draw();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
