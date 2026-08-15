import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, projects, type Project } from "@/data/projects";
import { ScrollAtmosphere } from "@/components/site/ScrollAtmosphere";
import { Nav } from "@/components/site/Nav";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Farai Mhlanga` : "Project — Farai Mhlanga";
    const description = p?.overview ?? "Project details.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-display text-3xl">Project not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Back home
        </Link>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollAtmosphere />
      <Nav />

      <main className="relative mx-auto max-w-4xl px-6 py-32 sm:py-40">
        <Link
          to="/"
          hash="work"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Back to work
        </Link>

        <header className="mt-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>{project.year}</span>
            <span className="size-1 rounded-full bg-primary" />
            <span>{project.context}</span>
          </div>
          <h1 className="font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.overview}
          </p>
        </header>
        {project.video ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
            <video
              src={project.video}
              controls
              playsInline
              preload="metadata"
              poster={project.image}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        ) : (
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        <section className="mt-14 grid gap-10 md:grid-cols-[1fr_260px]">
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-foreground">What was built</h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.details.map((d) => (
                <p key={d} className="whitespace-pre-line">
                  {d}
                </p>
              ))}
            </div>
          </div>

          <aside className="space-y-6 rounded-2xl border border-white/10 bg-card/40 p-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Stack
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
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

            {project.role && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Role
                </div>
                <p className="mt-2 text-sm text-foreground">{project.role}</p>
              </div>
            )}

            {project.outcome && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Outcome
                </div>
                <p className="mt-2 text-sm text-foreground">{project.outcome}</p>
              </div>
            )}
          </aside>
        </section>

        <section className="mt-20 border-t border-white/10 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            More work
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {projects
              .filter((p) => p.slug !== project.slug)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p.slug}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-xl border border-white/10 bg-card/40 p-5 transition-colors hover:border-white/20"
                >
                  <div className="font-display text-lg text-foreground group-hover:text-primary">
                    {p.title}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}