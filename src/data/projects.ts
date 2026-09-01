export interface ProjectLink {
  label: string;
  href: string;
  kind: 'repo' | 'demo';
}

export interface Project {
  id: string;
  name: string;
  year: string;
  /** Optional — a card with no status simply shows its year. */
  status?: 'Live' | 'Archived';
  /** Shown in place of links when the source is not public. */
  note?: string;
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
      'Youstad’s public website and its ERP platform — the internal system the business actually runs on. Built in React with Material UI, with API integration and authentication handled through AWS Amplify. It is live and serving real users today.',
    contribution:
      'Web developer on the build at Meliorist Developers — developed and maintained both the website and the ERP platform.',
    note: 'Client work — the source is private.',
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
    id: 'job-prep',
    name: 'AI-Powered Job Prep',
    year: '2025',
    featured: false,
    blurb: 'A full-stack interview-preparation platform on the current edge of the React ecosystem.',
    description:
      'A Next.js application where a candidate onboards and records the roles they are preparing for. Built with the App Router and React Server Components, authentication and user sync through Clerk webhooks, and a Postgres schema modelled in Drizzle.',
    contribution: 'Sole developer — schema design, auth flow, server actions and the component library.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Clerk', 'Tailwind CSS v4'],
    highlights: [
      'Feature-sliced architecture — each domain owns its actions, schemas, db access and components.',
      'Clerk webhook route keeps the local Postgres user table in sync with the auth provider.',
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
    contribution: 'Sole developer — auth, realtime data layer, state management and UI.',
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
