// Vite injects the deploy base path here, so every asset URL keeps working
// whether the site is served from a domain root or a /repo-name/ subpath.
const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const profile = {
  name: 'Ansuman Senapati',
  shortName: 'Ansuman',
  initials: 'AS',
  role: 'Software Engineer',
  // Two-track positioning — the organising idea of this whole site.
  tracks: {
    enterprise: 'Enterprise Java & DevOps at TCS',
    product: 'Full-stack product work in React & Next.js',
  },
  tagline: 'I keep a Nordic bank’s systems running by day, and build modern product on the web by night.',
  statement:
    'Assistant System Engineer at TCS working on Nordea’s cash-pooling platform — L3 production analysis, CI/CD and security patching on Java infrastructure that has to be right. Off the clock I build full-stack products with React, Next.js and TypeScript.',
  location: 'Bhubaneswar, Odisha, India',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST',
  status: {
    available: true,
    label: 'Open to conversations',
  },
  email: 'ansumansenapati10@gmail.com',
  // Phone stays off the site by choice - it is in the resume PDF for anyone
  // who actually needs it.
  resume: asset('Ansuman_Senapati_Resume.pdf'),
  resumeFileName: 'Ansuman_Senapati_Resume.pdf',
  photo: asset('ansuman-senapati.jpg'),
  photoAlt: 'Ansuman Senapati, Software Engineer, in a dark suit against a light background',
  socials: [
    { label: 'GitHub', href: 'https://github.com/ansumansena', handle: '@ansumansena' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ansuman-senapati-1a4aa9202/',
      handle: 'ansuman-senapati',
    },
    { label: 'Email', href: 'mailto:ansumansenapati10@gmail.com', handle: 'ansumansenapati10@gmail.com' },
  ],
} as const;

export const siteMeta = {
  title: 'Ansuman Senapati — Software Engineer',
  description:
    'Software Engineer at TCS working on Nordea banking systems, and a full-stack builder in React, Next.js and TypeScript. Bhubaneswar, India.',
  url: 'https://ansumansena.github.io/dev-identity/',
  ogImage: asset('og.png'),
} as const;
