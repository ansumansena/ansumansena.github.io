export const education = {
  degree: 'B.Tech. in Information Technology',
  institution: 'Odisha University of Technology and Research',
  short: 'OUTR',
  start: '2020',
  end: '2024',
  score: '9.23',
  scoreOutOf: '10',
  scoreLabel: 'CGPA',
  honour: 'OUTR Merit Scholarship Awardee',
} as const;

export interface Certification {
  name: string;
  issuerHint?: string;
  period: string;
}

export const certifications: Certification[] = [
  { name: 'ChatGPT Prompt Engineering for Developers', period: '2025' },
  { name: 'Building Systems with the ChatGPT API', period: '2025' },
  { name: 'Salesforce Developer Virtual Internship', period: 'May 2023 – Jul 2023' },
  { name: 'Google Cloud — Cloud Engineering & Machine Learning Track', period: '2021' },
];
