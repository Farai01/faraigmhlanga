import { useEffect, useRef } from "react";

/**
 * Lightweight particle canvas — low density, slow drift, hero only.
 * Disabled on small viewports and when reduced-motion is preferred.
 */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    if (reduced || isSmall) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    const dpr = devicePixelRatio;

    const count = Math.min(110, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 14000));
    const dots = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.8 + 0.4) * dpr,
      vx: (Math.random() - 0.5) * 0.14 * dpr,
      vy: (Math.random() - 0.5) * 0.14 * dpr,
      a: Math.random() * 0.55 + 0.3,
      hue: Math.random() > 0.7 ? "amber" : "blue",
      twinkle: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;

        d.twinkle += d.twinkleSpeed;
        const twinkleFactor = 0.7 + 0.3 * Math.sin(d.twinkle * Math.PI * 2);
        const alpha = d.a * twinkleFactor;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle =
          d.hue === "amber"
            ? `rgba(255, 195, 120, ${alpha * 0.85})`
            : `rgba(140, 200, 255, ${alpha})`;
        ctx.shadowBlur = 12 * dpr;
        ctx.shadowColor = ctx.fillStyle as string;
        ctx.fill();

        // Subtle star cross for larger particles
        if (d.r > 1.2 * dpr) {
          ctx.beginPath();
          const arm = d.r * 3.5;
          ctx.moveTo(d.x - arm, d.y);
          ctx.lineTo(d.x + arm, d.y);
          ctx.moveTo(d.x, d.y - arm);
          ctx.lineTo(d.x, d.y + arm);
          ctx.strokeStyle =
            d.hue === "amber"
              ? `rgba(255, 195, 120, ${alpha * 0.25})`
              : `rgba(140, 200, 255, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5 * dpr;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 size-full pointer-events-none"
    />
  );
}