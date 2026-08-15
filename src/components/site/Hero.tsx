import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sun, X } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { Particles } from "./Particles";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef<{ x: number; y: number } | null>(null);
  const ticking = useRef(false);
  const REVEAL_RADIUS = 30; // px — adjust to change circular reveal size
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === "light";
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (theme !== "dark") {
      setShowHint(false);
      return;
    }
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("heroThemeHint") === "dismissed") {
      return;
    }
    const t = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(t);
  }, [theme]);

  const handleNameClick = (targetID: string) => {
    document.getElementById(targetID)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        // Torch/reveal effect is dark-mode only.
        if (!document.documentElement.classList.contains("dark")) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        if (!ticking.current) {
          ticking.current = true;
          requestAnimationFrame(() => {
            const p = posRef.current;
            const el = maskRef.current;
            if (el && p) {
              el.style.clipPath = `circle(${REVEAL_RADIUS}px at ${p.x}px ${p.y}px)`;
              el.style.opacity = "1";
            }
            ticking.current = false;
          });
        }
      }}
      onMouseLeave={() => {
        const el = maskRef.current;
        if (el) {
          el.style.opacity = "0";
          el.style.clipPath = `circle(0px at 0 0)`;
        }
        posRef.current = null;
      }}
      ref={ref}
      className="relative  flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-16"
    >
      {/* Background image — parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={isLightMode ? "/api/media/Hero_Image_BG.png": "/api/media/hero_atmosphere.jpg"}
          alt=""
          aria-hidden
          width={1920}
          height={1088}
          className="size-full object-cover opacity-100 dark:opacity-90"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-b from-background/20 via-background/15 to-background/60 dark:block" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-10 hidden bg-grid bg-grid-fade opacity-40 dark:block" aria-hidden />

      {/* Dim overlay + torch reveal — dark mode only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "rgba(5,5,5,0.25)",
        }}
      />

      {/* Reveal image: visible only inside a circular clip-path at the cursor */}
      <div
        ref={maskRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `url(${"/api/media/Hero_Image_BG.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: `circle(0px at 0 0)`,
          opacity: 0,
          willChange: "clip-path, opacity",
        } as any}
      />

      {/* Radial glow behind title */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 hidden size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl dark:block"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.72 0.16 245 / 0.55), transparent 70%)",
        }}
      />

      {/* Secondary warm glow */}
      <div
        aria-hidden
        className="absolute left-1/3 top-1/3 -z-10 hidden size-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl dark:block"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.13 65 / 0.35), transparent 70%)",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <Particles />
      </div>

      <motion.div
        // style={{ opacity }}
        className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-2 rounded-full px-3 py-1 glass "
        >
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_oklch(0.78_0.13_65)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/85">
            Pretoria · ZA
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          whileHover={{ y: -4, scale: 1.005, transition: { duration: 0.2 } }}
          whileTap={{ y: -2, scale: 0.995, transition: { duration: 0.1 } }}
          onClick={() =>handleNameClick("about")}
          className="group relative z-10 inline-flex cursor-pointer rounded-[1.5rem] px-3 py-2 glass sm:px-4 sm:py-3"
        >
          <h1 className="font-display text-balance text-6xl leading-[0.95] text-foreground  sm:text-7xl md:text-[7.5rem] transition-colors group-hover:text-primary group-hover:drop-shadow-[0_0_28px_rgba(59,130,246,0.45)]">
            Farai Gabriel Mhlanga
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
           onClick={() =>handleNameClick("work")}
          className="mt-6 max-w-xl rounded-full px-4 py-2 text-pretty text-base text-foreground/85 glass sm:text-lg transition-colors hover:text-primary hover:drop-shadow-[0_0_16px_rgba(59,130,246,0.35)]"
        >
          <span className="text-foreground/85">Engineering</span> systems - Fostering <span className="text-foreground/85">Creativity</span> - Living with <span className="text-foreground/85">Impact</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-6 transform translate-y-40"
        >
         {/* <a 
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full glass  px-5 py-2.5 text-sm text-foreground/90 transition-all hover:bg-primary/5 hover:text-foreground"
          >
            Explore the work
            <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
          </a> */}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-20 left-1/2 z-20 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2"
          >
            <div className="glass relative rounded-2xl border border-primary/10 bg-background/70 p-4 pr-12 shadow-2xl shadow-primary/10">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Switch to light mode to reveal the hero image"
                className="group/hint inline-flex w-full cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-left text-xs text-foreground/80 transition-all hover:bg-primary/5 hover:text-foreground"
              >
                <Sun className="size-3.5 text-accent transition-transform duration-500 group-hover/hint:rotate-90" />
                <span>Switch to light mode to see beneath the surface</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowHint(false);
                  try {
                    sessionStorage.setItem("heroThemeHint", "dismissed");
                  } catch {
                    /* ignore */
                  }
                }}
                aria-label="Dismiss hint"
                className="absolute right-3 top-3 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full p-1 text-foreground/60 transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom hairline */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px hairline-amber opacity-60" />
    </section>
  );
}