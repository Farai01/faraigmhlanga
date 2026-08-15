import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Desktop background. Keeps the same cinematic cyberpunk / night-sky mood
 * as the original ScrollAtmosphere, but rewritten so nothing forces
 * per-frame layout or paint work. See inline notes for what changed and
 * why — the short version:
 *
 *  - The animated `background` gradient string is gone (baked to a static
 *    gradient per theme).
 *  - Scroll-driven motion only ever writes to `x` / `y` / `opacity`
 *    (compositor-only, GPU-accelerated), never `top` / `left`.
 *  - 3 blurred blobs instead of 3 + a redundant 4th full-bleed ellipse.
 *  - `blur-2xl` instead of `blur-3xl`, with softness baked into extra
 *    gradient color-stops so the perceived falloff barely changes.
 *  - `mix-blend-mode` is gone from the scanline layer.
 */
export function DesktopAtmosphere() {
  const { scrollYProgress } = useScroll();

  // Opacity is compositor-only, so this stays scroll-linked cheaply.
  const neonOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.55, 0.75, 1],
    [0.16, 0.55, 0.32, 0.26, 0.5, 0.78],
  );

  // Transform-only drift. The original wrote these into `top` / `left`,
  // which are layout properties — every scroll frame forced Safari to
  // reflow and repaint the whole blurred layer. `y` / `x` style props on a
  // motion.div compile to `transform: translate3d(...)`, which the
  // compositor animates without touching layout or paint.
  const magentaY = useTransform(scrollYProgress, [0, 1], ["-8vh", "48vh"]);
  const cyanY = useTransform(scrollYProgress, [0, 1], ["55vh", "10vh"]);
  const violetY = useTransform(scrollYProgress, [0, 1], ["10vh", "42vh"]);
  const violetX = useTransform(scrollYProgress, [0, 1], ["0vw", "22vw"]);

  const starY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const starOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.55, 0.75, 1],
    [0.3, 0.15, 0.4, 0.6, 0.72, 0.82],
  );

  const lightBlobY1 = useTransform(scrollYProgress, [0, 1], ["0vh", "55vh"]);
  const lightBlobY2 = useTransform(scrollYProgress, [0, 1], ["20vh", "-30vh"]);

  return (
    <>
      {/* ---------------- Light mode ---------------- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:hidden">
        {/* Static base wash — no per-frame gradient interpolation */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #fbf7f0 0%, #f7f0e5 55%, #f6ede0 100%)",
          }}
        />
        <motion.div
          className="absolute left-[-10%] top-[-5%] h-[55vmin] w-[55vmin] rounded-full blur-2xl"
          style={{
            y: lightBlobY1,
            background:
              "radial-gradient(circle, rgba(240,190,150,0.30) 0%, rgba(240,190,150,0.12) 45%, transparent 72%)",
          }}
        />
        <motion.div
          className="absolute right-[-10%] top-[60%] h-[55vmin] w-[55vmin] rounded-full blur-2xl"
          style={{
            y: lightBlobY2,
            background:
              "radial-gradient(circle, rgba(210,165,125,0.26) 0%, rgba(210,165,125,0.1) 45%, transparent 72%)",
          }}
        />
      </div>

      {/* ---------------- Dark mode (cyberpunk night-sky) ---------------- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden dark:block">
        {/* Static base wash. The original animated this gradient string on
            every scroll frame — a `background` change can't be handled by
            the compositor, so it forces a full-layer repaint each frame.
            The shift across the page was subtle anyway, so we bake in one
            representative gradient and never touch it again after mount. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.145 0.035 270) 0%, oklch(0.125 0.03 274) 55%, oklch(0.115 0.024 270) 100%)",
          }}
        />

        {/* Constant deep-sky vignette — static, no blur filter, so it's
            essentially free to render. Keeps the bottom of the page from
            ever reading as flat black. */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.38,
            background:
              "radial-gradient(ellipse 120% 60% at 50% 0%, oklch(0.3 0.09 270 / 0.5), transparent 60%), radial-gradient(ellipse 100% 50% at 50% 100%, oklch(0.28 0.08 290 / 0.4), transparent 65%)",
          }}
        />

        {/* Star field — a single layer instead of two. Transform-only
            parallax (`y`), so it's compositor-driven. One layer halves the
            paint area of the starfield with almost no loss of texture at
            normal viewing distance. */}
        <motion.div
          className="absolute inset-[-10%]"
          style={{
            y: starY,
            opacity: starOpacity,
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 10% 15%, oklch(0.95 0.02 250 / 0.8), transparent 100%), radial-gradient(1px 1px at 30% 45%, oklch(0.9 0.03 220 / 0.6), transparent 100%), radial-gradient(1.5px 1.5px at 55% 10%, oklch(0.95 0.02 60 / 0.7), transparent 100%), radial-gradient(1px 1px at 70% 60%, oklch(0.9 0.02 250 / 0.5), transparent 100%), radial-gradient(1.5px 1.5px at 85% 25%, oklch(0.95 0.02 250 / 0.7), transparent 100%), radial-gradient(1px 1px at 20% 80%, oklch(0.9 0.03 60 / 0.5), transparent 100%), radial-gradient(1.5px 1.5px at 45% 90%, oklch(0.95 0.02 220 / 0.6), transparent 100%), radial-gradient(1px 1px at 95% 75%, oklch(0.9 0.02 250 / 0.5), transparent 100%)",
            backgroundSize: "100% 100%",
          }}
        />

        {/* Neon glow — 3 blobs (down from 3 plus a redundant 4th full-bleed
            ellipse that added little). Sized in vmin (55vmin / 48vmin, down
            from 95vh) and `blur-2xl` (40px) instead of `blur-3xl` (64px).
            To keep the same perceived softness with a smaller blur radius,
            each gradient has an extra mid color-stop that fades gradually
            instead of relying purely on the blur filter — this is the
            standard trick for faking soft glow cheaply, since `filter:
            blur()` on a large element is one of the most GPU-expensive CSS
            operations on iOS Safari. */}
        <motion.div className="absolute inset-0" style={{ opacity: neonOpacity }}>
          <motion.div
            className="absolute left-[-8%] top-[-5%] h-[55vmin] w-[55vmin] rounded-full blur-2xl"
            style={{
              y: magentaY,
              background:
                "radial-gradient(circle, oklch(0.72 0.28 340 / 0.85) 0%, oklch(0.72 0.28 340 / 0.35) 45%, transparent 72%)",
            }}
          />
          <motion.div
            className="absolute right-[-8%] top-[20%] h-[55vmin] w-[55vmin] rounded-full blur-2xl"
            style={{
              y: cyanY,
              background:
                "radial-gradient(circle, oklch(0.86 0.16 200 / 0.75) 0%, oklch(0.86 0.16 200 / 0.28) 45%, transparent 72%)",
            }}
          />
          <motion.div
            className="absolute left-[20%] top-[25%] h-[48vmin] w-[48vmin] rounded-full blur-2xl"
            style={{
              y: violetY,
              x: violetX,
              background:
                "radial-gradient(circle, oklch(0.68 0.17 290 / 0.65) 0%, oklch(0.68 0.17 290 / 0.22) 45%, transparent 72%)",
            }}
          />
        </motion.div>

        {/* Scanlines — static, fixed low opacity, and `mix-blend-mode` has
            been removed entirely. A full-screen blend layer forces the
            browser to composite against everything beneath it on every
            frame; that cost bought very little visually at ~2-16% opacity,
            so it's cut in favor of a plain low-opacity static overlay. */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.05,
            backgroundImage:
              "repeating-linear-gradient(0deg, oklch(1 0 0 / 0.5) 0px, oklch(1 0 0 / 0.5) 1px, transparent 1px, transparent 3px)",
          }}
        />
      </div>
    </>
  );
}
