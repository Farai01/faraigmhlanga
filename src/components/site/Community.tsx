import { Reveal, SectionLabel } from "./Reveal";

export function Community() {
  return (
    <section id="community" className="relative w-full overflow-hidden px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>05 · Community</SectionLabel>
        </Reveal>

        <div className="mt-6 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
               Community engagement.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                I firmly believe in the power of community. To me, creating meaningful change begins with taking responsibility for the world around you. This belief has shaped my involvement in several initiatives, most notably co-founding the IGNITE Society at the University of Pretoria with a group of close friends.

Through IGNITE, we organized food and clothing drives, mentorship programs, and other community outreach initiatives. Our goal was to create a space where students could connect, grow, and develop into individuals who would positively impact those around them.

As a Christian society, IGNITE also partnered with local churches to expand our outreach and better serve both students and the wider community. I believe that when people are empowered to grow, they are better equipped to serve others and create lasting change.

              </p>
            </Reveal>
            

            <Reveal delay={0.2}>
              <dl className="mt-6 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  ["2021", "IGNITE Co-Founder"],
                  ["2023", "IGNITE Chairman"],
                ].map(([y, r]) => (
                  <div key={y}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
                      {y}
                    </dt>
                    <dd className="mt-2 text-sm text-foreground/85">{r}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="md:col-span-8 md:col-start-9">
            <Reveal delay={0.1}>
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/api/media/IMG_0957.png"
                  alt="IGNITE Society — community"
                  width={1600}
                  height={1024}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/20  to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <p className="rounded-lg max-w-xs font-mono text-sm leading-snug text-foreground/95 sm:text-xs">
                    "With great power comes great responsibility." Uncle Ben
                  </p>
                  


                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/95">
                    UP · 2023
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}