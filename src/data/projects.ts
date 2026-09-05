export interface ProjectLink {
  label: string;
  href: string;
  kind: 'repo' | 'demo';
}

export interface Project {
  id: string;
  name: string;
  /** Optional. Omitted while a project is still in progress. */
  year?: string;
  /** Optional — a card with no status simply shows its year. */
  status?: 'Live' | 'Completed' | 'Archived';
  /** Shown in place of links when the source is not public. */
  note?: string;
  /** Competition placement, e.g. "2nd place". Renders as a highlighted badge. */
  award?: string;
  /** Ordered pipeline stages, drawn as a compact flow on the card. */
  pipeline?: { from: string; stages: string[]; to: string };
  featured: boolean;
  blurb: string;
  description: string;
  contribution: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
}

/**
 * Every stack entry and link below is taken from the resume or verified
 * against the public repository — nothing here is aspirational.
 */
export const projects: Project[] = [
  {
    id: 'youstad',
    name: 'Youstad',
    year: '2023',
    status: 'Live',
    featured: true,
    blurb: 'A website and ERP platform in production, built during my internship at Meliorist Developers.',
    description:
      'Youstad’s public website and its ERP platform, the internal system the business actually runs on. Built in React with Material UI, with API integration and authentication handled through AWS Amplify. It is live and serving real users today.',
    contribution:
      'Web developer on the build at Meliorist Developers, developing and maintaining both the website and the ERP platform.',
    note: 'Client work, source is private.',
    stack: ['React', 'Material UI', 'AWS Amplify', 'JavaScript'],
    highlights: [
      'Built the platform front-ends in React, styled throughout with Material UI.',
      'Integrated APIs and authentication using AWS Amplify libraries.',
      'Implemented state management across the application with React hooks.',
      'Maintained the platform after launch, not just shipped it once.',
    ],
    links: [{ label: 'app.youstad.com', href: 'https://app.youstad.com', kind: 'demo' }],
  },
  {
    id: 'bug-triage-agent',
    name: 'Bug Report Triage Agent',
    year: '2026',
    award: '2nd place',
    featured: false,
    blurb: 'A multi-agent generative AI pipeline that summarizes, scores and ranks maintenance bug reports.',
    description:
      'Built for the TCS AI Fridays Hackathon, Season 2, against the brief "Application Maintenance Bug Report Summarization and Prioritization Agent". Maintenance teams receive large volumes of bug reports that vary widely in detail and quality, which makes manual triage slow and error-prone. Rather than a single prompt, the solution chains specialised agents so each stage does one job well.',
    contribution:
      'One of a team of four. I worked on the generative AI side, including the retrieval-augmented generation stage.',
    note: 'Built on TCS infrastructure during the event, so the source is not publicly available.',
    pipeline: {
      from: 'Bug report',
      stages: [
        'Summarization agent',
        'Severity classification',
        'RAG impact analyzer (module docs + history)',
        'Priority scoring agent',
        'Duplicate detection (embeddings)',
      ],
      to: 'Final ranked output',
    },
    stack: ['Generative AI', 'Multi-agent pipeline', 'RAG', 'Embeddings', 'Prompt engineering'],
    highlights: [
      'Retrieval over module documentation and historical resolutions, so impact is judged against how the codebase actually behaves rather than the report text alone.',
      'Embedding-based duplicate detection collapses repeat reports before they reach the queue.',
      'Severity and impact are scored separately, then combined into one priority rank.',
    ],
    links: [],
  },
  {
    id: 'job-prep',
    name: 'AI-Powered Job Prep',
    year: '2026',
    featured: false,
    blurb: 'A full-stack interview-preparation platform on the current edge of the React ecosystem.',
    description:
      'A Next.js 15 application built on the App Router and React Server Components. A candidate signs in through Clerk, completes onboarding, and manages the roles they are preparing for through a full create, read, update and delete flow. The data layer is Drizzle over Postgres, modelled across users, job info, interviews and questions, with migrations checked in.',
    contribution:
      'Sole developer: data model, auth flow, server actions, caching layer and the component library.',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Drizzle ORM',
      'PostgreSQL',
      'Clerk',
      'Zod',
      'Arcjet',
      'Tailwind CSS v4',
    ],
    highlights: [
      'Feature-sliced architecture: every domain owns its own server actions, database access, cache tags, Zod schemas and components.',
      'A Clerk webhook route keeps the local Postgres user table in sync with the auth provider, so sign-ups and profile changes propagate automatically.',
      'A dedicated cache layer tags each query by domain, so a mutation invalidates exactly the right data instead of the whole route.',
      'Type-safe environment variables split across client and server, forms validated with Zod and React Hook Form, and routes protected in middleware.',
      'Light and dark theming with suspense boundaries and skeleton loading throughout.',
    ],
    links: [{ label: 'Source', href: 'https://github.com/ansumansena/ai-powered-job-prep', kind: 'repo' }],
  },
  {
    id: 'chat',
    name: 'Realtime Chat App',
    year: '2023',
    status: 'Live',
    featured: false,
    blurb: 'Real-time messaging with authentication, presence tracking and instant delivery.',
    description:
      'A messaging platform built on Firebase, with authentication, online-presence tracking and instant message delivery between concurrent users.',
    contribution: 'Sole developer: auth, realtime data layer, state management and UI.',
    stack: ['React', 'SCSS', 'Firebase', 'Redux'],
    highlights: [
      'Presence tracking so users can see who is online in real time.',
      'Redux for state management, keeping performance consistent across concurrent sessions.',
    ],
    links: [
      { label: 'Live demo', href: 'https://vibechatapp.netlify.app', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/ansumansena/Realtime-Chat-App', kind: 'repo' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    year: '2022',
    status: 'Archived',
    featured: false,
    blurb: 'Full-stack storefront with JWT authentication and Stripe payments.',
    description:
      'A complete e-commerce platform with a React storefront and a Node/Express API backed by MongoDB, using JWT for authentication and the Stripe API for checkout.',
    contribution: 'Sole developer across both the client and the API.',
    stack: ['React', 'Material UI', 'Node.js', 'Express', 'MongoDB', 'Redux', 'JWT', 'Stripe API'],
    highlights: [
      'Stripe API integration for secure, seamless payments.',
      'Redux for global state, optimising the checkout flow and UI responsiveness.',
    ],
    links: [
      { label: 'Client', href: 'https://github.com/ansumansena/Ecommerce-App', kind: 'repo' },
      { label: 'API', href: 'https://github.com/ansumansena/Ecommerce-API', kind: 'repo' },
    ],
  },
];
