import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Reveal, SectionLabel } from "./Reveal";
import { projects, type Project } from "@/data/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function Projects() {
  return (
    <section id="work" className="relative w-full px-6 py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <SectionLabel>02 · Selected Projects</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
                Systems brought to life.
              </h2>
            </Reveal>
          </div>
         
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:mt-12 md:gap-6 items-stretch">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const hoverVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = () => {
    const v = hoverVideoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    const v = hoverVideoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const goToDetail = () => {
    setOpen(false);
    navigate({ to: "/projects/$slug", params: { slug: project.slug } });
  };

  return (
    <Reveal delay={index * 0.05}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen(true)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <div className="relative aspect-[16/11] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            width={1280}
            height={896}
            loading="lazy"
            className="size-full object-cover opacity-80 transition-all duration-[1200ms] group-hover:scale-[1.04] group-hover:opacity-100"
          />
          {project.video && (
            <video
              ref={hoverVideoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="pointer-events-none absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card-foreground via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="font-mono rounded text-[10px] uppercase ml-2 tracking-[0.22em] text-black backdrop-blur-sm bg-white/30">
              {project.year}
            </span>
            <span className="size-1 rounded-full bg-primary" />
            <span className="font-mono rounded text-[10px] uppercase ml-2 tracking-[0.22em] text-black backdrop-blur-sm bg-white/30">
              {project.context}
            </span>
          </div>
          <ArrowUpRight className="absolute right-4 top-4 size-4 text-foreground/40 transition-all group-hover:right-3 group-hover:top-3 group-hover:text-primary" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-6">
          <h3 className="font-display text-lg leading-tight text-foreground sm:text-xl md:text-2xl">
            {project.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        {/* Hover glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, oklch(0.72 0.16 245 / 0.12), transparent 60%)",
          }}
        />
      </motion.article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[75vh] w-[calc(100%-2rem)] max-w-2xl flex-col overflow-hidden border-white/10 bg-card/95 p-0 backdrop-blur sm:w-full">
          <button
            type="button"
            onClick={goToDetail}
            className="group/dialog flex min-h-0 flex-1 flex-col overflow-y-auto text-left"
            aria-label={`Open full page for ${project.title}`}
          >
            <div className="relative max-h-[40vh] w-full shrink-0 overflow-hidden">
              {project.video ? (
                <video
                  src={project.video}
                  poster={project.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover/dialog:scale-[1.03]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card-foreground via-transparent to-transparent" />
            </div>
            <div className="space-y-3 p-5 sm:space-y-4 sm:p-8">
              <DialogHeader className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span>{project.year}</span>
                  <span className="size-1 rounded-full bg-primary" />
                  <span>{project.context}</span>
                </div>
                <DialogTitle className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {project.overview}
                </DialogDescription>
              </DialogHeader>

              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {project.details.slice(0, 2).map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 text-sm font-medium text-primary">
                <span className="inline-flex items-center gap-2">
                  Read more <ArrowRight className="size-4 transition-transform group-hover/dialog:translate-x-0.5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Click anywhere to open
                </span>
              </div>
            </div>
          </button>
        </DialogContent>
      </Dialog>
    </Reveal>
  );
}