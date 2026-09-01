# Ansuman Senapati — Portfolio

Personal portfolio site. React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion.

## Running it

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
npm run lint     # typecheck only
```

## The idea behind the design

The site is built around one observation: the work splits into two tracks that most
portfolios would flatten into a single list.

- **Enterprise / systems** — Java, WebLogic, Jenkins, L3 production analysis at TCS on
  Nordea's cash-pooling platform. Rendered in **signal teal** (`#4FE0C8`).
- **Product / build** — React, Next.js, TypeScript, full-stack side projects.
  Rendered in **ember** (`#FFA95C`).

Every accent on the page is one of those two colours, chosen by which track the thing
belongs to. The palette carries the argument rather than just decorating it.

Type is Bricolage Grotesque (display), Inter (body) and JetBrains Mono (all data,
labels and timestamps). Mono-for-data is what gives the page its instrumentation feel.

## Structure

```
src/
├── data/            All content. Edit here, never in components.
│   ├── profile.ts        name, tagline, socials, status, "currently building"
│   ├── experience.ts     roles, each tagged with its track
│   ├── projects.ts       projects, stacks and links
│   ├── skills.ts         skill groups, each tagged with its track
│   ├── education.ts      degree + certifications
│   └── navigation.ts     nav items and their section ids
├── components/
│   ├── Navbar.tsx        sticky nav, scroll-spy, mobile sheet
│   ├── Hero.tsx
│   ├── SignalField.tsx   the interactive canvas lattice
│   ├── About.tsx         the "two tracks" section
│   ├── Skills.tsx
│   ├── Experience.tsx    timeline
│   ├── Projects.tsx      featured card + grid
│   ├── Education.tsx     wraps Achievements
│   ├── Achievements.tsx  certifications list
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/               Section, Reveal, MagneticButton, Tag
├── hooks/
│   ├── useScrollSpy.ts
│   └── useLocalTime.ts   live IST clock
└── pages/
    ├── Home.tsx
    └── NotFound.tsx      404 styled as an incident log
```

**To change any content, edit `src/data/`.** No copy lives in the components.

## Performance and accessibility notes

- The hero canvas pauses via `IntersectionObserver` when scrolled out of view, caps
  node count, and renders a single static frame under `prefers-reduced-motion`.
- Every animation (`Reveal`, `MagneticButton`, card tilt, the 404 log) is disabled or
  collapsed under `prefers-reduced-motion`.
- Framer Motion and the router are split into their own chunks; the 404 page is lazy
  loaded so it never ships in the initial bundle.
- Semantic landmarks throughout, a skip link as the first tab stop, visible focus
  rings, `aria-current` on the active nav item, and Escape closes the mobile menu.

## Deploying

`npm run build` outputs to `dist/`.

The site is a single-page app, so unknown routes must fall back to `index.html`
for the custom 404 to render.

**GitHub Pages** (configured, recommended). `.github/workflows/deploy.yml` builds
and publishes on every push to `main` — enable it once under
*Settings → Pages → Source → GitHub Actions*.

- Repo named `ansumansena.github.io` → served at the domain root, nothing to
  change. This is the setup the workflow assumes.
- Any other repo name → served at `ansumansena.github.io/<repo>/`. Set
  `REPO_BASE` in `vite.config.ts` to `/<repo>/` and switch the workflow's build
  step to `npm run build:pages:subpath`.

Both paths run `scripts/ghpages-postbuild.mjs`, which copies `index.html` to
`404.html` (Pages has no rewrite rules, so this is what makes the SPA routes
work) and writes `.nojekyll`.

**Netlify** — `public/_redirects` is already in place.
**Vercel** — `vercel.json` is already in place.

### Before going live

Update the canonical and Open Graph URLs in `index.html` and `siteMeta.url` in
`src/data/profile.ts` if the final domain differs from
`https://ansumansena.github.io/`.
