## Farai Mhlanga — Personal Portfolio

A single-page, dark, cinematic portfolio. Section-based storytelling with smooth scroll transitions, restrained glassmorphism, and a Blade Runner 2049 / Interstellar mood. Built on the project's React + Vite + Tailwind template (Next.js is not supported here; all requested visual goals are achievable on this stack).

### Sections (in order)

1. **Hero** — Full-viewport. Name + role ("Computer Engineer · Systems Thinker · Pianist"). Subtle animated particle field + faint grid overlay. Soft electric-blue glow behind name; amber rim light. One quiet CTA ("Explore the work").
2. **About** — Two-column: portrait (your photo) + short prose distilled from your CV. Calm, confident voice. Pull-quote: *"An engineer who builds intelligent systems while deeply valuing creativity, storytelling, music, and community."*
3. **Projects** — Cinematic case-card stack. Featured: Voice-Controlled Mouse & Keyboard, FPGA/DSP work, Solar Car (UP + St Albans), Sevenly Travel. Each card: title, year, stack chips, 1–2 line description, image. Hover = subtle parallax + glow.
4. **Beyond Engineering** — Personality section. Three quiet panels: *Piano* (concert photos + Band Director at Celebration Church), *Film & Anime* (mood imagery, a few favorites), *Curiosity* (short reflective line). Treated cinematically — letterboxed imagery, slow fades.
5. **Community / IGNITE Society** — Editorial layout. Chairman role, what it stood for (transparency, accountability), a photo if provided. Mention Solar Car logistics leadership as a second beat.
6. **Contact** — Minimal. Email, LinkedIn, GitHub. Single line: "Open to systems, embedded, and backend roles." Footer with subtle signature.

### Visual system

- **Palette**: matte black `#0A0A0B`, graphite `#15161A`, fog `#1E2026`, electric blue `#4DA3FF` (primary accent), amber `#F0A65A` (warm highlight), violet `#8B6BFF` (cool highlight). Text: off-white `#E8EAED`, muted `#8A8F98`.
- **Typography**: Display — *Instrument Serif* or *Fraunces* (cinematic headlines). UI/body — *Inter* or *Geist Sans*. Mono accents — *JetBrains Mono* for stack chips / metadata.
- **Motion (Framer Motion)**: section reveal on scroll (fade + 12px rise, eased), parallax on hero and project imagery, magnetic hover on CTAs, slow cursor-tracked glow on hero, no bouncy/playful easings.
- **Atmosphere**: low-density particle canvas in hero only, 4% grid overlay on dark sections, soft radial glows behind headlines, occasional thin amber hairlines as section dividers.
- **Glassmorphism**: only on the nav bar and project hover state. Nowhere else.
- **Responsive**: mobile-first; particles disabled on small screens; parallax reduced; respects `prefers-reduced-motion`.

### Technical

- React + Vite + TypeScript + Tailwind (existing template).
- Framer Motion for all animation. Custom lightweight canvas for hero particles.
- Section components: `Hero`, `About`, `Projects`, `BeyondEngineering`, `Community`, `Contact`, plus `Nav` and `Footer`.
- Design tokens in `index.css` (`@layer base` with HSL custom properties) + Tailwind config extension.
- Lazy-load images, use `loading="lazy"`, async decode.
- SEO: title `Farai Mhlanga — Computer Engineer`, meta description, single H1, JSON-LD `Person` schema, OG image.
- Placeholder imagery generated tastefully (cinematic abstracts) until you provide your photos; real photos drop in as `src/assets/*` later.

### Out of scope (this pass)

- Blog/Writing section
- CMS or backend
- Contact form submission (mailto link only)
- Light mode

### What I need from you later (non-blocking)

Drop photos (portrait, concerts, project shots) into chat any time — I'll swap them in. Confirm email/LinkedIn/GitHub URLs for the contact section, or I'll leave clear placeholders.
