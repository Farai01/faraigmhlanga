import { Reveal, SectionLabel } from "./Reveal";

const roles = [
  {
    org: "Sevenly Travel",
    title: "Software Developer",
    period: "2025 — Present",
    description:
      "I voluntarily work part time at Sevenly Travel. I develop and maintain software for a travel technology platform, working across the full stack with React, Node.js, Express.js, MongoDB, and AWS. I collaborate within an Agile team using GitHub, GitLab, and Jira to build scalable features, integrate cloud services, and deliver reliable solutions for real-world users. To improve development efficiency, we leverage AI-assisted tools such as GitHub Copilot and low-code AI platforms like Lovable to rapidly prototype, automate repetitive tasks, and accelerate software delivery.",
    highlights: ["React Native","Node.js","MongoDB", "AWS","Full-stack feature work", "API design & integration", "AI-assisted development"],
  },
  {
    org: "Cheery Robot Academy",
    title: "Tutor & Coding Mentor",
    period: "2025 — Present",
    description:
      "I teach programming and game development fundamentals to students of varying ages, translating complex concepts into engaging, approachable lessons. Cheery Robot Academy emphasizes project-based learning through hands-on game development, with tutoring centered around Scratch and Roblox Studio. Through one-on-one sessions, I guide students in building games and interactive experiences while developing their problem-solving, critical thinking, and programming skills.",
    highlights: ["Lua", "Roblox Studio", "Curriculum support"],
  },
  
];

export function Experience() {
  return (
    <section id="experience" className="relative w-full px-6 py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <Reveal>
            <SectionLabel>03 · Experience</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              Part-time work, full-time craft.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg">
              Alongside engineering projects, I tutor and build software in production. Both roles keep me learning, communicating, and shipping.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {roles.map((role, i) => (
            <Reveal key={role.org} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-card/40 p-6 sm:p-8 transition-colors hover:bg-card/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                      {role.org}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">{role.title}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                    {role.period}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {role.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {role.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
