import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { hash: "about", label: "About" },
  { hash: "work", label: "Work" },
  { hash: "experience", label: "Experience" },
  { hash: "beyond", label: "Beyond" },
  { hash: "community", label: "Community" },
  { hash: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
    >
      <nav
        className={`flex items-center gap-1 rounded-full border border-white/8 backdrop-blur-lg px-2 py-1.5 transition-all duration-500 ${
          scrolled ? "glass" : "bg-transparent border-transparent"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium tracking-tight text-foreground/90 hover:text-foreground"
          aria-label="Farai Mhlanga — home"
        >
          <span className="inline-block size-1.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.72_0.16_245)]" />
          <span className="font-mono text-xs uppercase tracking-[0.18em]">FM</span>
        </Link>
        <div className="hidden items-center md:flex">
          {links.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="rounded-full  px-3 py-1.5 text-sm text-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="ml-1 inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/80 transition-colors hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        </button>
        <Link
          to="/"
          hash="contact"
          className="ml-1 rounded-full bg-foreground/95 px-4 py-1.5 text-xs font-medium text-background transition-all hover:bg-foreground"
        >
          Get in touch
        </Link>
      </nav>
    </motion.header>
  );
}