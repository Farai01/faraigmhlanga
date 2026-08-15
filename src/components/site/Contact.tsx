import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const links = [
  { label: "Email", href: "mailto:farai.g.mhlanga@gmail.com", value: "farai.g.mhlanga@gmail.com" },
  { label: "Phone", href: "tel:+27724992384",  WhatsUpHref: "https://wa.me", value: "+27 72-499-2384" }
  // { label: "GitHub", href: "https://github.com/", value: "github.com/faraimhlanga" },// put git repo for this website
];

export function Contact() {
  return (
    <section id="contact" className="relative w-full px-6 pb-20 pt-32 sm:pb-24 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionLabel>06 · Contact</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] text-foreground sm:text-6xl md:text-7xl">
            Let's build something
            <br />
            <span className="text-primary text-glow-blue">Together.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Open to opportunities. Always happy to talk
            engineering, music, or a film worth watching.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12">
            <a
              href="mailto:farai.g.mhlanga@gmail.com"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Mail className="size-4" />
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.label} className="bg-muted/70 dark:bg-card/60">
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-muted dark:hover:bg-card"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {l.label}
                  </span>
                  <span className="flex items-center justify-between text-sm text-foreground/90">
                    {l.value}
                    <ArrowUpRight className="size-3.5 text-muted-foreground transition-all group-hover:text-primary" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full px-6 pb-10 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
          © {new Date().getFullYear()} Farai Mhlanga · Pretoria, ZA
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
          Designed & engineered with care
        </p>
      </div>
    </footer>
  );
}