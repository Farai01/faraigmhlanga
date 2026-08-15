
import { Reveal, SectionLabel } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative w-full px-6 py-20 sm:py-32 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.2fr] md:gap-20">
        {/* Mobile/tablet-small only: "About" label above the image */}
        <Reveal className="md:hidden">
          <SectionLabel>01 · About</SectionLabel>
        </Reveal>

        {/* Column 1: image (+ paragraph beside it 500–767px) + tablet dl beneath */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col min-[518px]:flex-row min-[518px]:items-start min-[518px]:gap-6">
            <Reveal className="relative mx-auto w-full min-[518px]:mx-0 min-[518px]:w-2/5 min-[518px]:flex-shrink-0 md:w-full md:max-w-none">
              <div className="relative aspect-[4/5] max-h-[60vh] overflow-hidden rounded-2xl border border-white/10 md:max-h-none">
                <img
                  src={"/api/media/Screenshot_114621.png"}
                  alt="Portrait of Farai Mhlanga"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card-foreground via-transparent to-transparent" />
                <div className="absolute inset-x-4 top-4 z-10 md:hidden">
                  <h2 className="max-w-[14rem] font-display text-3xl leading-[1.02] text-white">
                    Computer engineer,
                    <br />
                    <span className="text-gray-300">System thinker, Constant learner.</span>
                  </h2>
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Farai Mhlanga · 2026
                </div>
              </div>

              {/* glow */}
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-3xl opacity-40 blur-2xl"
                style={{
                  background:
                    "radial-gradient(closest-side, oklch(0.72 0.16 245 / 0.35), transparent)",
                }}
              />
            </Reveal>

            {/* Paragraph copy A: only visible 500–767px, sits beside the image */}
            <div className="hidden min-[500px]:block md:hidden min-[500px]:flex-1">
              <Reveal delay={0.1}>
                <p className="text-sm leading-relaxed text-secondary-foreground">
                  Computer Engineering graduate from the{" "}
                  <span className="text-foreground/90">University of Pretoria</span>, with an interest
                  in AI, embedded systems, cyber security and software engineering. Thus, inspiring work in projects ranging from
                  FPGA implementations and digital signal processing to backend services and software engineering.
                  I care about systems thinking: how parts behave when they meet, how to make the complex feel simple.
                  To me good engineering builds systems that solve problems with a design that makes them feel easy.
                  Engineering is imagining what could be, and then building it.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Tablet only: dl sits underneath the image, in the same column */}
          <Reveal delay={0.2} className="hidden md:block lg:hidden">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-6">
              {[
                ["Education", "BEng Computer Eng.\nUniversity of Pretoria"],
                ["Working at", "Sevenly Travel\nCheery Robot Academy"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
                    {k}
                  </dt>
                  <dd className="mt-2 whitespace-pre-line text-sm text-foreground/85">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Column 2: text content */}
        <div className="flex flex-col justify-center">
          <Reveal className="hidden md:block">
            <SectionLabel>01 · About</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 hidden font-display text-4xl leading-[1.05] text-foreground sm:text-4xl md:block md:text-5xl">
              Computer Engineer,
              <br />
              <span className="text-muted-foreground">System thinker, Constant learner.</span>
            </h2>
          </Reveal>

          {/* Paragraph copy B: visible below 500px and at md+, hidden 500–767px */}
          <Reveal delay={0.1}>
            <div className="mt-4 block min-[500px]:hidden md:block space-y-5 text-base leading-relaxed text-secondary-foreground sm:text-sm">
              <p>
                Computer Engineering graduate from the{" "}
                <span className="text-foreground/90">University of Pretoria</span>, with an interest
                in AI, embedded systems, cyber security and software engineering. Thus, inspiring work in projects ranging from
                FPGA implementations and digital signal processing to backend services and software engineering.
                I care about systems thinking: how parts behave when they meet, how to make the complex feel simple.
                To me good engineering builds systems that solve problems with a design that makes them feel easy.
                Engineering is imagining what could be, and then building it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <blockquote className="mt-10 border-l-2 border-primary/60 pl-6 font-display text-2xl leading-snug text-foreground/90 sm:text-3xl">
              "Scientists investigate that which already is; engineers create that which has never been." <span className="text-muted-foreground sm:text-lg">- Albert Einstein</span>
            </blockquote>
          </Reveal>

          {/* Mobile + desktop: dl underneath the quote. Tablet has its own copy under the image instead. */}
          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 md:hidden lg:grid">
              {[
                ["Education", "BEng Computer Eng.\nUniversity of Pretoria"],
                ["Working at", "Sevenly Travel\nCheery Robot Academy"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
                    {k}
                  </dt>
                  <dd className="mt-2 whitespace-pre-line text-sm text-foreground/85">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}