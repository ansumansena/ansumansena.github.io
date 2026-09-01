export type Track = 'enterprise' | 'product';

export interface Role {
  id: string;
  company: string;
  title: string;
  project?: string;
  team?: string;
  start: string;
  end: string;
  current: boolean;
  track: Track;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: { label: string; href: string };
}

export const experience: Role[] = [
  {
    id: 'tcs',
    company: 'Tata Consultancy Services',
    title: 'Assistant System Engineer',
    project: 'Nordea — Local Systems Sweden',
    team: 'L3 Cashpool Team',
    start: 'Jul 2024',
    end: 'Present',
    current: true,
    track: 'enterprise',
    summary:
      'Building and supporting Java enterprise systems for Nordea’s cash-pooling platform, where a bad deploy is a banking incident.',
    highlights: [
      'Contribute to Java-based enterprise application development using Eclipse, Apache Ant and Oracle WebLogic Server for deployment and testing.',
      'Manage CI/CD pipelines via Jenkins and JFrog Artifactory.',
      'Perform L3-level production issue analysis — code debugging, configuration fixes and security vulnerability patching.',
      'Monitor application performance with AppDynamics and author technical documentation in Confluence.',
    ],
    stack: ['Java', 'Apache Ant', 'WebLogic', 'Jenkins', 'JFrog', 'AppDynamics', 'Confluence', 'JIRA'],
  },
  {
    id: 'meliorist',
    company: 'Meliorist Developers',
    title: 'Web Developer Intern',
    start: 'Apr 2023',
    end: 'Jul 2023',
    current: false,
    track: 'product',
    summary:
      'Shipped and maintained the website and ERP platform for Youstad — my first production React codebase with real users.',
    highlights: [
      'Developed and maintained the website and ERP platform for Youstad.',
      'Built the platform front-ends in React with Material UI for styling.',
      'Integrated APIs and authentication using AWS Amplify libraries.',
      'Implemented state management across the app using React hooks.',
    ],
    stack: ['React', 'Material UI', 'AWS Amplify', 'JavaScript'],
    link: { label: 'app.youstad.com', href: 'https://app.youstad.com' },
  },
];
