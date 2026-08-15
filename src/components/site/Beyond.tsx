import { Reveal, SectionLabel } from "./Reveal";

const panels = [
  {
    image: "/api/media/Piano_1.avif",
    label: "Music",
    title: "How Music Meets Engineering.",
    body:
     "As a Pianist and Music Director at Celebration Church Pretoria, I believe music has the unique ability to communicate what words cannot. My passion has led me to learn multiple instruments and develop a strong understanding of sound engineering in both live and studio environments. By combining this with my background in digital signal processing, I enjoy exploring the engineering behind tools such as equalization, gain staging, and compression to create more immersive and expressive musical experiences.",
    meta: "Band Director · 2024 - Current",
    accent: "from-[oklch(0.86_0.16_200/0.55)] to-transparent",
  },
  {
    image: "/api/media/Cinema.png",
    label: "Cinema",
    title: "The Art of Storytelling.",
    body:
      "I have a deep appreciation for visual storytelling through film and animation. I often find myself looking beyond the plot, exploring how cinematography, sound design, technology, and visual direction bring stories to life. From the innovative use of the Halo rig in Sinners to the seamless blend of 2D and 3D animation in Attack on Titan, I'm fascinated by the creative and technical decisions behind every frame. Innovative technology is exciting, and compelling stories are even better, but the greatest films are the ones that make you forget both and simply find yourself enjoying the experience.",
    meta: "Enthusiast  · Birthdate - Current",
    accent: "from-[oklch(0.72_0.28_340/0.55)] to-transparent",
  },
  {
    image: "/api/media/church_inside.avif",
    label: "Church",
    title: "The long quiet questions.",
    body:
      "My faith is both my foundation and my compass. It has shaped who I am and what I believe truly matters. I believe everyone should wrestle with life's difficult questions: What is my purpose? What impact do I want to leave? Even if those questions aren't fully answered, I believe we are better for having asked them. Every project, every system, and life itself will present challenges, and I believe more often than not it is not the challenge that determines the outcome, but the substance of the person who faces it. As Romans 5:3–4 (NASB) says, 'And not only this, but we also exult in our tribulations, knowing that tribulation brings about perseverance; and perserverance, proven character; and proven character, hope;'",
    meta: "Christian · Always",
    accent: "from-[oklch(0.78_0.13_65/0.55)] to-transparent",
  },
];

export function Beyond() {
  return (
    <section id="beyond" className="relative w-full overflow-hidden px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>04 · Beyond Engineering</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              The other half of the signal.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg">
              Besides the technical side of engineering, I have a deep appreciation for the arts, storytelling, and faith. These interests shape my perspective, inspire creativity, and remind me that engineering is not just about building systems, but also about understanding the human experience.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 items-stretch">
          {panels.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <article className="group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/30 shadow-[0_0_60px_-20px_oklch(0.72_0.28_340/0.25)] transition-shadow duration-700 hover:shadow-[0_0_80px_-15px_oklch(0.72_0.28_340/0.5)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.label}
                    width={1280}
                    height={1600}
                    loading="lazy"
                    className="size-full object-cover opacity-95 transition-all duration-[1400ms] group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-background/70" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${p.accent} mix-blend-screen opacity-40`}
                  />
                  <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/90">
                    {p.label}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-2xl leading-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  <div className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                    {p.meta}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}