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
    label: 'Languages',
    track: 'enterprise',
    items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'C++', 'C'],
  },
  {
    id: 'web',
    label: 'Web & UI',
    track: 'product',
    items: ['React', 'Next.js', 'Node.js', 'Express', 'HTML', 'CSS', 'SCSS', 'Material UI', 'shadcn/ui'],
  },
  {
    id: 'ai',
    label: 'AI & LLMs',
    track: 'product',
    note: 'Applied in a hackathon build',
    items: ['Generative AI', 'LLM APIs', 'Prompt engineering', 'RAG'],
  },
  {
    id: 'data',
    label: 'Data',
    track: 'product',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Drizzle ORM'],
  },
  {
    id: 'enterprise',
    label: 'Enterprise & ops',
    track: 'enterprise',
    items: [
      'Spring',
      'Oracle WebLogic',
      'Apache Ant',
      'Jenkins',
      'JFrog Artifactory',
      'AppDynamics',
      'AWS Amplify',
    ],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    track: 'enterprise',
    items: ['Git', 'GitHub', 'JIRA', 'Confluence'],
  },
];
