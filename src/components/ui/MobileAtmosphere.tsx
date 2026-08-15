import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Mobile background. Same palette, mood, and identity as the desktop
 * version, but with only one scroll-linked blurred layer, no star field,
 * and no scanlines. Mobile GPUs (and iOS Safari's compositor budget in
 * particular) have much less headroom than desktop, so this isn't just a
 * scaled-down DesktopAtmosphere — layers that add texture without much
 * perceptible payoff on a small screen are cut outright rather than
 * watered down, on top of every optimization already applied on desktop
 * (transform-only motion, static base gradient, no mix-blend-mode).
 */
export function MobileAtmosphere() {
  const { scrollYProgress } = useScroll();

  // The magenta/cyan/violet trio is collapsed into a single blob whose
  // gradient blends magenta into violet, so the color identity survives
  // with one blurred layer instead of three.
  const glowY = useTransform(scrollYProgress, [0, 1], ["-5vh", "35vh"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0.35, 0.55, 0.4, 0.5]);

  return (
    <>
      {/* Light mode — fully static: zero motion values, one small blob. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #fbf7f0 0%, #f7f0e5 55%, #f6ede0 100%)",
          }}
        />
        <div
          className="absolute left-[-20%] top-[-10%] h-[45vmin] w-[45vmin] rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(240,190,150,0.26) 0%, rgba(240,190,150,0.1) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* Dark mode — static base + static vignette + ONE animated blob +
          ONE static companion blob. No star field, no scanlines. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.145 0.035 270) 0%, oklch(0.125 0.03 274) 55%, oklch(0.115 0.024 270) 100%)",
          }}
        />

        {/* Static deep-sky vignette — no blur filter, no motion value at
            all, so it costs one paint at mount and nothing after. */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.36,
            background:
              "radial-gradient(ellipse 130% 55% at 50% 0%, oklch(0.3 0.09 270 / 0.5), transparent 62%), radial-gradient(ellipse 110% 45% at 50% 100%, oklch(0.28 0.08 290 / 0.4), transparent 65%)",
          }}
        />

        {/* One scroll-linked glow — small (50vmin), `blur-xl` (24px, down
            from `blur-3xl`'s 64px), transform + opacity only. This is the
            single most expensive element on the page and it's deliberately
            the only one still animating on every frame. */}
        <motion.div
          className="absolute left-[-10%] top-[5%] h-[50vmin] w-[50vmin] rounded-full blur-xl"
          style={{
            y: glowY,
            opacity: glowOpacity,
            background:
              "radial-gradient(circle, oklch(0.72 0.24 320 / 0.8) 0%, oklch(0.7 0.2 280 / 0.35) 45%, transparent 72%)",
          }}
        />

        {/* Second, smaller companion blob — completely static (no scroll
            binding), so it costs a single paint at mount. Keeps the cyan
            accent alive on the opposite side of the screen without adding
            another per-frame animation. */}
        <div
          className="absolute right-[-15%] bottom-[10%] h-[36vmin] w-[36vmin] rounded-full blur-xl"
          style={{
            opacity: 0.3,
            background:
              "radial-gradient(circle, oklch(0.86 0.16 200 / 0.6) 0%, oklch(0.86 0.16 200 / 0.2) 45%, transparent 70%)",
          }}
        />
      </div>
    </>
  );
}
