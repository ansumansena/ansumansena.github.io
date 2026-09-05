import type { Track } from './experience';

export interface SkillGroup {
  id: string;
  label: string;
  track: Track;
  items: string[];
  /** Optional one-line provenance, shown under the group heading. */
  note?: string;
}

/**
 * Grouped by what each thing is actually for, and tagged with the track it
 * serves. Six groups tile evenly into the 2- and 3-column layouts.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages & frameworks',
    track: 'enterprise',
    items: ['Java', 'Spring', 'TypeScript', 'JavaScript', 'Python', 'C++', 'C'],
  },
  {
    id: 'web',
    label: 'Web & UI',
    track: 'product',
    items: [
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'HTML',
      'CSS',
      'SCSS',
      'Material UI',
      'shadcn/ui',
      'AWS Amplify',
    ],
  },
  {
    id: 'ai',
    label: 'AI & LLMs',
    track: 'product',
    note: '2nd place, TCS AI Fridays Hackathon',
    items: ['Generative AI', 'LLM APIs', 'RAG', 'Embeddings', 'Prompt engineering'],
  },
  {
    id: 'data',
    label: 'Data',
    track: 'product',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Drizzle ORM'],
  },
  {
    id: 'security',
    label: 'Security & operations',
    track: 'enterprise',
    note: 'Day-to-day on a banking platform',
    items: [
      'Container security',
      'SAST remediation',
      'Vulnerability patching',
      'TLS certificates & truststores',
      'Jenkins',
      'JFrog Artifactory',
      'Apache Ant',
      'Oracle WebLogic',
      'AppDynamics',
    ],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    track: 'enterprise',
    items: ['Git', 'GitHub', 'JIRA', 'Confluence'],
  },
];
